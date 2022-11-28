import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { constants } from 'buffer';
import { AlunosService } from 'src/app/services/alunos.service';

@Component({
  selector: 'app-listagem-treinos',
  templateUrl: './listagem-treinos.page.html',
  styleUrls: ['./listagem-treinos.page.scss'],
})
export class ListagemTreinosPage implements OnInit {

  Aluno = this.routeActivate.snapshot.params;
  TreinoNovo;
  Treinos: [];

  constructor(
     private alunosService: AlunosService
    ,private routeActivate: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.Aluno)
    this.alunosService.obtemTreino(this.Aluno.id).subscribe(treino => console.log(treino));
  }

}
