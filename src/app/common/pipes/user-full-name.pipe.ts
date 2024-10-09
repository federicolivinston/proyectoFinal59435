import { Pipe, PipeTransform } from '@angular/core';
import { Student } from '../../core/models/studentModels';

@Pipe({
  name: 'userFullName'
})
export class UserFullNamePipe implements PipeTransform {

  transform(value: Student, capitalize: boolean = false): string {
    let fullName = value.firstName + ' ' + value.lastName;
    if (capitalize){
      let palabras = fullName.split(' ');
      palabras = palabras.map(nombre=>{
      return nombre[0].toUpperCase() + nombre.substring(1);
        });
      return palabras.join(' ');
    }
    return fullName; 
  }

}
