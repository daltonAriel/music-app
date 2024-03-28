import { ComponentRef, Injectable, Injector, Type, inject, createEnvironmentInjector, EnvironmentInjector, createComponent, ApplicationRef, TemplateRef, EmbeddedViewRef } from '@angular/core';
import { ModalBaseComponent } from "../modal-base.component";
import { ModalOptionsI } from "./modalOptions";
import { ModalContext } from './ModalContext';
import { BackdropModalComponent } from '../backdrop-modal/backdrop-modal.component';
import { DOCUMENT } from '@angular/common';
import { ModalStylesI } from './modalStyles';
import { backDropStyleI } from './backDropStyle';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modalRefContainer: { modal: ComponentRef<any>, backDrop: ComponentRef<any> }[] = [];
  private readonly environmentInjector = inject(EnvironmentInjector);
  private appRef = inject(ApplicationRef);
  private injector = inject(Injector);
  private DOC = inject(DOCUMENT);


  openModal(content: Type<any> | TemplateRef<any>, customOptions: Partial<ModalOptionsI> = {}, customStyles: Partial<ModalStylesI> = {}, customStylesBackdrop: Partial<backDropStyleI> = {}) {

    const context = new ModalContext();
    const env: EnvironmentInjector = createEnvironmentInjector([{ provide: ModalContext, useValue: context }], this.environmentInjector);
    
    return new Promise<void | any>((resolve, reject) => {

      const modalBackdrop = createComponent(BackdropModalComponent, {  environmentInjector: this.appRef.injector });
      const modalBodyElements: Node[] | EmbeddedViewRef<any> = this.createBody(content, env, context);

      const modalContainer = createComponent(ModalBaseComponent, {
        elementInjector: this.injector,
        environmentInjector: this.appRef.injector,
        projectableNodes: [modalBodyElements]
      });

      if (customOptions.disableAnimations) {
        modalContainer.instance.animationsDisabled = customOptions.disableAnimations;
        modalBackdrop.instance.animationsDisabled = customOptions.disableAnimations;
      }

      modalContainer.instance.modalOptions = { ...modalContainer.instance.modalOptions, ...customOptions };
      modalContainer.instance.modalStyles = { ...modalContainer.instance.modalStyles, ...customStyles };
      modalBackdrop.instance.backdropStyles = {...modalBackdrop.instance.backdropStyles, ...customStylesBackdrop}
      

      this.appRef.attachView(modalContainer.hostView);
      this.appRef.attachView(modalBackdrop.hostView);

      modalContainer.instance.closeModal = () => {
        this.closeModal(modalContainer, modalBackdrop);
        resolve(undefined);
      };

      modalContainer.instance.closeAllInstances = () => {
        this.closeAll();
      }

      context.close = (resolver?:string) => {
        this.closeModal(modalContainer, modalBackdrop);
        resolve(resolver);
      }

      context.closeAll = () => {
        this.closeAll();
      }

      this.DOC.body.appendChild(modalContainer.location.nativeElement);
      this.DOC.body.appendChild(modalBackdrop.location.nativeElement);
      this.modalRefContainer.push({ modal: modalContainer, backDrop: modalBackdrop });
      modalContainer.changeDetectorRef.detectChanges();
    });
  }

  private createBody(content: Type<any> | TemplateRef<any>, env: EnvironmentInjector, modalContext: ModalContext) {
    if (content instanceof (Type)) {
      const _body = createComponent(content, { environmentInjector: env });
      _body.changeDetectorRef.detectChanges();
      const modalBodyElements: Node[] = Array.from(_body.location.nativeElement.children);
      return modalBodyElements;
    } else {
      const context = {
        $implicit: modalContext
      }
      const _body = content.createEmbeddedView(context, this.injector);
      _body.detectChanges();
      const modalBodyElements: Node[] = _body.rootNodes;
      return modalBodyElements;
    }
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
