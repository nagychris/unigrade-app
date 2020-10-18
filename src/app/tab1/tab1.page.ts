import {Component, OnInit} from "@angular/core";
import {GradeEntry} from "../services/GradeEntry";
import {AlertController, IonRouterOutlet} from "@ionic/angular";
import {GradeService} from "../services/grade.service";
import {DataService} from "../services/data.service";
import {AlertService} from "../services/alert.service";
import {Router} from "@angular/router";

@Component({
    selector: "app-tab1",
    templateUrl: "tab1.page.html",
    styleUrls: ["tab1.page.scss"],
})
export class Tab1Page implements OnInit {
    public searchTerm: string = "";
    totalEcts: number = 0;
    currentGPA: number = 0.0;
    currentGrades: GradeEntry[];

    constructor(private routerOutlet: IonRouterOutlet,
                private gradeService: GradeService,
                public alertCtrl: AlertController,
                private dataService: DataService,
                private alertService: AlertService,
                private router: Router) {
    }

    ngOnInit() {
        this.calculateNumbers();
    }

    calculateNumbers() {
        this.currentGrades = this.gradeService.getGradeList();
        if (this.currentGrades && this.currentGrades.length) {
            let gradeSum = 0,
                ectsSum = 0;
            this.currentGrades.forEach((grade) => {
                gradeSum += grade.grade * grade.credits;
                ectsSum += grade.credits;
            });
            this.totalEcts = ectsSum;
            this.currentGPA = gradeSum / ectsSum;
        } else {
            this.totalEcts = 0;
            this.currentGPA = 0.0;
        }
    }

    getFilteredGrades() {
        this.currentGrades = this.gradeService.filterItems(this.searchTerm);
    }

    public exportGradesAsCsv(fileName?: string) {
        if (this.currentGrades.length) {
            this.dataService.downloadCsv(this.currentGrades, fileName);
            this.alertService.presentToastWithMsg('CSV download started successfully.');
        } else {
            this.alertService.presentToastWithMsg('No data to export!', 'danger');
        }
    }

    public onNavigate(gradeEntry?: GradeEntry) {
        this.router.navigate(['tabs/create-edit', gradeEntry.id]);
    }

    // TODO: extract to service
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
                        this.calculateNumbers();
                        this.alertService.presentToastWithMsg('Grade has been deleted successfully.');
                    }
                }
            ]
        });
        await alert.present();
    }

}
