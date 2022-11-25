import { FirebaseService } from 'src/app/services/firebase.service';
import { Component } from '@angular/core';
import { MenuComponent } from './components/menu/menu.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  isMostarMenu: boolean = true;

  constructor(private firebase: FirebaseService) {
    //this.isMostarMenu = firebase.isUsuarioLogado();

  }
}
