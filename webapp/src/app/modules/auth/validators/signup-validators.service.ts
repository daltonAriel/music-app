import { Injectable } from "@angular/core";
import { SignupHttpService } from "../services/signup-http.service";
import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Observable, catchError, debounceTime, map, of, switchMap, take } from "rxjs";


@Injectable({ providedIn: 'any' })
export class SignUpValidatorsService {
    constructor(private signupHttp: SignupHttpService) { }

    checkEmail(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            const emailValue: string = control.value;
            if (emailValue && emailValue.trim() !== '') {
                return control.valueChanges.pipe(
                    debounceTime(2000),
                    take(1),
                    switchMap(() => {
                        return this.signupHttp.countEmail({ email: emailValue }).pipe(
                            map((res: any) => {
                                if (res.count > 0) {
                                    return { emailRegistredErr: 'Email already registered.' };
                                }
                                return null
                            }),
                            catchError((err: any) => {
                                return of({ emailCheckErr: 'Email checking failed' });
                            })
                        );
                    })
                );
            }
            return of(null);
        }
    }


    checkConforirmPassword(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const password: string | null = control.get('password')?.value;
            const confirmPassword: string | null = control.get('confirmPassword')?.value;
            if (password === confirmPassword) {
                return null;
            }
            return { passwordNotMatchErr: 'Passwords do not match.' };
        }
    }


}
