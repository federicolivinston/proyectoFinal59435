import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StudentsService } from './students.service';
import { Student } from '../models/studentModels';
import { environment } from '../../../environments/environment';
import { Province } from '../models/provinceModels';
import { of } from 'rxjs';

describe('StudentsService', () => {
  let service: StudentsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StudentsService],
    });
    service = TestBed.inject(StudentsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('El servicio debe crearse correctamente.', () => {
    expect(service).toBeTruthy()
  });


  it('El servicio debe recuperar la lista de alumnos con su provincia', () => {
    const mockStudents: Student[] = [
      { id: '1', firstName: 'John', lastName: 'Doe', 'email':'email1@test.com', 'dni': 34567893, 'street': 'belgrano 2', idProvince: '1', 'phone': '5555-6666', 'createdAt': new Date('2024-10-24')},
      { id: '2', firstName: 'Jane', lastName: 'Doe', 'email':'email2@test.com', 'dni': 34567894, 'street': 'belgrano 1', idProvince: '2', 'phone': '5555-6667', 'createdAt': new Date('2024-10-24')},
    ];

    const mockProvinces: Province[] = [
      { id: '1', name: 'Province 1' },
      { id: '2', name: 'Province 2' },
    ];

    service.getStudents().subscribe((students) => {
      expect(students.length).toBe(2);
      expect(students[0].province).toBe('Province 1');
      expect(students[1].province).toBe('Province 2');
    });

    const reqStudents = httpMock.expectOne(`${environment.apiBaseUrl}/${environment.studentsEndPoint}`);
    const reqProvinces = httpMock.expectOne(`${environment.apiBaseUrl}/${environment.provincesEndPoint}`);
    
    reqStudents.flush(mockStudents);
    reqProvinces.flush(mockProvinces);
  });

  it('El servicio debe recuperar un estudiante basado en su id', () => {
    const mockStudent: Student = { id: '1', firstName: 'John', lastName: 'Doe', 'email':'email1@test.com', 'dni': 34567893, 'street': 'belgrano 2', idProvince: '1', 'phone': '5555-6666', 'createdAt': new Date('2024-10-24') };
    const mockProvinces: Province[] = [{ id: '1', name: 'Province 1' }];

    service.getStudentById('1').subscribe((student) => {
      expect(student).toBeTruthy();
      expect(student?.firstName).toBe('John');
      expect(student?.province).toBe('Province 1');
    });

    const reqStudent = httpMock.expectOne(`${environment.apiBaseUrl}/${environment.studentsEndPoint}/1`);
    const reqProvinces = httpMock.expectOne(`${environment.apiBaseUrl}/${environment.provincesEndPoint}`);

    reqStudent.flush(mockStudent);
    reqProvinces.flush(mockProvinces);
  });

  it('El servicio debe crear un alumno', () => {
    const mockStudent: Omit<Student, 'id'> = { firstName: 'John', lastName: 'Doe', 'email':'email1@test.com', 'dni': 34567893, 'street': 'belgrano 2', idProvince: '1', 'phone': '5555-6666', 'createdAt': new Date('2024-10-24') };
    const createdStudent: Student = { id: '1', ...mockStudent };
    
    service.createStudent(mockStudent).subscribe((student) => {
      expect(student).toEqual(createdStudent);
    });

    const req = httpMock.expectOne(`${environment.apiBaseUrl}/${environment.studentsEndPoint}`);
    expect(req.request.method).toBe('POST');
    req.flush(createdStudent);
  });

  it('debe eliminar un alumno por su id', () => {
    const mockStudents: Student[] = [
        { id: '2', firstName: 'Jane', lastName: 'Doe', email: 'email2@test.com', dni: 34567894, street: 'belgrano 1', idProvince: '2', phone: '5555-6667', createdAt: new Date() },
    ];

    spyOn(service, 'getStudents').and.returnValue(of(mockStudents));

    service.removeStudentById('1').subscribe((students) => {
        expect(students.length).toBe(1); 
        expect(students[0].firstName).toBe('Jane'); 
    });

    const reqDelete = httpMock.expectOne(`${environment.apiBaseUrl}/${environment.studentsEndPoint}/1`);
    expect(reqDelete.request.method).toBe('DELETE'); 
    reqDelete.flush({});

    const remainingStudents = mockStudents.filter(student => student.id !== '1');
    (service.getStudents as jasmine.Spy).and.returnValue(of(remainingStudents));

    service.getStudents().subscribe((students) => {
        expect(students.length).toBe(1);
        expect(students[0].firstName).toBe('Jane');
    });

    httpMock.verify();
  });

});