import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

constructor( private firebase: AngularFirestore ) { }

public getTeste() {
  return this.firebase.collection( 'users' ).valueChanges();
}

}
