import { FirebaseService } from 'src/app/services/firebase.service';
import { Component } from '@angular/core';
import { AlunosService } from './services/alunos.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  isMostarMenu: boolean = false;

  constructor(private firebase: AlunosService, public router:Router) {
    this.firebase.getUsuarioAutenticado().subscribe((usuario) =>{
      if(usuario == null || usuario == undefined) {
        this.isMostarMenu = false;
      } else {
        this.isMostarMenu = true;
      }
    });
  }

}
