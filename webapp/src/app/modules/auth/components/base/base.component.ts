import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { AfterContentInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ChildrenOutletContexts, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  animations: [
    trigger('routerTransition', [
      transition('* <=> *', [
        query(':enter', style({ position: 'fixed', width: '100%', height:'100px' }), { optional: true }),
        group([
          query(':enter', [
            style({ transform: 'translateX(100%)' }),
            animate('0.2s ease-in-out', style({ transform: 'translateX(0%)', height:'10px'})),
          ], { optional: true })
        ]),
      ]),
    ]),
  ],
})
export class BaseComponent {

  constructor(private childRouter: ChildrenOutletContexts){}

  getRoute() {
    return this.childRouter.getContext('primary')?.route?.snapshot?.data;
  }


}
