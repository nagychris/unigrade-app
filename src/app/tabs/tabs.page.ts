import { Component } from '@angular/core';
import { GradeService } from '../services/grade.service';
import { AlertService } from '../services/alert.service';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
    constructor(
        private gradeService: GradeService,
        private alertService: AlertService
    ) {}

    public onExport() {
        this.alertService
            .presentConfirmationAlert(
                'Noten exportieren',
                'Möchtest du deine Noten als CSV-Datei exportieren?'
            )
            .then((confirm) => {
                if (confirm) {
                    this.gradeService.exportGrades();
                }
            });
    }
}
