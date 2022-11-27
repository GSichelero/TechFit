import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlunosService } from './alunos.service';

@Injectable({
  providedIn: 'root'
})
export class AdministrativoService {

  constructor( private firebase:AngularFirestore, public auth: AngularFireAuth, public aluno: AlunosService ) { }


  public getAllPersonal() {
    return new Promise<any>((resolve)=> {
      this.firebase.collection('users', ref => ref.where('status','==',0))
        .valueChanges().subscribe(users => {
          resolve(users);
          console.log(users)
        })
      })
  }

  public aprovaPersonal(event){
    return this.firebase
    .collection('users')
    .doc(event.cadastro.id)
    .update({status: 1})

  }

  public reprovarPersonal(event) {
      return this.firebase
        .collection('users')
        .doc(event.cadastro.id)
        .delete();
  }

}
