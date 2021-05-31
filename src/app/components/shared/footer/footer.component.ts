import { Component } from '@angular/core';

@Component({
  selector : 'app-footer',
  templateUrl : './footer.component.html'
})
export class FooterComponent {
  actualYear : number;
  constructor() {
    this.actualYear = new Date().getFullYear();
  }
}