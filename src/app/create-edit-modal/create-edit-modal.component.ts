import {Component, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GradeEntry} from "../shared/GradeEntry";

@Component({
    selector: 'app-create-edit-modal',
    templateUrl: './create-edit-modal.component.html',
    styleUrls: ['./create-edit-modal.component.scss'],
})
export class CreateEditModalComponent implements OnInit {
    createEditForm: FormGroup;
    gradeEntry = new GradeEntry();

    constructor(private modalCtrl: ModalController,
                private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.createEditForm = this.formBuilder.group({
            course: [this.gradeEntry.course],
            semester: [this.gradeEntry.semester],
            grade: [this.gradeEntry.grade],
            credits: [this.gradeEntry.credits]
        })
    }

    onSubmit() {
        this.modalCtrl.dismiss({
            'dismissed': true,
            'gradeEntry': this.gradeEntry
        });
    }

    dismiss() {
        this.modalCtrl.dismiss({
            'dismissed': true,
        });
    }

}
