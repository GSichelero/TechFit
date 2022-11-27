import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AlunosService } from 'src/app/services/alunos.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'my-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  public user;

  Pages = [
    { title: 'Home', url: '/home' },
    { title: 'Listagem Semanas', url: '/listagem/semanas' },
    { title: 'Alteração Treino', url: '/alteracao/treino'},
    { title: 'Pedidos', url: '/pedidos'}
  ];
  constructor( private route: Router
    , private alunosService: AlunosService
    , public firebaseService: FirebaseService
    , public router: Router ) { 

    this.alunosService.getUsuarioAutenticado().pipe(filter(usuario => usuario != undefined)).subscribe(usuario => {
      this.user = usuario;
    })
  }
  nextpage(url) {
    this.route.navigate([url]);
  }

  ngOnInit() {
  }

  public logout(){
    this.firebaseService.logout();
  }

}