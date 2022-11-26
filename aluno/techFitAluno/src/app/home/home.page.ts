import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { PersonalService } from '../services/personal.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor( public firebaseService: FirebaseService
    , public PersonalService: PersonalService
    , public router: Router ) {

    this.PersonalService.getAllPersonal();
  }

  public async teste(){
    const personas = await this.PersonalService.getAllPersonal();
    console.log(personas);

  }
  public async teste2(){
    const personas = await this.PersonalService.getPersonalById('SHgHs5uquUUpETseMksscf7sGcL2');
    console.log(personas);

  }

  public logOut(){
    this.firebaseService.logout()
    this.router.navigate(['login']);
  }

}
