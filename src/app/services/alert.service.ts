import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root',
})
export class AlertService {
    constructor(
        private toastController: ToastController,
        private alertController: AlertController
    ) {}

    async presentToastWithMsg(message: string, color?: string) {
        const toast = await this.toastController.create({
            message,
            duration: 2000,
            color: color ? color : 'dark',
        });
        toast.present();
    }

    async presentConfirmationAlert(
        header: string,
        message: string
    ): Promise<boolean> {
        let resolveFunction: (confirm: boolean) => void;
        const promise = new Promise<boolean>((resolve) => {
            resolveFunction = resolve;
        });

        const alert = await this.alertController.create({
            header,
            message,
            buttons: [
                {
                    text: 'Abbrechen',
                    role: 'cancel',
                    handler: () => {
                        resolveFunction(false);
                    },
                },
                {
                    text: 'Ja',
                    handler: () => {
                        resolveFunction(true);
                    },
                },
            ],
        });
        alert.present();

        return promise;
    }
}
