import {Component, Input, OnInit} from '@angular/core';
import {GradeEntry} from "../shared/GradeEntry";

@Component({
  selector: 'app-grade-card',
  templateUrl: './grade-card.component.html',
  styleUrls: ['./grade-card.component.scss'],
})
export class GradeCardComponent implements OnInit {
  @Input() gradeEntry: GradeEntry;

  constructor() { }

  ngOnInit() {}

}
