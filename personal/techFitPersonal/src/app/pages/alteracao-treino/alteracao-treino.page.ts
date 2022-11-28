import { AjusteExerciciosModalComponent } from './../../modals/ajuste-exercicios-modal/ajuste-exercicios-modal.component';
import { Component, OnInit } from '@angular/core';
import { ItemReorderEventDetail, ModalController } from '@ionic/angular';
import { AlunosService } from 'src/app/services/alunos.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alteracao-treino',
  templateUrl: './alteracao-treino.page.html',
  styleUrls: ['./alteracao-treino.page.scss'],
})

export class AlteracaoTreinoPage implements OnInit {

  //TODO: Brendon Araújo - Mudar os dados de um json fixo para firebase;
  //TODO: Brendon Araújo - Verificar com professor por que não dá erro ao remover o valor do array.

  //inserindo no momento todas as indormações na exercicios e usando ela para inseri valores
  public infoAluno = this.routeActivate.snapshot.params;
  public exerciocios = [];
  public diaSelect;

  Treino = {id: "AIDSFNASDVNASD", nome: "Aeróbico XXX"}; 
  horasDiaSemana = 0;
  diaSemanaEscolhido;

  ExerciciosPadrao = [
    'Agachamento','Polichinelo','Barra Lateral','Amendoin', 'Levantamento de GARFO'
  ];
  
  ExerciciosSemana = [
    // {id: 'SDVNSFVDF', nome: 'Agachamento', semanaId: '', diaSemana: 0, horas: 0.30},
    // {id: 'adfadfas', nome: 'Polichinelo', semanaId: '', diaSemana: 0, horas: 0.05, repeticao: 10},
    // {id: 'sdnvasifvnaspfioF', nome: 'Barra', semanaId: '', diaSemana: 1, horas: 0.05, repeticao: 10},
    // {id: 'ndasmfvsad', nome: 'Martelo', semanaId: '', diaSemana: 2, horas: 0.05, repeticao: 10},
    // {id: '9ydvbasof', nome: 'Crucifixo', semanaId: '', diaSemana: 3, horas: 0.05, repeticao: 10},
    // {id: 'ndovfs', nome: 'Remada', semanaId: '', diaSemana: 4, horas: 0.05, repeticao: 10},
    // {id: 'ndpvif', nome: 'Corrida', semanaId: '', diaSemana: 5, horas: 0.05, repeticao: 10},
    // {id: 'sdvnspofk', nome: 'Luta livre', semanaId: '', diaSemana: 6, horas: 0.05, repeticao: 10},
    // {id: 'savff', nome: 'Levantamento de garfo', semanaId: '', diaSemana: 6, horas: 0.05, repeticao: 10},
  ];

  exerciciosFiltrados = [];
  constructor(private modalController: ModalController
    , public alunosService: AlunosService
    , private routeActivate: ActivatedRoute) { }

  ngOnInit() {
    //this.exerciciosFiltrados = this.ExerciciosSemana.filter(es => es.diaSemana == 0);
    this.filtraListagemExercicoSemana(0);
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    this.exerciciosFiltrados = ev.detail.complete(this.exerciciosFiltrados);
  }

  public filtraListagemExercicoSemana(diaSemana){
    this.exerciciosFiltrados = this.ExerciciosSemana.filter(es => es.diaSemana == diaSemana);
    this.diaSelect = diaSemana;
    this.horasDiaSemana = this.exerciciosFiltrados.reduce((soma, semana) => {
      return soma + semana.horas;
    }, 0);
  }

  public adicionaExercicio(Exercicio){
    this.abrirModal(Exercicio);
  }

  public retiraExercicio(index){
    this.exerciciosFiltrados.splice(index,1);
  }

  private async abrirModal(Exercicio){
    let modal = await this.modalController.create({
      component: AjusteExerciciosModalComponent,
      initialBreakpoint : 0.25,
      breakpoints: [0,0.25,0.75],
      componentProps:{"exercico": Exercicio} 
    });
    await modal.present();

    modal.onWillDismiss().then( result => {
      if (result.role == 'confirm') {
        this.exerciciosFiltrados.push(result.data);
        result.data.diaSemana = this.diaSelect;
        this.exerciocios.push(result.data)
      }
    });
  }

  cadastraTreino(){
    const segunda = this.exerciocios.filter(es => es.diaSemana == 0);
    const terca = this.exerciocios.filter(es => es.diaSemana == 2);
    const quarta = this.exerciocios.filter(es => es.diaSemana == 3);
    const quinta = this.exerciocios.filter(es => es.diaSemana == 4);
    const sexta = this.exerciocios.filter(es => es.diaSemana == 5);
    const sabado = this.exerciocios.filter(es => es.diaSemana == 6);
    const domingo = this.exerciocios.filter(es => es.diaSemana == 7);

    const exerciosSemana = {segunda, terca, quarta, quinta, sexta, sabado, domingo}
    debugger
    this.alunosService.cadastraTreino(this.infoAluno.id, exerciosSemana)
    console.log(this.exerciocios)
    
  }
}