import { Component, OnInit } from '@angular/core';
import { GradeService } from '../services/grade.service';
import { NumberEntryModel } from '../models/number-entry.model';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
    numbers: NumberEntryModel;

    constructor(private gradeService: GradeService) {}

    ngOnInit() {
        this.gradeService.numbers.subscribe((result) => {
            this.numbers = result;
        });
    }
}
