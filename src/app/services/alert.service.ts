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

  async presentConfirmationAlert(message: string): Promise<boolean> {
    let resolveFunction: (confirm: boolean) => void;
    let promise = new Promise<boolean>(resolve => {
      resolveFunction = resolve;
    });

    const alert = await this.alertController.create({
      header: 'Confirmation',
      message: message,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => { resolveFunction(false); }
        }, {
          text: 'Yes',
          handler: () => { resolveFunction(true); }
        }
      ]
    });
    alert.present();

    return promise;
  }

}
