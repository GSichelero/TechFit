import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Aluno } from './aluno';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  public formulario: FormGroup;
  public segundoCadastro = false;

  public erroSenhaConf = false;

  constructor( public firebaseService: FirebaseService, public fb: FormBuilder, public router: Router ) {

    this.formulario = fb.group({
      nome: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      email: ['',Validators.compose([Validators.required, Validators.email])],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      senhaConf: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      idade: [''],
      sexo: ['',Validators.required],
      peso: ['',Validators.required],
      altura: ['',Validators.required],
      tipo: ['aluno']
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

