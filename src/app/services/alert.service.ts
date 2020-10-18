import { Injectable } from '@angular/core';
import {ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toastController: ToastController) { }

  async presentToastWithMsg(message: string, color?: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color ? color : 'dark'
    });
    toast.present();
  }

}
