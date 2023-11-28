import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '@services/ModalService.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  modalSize: 'small' | 'large' | 'extraLarge' | 'fullScreen';

  constructor(private modalService: ModalService) {
    this.modalSize = this.modalService.getModalSize();
  }


}
