import { Component, getNgModuleById, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PersonalService } from 'src/app/services/personal.service';
import { TreinosService } from 'src/app/services/treinos.service';


@Component({
  selector: 'app-tela-personal',
  templateUrl: './tela-personal.page.html',
  styleUrls: ['./tela-personal.page.scss'],
})
export class TelaPersonalPage implements OnInit {

  public equipamentos = [
    'Halteres', 'Caneleiras', 'Banco supino', 'Step', 'Colchonete', 'Bolas', 'Prancha abdominal'
    , 'Bicicleta ergométrica'
  ]
  public week = [
    'domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'
  ]
  
  public selectedId = this.route.snapshot.params.id;
  public selectedPeronal;
  public usuario;

  constructor(private route: ActivatedRoute
    , public personalService: PersonalService
    , public treinosService: TreinosService
    , private alertController: AlertController) { 

    this.personalService.getPersonalById(this.selectedId).then((user) =>{
      return this.selectedPeronal = user.data();
    })

  }

  ngOnInit() {
  }

  public pedidoTreino(tempo, dias, equips, obs){
    //const treino = {tempo: tempo, dias: dias, equips: equips, obs: obs  }
    const user = this.personalService.getUsuarioAutenticado().value
    const treino = {id: user.cadastro.id, nome: user.cadastro.nome
                , idade: user.cadastro.idade, peso: user.cadastro.peso
                , altura: user.cadastro.altura, avatar: user.cadastro.avatar
                , tempo: tempo, dias: dias, equips: equips, obs: obs }
    this.treinosService.adicionarPedido(this.selectedPeronal.cadastro.id, treino).then((event) => {
      this.presentAlert()
    })
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Pedido enviado ao personal!',
      buttons: [
        {
          text: 'OK',
          role: 'confirm'
        },
      ],
    });
    await alert.present();
  }

}
