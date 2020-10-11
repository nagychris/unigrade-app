import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GradeEntry} from "../shared/GradeEntry";
import {ActionSheetController} from "@ionic/angular";

@Component({
    selector: 'app-grade-card',
    templateUrl: './grade-card.component.html',
    styleUrls: ['./grade-card.component.scss'],
})
export class GradeCardComponent implements OnInit {
    @Input() gradeEntry: GradeEntry;

    @Output()
    editClicked: EventEmitter<GradeEntry> = new EventEmitter<GradeEntry>();
    @Output()
    deleteClicked: EventEmitter<GradeEntry> = new EventEmitter<GradeEntry>();

    constructor(public actionSheetCtrl: ActionSheetController) {
    }

    ngOnInit() {
    }

    async presentActionSheet() {
        const actionSheet = await this.actionSheetCtrl.create({
            header: this.gradeEntry.course,
            cssClass: 'grade-action-sheet',
            buttons: [{
                text: 'Edit',
                handler: () => {
                    this.editClicked.emit(this.gradeEntry);
                }
            }, {
                text: 'Delete',
                role: 'destructive',
                handler: () => {
                    this.deleteClicked.emit(this.gradeEntry);
                }
            }, {
                text: 'Cancel',
                role: 'cancel'
            }]
        });
        await actionSheet.present();
    }
}
