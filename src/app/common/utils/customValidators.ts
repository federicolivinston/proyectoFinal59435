import { ValidatorFn } from "@angular/forms";

export const dniValidator: ValidatorFn = (control)=>{

    if (isNaN(control.value) || !Number.isInteger(control.value) || control.value<1000000 || control.value > 100000000){      
        return {dniValidator: 'Ingrese un dni valido.'};
    }
    return null;
}