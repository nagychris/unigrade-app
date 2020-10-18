import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DataService} from "../services/data.service";
import {GradeService} from "../services/grade.service";
import {AlertService} from "../services/alert.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss'],
})
export class ImportComponent implements OnInit {
  file: File;

  constructor(private dataService: DataService,
              private gradeService: GradeService,
              private alertService: AlertService,
              private router: Router
              ) { }

  ngOnInit() {}

  public loadFile(event) {
    this.file = event.target.files[0];
  }

  public importGrades() {
    if (this.file) {
      this.dataService.parseCsv(this.file).subscribe(result => {
        this.gradeService.setGradeList(result);
        this.router.navigate(['tabs/home']);
        this.alertService.presentToastWithMsg('Data imported successfully.');
      }, error => {
        this.alertService.presentToastWithMsg('Error while loading file: ' + error, 'danger');
      });
    } else {
      this.alertService.presentToastWithMsg('Error: No file to import!', 'danger');
    }
  }

}
