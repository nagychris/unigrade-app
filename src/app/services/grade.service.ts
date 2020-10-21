import {Injectable} from "@angular/core";
import {GradeEntry} from "./GradeEntry";
import {Observable, Subject} from "rxjs";
import {map} from "rxjs/operators";
import {NgxCsvParser} from "ngx-csv-parser";
import {saveAs} from 'file-saver';

@Injectable({
    providedIn: "root",
})
export class GradeService {
    private GRADE_LIST = 'gradeList';
    private gradesSource = new Subject<any>();

    constructor(private csvParser: NgxCsvParser) {
    }

    public getGradeById(id: number): GradeEntry {
        const grades = this.getGradeList();
        return grades.find(entry => entry.id == id);
    }

    public getGradeList(): GradeEntry[] {
        return JSON.parse(localStorage.getItem(this.GRADE_LIST));
    }

    public setGradeList(gradeList: GradeEntry[]): void {
        localStorage.setItem(this.GRADE_LIST, JSON.stringify(gradeList));
    }

    public addGrade(gradeEntry: GradeEntry): void {
        let gradeList: GradeEntry[] = this.getGradeList();
        if (!gradeList) {
            gradeList = [];
        }
        gradeEntry.id = gradeList.length + 1;
        gradeList.push(gradeEntry);
        this.setGradeList(gradeList);
    }

    public updateGrade(gradeEntry: GradeEntry, id: number): void {
        let gradeList: GradeEntry[] = this.getGradeList();
        gradeEntry.id = id;
        gradeList.forEach((entry, index) => {
            if (entry.id == id) {
                gradeList.splice(index, 1, gradeEntry);
            }
        });
        this.setGradeList(gradeList);
    }

    public removeGrade(gradeEntry: GradeEntry): void {
        let gradeList: GradeEntry[] = this.getGradeList();
        gradeList.forEach((entry, index) => {
            if (entry.id == gradeEntry.id) {
                gradeList.splice(index,1);
            }
        });
        this.setGradeList(gradeList);
    }

    public filterItems(searchTerm) {
        const grades = this.getGradeList();
        return grades.filter(grade => {
            return grade.course.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });
    }

    public appendGrades(grades: GradeEntry[]) {
        grades.forEach(grade => {
            this.addGrade(grade);
        });
    }

    /**
     * Converts given array of JSON objects as CSV and downloads it
     *
     * @param {Object[]} data - Array of JSON objects to export as csv
     * @param {String} fileName - Name of file to save, 'unigrade-data.csv' if not specified
     */
    public downloadCsv(data: Object[], fileName: string = 'unigrade-data.csv') {
        const replacer = (key, value) => value === null ? '-' : value; // handle null-values
        const header = Object.keys(data[0]);
        let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
        csv.unshift(header.join(','));
        let csvArray = csv.join('\r\n');

        let file = new Blob([csvArray], {type: 'text/csv'});
        saveAs(file, fileName);
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
    public parseCsv(file: File): Observable<Array<GradeEntry>> {
        return this.csvParser.parse(file, {header: true, delimiter: ','})
            .pipe(map(result => result as Array<GradeEntry>));
    }

    public notifyHomePage(grades: GradeEntry[], role: string, keepGrades?: boolean) {
        this.gradesSource.next({
            grades: grades,
            role: role,
            keepGrades: keepGrades
        });
    }

    public getImportedGrades() {
        return this.gradesSource.asObservable();
    }
}
