import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { PersonalService } from 'src/app/services/personal.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-exercicioslist',
  templateUrl: './exercicioslist.page.html',
  styleUrls: ['./exercicioslist.page.scss'],
})
export class ExercicioslistPage implements OnInit {
  posts: any;
  subscription: any;

  public user = {id: 'loading', cadastro: {nome: 'loading'}};

  public semana = this.routeActivate.snapshot.params.week;
  public dia = this.routeActivate.snapshot.params.day;

  public treino = [];
  public semanas: any = [];
  public dayExercises: any = [];

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
            // from the this.semanas array, get the first element with the id = this.semana
            this.dayExercises = this.semanas.filter(semana => semana.id == this.semana);
            // from the this.dayExercises array, get the first element with the id = this.dia
            this.dayExercises = this.dayExercises[0].dias.filter(dia => dia.id == this.dia)[0].exercicios;
            console.log(this.dayExercises);
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

  goToExercicio(exercicioName) {
    this.route.navigate(['/evolucao-exercicio', {exercicioName}]);
  }

}
