import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  /**
   * Converts given array of JSON objects as CSV and downloads it
   *
   * @param {Object[]} data - Array of JSON objects to export as csv
   * @param {String} fileName - Name of file to save, 'unigrade-data.csv' if not specified
   */
  downloadCsv(data: Object[], fileName: string = 'unigrade-data.csv') {
    const replacer = (key, value) => value === null ? '-' : value;
    const header = Object.keys(data[0]);
    let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');

    let file = new Blob([csvArray], {type: 'text/csv'});
    saveAs(file, fileName);
  }
}
