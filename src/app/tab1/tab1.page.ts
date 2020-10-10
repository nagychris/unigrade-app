import {Component} from "@angular/core";
import {GradeEntry} from "../shared/GradeEntry";
import {IonRouterOutlet, ModalController} from "@ionic/angular";
import {CreateEditModalComponent} from "../create-edit-modal/create-edit-modal.component";
import {GradeService} from "../shared/grade.service";

@Component({
    selector: "app-tab1",
    templateUrl: "tab1.page.html",
    styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
    currentGPA: number;
    currentGrades: GradeEntry[];

    constructor(public modalController: ModalController,
                private routerOutlet: IonRouterOutlet,
                private gradeService: GradeService) {
    }

    ngOnInit() {
        this.getCurrentGrades();
        this.calculateGPA();
    }

    private calculateGPA() {
        if (this.currentGrades) {
            let gradeSum = 0,
                ectsSum = 0;
            this.currentGrades.forEach((grade) => {
                gradeSum += grade.grade * grade.credits;
                ectsSum += grade.credits;
            });
            this.currentGPA = gradeSum / ectsSum;
        }
    }

    private getCurrentGrades(): void {
        this.currentGrades = this.gradeService.getGradeList();
    }

    async presentModal() {
        const modal = await this.modalController.create({
            component: CreateEditModalComponent,
            swipeToClose: true,
            presentingElement: this.routerOutlet.nativeEl
        });
        modal.onDidDismiss().then((content) => {
            if(content.data.gradeEntry) {
                this.currentGrades.push(content.data.gradeEntry);
                this.gradeService.updateGradeList(content.data.gradeEntry);
            }
        });
        return await modal.present();
    }
}
