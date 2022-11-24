import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'my-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  user = {
    name: 'Brendon Araújo',
    age: 21,
    email: 'brendong.araujo@gmail.com'
  }

  Pages = [
    { title: 'Home', url: '/home' },
    { title: 'Listagem Semanas', url: '/listagem/semanas' },
    { title: 'Alteração Treino', url: '/alteracao/treino'}
  ];
  constructor(private route: Router) { 
  }
  nextpage(url) {
    this.route.navigate([url]);
  }

  ngOnInit() {}

}