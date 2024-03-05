import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { backDropStyleI } from '../service/backDropStyle';

@Component({
  selector: 'app-backdrop-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './backdrop-modal.component.html',
  styleUrls: ['./backdrop-modal.component.scss'],
  animations:[
    trigger('backdropAnimation', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate("550ms ease-in-out", style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate("550ms ease-in-out", style({opacity: 0 }))
      ])
    ])
  ],
})
export class BackdropModalComponent {
  @HostBinding('@backdropAnimation') backdropAnimation  = true;
  @HostBinding('@.disabled') public animationsDisabled = false;

  public backdropStyles: backDropStyleI = {
    background: 'bg-black',
    opacity: 'bg-opacity-50'
  }

}
