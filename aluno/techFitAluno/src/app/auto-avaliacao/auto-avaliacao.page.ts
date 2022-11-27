import { Component} from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { LoadingController, ToastController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-auto-avaliacao',
  templateUrl: './auto-avaliacao.page.html',
  styleUrls: ['./auto-avaliacao.page.scss'],
})
export class AutoAvaliacaoPage {
  posts: any;
  subscription: any;

  constructor(
    private toastCtrl: ToastController,
    private firestore: AngularFirestore,
    private loadingCtrl: LoadingController,
    private platform: Platform
  ) {}

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
        .collection("posts")
        .snapshotChanges()
        .subscribe(data => {
          this.posts = data.map(e => {
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

    await this.firestore.doc("posts/" + id).delete();

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
}
