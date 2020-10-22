import {Component, OnDestroy, OnInit} from "@angular/core";
import {GradeEntry} from "../services/GradeEntry";
import {AlertController} from "@ionic/angular";
import {GradeService} from "../services/grade.service";
import {AlertService} from "../services/alert.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
    selector: "app-home",
    templateUrl: "home.page.html",
    styleUrls: ["home.page.scss"],
})
export class HomePage {
    searchTerm: string = "";
    totalEcts: number = 0;
    currentGPA: number = 0.0;
    currentGrades: GradeEntry[];

    constructor(private gradeService: GradeService,
                public alertCtrl: AlertController,
                private alertService: AlertService,
                private router: Router) {
    }

    ionViewDidEnter() {
        this.calculateNumbers();
    }

    calculateNumbers() {
        this.currentGrades = this.gradeService.getGradeList();
        if (this.currentGrades && this.currentGrades.length) {
            let gradeSum = 0,
                totalEcts = 0,
                countingEcts = 0;
            this.currentGrades.forEach((grade) => {
                if (grade.counts) {
                    gradeSum += +grade.grade * +grade.credits;
                    countingEcts += +grade.credits;
                }
                totalEcts += +grade.credits;
            });
            this.totalEcts = totalEcts;
            this.currentGPA = countingEcts
                ? gradeSum / countingEcts
                : 0.0;
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
            this.gradeService.downloadCsv(this.currentGrades, fileName);
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
                this.calculateNumbers();
                this.alertService.presentToastWithMsg('Grade deleted successfully.');
            }
        });
    }

    updateCounts(gradeEntry: GradeEntry, counts: boolean) {
        console.log(gradeEntry, counts);
        gradeEntry.counts = counts;
        this.gradeService.updateGrade(gradeEntry);
    }

}
