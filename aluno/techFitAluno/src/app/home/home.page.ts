import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor( public firebaseService: FirebaseService, public router: Router ) {}


  public logOut(){
    this.firebaseService.logout()
    this.router.navigate(['login']);
  }

}
