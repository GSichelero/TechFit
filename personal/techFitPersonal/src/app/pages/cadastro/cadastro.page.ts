import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Personal } from './personal';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  public formulario: FormGroup;
  public segundoCadastro = false;
  public erroSenhaConf = false;

  public especializacoes = [
    'musculação','Dança','Corrida', 'Triaton','Fitness',
    'Artes marciais','Reabilitação musculoesqueletica', 'Esportes coletivos', 'Pilates', 'Yoga', 'Treinamento funcional'

  ]

  constructor( public firebaseService: FirebaseService, public fb: FormBuilder, public router: Router) { 
    this.formulario = fb.group({
      id: [null],
      nome: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      email: ['',Validators.compose([Validators.required, Validators.email])],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      senhaConf: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      //foto: [''],
      especializacao: ['',Validators.required],
      idade: ['',Validators.required],
      regiao: ['',Validators.required],
      descricao: [''],
      tipo: ['personal']
    });
  }

  ngOnInit() {
  }

  async cadastrar() {
    await this.firebaseService.cadastrarUser(this.formulario.value).then(() =>
        this.router.navigateByUrl('/home')
    );
  }

  public verificaCadastro(evento) {
      if (evento.senha != evento.senhaConf) {
          this.erroSenhaConf = true;
          this.formulario.markAllAsTouched();
      } else {
        this.erroSenhaConf = false;
        this.segundoCadastro = true
      }
  }

}
