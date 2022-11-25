import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  public usuario;
  public userData: any;
  private usuarioSubject: BehaviorSubject<any|null>;

constructor( private firebase: AngularFirestore, public auth: AngularFireAuth ) { 
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
  return this.auth.signOut();
}

public cadastrarUser(cadastro) {
return this.auth.createUserWithEmailAndPassword(cadastro.email, cadastro.senha).then((userCredential)  => {
  this.firebase.collection('users')
    .doc(userCredential.user.uid)
    .set({
      cadastro
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

get isLoggedIn(): boolean {
  debugger
  const user = JSON.parse(localStorage.getItem('user')!);
  return user !== null ? true : false;
}

}
