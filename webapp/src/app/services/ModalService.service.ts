import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private modalStatus: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private modalSize: 'small' | 'large' | 'extraLarge' | 'fullScreen' = 'large';
  private scrollableContent: boolean = false;
  private height: 'full' | 'auto' = 'auto';
  private position: 'top' | 'center' = 'center';

  constructor() {

  }

  public getModalStatus(): Observable<boolean> {
    return this.modalStatus.asObservable();
  }

  openModal(options?: { size?: 'small' | 'large' | 'extraLarge' | 'fullScreen', scrollable?: boolean, height?: 'full' | 'auto', position?: 'top' | 'center' }) {
    
    this.modalSize = options?.size ?? this.modalSize;
    this.scrollableContent = options?.scrollable ?? this.scrollableContent;
    
    this.modalStatus.next(true);
  }

  closeModal() {
    this.modalStatus.next(false);
  }

  getModalSize(): 'small' | 'large' | 'extraLarge' | 'fullScreen' {
    return this.modalSize;
  }

  getScrollableContent(): boolean {
    return this.scrollableContent;
  }

  getHeight(): 'full' | 'auto' {
    return this.height;
  }

  getPosition(): 'top' | 'center' {
    return this.position;
  }

}
