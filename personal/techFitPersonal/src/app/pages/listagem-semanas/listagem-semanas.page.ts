import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunosService } from 'src/app/services/alunos.service';

@Component({
  selector: 'app-listagem-semanas',
  templateUrl: './listagem-semanas.page.html',
  styleUrls: ['./listagem-semanas.page.scss'],
})
export class ListagemSemanasPage implements OnInit {

  public aluno = this.routeActivate.snapshot.params;

  Semanas = [
    {id: "AKOPDADFNSDFON", nome: "SEMANA 01"},
    {id: "ASDFNAODNFAOSD", nome: "SEMANA 02"},
    {id: "FADFNADSPFNSDF", nome: "SEMANA 03"},
  ];
  constructor(private route: Router, private routeActivate: ActivatedRoute
    , private alunoService: AlunosService) { 
    console.log(this.aluno)

    // this.alunoService.getById(this.aluno.id).then((aluno)=>{
    //   this.aluno = aluno
    // })
  }

  ngOnInit() {
  }

  public alteraTreino(semana) {
      const infoTreino = {id:this.aluno.id, semana: semana}
        this.route.navigate(['/alteracao/treino', infoTreino])
  }
}
