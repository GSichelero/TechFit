import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Personal } from './personal';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  public segundoCadastro = fal]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]
  public cadastro: Personal = {
    email: null
    , senha: null
    , nome: null  
    , tipo: null
    , foto: null
    , especializacao: null
    , idade: null
    , regiao: null
    , descricao: null
  };

  constructor( public firebaseService: FirebaseService 
    , public router: Router) { 
    this.firebaseService.getUsuarioAutenticado().subscribe(resp => {
      console.log(resp);
    });
  }

  ngOnInit() {
  }

  async cadastrar(cadastro) {
    this.verificaCadastro();
    cadastro.tipo = 'personal';
    await this.firebaseService.cadastrarUser(cadastro.email, cadastro.senha, cadastro.nome, cadastro.foto, cadastro.especializacao, cadastro.idade, cadastro.regiao, cadastro.descricao, cadastro.tipo);
    this.segundoCadastro = true;
    this.router.navigateByUrl('home');
  }

  public verificaCadastro() {
    // verifica o formulario
  }

}
