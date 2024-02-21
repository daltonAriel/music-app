import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SignupHttpService } from '../../services/signup-http.service';
import { SignUpValidatorsService } from '../../validators/signup-validators.service';
import { TokenInterface } from "@interfaces/tokenInterface";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  providers: [SignUpValidatorsService, SignupHttpService]
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;

  constructor(private signUpValidators: SignUpValidatorsService, private signupHtppService: SignupHttpService) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.maxLength(80)]),
      email: new FormControl('', { validators: [Validators.required, Validators.email], asyncValidators: [this.signUpValidators.checkEmail()] }),
      password: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(120)]),
      confirmPassword: new FormControl('', [Validators.required])
    }, { validators: [this.signUpValidators.checkConforirmPassword()] });

  }

  register() {
    if (this.signupForm.valid) {
      let data = {
        user_name: this.signupForm.value.userName,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password
      }

      this.signupHtppService.register(data).subscribe({
        next: (res:TokenInterface) => {
          this.signupForm.reset();
          //TODO
        },
        error: (err) => {
          //TODO
        }
      })
    }
    this.signupForm.markAllAsTouched();
    this.signupForm.markAsDirty();
  }

}
