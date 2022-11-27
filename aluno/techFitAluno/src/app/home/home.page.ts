import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { PersonalService } from '../services/personal.service';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public user;
  
  constructor( public firebaseService: FirebaseService
    , public PersonalService: PersonalService
    , public router: Router ) {

    this.PersonalService.getUsuarioAutenticado().pipe(filter(usuario => usuario != undefined)).subscribe(usuario => {
      this.user = usuario;
    })

    this.PersonalService.getAllPersonal();
  }

  public async teste(){
    const personas = await this.PersonalService.getAllPersonal();
  }
  public async teste2(){
    const personas = await this.PersonalService.getPersonalById('SHgHs5uquUUpETseMksscf7sGcL2');
  }

  public logOut(){
    this.firebaseService.logout()
    this.router.navigate(['login']);
  }

}
