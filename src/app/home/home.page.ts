import {Component, OnDestroy, OnInit} from "@angular/core";
import {GradeEntry} from "../services/GradeEntry";
import {AlertController, IonRouterOutlet} from "@ionic/angular";
import {GradeService} from "../services/grade.service";
import {DataService} from "../services/data.service";
import {AlertService} from "../services/alert.service";
import {Router} from "@angular/router";
import {Subject, Subscription} from "rxjs";
import {ImportComponent} from "../import/import.component";

@Component({
    selector: "app-home",
    templateUrl: "home.page.html",
    styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit, OnDestroy {
    searchTerm: string = "";
    totalEcts: number = 0;
    currentGPA: number = 0.0;
    currentGrades: GradeEntry[];
    subscription: Subscription;

    constructor(private routerOutlet: IonRouterOutlet,
                private gradeService: GradeService,
                public alertCtrl: AlertController,
                private dataService: DataService,
                private alertService: AlertService,
                private router: Router) {
        this.subscription = this.dataService.getImportedGrades().subscribe(data => {
            const grades = data.grades;
            if (grades && grades.length) {
                if (data.keepGrades) {
                    this.gradeService.appendGrades(grades);
                } else {
                    this.gradeService.setGradeList(grades);
                }
                this.ngOnInit();
                this.alertService.presentToastWithMsg('Grades imported successfully.');
            }
        });
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
                ectsSum += +grade.credits;
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
        if (this.currentGrades && this.currentGrades.length) {
            this.dataService.downloadCsv(this.currentGrades, fileName);
            this.alertService.presentToastWithMsg('Download started successfully.');
        } else {
            this.alertService.presentToastWithMsg('No data to export!', 'danger');
        }
    }

    public onNavigate(gradeEntry?: GradeEntry) {
        this.router.navigate(['tabs/create-edit', gradeEntry.id]);
    }

    public deleteGrade(gradeEntry: GradeEntry) {
        this.alertService.presentConfirmationAlert('Do you really want to remove the grade of <strong>' +
            gradeEntry.course + '</strong>?').then((confirm) => {
                if (confirm) {
                    this.gradeService.removeGrade(gradeEntry);
                    this.alertService.presentToastWithMsg('Grade deleted successfully.');
                }
            this.ngOnInit();
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
