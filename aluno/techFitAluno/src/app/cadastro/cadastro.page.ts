import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Aluno } from './aluno';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  public segundoCadastro = false;

  public cadastro: Aluno = {
    email: null
    , senha: null
    , nome: null  
    , tipo: null
    , idade: null
    , sexo: null
    , peso: null
    , altura: null
  };

  constructor( public firebaseService: FirebaseService ) { }

  ngOnInit() {
  }


  async cadastrar(cadastro) {
    debugger

    this.verificaCadastro();

    await this.firebaseService.cadastrarUser(cadastro.email, cadastro.senha, cadastro.nome, cadastro.idade, cadastro.sexo, cadastro.peso, cadastro.altura, cadastro.tipo);
    this.segundoCadastro = true;
    //this.router.navigateByUrl('home');
  }

  public verificaCadastro() {
    // verifica o formulario
  }


}
