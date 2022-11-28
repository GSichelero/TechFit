import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor( private firebaseService: FirebaseService 
    , private router: Router
    , public toastController: ToastController) { }

  ngOnInit() {
  }

  public async login(email, senha) {
    try {
      await this.firebaseService.login(email, senha);
      this.router.navigateByUrl('home');
    }catch (e) {
      this.presentToast(e.message)
      console.log(e);
    }
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      color: 'danger',
      duration: 3000
    });

    await toast.present();
  }

}
