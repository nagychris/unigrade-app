import { Component } from '@angular/core';
import { GradeEntryModel } from '../models/grade-entry.model';
import { AlertController } from '@ionic/angular';
import { GradeService } from '../services/grade.service';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    searchTerm = '';
    currentGrades: GradeEntryModel[];
    noFilterResults = false;

    constructor(
        private gradeService: GradeService,
        public alertCtrl: AlertController,
        private alertService: AlertService,
        private router: Router
    ) {}

    ionViewDidEnter() {
        this.currentGrades = this.gradeService.getGradeList();
    }

    getFilteredGrades() {
        this.currentGrades = this.gradeService.filterItems(this.searchTerm);
        if (!this.currentGrades) {
            this.noFilterResults = true;
        }
    }

    onNavigate(gradeEntry?: GradeEntryModel) {
        this.router.navigate(['tabs/create-edit', gradeEntry.id]);
    }

    deleteGrade(gradeEntry: GradeEntryModel) {
        this.alertService
            .presentConfirmationAlert(
                'Note löschen',
                'Möchtest du die Note vom Kurs <strong>' +
                    gradeEntry.course +
                    '</strong> wirklich löschen?'
            )
            .then((confirm) => {
                if (confirm) {
                    this.gradeService.removeGrade(gradeEntry);
                    this.currentGrades = this.gradeService.getGradeList();
                    this.alertService.presentToastWithMsg(
                        'Note erfolgreich gelöscht.'
                    );
                }
            });
    }

    updateCounts(gradeEntry: GradeEntryModel, counts: boolean) {
        gradeEntry.counts = counts;
        this.gradeService.updateGrade(gradeEntry);
    }
}
