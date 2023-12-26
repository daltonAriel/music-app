import { Component, HostListener, Input, ElementRef, inject, OnDestroy, OnInit, HostBinding, AfterViewInit } from '@angular/core';
import { DOCUMENT } from "@angular/common";
import { CommonModule } from '@angular/common';
import { ModalOptionsI } from "@interfaces/modalOptions";
import { animate, state, style, transition, trigger, AnimationEvent } from '@angular/animations';


@Component({
  selector: 'modal-base',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-base.component.html',
  styleUrls: ['./modal-base.component.scss'],
  animations: [
    trigger('modalAniamtion', [
      state('void', style({ transform: 'translateY(-25%)', opacity: 0 })),
      transition('void => open', [
        animate('0.3s ease-in-out', style({ transform: 'translateY(0%)', opacity: 1 }))
      ]),
      transition('* => closed', [
        animate('0.3s ease-in-out', style({ transform: 'translateY(-50%)', opacity: 0 }))
      ]),
      state('normal', style({ transform: 'scale(1)' })),
      state('zoomed', style({ transform: 'scale(1.02)' })),
      transition('* => zoomed', animate('0.2s ease-out')),
      transition('* => normal', animate('0.2s ease-out')),
    ])
  ],
})
export class ModalBaseComponent implements OnInit, AfterViewInit, OnDestroy {
  ngAfterViewInit(): void {
    this.hideScroll();
  }

  @Input() modalOptions!: ModalOptionsI;
  @Input() closeModal!: () => void;
  animationModal: 'open' | 'closed' | 'normal' | 'zoomed' = 'open';

  private document = inject(DOCUMENT);
  private elementRef: ElementRef = inject(ElementRef);
  private restoreOverflow = () => { };

  @HostBinding('@modalAniamtion') public fadeInOut = true;

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    if (!this.modalOptions.static) {
      this.close();
    } else if (this.modalOptions.static && this.modalOptions.size != 'fullScreen') {
      this.animationModal = 'zoomed';
    }
  }

  ngOnInit(): void {
    console.log(this.modalOptions);
   }


  ngOnDestroy(): void {
    this.restoreOverflow();
  }

  closeModalMouseEvent(event: MouseEvent) {
    const modalElement = this.elementRef.nativeElement.querySelector('.modalContainer');
    if (modalElement && modalElement === event.target) {
      if (!this.modalOptions.static) {
        this.close();
      } else if (this.modalOptions.static && this.modalOptions.size != 'fullScreen') {
        this.animationModal = 'zoomed';
      }
    }
  }


  private hideScroll(): void {
    const paddingR = this.document.body.style.paddingRight;
    const overflow = this.document.body.style.overflow;
    const scrollbarWidth = Math.abs(window.innerWidth - this.document.documentElement.clientWidth);
    if (scrollbarWidth > 0) {
      const actualPadding = parseFloat(window.getComputedStyle(this.document.body).paddingRight);
      this.document.body.style.paddingRight = `${actualPadding + scrollbarWidth}px`;
    }
    this.document.body.style.overflow = 'hidden';

    this.restoreOverflow = () => {
      if (scrollbarWidth > 0) {
        this.document.body.style.paddingRight = paddingR;
      }
      this.document.body.style.overflow = overflow;
    }
  }


  animationDone(event: AnimationEvent) {
    if (event.toState === 'zoomed') {
      this.animationModal = 'normal';
    }
    if (event.toState === 'closed') {
      this.closeModal();
    }
  }

  close() {
    this.animationModal = 'closed';
  }


} 
