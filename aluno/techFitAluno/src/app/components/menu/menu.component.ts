import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { FirebaseService } from 'src/app/services/firebase.service';
import { PersonalService } from 'src/app/services/personal.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  public user;
  Pages = [
    { title: 'Home', url: '/home' },
    { title: 'Personais', url: '/pages/listagem-personal' }
  ];

  constructor( private personalService: PersonalService
    , public firebaseService: FirebaseService) { 
      this.personalService.getUsuarioAutenticado().pipe(filter(usuario => usuario != undefined)).subscribe(usuario => {
        this.user = usuario;
      })
    }

  ngOnInit() {}

  public logout(){
    this.firebaseService.logout();
  }

}
