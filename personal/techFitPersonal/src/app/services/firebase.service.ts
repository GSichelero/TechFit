import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AlunosService } from './alunos.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  public usuario;
  public userData: any;

constructor( private firebase: AngularFirestore
  , public auth: AngularFireAuth
  , public aluno: AlunosService
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
    return this.auth.signInWithEmailAndPassword(email, senha)
    .then((user)=>{
      this.auth.authState.subscribe( user => {
        if(user){
          this.aluno.getById(user.uid).then((id) => {
            if(id[0].status == 0)  return this.logout()
          });
        }

      })
    });
}

  public logout() {
    return this.auth.signOut().then(()=> this.router.navigate(['login']));
  }

  public cadastrarUser(cadastro) {
    return this.auth.createUserWithEmailAndPassword(cadastro.email, cadastro.senha).then((userCredential)  => {
      cadastro.id = userCredential.user.uid;
      this.firebase.collection('users')
        .doc(userCredential.user.uid)
        .set({
          status: 0,
          cadastro
        })
    });
  }   

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null ? true : false;
  }

  }
