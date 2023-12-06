import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '@services/ModalService.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements AfterViewInit {

  modalSize: 'small' | 'large' | 'extraLarge' | 'fullScreen';
  modalScrollable: boolean = false;
  modalHeight: 'full' | 'auto' = 'auto';
  modalPosition: 'top' | 'center' = 'center';

  constructor(private modalService: ModalService, private render: Renderer2) {
    this.modalSize = this.modalService.getModalSize();
    this.modalScrollable = this.modalService.getScrollableContent();
    this.modalHeight = this.modalService.getHeight();
    this.modalPosition = this.modalService.getPosition();
  }

  ngAfterViewInit(): void {
    let body: HTMLBodyElement | null = document.querySelector('body');
    if (body) {
      if (this.modalScrollable) {
        this.render.addClass(body, 'overflow-hidden');
      } else {
        this.render.removeClass(body, 'overflow-hidden');
      }
    }

  }


} 
