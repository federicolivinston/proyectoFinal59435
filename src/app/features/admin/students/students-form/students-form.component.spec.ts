import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { StudentsFormComponent } from './students-form.component';
import { ProvincesService } from '../../../../core/services/provinces.service';
import { Province } from '../../../../core/models/provinceModels';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

class MatDialogRefMock {
  close() {} 
}

class ProvincesServiceMock {
  getProvinces() {
    return of([{ id: '1', name: 'Province 1' }, { id: '2', name: 'Province 2' }] as Province[]);
  }
}

describe('StudentsFormComponent', () => {
  let component: StudentsFormComponent;
  let fixture: ComponentFixture<StudentsFormComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, 
        MatFormFieldModule, 
        MatInputModule, 
        MatSelectModule, 
        BrowserAnimationsModule],
      declarations: [StudentsFormComponent],
      providers: [
        { provide: MatDialogRef, useClass: MatDialogRefMock },
        { provide: ProvincesService, useClass: ProvincesServiceMock },
        { provide: MAT_DIALOG_DATA, useValue: {}  }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('El componente se debe crear correctamente.', () => {
    expect(component).toBeTruthy();
  });

  it('Se debe inicializar el forulario correctamente.', () => {
    expect(component.studentForm).toBeTruthy();
  });

  it('Al inicializarse debe tener un observable de provincias.', () => {
    expect(component.provinces$).toBeTruthy();
  });

  it('El formulario debe ser invalido si no cargo datos', () => {
    // marca los campos como accedidos
    component.studentForm.markAllAsTouched();
    // verifico si el form es invalido
    expect(component.studentForm.invalid).toBeTrue();

    // verifico que todos los campos son requeridos
    expect(component.studentForm.controls['firstName'].errors?.['required']).toBeTruthy();
    expect(component.studentForm.controls['lastName'].errors?.['required']).toBeTruthy();
    expect(component.studentForm.controls['email'].errors?.['required']).toBeTruthy();
    expect(component.studentForm.controls['dni'].errors?.['required']).toBeTruthy();
    expect(component.studentForm.controls['street'].errors?.['required']).toBeTruthy();
    expect(component.studentForm.controls['idProvince'].errors?.['required']).toBeTruthy();
    expect(component.studentForm.controls['phone'].errors?.['required']).toBeTruthy();
  });

  it('El formulario debe ser valido si ingreso datos validos', () => {
    // Cargar datos válidos en el formulario
    component.studentForm.patchValue({
      firstName: 'Juan',
      lastName: 'Perez',
      email: 'juanPerez@example.com',
      dni: 21833233,
      street: 'bergallo 35',
      idProvince: '1', 
      phone: '11 3456-4545'
    });

    component.studentForm.markAllAsTouched();
    expect(component.studentForm.valid).toBeTrue(); 

    // verifico que todos los campos con datos validos son validos
    expect(component.studentForm.controls['firstName'].valid).toBeTrue();
    expect(component.studentForm.controls['lastName'].valid).toBeTrue();
    expect(component.studentForm.controls['email'].valid).toBeTrue();
    expect(component.studentForm.controls['dni'].valid).toBeTrue();
    expect(component.studentForm.controls['street'].valid).toBeTrue();
    expect(component.studentForm.controls['idProvince'].valid).toBeTrue();
    expect(component.studentForm.controls['phone'].valid).toBeTrue();

  });

  it('El formulario debe ser invalido si ingreso un dni invalido', () => {
    // Cargar datos con solo el dni invalido en el formulario
    component.studentForm.patchValue({
      firstName: 'Juan',
      lastName: 'Perez',
      email: 'juanPerez@example.com',
      dni: 2183323366,
      street: 'bergallo 35',
      idProvince: '1', 
      phone: '11 3456-4545'
    });

    component.studentForm.markAllAsTouched();
    expect(component.studentForm.valid).toBeFalse(); 

    // Verificar que el campo de email es inválido y tiene el error correcto
    const dniControl = component.studentForm.controls['dni'];
    expect(dniControl.valid).toBeFalse(); 
    expect(dniControl.errors?.['required']).toBeUndefined();
    expect(dniControl.errors?.['dniValidator']).toBeTruthy(); 
  });

  it('El formulario debe ser invalido si ingreso un email invalido', () => {
    // Cargar datos con solo el mail invalido en el formulario
    component.studentForm.patchValue({
      firstName: 'Juan',
      lastName: 'Perez',
      email: 'mail_invalido',
      dni: 21833233,
      street: 'bergallo 35',
      idProvince: '1', 
      phone: '11 3456-4545'
    });

    component.studentForm.markAllAsTouched();
    expect(component.studentForm.valid).toBeFalse(); 

    // Verificar que el campo de email es inválido y tiene el error correcto
    const emailControl = component.studentForm.controls['email'];
    expect(emailControl.valid).toBeFalse(); 
    expect(emailControl.errors?.['required']).toBeUndefined();
    expect(emailControl.errors?.['email']).toBeTruthy(); 
  });

  it('El formulario debe ser invalido si ingreso un firstName invalido', () => {
    // Cargar datos con solo el mail invalido en el formulario
    component.studentForm.patchValue({
      firstName: 'Ju',
      lastName: 'Perez',
      email: 'juanPerez@example.com',
      dni: 21833233,
      street: 'bergallo 35',
      idProvince: '1', 
      phone: '11 3456-4545'
    });

    component.studentForm.markAllAsTouched();
    expect(component.studentForm.valid).toBeFalse(); 

    // Verificar que el campo de firstName es inválido y tiene el error correcto
    const firstNameControl = component.studentForm.controls['firstName'];
    expect(firstNameControl.valid).toBeFalse(); 
    expect(firstNameControl.errors?.['required']).toBeUndefined();
    expect(firstNameControl.errors?.['minlength']).toBeTruthy();
    expect(firstNameControl.errors?.['minlength']?.requiredLength).toBe(3);
  });

  it('El formulario debe ser invalido si ingreso un lastName invalido', () => {
    // Cargar datos con solo el mail invalido en el formulario
    component.studentForm.patchValue({
      firstName: 'Juan',
      lastName: 'Pe',
      email: 'juanPerez@example.com',
      dni: 21833233,
      street: 'bergallo 35',
      idProvince: '1', 
      phone: '11 3456-4545'
    });

    component.studentForm.markAllAsTouched();
    expect(component.studentForm.valid).toBeFalse(); 

    // Verificar que el campo de firstName es inválido y tiene el error correcto
    const lastNameControl = component.studentForm.controls['lastName'];
    expect(lastNameControl.valid).toBeFalse(); 
    expect(lastNameControl.errors?.['required']).toBeUndefined();
    expect(lastNameControl.errors?.['minlength']).toBeTruthy();
    expect(lastNameControl.errors?.['minlength']?.requiredLength).toBe(3);
  });
});
