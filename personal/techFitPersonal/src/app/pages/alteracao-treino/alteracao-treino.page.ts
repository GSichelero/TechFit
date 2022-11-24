import { Component, OnInit } from '@angular/core';
import { ItemReorderEventDetail } from '@ionic/angular';

@Component({
  selector: 'app-alteracao-treino',
  templateUrl: './alteracao-treino.page.html',
  styleUrls: ['./alteracao-treino.page.scss'],
})

export class AlteracaoTreinoPage implements OnInit {

  Treino = {id: "AIDSFNASDVNASD", nome: "Aeróbico XXX"}; 
  horasDiaSemana = 0;
  diaSemanaEscolhido;

  ExerciciosPadrao = [
    {id: 'SDVNSFVDF', nome: 'Agachamento'},
    {id: 'SDVNSFVDF', nome: 'Polichinelo'},
    {id: 'SDVNSFVDF', nome: 'Barra Lateral'},
    {id: 'SDVNSFVDF', nome: 'Amendoin'},
    {id: 'SDVNSFVDF', nome: 'Levantamento de GARFO'}
  ];
  
  ExerciciosSemana = [
    {id: 'SDVNSFVDF', nome: 'Agachamento', semanaId: '', diaSemana: 0, horas: 0.30},
    {id: 'adfadfas', nome: 'Polichinelo', semanaId: '', diaSemana: 0, horas: 0.05, repeticao: 10},
    {id: 'sdnvasifvnaspfioF', nome: 'Barra', semanaId: '', diaSemana: 1, horas: 0.05, repeticao: 10},
    {id: 'ndasmfvsad', nome: 'Martelo', semanaId: '', diaSemana: 2, horas: 0.05, repeticao: 10},
    {id: '9ydvbasof', nome: 'Crucifixo', semanaId: '', diaSemana: 3, horas: 0.05, repeticao: 10},
    {id: 'ndovfs', nome: 'Remada', semanaId: '', diaSemana: 4, horas: 0.05, repeticao: 10},
    {id: 'ndpvif', nome: 'Corrida', semanaId: '', diaSemana: 5, horas: 0.05, repeticao: 10},
    {id: 'sdvnspofk', nome: 'Luta livre', semanaId: '', diaSemana: 6, horas: 0.05, repeticao: 10},
    {id: 'savff', nome: 'Levantamento de garfo', semanaId: '', diaSemana: 6, horas: 0.05, repeticao: 10},
  ];

  exerciciosFiltrados = [];
  constructor() { }

  ngOnInit() {
    //this.exerciciosFiltrados = this.ExerciciosSemana.filter(es => es.diaSemana == 0);
    this.filtraListagemExercicoSemana(0);
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    this.exerciciosFiltrados = ev.detail.complete(this.exerciciosFiltrados);
  }

  filtraListagemExercicoSemana(diaSemana){
    this.exerciciosFiltrados = this.ExerciciosSemana.filter(es => es.diaSemana == diaSemana);
    this.horasDiaSemana = this.exerciciosFiltrados.reduce((soma, semana) => {
      return soma + semana.horas;
    }, 0);
  }

  adicionaExercicio(Exercicio){
    this.exerciciosFiltrados.push({nome: Exercicio.nome, diaSemana: 0});
  }

  retiraExercicio(Exercico){
    console.log(Exercico);
    this.exerciciosFiltrados.forEach((element,index)=>{
      if(element.id == Exercico.id) delete this.exerciciosFiltrados[index];
    });

  }

}
