import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class PersonalService {
   

  public userData: any;

  constructor( private firebase:AngularFirestore, public auth: AngularFireAuth ) { 

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

// pega todos os usuarios do tipo personal
  public getAllPersonal() {
    return new Promise<any>((resolve)=> {
      this.firebase.collection('users', ref => ref.where('cadastro.tipo','==','personal'))
        .valueChanges().subscribe(users => {
          resolve(users);
        })
      })
  }

  public getPersonalById(id) {
    return new Promise<any>((resolve)=> {
      this.firebase.collection('users', ref => ref.where('cadastro.id','==',id))
        .valueChanges().subscribe(users => {
          resolve(users);
        })
      })
  }

}
