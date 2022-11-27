import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  public usuario;
  private usuarioSubject: BehaviorSubject<any|null>;

  public userData: any;
  
  constructor( private firebase: AngularFirestore
    , public auth: AngularFireAuth
    , public router: Router ) { 

    this.auth.authState.subscribe( user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    })

  }

  
    public login(email, senha) {
      return this.auth.signInWithEmailAndPassword(email, senha);
    }

    public logout() {
      return this.auth.signOut().then(()=> this.router.navigate(['login']));
    }

    public cadastrarUser(cadastro) {
    return this.auth.createUserWithEmailAndPassword(cadastro.email, cadastro.senha).then((userCredential)  => {
      cadastro.id = userCredential.user.uid
      this.firebase.collection('users')
        .doc(userCredential.user.uid)
        .set({
          cadastro
        })

        
    });
  }   
  
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== 'null' ? true : false;
  }
  
}
