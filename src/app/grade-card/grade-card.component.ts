import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GradeEntryModel } from '../models/grade-entry.model';

@Component({
    selector: 'app-grade-card',
    templateUrl: './grade-card.component.html',
    styleUrls: ['./grade-card.component.scss'],
})
export class GradeCardComponent implements OnInit {
    @Input() gradeEntry: GradeEntryModel;
    @Input() counts: boolean;

    @Output()
    editClicked: EventEmitter<GradeEntryModel> = new EventEmitter<
        GradeEntryModel
    >();
    @Output()
    deleteClicked: EventEmitter<GradeEntryModel> = new EventEmitter<
        GradeEntryModel
    >();
    @Output()
    countsClicked: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor() {}

    ngOnInit() {}

    evaluateColor(): string {
        const grade = this.gradeEntry.grade;
        if (grade) {
            if (grade <= 2.7) {
                return 'success';
            } else if (grade <= 3.7) {
                return 'warning';
            } else {
                return 'danger';
            }
        }
    }
}
