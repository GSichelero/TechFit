import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class TreinosService {

  constructor(private firebase:AngularFirestore) { }


  public adicionarNota(id, usuario, treino) {
    debugger
    return this.firebase
      .collection('users')
      .doc(id)
      .collection('pedidos')
      .add({
        usuario,
        treino
      })
  }

}
