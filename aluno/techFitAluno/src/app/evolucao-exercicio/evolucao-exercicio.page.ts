import { Chart, registerables } from 'chart.js';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { PersonalService } from 'src/app/services/personal.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-evolucao-exercicio',
  templateUrl: './evolucao-exercicio.page.html',
  styleUrls: ['./evolucao-exercicio.page.scss'],
})
export class EvolucaoExercicioPage implements OnInit {
  @ViewChild('lineChart') lineChart;
  @ViewChild('lineChartCarga') lineChartCarga;
  @ViewChild('lineChartRepeticoes') lineChartRepeticoes;
  @ViewChild('lineChartSeries') lineChartSeries;
  @ViewChild('lineChartTempoDescanso') lineChartTempoDescanso;
  @ViewChild('lineChartTempoExecucao') lineChartTempoExecucao;

  bars: any;
  barsCarga: any;
  barsRepeticoes: any;
  barsSeries: any;
  barsTempoDescanso: any;
  barsTempoExecucao: any;

  colorArray: any;

  posts: any;
  subscription: any;

  public user = {id: 'loading', cadastro: {nome: 'loading'}};

  public exercicioName = decodeURI(this.routeActivate.snapshot.params.exercicioName);

  public treino = [];
  public semanas: any = [];
  public dayExercises: any = [];
  public exercicioValues = [];

  constructor(
    private toastCtrl: ToastController,
    private firestore: AngularFirestore,
    private loadingCtrl: LoadingController,
    private platform: Platform,
    private router: Router,
    private personalService: PersonalService,
    public firebaseService: FirebaseService,
    private zone: NgZone,
    private route: Router,
    private routeActivate: ActivatedRoute
  ) {
    this.personalService.getUsuarioAutenticado().pipe(filter(usuario => usuario != undefined)).subscribe(usuario => {
      this.user = usuario;
      console.log(this.user);
      this.getPosts();
      this.zone.run(() => {
        this.treino = this.treino;
        this.semanas = this.semanas;
        this.dayExercises = this.dayExercises;
      }
      );
    })
    Chart.register(...registerables);
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
            console.log(this.semanas);
            this.semanas.forEach(week => {
              week.dias.forEach(day => {
                day.exercicios.forEach(exercicio => {
                  if (exercicio.nome == this.exercicioName) {
                    this.dayExercises.push({
                      semana: week.id,
                      dia: day.id,
                      exercicio: exercicio,
                      data: 'Semana ' + week.id + ' dia ' + day.id
                    });
                  }
                });
              });
            });
            console.log(this.exercicioName);
            console.log(this.dayExercises);
            if (!this.bars) {
              this.createLineChart();
              this.createLineChartCarga();
              this.createLineChartRepeticoes();
              this.createLineChartSeries();
              this.createLineChartTempoDescanso();
              this.createLineChartTempoExecucao();
            }
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

  createLineChart() {
    // create a line chart
    this.bars = new Chart(this.lineChart.nativeElement, {
      type: 'line',
      data: {
        labels: this.dayExercises.sort((a, b) => a.data.localeCompare(b.data)).map(day => day.data),
        datasets: [{
          label: 'Repetições',
          data: this.dayExercises.map(day => day.exercicio.repeticoes),
          fill: false,
          borderColor: '#FF0000',
          borderWidth: 1
        }, {
          label: 'Carga',
          data: this.dayExercises.map(day => day.exercicio.peso),
          fill: false,
          borderColor: '#0000FF',
          borderWidth: 1
        }, {
          label: 'Séries',
          data: this.dayExercises.map(day => day.exercicio.series),
          fill: false,
          borderColor: '#00FF00',
          borderWidth: 1
        }, {
          label: 'Tempo de Execução',
          data: this.dayExercises.map(day => day.exercicio.tempoExecucao),
          fill: false,
          borderColor: '#FF00FF',
          borderWidth: 1
        }, {
          label: 'Intervalo de Descanso',
          data: this.dayExercises.map(day => day.exercicio.tempoDescanso),
          fill: false,
          borderColor: '#FFFF00',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  createLineChartCarga() {
    // create a line chart
    this.bars = new Chart(this.lineChartCarga.nativeElement, {
      type: 'line',
      data: {
        labels: this.dayExercises.sort((a, b) => a.data.localeCompare(b.data)).map(day => day.data),
        datasets: [{
          label: 'Carga',
          data: this.dayExercises.map(day => day.exercicio.peso),
          fill: false,
          borderColor: '#0000FF',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  createLineChartRepeticoes() {
    // create a line chart
    this.bars = new Chart(this.lineChartRepeticoes.nativeElement, {
      type: 'line',
      data: {
        labels: this.dayExercises.sort((a, b) => a.data.localeCompare(b.data)).map(day => day.data),
        datasets: [{
          label: 'Repetições',
          data: this.dayExercises.map(day => day.exercicio.repeticoes),
          fill: false,
          borderColor: '#FF0000',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  createLineChartSeries() {
    // create a line chart
    this.bars = new Chart(this.lineChartSeries.nativeElement, {
      type: 'line',
      data: {
        labels: this.dayExercises.sort((a, b) => a.data.localeCompare(b.data)).map(day => day.data),
        datasets: [{
          label: 'Séries',
          data: this.dayExercises.map(day => day.exercicio.series),
          fill: false,
          borderColor: '#00FF00',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  createLineChartTempoDescanso() {
    // create a line chart
    this.bars = new Chart(this.lineChartTempoDescanso.nativeElement, {
      type: 'line',
      data: {
        labels: this.dayExercises.sort((a, b) => a.data.localeCompare(b.data)).map(day => day.data),
        datasets: [{
          label: 'Tempode de Descanso',
          data: this.dayExercises.map(day => day.exercicio.tempoDescanso),
          fill: false,
          borderColor: '#FFFF00',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  createLineChartTempoExecucao() {
    // create a line chart
    this.bars = new Chart(this.lineChartTempoExecucao.nativeElement, {
      type: 'line',
      data: {
        labels: this.dayExercises.sort((a, b) => a.data.localeCompare(b.data)).map(day => day.data),
        datasets: [{
          label: 'Tempo de Execução',
          data: this.dayExercises.map(day => day.exercicio.tempoExecucao),
          fill: false,
          borderColor: '#FF00FF',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
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

}
