import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DataService} from "../services/data.service";
import {GradeService} from "../services/grade.service";

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss'],
})
export class ImportComponent implements OnInit {
  @Output() importEmitter = new EventEmitter<boolean>();

  constructor(private dataService: DataService,
              private gradeService: GradeService,
              ) { }

  ngOnInit() {}

  public loadFile(event) {
    const file = event.target.files[0];
    if (file) {
      this.dataService.parseCsv(file).subscribe(result => {
        console.log(result);
        this.gradeService.setGradeList(result);
        this.importEmitter.emit(true);
      });
      //
      //     if (grades) {
      //         this.gradeService.setGradeList(grades as GradeEntry[]);
      //         this.presentToastWithMsg('Grades imported successfully.');
      //     }
      // } else {
      //     this.presentToastWithMsg('Failed to load CSV file! Make sure you chose the right format.',
      //         'danger');
    }
  }

}
