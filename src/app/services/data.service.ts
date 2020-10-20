import {Injectable} from '@angular/core';
import {saveAs} from 'file-saver';
import {NgxCsvParser, NgxCSVParserError} from 'ngx-csv-parser';
import {GradeEntry} from "./GradeEntry";
import {map} from "rxjs/operators";
import {Observable, Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private importGradesSource = new Subject<any>();

    constructor(private csvParser: NgxCsvParser) {
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

    public setImportedGrades(grades: GradeEntry[], keepGrades: boolean) {
        this.importGradesSource.next({
            grades: grades,
            keepGrades: keepGrades
        });
    }

    public getImportedGrades() {
        return this.importGradesSource.asObservable();
    }
}
