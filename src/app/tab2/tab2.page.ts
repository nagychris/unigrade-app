import { Component } from '@angular/core';
import {GradeEntry} from "../shared/GradeEntry";
import {GRADE_MOCKS} from "../shared/gradeEntryMockData";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  currentGrades: GradeEntry[];

  constructor() {}

  ngOnInit(){
    this.getCurrentGrades();
  }

  private getCurrentGrades(): void {
    this.currentGrades = GRADE_MOCKS;
  }
}
