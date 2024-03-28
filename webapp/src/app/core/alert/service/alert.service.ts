import { Injectable, inject, Type, ComponentRef, EnvironmentInjector, ApplicationRef, Injector, createEnvironmentInjector, createComponent } from '@angular/core';
import { AlertComponent } from '../alert.component';
import { ModalContext } from '@coreComponents/modal-base/service/ModalContext';
import { DOCUMENT } from '@angular/common';
import { ModalBaseComponent } from '@coreComponents/modal-base/modal-base.component';
import { BackdropModalComponent } from '@coreComponents/modal-base/backdrop-modal/backdrop-modal.component';
import { ModalOptionsI } from '@coreComponents/modal-base/service/modalOptions';
import { ModalStylesI } from '@coreComponents/modal-base/service/modalStyles';
import { backDropStyleI } from '@coreComponents/modal-base/service/backDropStyle';
import { AlertOptionsI } from './alertOptions';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private modalRefContainer: { modal: ComponentRef<any>, backDrop: ComponentRef<any> }[] = [];
  private readonly environmentInjector = inject(EnvironmentInjector);
  private appRef = inject(ApplicationRef);
  private injector = inject(Injector);
  private DOC = inject(DOCUMENT);

  show(alertOptions: Partial<AlertOptionsI>, customDialogOptions: Partial<ModalOptionsI> = {}, customStyles: Partial<ModalStylesI> = {}, customStylesBackdrop: Partial<backDropStyleI> = {}) {
    const context = new ModalContext();
    const env: EnvironmentInjector = createEnvironmentInjector([{ provide: ModalContext, useValue: context }], this.environmentInjector);

    return new Promise<void | any>((resolve, reject) => {
      const modalBackdrop = createComponent(BackdropModalComponent, { environmentInjector: this.appRef.injector });
      const _body = createComponent(AlertComponent, { environmentInjector: env });
      _body.instance.options = { ..._body.instance.options, ...alertOptions }
      _body.changeDetectorRef.detectChanges();
      const modalBodyElements: Node[] = Array.from(_body.location.nativeElement.children);

      const modalContainer = createComponent(ModalBaseComponent, {
        elementInjector: this.injector,
        environmentInjector: this.appRef.injector,
        projectableNodes: [modalBodyElements]
      });

      if (customDialogOptions.disableAnimations) {
        modalContainer.instance.animationsDisabled = customDialogOptions.disableAnimations;
        modalBackdrop.instance.animationsDisabled = customDialogOptions.disableAnimations;
      }

      modalContainer.instance.modalOptions = { ...modalContainer.instance.modalOptions, ...customDialogOptions };
      modalContainer.instance.modalStyles = { ...modalContainer.instance.modalStyles, ...customStyles };
      modalBackdrop.instance.backdropStyles = { ...modalBackdrop.instance.backdropStyles, ...customStylesBackdrop }

      modalContainer.instance.closeModal = () => {
        this.closeModal(modalContainer, modalBackdrop);
        resolve(undefined);
      };

      modalContainer.instance.closeAllInstances = () => {
        this.closeAll();
      }

      context.close = (resolver?: string) => {
        this.closeModal(modalContainer, modalBackdrop);
        resolve(resolver);
      }

      context.closeAll = () => {
        this.closeAll();
      }

      this.appRef.attachView(modalContainer.hostView);
      this.appRef.attachView(modalBackdrop.hostView);

      this.DOC.body.appendChild(modalContainer.location.nativeElement);
      this.DOC.body.appendChild(modalBackdrop.location.nativeElement);
      this.modalRefContainer.push({ modal: modalContainer, backDrop: modalBackdrop });

      _body.changeDetectorRef.detectChanges();
      modalContainer.changeDetectorRef.detectChanges();
      modalBackdrop.changeDetectorRef.detectChanges();
    })

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
