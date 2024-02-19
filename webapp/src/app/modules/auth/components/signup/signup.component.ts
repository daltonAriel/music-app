import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SignupHttpService } from '../../services/signup-http.service';
import { SignUpValidatorsService } from '../../validators/signup-validators.service';


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

  constructor(private signUpValidators: SignUpValidatorsService) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.maxLength(80)]),
      email: new FormControl('', { validators: [Validators.required, Validators.email], asyncValidators: [this.signUpValidators.checkEmail()] }),
      password: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(120)]),
      confirmPassword: new FormControl('', [Validators.required])
    }, {validators: [this.signUpValidators.checkConforirmPassword()]});

  }

  register() { 
    console.log(this.signupForm.getError('passwordNotMatchErr'))
  }

}
