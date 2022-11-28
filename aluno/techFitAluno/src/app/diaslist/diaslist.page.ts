import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { PersonalService } from 'src/app/services/personal.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-diaslist',
  templateUrl: './diaslist.page.html',
  styleUrls: ['./diaslist.page.scss'],
})
export class DiaslistPage implements OnInit {
  posts: any;
  subscription: any;

  
  public user = {id: 'loading', cadastro: {nome: 'loading'}};
  public treino = [];
  public semanas: any = [];

  constructor(
    private toastCtrl: ToastController,
    private firestore: AngularFirestore,
    private loadingCtrl: LoadingController,
    private platform: Platform,
    private router: Router,
    private personalService: PersonalService,
    public firebaseService: FirebaseService,
    private zone: NgZone
  ) {
    this.personalService.getUsuarioAutenticado().pipe(filter(usuario => usuario != undefined)).subscribe(usuario => {
      this.user = usuario;
      console.log(this.user);
      this.getPosts();
      // remove the first element of the treino array
      // console.log(this.treino);
      this.semanas = this.treino[0].semanas.semanas;
      console.log(this.semanas);
      // update the state of the treino array in the html
      this.zone.run(() => {
        this.treino = this.treino;
        this.semanas = this.semanas;
      }
      );
    })
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(() => {
      navigator["app"].exitApp();
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

  async getPosts() {
    // console.log("get posts");

    // show loader
    let loader = await this.loadingCtrl.create({
      message: "Por favor aguarde..."
    });
    loader.present();

    try {
      this.firestore
        .collection("treinos", ref => ref.where('idAluno','==',this.user.id))
        .snapshotChanges()
        .subscribe(data => {
          this.posts = data.map(e => {
            console.log(e.payload.doc.data());
            this.treino = [{
              id: e.payload.doc.id,
              title: e.payload.doc.data()["title"],
              semanas: e.payload.doc.data()["semanas"]
            }];
            this.semanas = e.payload.doc.data()["semanas"]
            console.log(this.treino);
            return {
              id: e.payload.doc.id,
              title: e.payload.doc.data()["title"],
              details: e.payload.doc.data()["details"]
            };
          });

          // dismiss loader
          loader.dismiss();
        });
    } catch (e) {
      this.showToast(e);
    }
  }

  async deletePost(id: string) {
    // console.log(id);

    // show loader
    let loader = await this.loadingCtrl.create({
      message: "Por favor aguarde..."
    });
    loader.present();

    await this.firestore.doc("treinos/" + id).delete();

    // dismiss loader
    loader.dismiss();
  }

  // create function to add a new treino in the treinos collection
  async addTreino() {
    // show loader
    let loader = await this.loadingCtrl.create({
      message: "Por favor aguarde..."
    });
    loader.present();

    // create a new object to add to the database
    let newTreino = {
      title: "Treino 1",
      details: "Treino de peito e costas",
      idAluno: this.user.id,
      idPersonal: "f5vBqKtMvYcp5WczQQcP3nl2L8G2",
      semanas: [
        {
          id: "1",
          semana: "Semana 1",
          dias: [
            {
              id: "1",
              dia: "Segunda",
              exercicios: [
                {
                  id: "1",
                  nome: "Supino Reto",
                  series: 4,
                  repeticoes: 12,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "2",
                  nome: "Puxada Alta",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "3",
                  nome: "Crucifixo Inclinado",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                }
              ]
            },
            {
              id: "2",
              dia: "Terça",
              exercicios: [
                {
                  id: "1",
                  nome: "Rosca Direta",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "2",
                  nome: "Tríceps Corda",
                  series: 3,
                  repeticoes: 15,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "3",
                  nome: "Rosca Martelo",
                  series: 3,
                  repeticoes: 12,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                }
              ]
            },
            {
              id: "3",
              dia: "Quarta",
              exercicios: [
                {
                  id: "1",
                  nome: "Agachamento",
                  series: 4,
                  repeticoes: 8,
                  peso: 20,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "2",
                  nome: "Leg Press",
                  series: 3,
                  repeticoes: 10,
                  peso: 40,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "3",
                  nome: "Cadeira Extensora",
                  series: 4,
                  repeticoes: 12,
                  peso: 50,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                }
              ]
            },
            {
              id: "4",
              dia: "Quinta",
              exercicios: [
                {
                  id: "1",
                  nome: "Supino Inclinado",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "2",
                  nome: "Crucifixo Declinado",
                  series: 3,
                  repeticoes: 12,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "3",
                  nome: "Pulley Baixo",
                  series: 4,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                }
              ]
            },
            {
              id: "5",
              dia: "Sexta",
              exercicios: [
                {
                  id: "1",
                  nome: "Supino Reto",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "2",
                  nome: "Puxada Alta",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "3",
                  nome: "Crucifixo Inclinado",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                }
              ]
            },
            {
              id: "6",
              dia: "Sábado",
              exercicios: [
                {
                  id: "1",
                  nome: "Supino Reto",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "2",
                  nome: "Puxada Alta",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "3",
                  nome: "Crucifixo Inclinado",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                }
              ]
            },
            {
              id: "7",
              dia: "Domingo",
              exercicios: [
                {
                  id: "1",
                  nome: "Supino Reto",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "2",
                  nome: "Puxada Alta",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "3",
                  nome: "Crucifixo Inclinado",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                }
              ]
            }
          ]
        },
        {
          id: "2",
          semana: "Semana 2",
          dias: [
            {
              id: "1",
              dia: "Segunda",
              exercicios: [
                {
                  id: "1",
                  nome: "Supino Reto",
                  series: 4,
                  repeticoes: 12,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "2",
                  nome: "Puxada Alta",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "3",
                  nome: "Crucifixo Inclinado",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                }
              ]
            },
            {
              id: "2",
              dia: "Terça",
              exercicios: [
                {
                  id: "1",
                  nome: "Rosca Direta",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "2",
                  nome: "Tríceps Corda",
                  series: 3,
                  repeticoes: 15,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "3",
                  nome: "Rosca Martelo",
                  series: 3,
                  repeticoes: 12,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                }
              ]
            },
            {
              id: "3",
              dia: "Quarta",
              exercicios: [
                {
                  id: "1",
                  nome: "Agachamento",
                  series: 4,
                  repeticoes: 8,
                  peso: 20,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "2",
                  nome: "Leg Press",
                  series: 3,
                  repeticoes: 10,
                  peso: 40,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "3",
                  nome: "Cadeira Extensora",
                  series: 4,
                  repeticoes: 12,
                  peso: 50,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                }
              ]
            },
            {
              id: "4",
              dia: "Quinta",
              exercicios: [
                {
                  id: "1",
                  nome: "Supino Inclinado",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "2",
                  nome: "Crucifixo Declinado",
                  series: 3,
                  repeticoes: 12,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "3",
                  nome: "Pulley Baixo",
                  series: 4,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                }
              ]
            },
            {
              id: "5",
              dia: "Sexta",
              exercicios: [
                {
                  id: "1",
                  nome: "Supino Reto",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "2",
                  nome: "Puxada Alta",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "3",
                  nome: "Crucifixo Inclinado",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                }
              ]
            },
            {
              id: "6",
              dia: "Sábado",
              exercicios: [
                {
                  id: "1",
                  nome: "Supino Reto",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "2",
                  nome: "Puxada Alta",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "3",
                  nome: "Crucifixo Inclinado",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                }
              ]
            },
            {
              id: "7",
              dia: "Domingo",
              exercicios: [
                {
                  id: "1",
                  nome: "Supino Reto",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "2",
                  nome: "Puxada Alta",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "3",
                  nome: "Crucifixo Inclinado",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                }
              ]
            }
          ]
        },
        {
          id: "3",
          semana: "Semana 3",
          dias: [
            {
              id: "1",
              dia: "Segunda",
              exercicios: [
                {
                  id: "1",
                  nome: "Supino Reto",
                  series: 4,
                  repeticoes: 12,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "2",
                  nome: "Puxada Alta",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "3",
                  nome: "Crucifixo Inclinado",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                }
              ]
            },
            {
              id: "2",
              dia: "Terça",
              exercicios: [
                {
                  id: "1",
                  nome: "Rosca Direta",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "2",
                  nome: "Tríceps Corda",
                  series: 3,
                  repeticoes: 15,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "3",
                  nome: "Rosca Martelo",
                  series: 3,
                  repeticoes: 12,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                }
              ]
            },
            {
              id: "3",
              dia: "Quarta",
              exercicios: [
                {
                  id: "1",
                  nome: "Agachamento",
                  series: 4,
                  repeticoes: 8,
                  peso: 20,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "2",
                  nome: "Leg Press",
                  series: 3,
                  repeticoes: 10,
                  peso: 40,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "3",
                  nome: "Cadeira Extensora",
                  series: 4,
                  repeticoes: 12,
                  peso: 50,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                }
              ]
            },
            {
              id: "4",
              dia: "Quinta",
              exercicios: [
                {
                  id: "1",
                  nome: "Supino Inclinado",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "2",
                  nome: "Crucifixo Declinado",
                  series: 3,
                  repeticoes: 12,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "3",
                  nome: "Pulley Baixo",
                  series: 4,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                }
              ]
            },
            {
              id: "5",
              dia: "Sexta",
              exercicios: [
                {
                  id: "1",
                  nome: "Supino Reto",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "2",
                  nome: "Puxada Alta",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "3",
                  nome: "Crucifixo Inclinado",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                }
              ]
            },
            {
              id: "6",
              dia: "Sábado",
              exercicios: [
                {
                  id: "1",
                  nome: "Supino Reto",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "2",
                  nome: "Puxada Alta",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "3",
                  nome: "Crucifixo Inclinado",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                }
              ]
            },
            {
              id: "7",
              dia: "Domingo",
              exercicios: [
                {
                  id: "1",
                  nome: "Supino Reto",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "2",
                  nome: "Puxada Alta",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "3",
                  nome: "Crucifixo Inclinado",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                }
              ]
            }
          ]
        },
        {
          id: "3",
          semana: "Semana 3",
          dias: [
            {
              id: "1",
              dia: "Segunda",
              exercicios: [
                {
                  id: "1",
                  nome: "Supino Reto",
                  series: 4,
                  repeticoes: 12,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "2",
                  nome: "Puxada Alta",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "3",
                  nome: "Crucifixo Inclinado",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                }
              ]
            },
            {
              id: "2",
              dia: "Terça",
              exercicios: [
                {
                  id: "1",
                  nome: "Rosca Direta",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "2",
                  nome: "Tríceps Corda",
                  series: 3,
                  repeticoes: 15,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "3",
                  nome: "Rosca Martelo",
                  series: 3,
                  repeticoes: 12,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                }
              ]
            },
            {
              id: "3",
              dia: "Quarta",
              exercicios: [
                {
                  id: "1",
                  nome: "Agachamento",
                  series: 4,
                  repeticoes: 8,
                  peso: 20,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "2",
                  nome: "Leg Press",
                  series: 3,
                  repeticoes: 10,
                  peso: 40,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "3",
                  nome: "Cadeira Extensora",
                  series: 4,
                  repeticoes: 12,
                  peso: 50,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                }
              ]
            },
            {
              id: "4",
              dia: "Quinta",
              exercicios: [
                {
                  id: "1",
                  nome: "Supino Inclinado",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "2",
                  nome: "Crucifixo Declinado",
                  series: 3,
                  repeticoes: 12,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "3",
                  nome: "Pulley Baixo",
                  series: 4,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                }
              ]
            },
            {
              id: "5",
              dia: "Sexta",
              exercicios: [
                {
                  id: "1",
                  nome: "Supino Reto",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "2",
                  nome: "Puxada Alta",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "3",
                  nome: "Crucifixo Inclinado",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                }
              ]
            },
            {
              id: "6",
              dia: "Sábado",
              exercicios: [
                {
                  id: "1",
                  nome: "Supino Reto",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "2",
                  nome: "Puxada Alta",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "3",
                  nome: "Crucifixo Inclinado",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                }
              ]
            },
            {
              id: "7",
              dia: "Domingo",
              exercicios: [
                {
                  id: "1",
                  nome: "Supino Reto",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "2",
                  nome: "Puxada Alta",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "3",
                  nome: "Crucifixo Inclinado",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                }
              ]
            }
          ]
        },
        {
          id: "4",
          semana: "Semana 4",
          dias: [
            {
              id: "1",
              dia: "Segunda",
              exercicios: [
                {
                  id: "1",
                  nome: "Supino Reto",
                  series: 4,
                  repeticoes: 12,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "2",
                  nome: "Puxada Alta",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "3",
                  nome: "Crucifixo Inclinado",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                }
              ]
            },
            {
              id: "2",
              dia: "Terça",
              exercicios: [
                {
                  id: "1",
                  nome: "Rosca Direta",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "2",
                  nome: "Tríceps Corda",
                  series: 3,
                  repeticoes: 15,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "3",
                  nome: "Rosca Martelo",
                  series: 3,
                  repeticoes: 12,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                }
              ]
            },
            {
              id: "3",
              dia: "Quarta",
              exercicios: [
                {
                  id: "1",
                  nome: "Agachamento",
                  series: 4,
                  repeticoes: 8,
                  peso: 20,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "2",
                  nome: "Leg Press",
                  series: 3,
                  repeticoes: 10,
                  peso: 40,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "3",
                  nome: "Cadeira Extensora",
                  series: 4,
                  repeticoes: 12,
                  peso: 50,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                }
              ]
            },
            {
              id: "4",
              dia: "Quinta",
              exercicios: [
                {
                  id: "1",
                  nome: "Supino Inclinado",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "2",
                  nome: "Crucifixo Declinado",
                  series: 3,
                  repeticoes: 12,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "3",
                  nome: "Pulley Baixo",
                  series: 4,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                }
              ]
            },
            {
              id: "5",
              dia: "Sexta",
              exercicios: [
                {
                  id: "1",
                  nome: "Supino Reto",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "2",
                  nome: "Puxada Alta",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "3",
                  nome: "Crucifixo Inclinado",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                }
              ]
            },
            {
              id: "6",
              dia: "Sábado",
              exercicios: [
                {
                  id: "1",
                  nome: "Supino Reto",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "2",
                  nome: "Puxada Alta",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "3",
                  nome: "Crucifixo Inclinado",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                }
              ]
            },
            {
              id: "7",
              dia: "Domingo",
              exercicios: [
                {
                  id: "1",
                  nome: "Supino Reto",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "2",
                  nome: "Puxada Alta",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "3",
                  nome: "Crucifixo Inclinado",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                }
              ]
            }
          ]
        },
        {
          id: "5",
          semana: "Semana 5",
          dias: [
            {
              id: "1",
              dia: "Segunda",
              exercicios: [
                {
                  id: "1",
                  nome: "Supino Reto",
                  series: 4,
                  repeticoes: 12,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "2",
                  nome: "Puxada Alta",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "3",
                  nome: "Crucifixo Inclinado",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                }
              ]
            },
            {
              id: "2",
              dia: "Terça",
              exercicios: [
                {
                  id: "1",
                  nome: "Rosca Direta",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "2",
                  nome: "Tríceps Corda",
                  series: 3,
                  repeticoes: 15,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "3",
                  nome: "Rosca Martelo",
                  series: 3,
                  repeticoes: 12,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                }
              ]
            },
            {
              id: "3",
              dia: "Quarta",
              exercicios: [
                {
                  id: "1",
                  nome: "Agachamento",
                  series: 4,
                  repeticoes: 8,
                  peso: 20,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "2",
                  nome: "Leg Press",
                  series: 3,
                  repeticoes: 10,
                  peso: 40,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "3",
                  nome: "Cadeira Extensora",
                  series: 4,
                  repeticoes: 12,
                  peso: 50,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                }
              ]
            },
            {
              id: "4",
              dia: "Quinta",
              exercicios: [
                {
                  id: "1",
                  nome: "Supino Inclinado",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "2",
                  nome: "Crucifixo Declinado",
                  series: 3,
                  repeticoes: 12,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "3",
                  nome: "Pulley Baixo",
                  series: 4,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                }
              ]
            },
            {
              id: "5",
              dia: "Sexta",
              exercicios: [
                {
                  id: "1",
                  nome: "Supino Reto",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "2",
                  nome: "Puxada Alta",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "3",
                  nome: "Crucifixo Inclinado",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                }
              ]
            },
            {
              id: "6",
              dia: "Sábado",
              exercicios: [
                {
                  id: "1",
                  nome: "Supino Reto",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "2",
                  nome: "Puxada Alta",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "3",
                  nome: "Crucifixo Inclinado",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                }
              ]
            },
            {
              id: "7",
              dia: "Domingo",
              exercicios: [
                {
                  id: "1",
                  nome: "Supino Reto",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "2",
                  nome: "Puxada Alta",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "3",
                  nome: "Crucifixo Inclinado",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                }
              ]
            }
          ]
        },
        {
          id: "6",
          semana: "Semana 6",
          dias: [
            {
              id: "1",
              dia: "Segunda",
              exercicios: [
                {
                  id: "1",
                  nome: "Supino Reto",
                  series: 4,
                  repeticoes: 12,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "2",
                  nome: "Puxada Alta",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "3",
                  nome: "Crucifixo Inclinado",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                }
              ]
            },
            {
              id: "2",
              dia: "Terça",
              exercicios: [
                {
                  id: "1",
                  nome: "Rosca Direta",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "2",
                  nome: "Tríceps Corda",
                  series: 3,
                  repeticoes: 15,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "3",
                  nome: "Rosca Martelo",
                  series: 3,
                  repeticoes: 12,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                }
              ]
            },
            {
              id: "3",
              dia: "Quarta",
              exercicios: [
                {
                  id: "1",
                  nome: "Agachamento",
                  series: 4,
                  repeticoes: 8,
                  peso: 20,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "2",
                  nome: "Leg Press",
                  series: 3,
                  repeticoes: 10,
                  peso: 40,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "3",
                  nome: "Cadeira Extensora",
                  series: 4,
                  repeticoes: 12,
                  peso: 50,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                }
              ]
            },
            {
              id: "4",
              dia: "Quinta",
              exercicios: [
                {
                  id: "1",
                  nome: "Supino Inclinado",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "2",
                  nome: "Crucifixo Declinado",
                  series: 3,
                  repeticoes: 12,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "3",
                  nome: "Pulley Baixo",
                  series: 4,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                }
              ]
            },
            {
              id: "5",
              dia: "Sexta",
              exercicios: [
                {
                  id: "1",
                  nome: "Supino Reto",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "2",
                  nome: "Puxada Alta",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "3",
                  nome: "Crucifixo Inclinado",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                }
              ]
            },
            {
              id: "6",
              dia: "Sábado",
              exercicios: [
                {
                  id: "1",
                  nome: "Supino Reto",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "2",
                  nome: "Puxada Alta",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "3",
                  nome: "Crucifixo Inclinado",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                }
              ]
            },
            {
              id: "7",
              dia: "Domingo",
              exercicios: [
                {
                  id: "1",
                  nome: "Supino Reto",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "2",
                  nome: "Puxada Alta",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                },
                {
                  id: "3",
                  nome: "Crucifixo Inclinado",
                  series: 3,
                  repeticoes: 10,
                  peso: 10,
                  tempoDescanso: 60,
                  tempoExecucao: 40
                }
              ]
            }
          ]
        },
      ]
    }

    // add the new object to the database
    await this.firestore.collection("treinos").add(newTreino);

    // dismiss loader
    loader.dismiss();
  }

  ionViewWillEnter() {
    this.getPosts();
  }

  showToast(message: string) {
    this.toastCtrl
      .create({
        message: message,
        duration: 3000
      })
      .then(toastData => toastData.present());
  }

  // create function goToTraining that will receive the day and week and will navigate to the training page with the day and week as parameters
  goToExercicios(week, day) {
    this.router.navigate(['exercicioslist', {week, day}]);
  }
  

}
