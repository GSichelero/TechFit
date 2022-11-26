import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlunosService } from 'src/app/services/alunos.service';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public usuario;

  constructor( public firebaseService: FirebaseService 
    , public router: Router
    , private alunosService: AlunosService ) {}

  ngOnInit() {
    // this.firebaseService.getUsuarioAutenticado().subscribe(usuario => {
    //   debugger
    //   console.log(usuario);
    //   this.usuario = usuario;
    //   if(usuario == null) {
    //     this.router.navigateByUrl('login')
    //   }
    // });
  }


  public teste() {
    this.alunosService.getAlunosVinculados();
  }

  public teste2() {
    
  }





}
