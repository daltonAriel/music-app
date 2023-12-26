import { Component } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TokenInterface } from "@interfaces/tokenInterface";
import { HttpLoginService } from '@services/HttpLoginService.service';
import { ModalService } from "@services/ModalService.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [HttpLoginService, ModalService]
})
export class LoginComponent {

  loginForm: FormGroup;
  tokens: TokenInterface = {} as TokenInterface;


  constructor(private httpService: HttpLoginService, private modalService: ModalService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });

  }

  getAccess() {
    this.httpService.getAccessToken().subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }


  openModal() {
    
  }

}
