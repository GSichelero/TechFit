import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  task: AngularFireUploadTask;
  public imgUrl;    
  public formulario: FormGroup;
  public segundoCadastro = false;
  public erroSenhaConf = false;
  public basePath = 'avatar/'; 

  public especializacoes = [
    'musculação','Dança','Corrida', 'Triaton','Fitness',
    'Artes marciais','Reabilitação musculoesqueletica', 'Esportes coletivos', 'Pilates', 'Yoga', 'Treinamento funcional'

  ]

  constructor( public firebaseService: FirebaseService
    , public fb: FormBuilder
    , public router: Router
    , private afs:AngularFireStorage
    , private af: AngularFirestore) { 
    this.formulario = fb.group({
      id: [null],
      nome: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      email: ['',Validators.compose([Validators.required, Validators.email])],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      senhaConf: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      avatar: [null],
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
    debugger
    this.formulario.value.avatar = this.imgUrl;
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


  async processaArquivo(evento)
  {
    const file = evento.target.files[0];
    const filePath = `${this.basePath}/${file.name}`;
    this.task =  this.afs.upload(filePath, file);  
    (await this.task).ref.getDownloadURL().then(url => {
      this.imgUrl = url;
      console.log(url); 
    });

    // const file = evento.target.files[0];
    // const ref = this.afs.ref('avatar/' + this.af.createId());
    // ref.put(file);

    // this.formulario.value.avatar = ref.getDownloadURL();
    // console.log(this.formulario.value.avatar)
  }


}
