import {Component} from "@angular/core";
import {GradeEntry} from "../shared/GradeEntry";
import {AlertController, IonRouterOutlet, ModalController, ToastController} from "@ionic/angular";
import {CreateEditModalComponent} from "./create-edit-modal/create-edit-modal.component";
import {GradeService} from "../shared/grade.service";

@Component({
    selector: "app-tab1",
    templateUrl: "tab1.page.html",
    styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
    totalEcts: number;
    currentGPA: number;
    currentGrades: GradeEntry[];

    constructor(public modalController: ModalController,
                private routerOutlet: IonRouterOutlet,
                private gradeService: GradeService,
                public alertCtrl: AlertController,
                public toastCtrl: ToastController) {
    }

    ngOnInit() {
        this.updateState();
    }

    private calculateNumbers() {
        if (this.currentGrades.length > 0) {
            let gradeSum = 0,
                ectsSum = 0;
            this.currentGrades.forEach((grade) => {
                gradeSum += grade.grade * grade.credits;
                ectsSum += grade.credits;
            });
            this.totalEcts = ectsSum;
            this.currentGPA = gradeSum / ectsSum;
        } else {
            this.currentGPA = 0.0;
            this.totalEcts = 0;
        }
    }

    private getCurrentGrades(): void {
        this.currentGrades = this.gradeService.getGradeList();
    }

    private updateState(): void {
        this.getCurrentGrades();
        this.calculateNumbers();
    }

    async presentCreateEditModal(gradeEntry?: GradeEntry) {
        const modal = await this.modalController.create({
            component: CreateEditModalComponent,
            componentProps: {
                gradeEntry: gradeEntry
            },
            swipeToClose: true,
            presentingElement: this.routerOutlet.nativeEl
        });
        modal.onDidDismiss().then((content) => {
            if (content.role !== 'backdrop' && content.role !== 'gesture') { // ignore dismissing via exit-button or swiping
                let entry = content.data.gradeEntry;
                if (entry) {
                    if (!content.data.id) { // new gradeEntry --> add to list
                        this.gradeService.addGrade(entry);
                        this.updateState();
                    } else { // edit existing gradeEntry
                        entry.id = content.data.id;
                        this.gradeService.updateGrade(entry);
                        this.presentToastWithMsg('Course updated successfully.')
                        this.updateState();
                    }
                }
            }
        });
        return await modal.present();
    }

    async presentAlertDelete(gradeEntry: GradeEntry) {
        const alert = await this.alertCtrl.create({
            header: 'Delete grade',
            message: 'Do you really want to remove the grade of "' + gradeEntry.course + '"?',
            buttons: [
                {
                    text: 'No, thanks',
                    role: 'cancel'
                }, {
                    text: 'Yes, please',
                    handler: () => {
                        this.gradeService.removeGrade(gradeEntry);
                        this.presentToastWithMsg('Course has been deleted successfully.');
                        this.updateState();
                    }
                }
            ]
        });
        await alert.present();
    }

    async presentToastWithMsg(msg: string) {
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: 2000,
            color: "dark"
        });
        toast.present();
    }
}
