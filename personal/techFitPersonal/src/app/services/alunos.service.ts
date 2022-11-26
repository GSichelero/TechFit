import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AlunosService {

  private usuario;
  private usuarioSubject: BehaviorSubject<any|null>;

  constructor( private firebase:AngularFirestore, public auth: AngularFireAuth  ) { 

    this.auth.authState.subscribe( user => {
      if (user) {
        this.getUsuarioLogado(user.uid);
      } else {
        this.usuario = null;
        this.usuarioSubject. next(null);
      }
    })

  }

  public getUsuarioAutenticado() {
    this.usuarioSubject = new BehaviorSubject<any>(this.usuario);
    return this.usuarioSubject
  }

  public async getUsuarioLogado(id) {
    const docRef = await this.firebase
      .collection('users')
      .doc(id)
      .get().toPromise();

      this.usuario = {id, ...docRef.data() as any};
      this.usuarioSubject.next(this.usuario);
      console.log(this.usuario);
  }

  // pega todos os usuarios do tipo personal
  public getAlunosVinculados() {
    return new Promise<any>((resolve)=> {
       this.firebase.collection('users')
          .doc(this.usuario.id)
          .collection('alunos')
          .valueChanges().subscribe(users => {
          resolve(users);
          console.log(users);
        })
      })
        // .valueChanges();

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
