import { ComponentRef, Injectable, Injector, Type, ViewContainerRef, inject, createEnvironmentInjector, EnvironmentInjector } from '@angular/core';
import { ModalBaseComponent } from "../components/modal-base/modal-base.component";
import { ModalOptionsI } from "@interfaces/modalOptions";
import { ModalContext } from './ModalContext';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private componentRefs: ComponentRef<ModalBaseComponent>[] = [];
  private readonly environmentInjector = inject(EnvironmentInjector);
  private viewContainerRef = inject(ViewContainerRef);
  private injector = inject(Injector);


  openModal(content: Type<any>, customOptions: Partial<ModalOptionsI> = {}) {

    const context = new ModalContext();
    const env: EnvironmentInjector = createEnvironmentInjector([{ provide: ModalContext, useValue: context }], this.environmentInjector);

    const defaultOptions: ModalOptionsI = {
      size: 'md',
      scrollable: false,
      position: 'center',
      static: false,
    };

    const modalOptions: ModalOptionsI = { ...defaultOptions, ...customOptions };

    return new Promise((resolve, reject): void => {
      const modalBody = this.viewContainerRef.createComponent(content, { injector: this.injector, environmentInjector: env });
      const childElementsArray:any = Array.from(modalBody.location.nativeElement.children);

      const modalContainer = this.viewContainerRef.createComponent(ModalBaseComponent, {
        injector: this.injector, 
        projectableNodes: [childElementsArray]
      });


      modalContainer.instance.modalOptions = modalOptions;
      modalContainer.instance.closeModal = () => {
        this.closeModal(modalContainer);
        resolve(()=>{});
      };
      
      context.close = () => {
        modalContainer.instance.close()
      }

    });

  }


  getAllInstances(){
    return this.componentRefs.map((ref)=>{
      return ref.hostView;
    });
  
  }


  private closeModal(modal: ComponentRef<any>) {
    let index = this.componentRefs.lastIndexOf(modal);
    this.componentRefs.splice(index, 1);
    modal.destroy();
  }


}
