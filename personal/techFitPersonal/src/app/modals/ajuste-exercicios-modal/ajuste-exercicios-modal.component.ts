import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-ajuste-exercicios-modal',
  templateUrl: './ajuste-exercicios-modal.component.html',
  styleUrls: ['./ajuste-exercicios-modal.component.scss'],
})
export class AjusteExerciciosModalComponent implements OnInit {

  Exercicio = {id: '', nome: '', semanaId: '', diaSemana: 0, horas: "00:00", repeticao:0};
  
  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    this.Exercicio.nome = this.navParams.data.exercico.nome;
    this.Exercicio.diaSemana = this.navParams.data.exercico.diaSemana;
  }

  public cancel() {
    this.modalController.dismiss(null,'cancel');
  }

  public confirm(descanso, repeticao) {
    this.Exercicio.horas = descanso;
    this.Exercicio.repeticao = repeticao;
    this.modalController.dismiss(this.Exercicio, 'confirm');
  }

}
