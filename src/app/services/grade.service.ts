import { Injectable } from '@angular/core';
import { GradeEntryModel } from '../models/grade-entry.model';
import { map } from 'rxjs/operators';
import { NgxCsvParser } from 'ngx-csv-parser';
import { saveAs } from 'file-saver';
import { BehaviorSubject, Observable } from 'rxjs';
import { NumberEntryModel } from '../models/number-entry.model';
import { AlertService } from './alert.service';

@Injectable({
    providedIn: 'root',
})
export class GradeService {
    private GRADE_LIST = 'gradeList';

    private numberSource = new BehaviorSubject(new NumberEntryModel());
    numbers = this.numberSource.asObservable();

    constructor(
        private csvParser: NgxCsvParser,
        private alertService: AlertService
    ) {
        this.calculateNumbers();
    }

    public getGradeById(id: number): GradeEntryModel {
        const grades = this.getGradeList();
        return grades.find((entry) => entry.id == id);
    }

    public getGradeList(): GradeEntryModel[] {
        return JSON.parse(localStorage.getItem(this.GRADE_LIST));
    }

    public setGradeList(gradeList: GradeEntryModel[]): void {
        localStorage.setItem(this.GRADE_LIST, JSON.stringify(gradeList));
        this.calculateNumbers();
    }

    public addGrade(gradeEntry: GradeEntryModel): void {
        let gradeList: GradeEntryModel[] = this.getGradeList();
        if (!gradeList) {
            gradeList = [];
        }
        gradeEntry.id = gradeList.length + 1;
        gradeList.push(gradeEntry);
        this.setGradeList(gradeList);
    }

    public updateGrade(gradeEntry: GradeEntryModel): void {
        let gradeList: GradeEntryModel[] = this.getGradeList();
        gradeList.forEach((entry, index) => {
            if (entry.id == gradeEntry.id) {
                gradeList.splice(index, 1, gradeEntry);
            }
        });
        this.setGradeList(gradeList);
    }

    public removeGrade(gradeEntry: GradeEntryModel): void {
        let gradeList: GradeEntryModel[] = this.getGradeList();
        gradeList.forEach((entry, index) => {
            if (entry.id == gradeEntry.id) {
                gradeList.splice(index, 1);
            }
        });
        this.setGradeList(gradeList);
        this.calculateNumbers();
    }

    public filterItems(searchTerm) {
        const gradeList = this.getGradeList(),
            result = gradeList.filter((grade) => {
                return (
                    grade.course
                        .toLowerCase()
                        .indexOf(searchTerm.toLowerCase()) > -1
                );
            });
        return result.length ? result : null;
    }

    public appendGrades(grades: GradeEntryModel[]) {
        grades.forEach((grade) => {
            this.addGrade(grade);
        });
        this.calculateNumbers();
    }

    /**
     * Converts given array of JSON objects as CSV and downloads it
     *
     * @param {Object[]} data - Array of JSON objects to export as csv
     * @param {String} fileName - Name of file to save, 'unigrade-data.csv' if not specified
     */
    public downloadCsv(data: Object[], fileName: string = 'unigrade-data.csv') {
        const replacer = (key, value) => (value === null ? '-' : value); // handle null-values
        const header = Object.keys(data[0]);
        let csv = data.map((row) =>
            header
                .map((fieldName) => JSON.stringify(row[fieldName], replacer))
                .join(',')
        );
        csv.unshift(header.join(','));
        let csvArray = csv.join('\r\n');

        let file = new Blob([csvArray], { type: 'text/csv' });
        saveAs(file, fileName);
    }

    public exportGrades(fileName?: string) {
        const gradeList = this.getGradeList();
        if (gradeList && gradeList.length) {
            this.downloadCsv(gradeList, fileName);
            this.alertService.presentToastWithMsg('Download gestartet.');
        } else {
            this.alertService.presentToastWithMsg(
                'Keine Noten vorhanden!',
                'danger'
            );
        }
    }

    /**
     * Takes a csv file and parses its content to an Array of JSON objects.
     * The values of the first line (header) is treated as the keys for the resulting JSON objects.
     *
     * @param {File} file - The CSV file to be parsed
     *
     * @returns Either an Array of JSON objects
     *          or {@code false} if any errors occur while parsing the file
     */
    public parseCsv(file: File): Observable<Array<GradeEntryModel>> {
        return this.csvParser
            .parse(file, { header: true, delimiter: ',' })
            .pipe(map((result) => result as Array<GradeEntryModel>));
    }

    public calculateNumbers() {
        const grades = this.getGradeList();
        let result = {
            ects: 0,
            gpa: 0.0,
        } as NumberEntryModel;

        if (grades && grades.length) {
            let gradeSum = 0,
                totalEcts = 0,
                countingEcts = 0;
            grades.forEach((grade) => {
                if (grade.counts) {
                    gradeSum += +grade.grade * +grade.credits;
                    countingEcts += +grade.credits;
                }
                totalEcts += +grade.credits;
            });
            result.ects = totalEcts;
            result.gpa = countingEcts ? gradeSum / countingEcts : 0.0;
        }
        this.numberSource.next(result);
    }
}
