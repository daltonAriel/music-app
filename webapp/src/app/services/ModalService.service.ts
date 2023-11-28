import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modalStatus: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private modalSize: 'small' | 'large' | 'extraLarge' | 'fullScreen' = 'large';

  constructor() {
    
  }

  public getModalStatus() : Observable<boolean> {
    return this.modalStatus.asObservable();
  }

  openModal(options?: { size?: 'small' | 'large' | 'extraLarge' | 'fullScreen' }){
    if(options?.size){
      this.modalSize = options?.size;
    }
    this.modalStatus.next(true);
  }

  closeModal(){
    this.modalStatus.next(false);
  }

  getModalSize(): 'small' | 'large' | 'extraLarge' | 'fullScreen' {
    return this.modalSize;
  }

}