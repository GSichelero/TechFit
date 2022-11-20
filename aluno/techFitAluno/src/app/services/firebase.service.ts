import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  public usuario;
  private usuarioSubject: BehaviorSubject<any|null>;
  
  constructor( private firebase: AngularFirestore, public auth: AngularFireAuth ) { 
    debugger

    this.auth.authState.subscribe( user => {
      if (user) {
        this.carregarUsuario(user.uid);
      } else {
        this.usuario = null;
        this.usuarioSubject. next(null);
      }
    })

  }

  
    public login(email, senha) {
      return this.auth.signInWithEmailAndPassword(email, senha);
    }

    public logout() {
      return this.auth.signOut();
    }

    public cadastrarUser(email, senha, nome, idade, sexo, peso, altura, tipo ='aluno') {
      debugger
    return this.auth.createUserWithEmailAndPassword(email, senha).then((userCredential)  => {
      this.firebase.collection('users')
        .doc(userCredential.user.uid)
        .set({
          email
          , senha
          , nome  
          , tipo
          , idade
          , sexo
          , peso
          , altura
        })

    });
  }   

  private async carregarUsuario(id) {
    const docRef = await this.firebase
      .collection('users')
      .doc(id)
      .get().toPromise();

    this.usuario = {id, ...docRef.data() as any};
    this.usuarioSubject.next(this.usuario);
    console.log(this.usuario);
  }
  
  
}
