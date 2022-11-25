import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ajuste-exercicios-modal',
  templateUrl: './ajuste-exercicios-modal.component.html',
  styleUrls: ['./ajuste-exercicios-modal.component.scss'],
})
export class AjusteExerciciosModalComponent implements OnInit {

  constructor(private modalController: ModalController) { }
  repeticao:string
  Exercicio = {id: 'SDVNSFVDF', nome: 'Agachamento', semanaId: '', diaSemana: 0, horas: 1, repeticao:1};

  ngOnInit() {}

  public cancel() {
    this.modalController.dismiss(null,'cancel');
  }

  public confirm() {
    this.modalController.dismiss(this.Exercicio, 'confirm');
    console.log(this.repeticao);
  }

}
