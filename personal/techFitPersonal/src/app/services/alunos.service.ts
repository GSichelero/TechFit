import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { resolve } from 'dns';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AlunosService {

  private usuario;
  private usuarioSubject: BehaviorSubject<any|null>;
  public userData: any;

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
    console.log(this.usuarioSubject)
    return this.usuarioSubject
  }

  public async getUsuarioLogado(id) {
    const docRef = await this.firebase
      .collection('users')
      .doc(id)
      .get().toPromise();

      this.usuario = {id, ...docRef.data() as any};
      this.usuarioSubject.next(this.usuario);
  }

  // pega todos os usuarios do tipo personal
  public getAlunosVinculados(id) {
    return this.firebase.collection('users')
    .doc(id)
    .collection('alunos')
    .snapshotChanges()
    .pipe(map(actions => actions.map(a => {
      const id = a.payload.doc.id;
      const dado:any = a.payload.doc.data();
      return {id,...dado};
    })));
  }

  public getById(id) {
    return new Promise<any>((resolve)=> {
      this.firebase.collection('users', ref => ref.where('cadastro.id','==',id))
        .valueChanges().subscribe(users => {
          resolve(users);
      })
    })
  }


  public getAllPedidos(id) {
    return this.firebase.collection('users')
      .doc(id)
      .collection('pedidos')
      .snapshotChanges()
      .pipe(map(actions => actions.map(a => {
        const id = a.payload.doc.id;
        const dado:any = a.payload.doc.data();
        return {id,...dado};
      })));
  }

  public vincularAluno(id, pedido){
    return this.firebase
    .collection('users')
    .doc(id)
    .collection('alunos')
    .add({
      pedido
    })
  }

  public descartarPedido(id, pedido){
    return this.firebase
      .collection('users')
      .doc(id)
      .collection('pedidos')
      .doc(pedido.id)
      .delete();
  }

  public cadastraTreino(id, treino){
    return this.firebase
    .collection('users')
    .doc(id)
    .collection('treinos')
    .add({
      treino
    })
  }

  public obtemTreino(id){
    return this.firebase
    .collection('users')
    .doc(id)
    .collection('treinos')
    .snapshotChanges()
    .pipe(
        map(treinos => 
          treinos.map(a => {
            const id = a.payload.doc.id;
            const dado:any = a.payload.doc.data();
            return {id,...dado};
          }
          )
        )
      );
  }

}
