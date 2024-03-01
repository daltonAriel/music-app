import { Component, HostListener, Input, inject, OnDestroy, HostBinding, AfterViewInit, ElementRef, Renderer2, Inject, ChangeDetectorRef, AfterContentInit } from '@angular/core';
import { DOCUMENT } from "@angular/common";
import { CommonModule } from '@angular/common';
import { ModalOptionsI } from "./service/modalOptions";
import { animate, style, transition, trigger, AnimationEvent } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { config } from 'rxjs';


@Component({
  host: {
    '[@modalAnimation]': 'true'
  },
  selector: 'modal-base',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-base.component.html',
  styleUrls: ['./modal-base.component.scss'],
  animations: [
    trigger('modalAnimation', [
      transition('void => *', [
        style({ transform: 'translateY(-25%)', opacity: 0 }),
        animate("0.3s ease-in-out", style({ transform: 'translateY(0%)', opacity: 1 }))
      ]),
      transition('* => void', [
        animate("0.3s ease-in-out", style({ transform: 'translateY(-50%)' }))
      ]),
      transition('* => zoomed', [
        animate('0.2s ease-out', style({ transform: 'scale(1.02)' })),
        animate('0.2s ease-out', style({ transform: 'scale(1)' })),
      ])
    ])
  ],
  styles: [`
    :host {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1060;
    }`]
})
export class ModalBaseComponent implements AfterViewInit, OnDestroy {
  @Input() modalOptions!: ModalOptionsI;
  @Input() closeModal!: () => void;
  @Input() closeAllInstances!: () => void;
  animationModal: 'normal' | 'zoomed' = 'normal';

  @HostBinding('@.disabled')
  public animationsDisabled = false;

  private document = inject(DOCUMENT);
  private restoreOverflow = () => { };
  private el: ElementRef = inject(ElementRef);
  private render: Renderer2 = inject(Renderer2);


  @HostListener('document:keydown.escape', ['$event'])
  private handleEscapeKey(event: KeyboardEvent) {
    if (!this.modalOptions.static) {
      this.closeModal();
    } else if (this.modalOptions.static && this.modalOptions.size != 'fullScreen') {
      this.animationModal = 'zoomed';
    }
  }

  constructor(private cdr: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.hideScroll();
    this.addClickOutsideListener();
    this.cdr.detectChanges();
  }


  ngOnDestroy(): void {
    this.restoreOverflow();
  }


  private addClickOutsideListener() {
    const clickOutsideListener = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest('.modalContent')) {
        if (!this.modalOptions.static) {
          this.closeModal();
        } else if (this.modalOptions.static && this.modalOptions.size != 'fullScreen') {
          this.animationModal = 'zoomed';
        }
      }
    };
    this.render.listen(this.el.nativeElement, 'click', clickOutsideListener);
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
  }

} 
