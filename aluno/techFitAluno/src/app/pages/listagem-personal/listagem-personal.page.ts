import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { PersonalService } from 'src/app/services/personal.service';

@Component({
  selector: 'app-listagem-personal',
  templateUrl: './listagem-personal.page.html',
  styleUrls: ['./listagem-personal.page.scss'],
})
export class ListagemPersonalPage implements OnInit {

  public personais;

  constructor(public firebaseService: FirebaseService
    , public personalService: PersonalService
    , private router: Router) { 

      this.personalService.getAllPersonal().then((personais)=>{
        this.personais = personais;
      })
    }

  ngOnInit() {
  }

  public navega(p) {
    const PersonalInfo = {id:p.cadastro.id, nome: p.cadastro.nome}
    this.router.navigate(['/listagem-personal/tela-personal', PersonalInfo])
  }

}
