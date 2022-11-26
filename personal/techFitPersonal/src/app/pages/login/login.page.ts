import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private firebaseService: FirebaseService 
    , private router: Router) { }

  ngOnInit() {
  }

  public async login(email, senha) {
    try {
      await this.firebaseService.login(email, senha);
      this.router.navigateByUrl('home');
    }catch (e) {
      console.log(e);
    }
  }

}
