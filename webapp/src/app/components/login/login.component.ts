import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TokenInterface } from "@interfaces/tokenInterface";
import { HttpLoginService } from '@services/HttpLoginService.service';
import { ModalService } from "@services/ModalService.service";
import { ModalComponent } from '../modal/modal.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, ModalComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [HttpLoginService]
})
export class LoginComponent {

  loginForm: FormGroup;
  tokens: TokenInterface = {} as TokenInterface;
  modalStatus$:Observable<boolean>;

  constructor(private httpService: HttpLoginService, private modalService: ModalService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });

    this.modalStatus$ = this.modalService.getModalStatus();
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
    this.modalService.openModal({size:'small'});
  }

  closeModal() {
    this.modalService.closeModal();
  }

}
