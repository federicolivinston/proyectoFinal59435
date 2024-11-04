import { AbstractControl, ValidationErrors,ValidatorFn } from "@angular/forms";

export const dniValidator: ValidatorFn = (control)=>{

    if (isNaN(control.value) || !Number.isInteger(control.value) || control.value<1000000 || control.value > 100000000){      
        return {dniValidator: 'Ingrese un dni valido.'};
    }
    return null;
}

export function passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        const isValid = passwordPattern.test(value);
        return isValid ? null : { passwordStrength: true };
    };
}

export function usernameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const usernamePattern = /^[A-Za-z]+$/;
      const isValid = value && value.length > 5 && usernamePattern.test(value);
      return isValid ? null : { usernameInvalid: true };
    };
  }