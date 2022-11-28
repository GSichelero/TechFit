import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  public formulario: FormGroup;
  public segundoCadastro = false;
  public erroSenhaConf = false;

  public task: AngularFireUploadTask;
  public basePath = 'avatar/'; 
  public imgUrl;    

  constructor( public firebaseService: FirebaseService
    , public fb: FormBuilder
    , public router: Router
    , private afs:AngularFireStorage
    , private af: AngularFirestore 
    , public toastController: ToastController) {

    this.formulario = fb.group({
      id: [null],
      nome: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      email: ['',Validators.compose([Validators.required, Validators.email])],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      senhaConf: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      avatar: [''],
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
    if(this.formulario.invalid){
      return this.formulario.markAllAsTouched();
    }
    this.imgUrl ? this.formulario.value.avatar = this.imgUrl : this.formulario.value.avatar;
    try {
      await this.firebaseService.cadastrarUser(this.formulario.value).then(() =>
          this.router.navigateByUrl('/home')
      );
    }catch (e) {
      this.presentToast(e.message);
      console.log(e);
    }
    this.segundoCadastro = false;
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
    });
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      color: 'danger',
      duration: 3000
    });

    await toast.present();
  }

}

