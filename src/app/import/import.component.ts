import { Component, OnInit } from '@angular/core';
import { GradeService } from '../services/grade.service';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-import',
    templateUrl: './import.component.html',
    styleUrls: ['./import.component.scss'],
})
export class ImportComponent implements OnInit {
    file: File;
    keepGrades = true;

    constructor(
        private alertService: AlertService,
        private router: Router,
        private gradeService: GradeService
    ) {}

    ngOnInit() {}

    public loadFile(event) {
        this.file = event.target.files[0];
    }

    public importGrades() {
        if (this.file) {
            this.gradeService.parseCsv(this.file).subscribe(
                (resultGrades) => {
                    this.keepGrades
                        ? this.gradeService.appendGrades(resultGrades)
                        : this.gradeService.setGradeList(resultGrades);
                    this.router.navigate(['tabs/home']);
                },
                (error) => {
                    this.alertService.presentToastWithMsg(
                        'Fehler beim Laden der Datei: ' + error,
                        'danger'
                    );
                }
            );
        } else {
            this.alertService.presentToastWithMsg(
                'Keine Datei gefunden!',
                'danger'
            );
        }
    }
}
