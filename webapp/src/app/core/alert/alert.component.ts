import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { AlertOptionsI } from './service/alertOptions';
import { ModalContext } from '@coreComponents/modal-base/service/ModalContext';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  options: AlertOptionsI = {
    message: '',
    title: '',
    icon: faCircleCheck,

    iconColor: 'text-white',
    bgIconColor: 'bg-slate-800',

    tittleStyle: 'text-2xl font-semibold',
    messageStyle: 'text-base',

    showCloseButton: true,
    closeButtonText: 'Close',
    closeButtonStyle: 'bg-slate-800 text-slate-300 px-4 py-3 rounded-l-xl rounded-r-xl outline-none hover:bg-slate-700 focus:bg-slate-700 active:bg-slate-600 transition-colors duration-75 ease-linear active:scale-[0.99] transform-gpu',
    cancelOnClose: false,

    showConfirmButton: false,
    confirmButtonText: 'Confirm',
    confirmButtonStyle: 'bg-slate-800 text-slate-300 px-4 py-3 rounded-l-xl rounded-r-xl outline-none hover:bg-slate-700 focus:bg-slate-700 active:bg-slate-600 transition-colors duration-75 ease-linear active:scale-[0.99] transform-gpu'

  }

  constructor(private modalContext: ModalContext) { }

  closeAlert() {
    if (this.options.cancelOnClose) {
      this.modalContext.close('CANCEL');
    } else {
      this.modalContext.close()
    }
  }

  confirmAlert() {
    this.modalContext.close('CONFIRM');
  }

}
