import { ComponentRef, Injectable, Injector, Type, inject, createEnvironmentInjector, EnvironmentInjector, createComponent, ApplicationRef } from '@angular/core';
import { ModalBaseComponent } from "../modal-base.component";
import { ModalOptionsI } from "../service/modalOptions";
import { ModalContext } from './ModalContext';
import { BackdropModalComponent } from '../backdrop-modal/backdrop-modal.component';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modalRefContainer: { modal: ComponentRef<any>, backDrop: ComponentRef<any> }[] = [];
  private readonly environmentInjector = inject(EnvironmentInjector);
  private appRef = inject(ApplicationRef);
  private injector = inject(Injector);
  private DOC = inject(DOCUMENT);


  openModal(content: Type<any>, customOptions: Partial<ModalOptionsI> = {}) {
    const defaultOptions: ModalOptionsI = {
      size: 'md',
      scrollable: false,
      position: 'center',
      static: false,
    };

    const context = new ModalContext();
    const env: EnvironmentInjector = createEnvironmentInjector([{ provide: ModalContext, useValue: context }], this.environmentInjector);
    const modalOptions: ModalOptionsI = { ...defaultOptions, ...customOptions };

    return new Promise((resolve, reject): void => {
      const _body = createComponent(content, { elementInjector: this.injector, environmentInjector: env });
      const modalBodyElements: any = Array.from(_body.location.nativeElement.children);

      const modalBackdrop = createComponent(BackdropModalComponent, { elementInjector: this.injector, environmentInjector: this.appRef.injector });

      const modalContainer = createComponent(ModalBaseComponent, {
        elementInjector: this.injector,
        environmentInjector: this.appRef.injector,
        projectableNodes: [modalBodyElements]
      });

      modalContainer.instance.modalOptions = modalOptions;

      this.appRef.attachView(modalContainer.hostView);
      this.appRef.attachView(modalBackdrop.hostView);

      modalContainer.instance.closeModal = () => {
        this.closeModal(modalContainer, modalBackdrop);
        resolve(() => { });
      };
      modalContainer.instance.closeAllInstances = () => {
        this.closeAll();
      }

      context.close = () => {
        this.closeModal(modalContainer, modalBackdrop);
        resolve(() => { });
      }
      context.closeAll = () => {
        this.closeAll();
      }

      this.DOC.body.appendChild(modalContainer.location.nativeElement);
      this.DOC.body.appendChild(modalBackdrop.location.nativeElement);
      this.modalRefContainer.push({ modal: modalContainer, backDrop: modalBackdrop });
    });
  }

  private closeModal(modalRef: ComponentRef<any>, backdropRef: ComponentRef<any>) {
    let index = this.modalRefContainer.lastIndexOf({ backDrop: backdropRef, modal: modalRef });
    this.modalRefContainer.splice(index, 1);
    modalRef.destroy();
    backdropRef.destroy();
  }

  closeAll() {
    for (let i = this.modalRefContainer.length - 1; i >= 0; i--) {
      this.modalRefContainer[i].modal.instance.closeModal();
    }
    this.modalRefContainer = [];
  }

}
