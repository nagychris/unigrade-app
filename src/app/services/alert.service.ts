import { Injectable } from '@angular/core';
import {AlertController, ToastController} from "@ionic/angular";
import {GradeEntry} from "./GradeEntry";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toastController: ToastController,
              private alertController: AlertController) { }

  async presentToastWithMsg(message: string, color?: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color ? color : 'dark'
    });
    toast.present();
  }

  async presentAlertDelete(gradeEntry: GradeEntry, callback: Function) {
    const alert = await this.alertController.create({
      header: 'Delete grade',
      message: 'Do you really want to remove the grade of ' + gradeEntry.course + '?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Yes',
          handler: () => {
            callback();
            this.presentToastWithMsg('Grade has been deleted successfully.');
          }
        }
      ]
    });
    await alert.present();
  }

}
