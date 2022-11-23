import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  public usuario;
  private usuarioSubject: BehaviorSubject<any|null>;

constructor( private firebase: AngularFirestore, public auth: AngularFireAuth ) { 
  // this.auth.authState.subscribe( user => {
  //   if (user) {
  //     this.carregarUsuario(user.uid);
  //   } else {
  //     this.usuario = null;
  //     this.usuarioSubject. next(null);
  //   }
  // })
}



public login(email, senha) {
  return this.auth.signInWithEmailAndPassword(email, senha);
}

public logout() {
  debugger;
  return this.auth.signOut();
}

public cadastrarUser(email, senha, nome, foto, especializacao, idade, regiao, descricao, tipo) {
return this.auth.createUserWithEmailAndPassword(email, senha).then((userCredential)  => {
  this.firebase.collection('users')
    .doc(userCredential.user.uid)
    .set({
      email
      , senha
      , nome 
      , tipo
      , foto
      , especializacao
      , idade
      , regiao
      , descricao
    })

});
}   

// private async carregarUsuario(id) {
// const docRef = await this.firebase
//   .collection('users')
//   .doc(id)
//   .get().toPromise();

// this.usuario = {id, ...docRef.data() as any};
// this.usuarioSubject.next(this.usuario);
// console.log(this.usuario);
// }

public getUsuarioAutenticado() {
  this.usuarioSubject = new BehaviorSubject<any>(this.usuario);
  debugger
  return this.usuarioSubject
}

}
