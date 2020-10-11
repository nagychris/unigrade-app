import {Component, Input, OnInit} from '@angular/core';
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
    @Input() gradeEntry: GradeEntry;

    constructor(private modalCtrl: ModalController,
                private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        if(this.gradeEntry === undefined || !this.gradeEntry) {
            this.gradeEntry = {
                course: '',
                semester: '',
                grade: 5.0,
                credits: 0
            }
        }

        this.createEditForm = this.formBuilder.group({
            course: [this.gradeEntry.course, [
                Validators.required,
                Validators.minLength(2)
            ]],
            semester: [this.gradeEntry.semester, [
                Validators.min(1)
            ]],
            grade: [this.gradeEntry.grade, [
                Validators.required,
                Validators.min(1.0),
                Validators.max(5.0)
            ]],
            credits: [this.gradeEntry.credits, [
                Validators.required,
                Validators.min(1)
            ]]
        });
    }

    onSubmit() {
        this.modalCtrl.dismiss({
            'dismissed': true,
            'gradeEntry': this.createEditForm.getRawValue()
        });
    }

    cancel() {
        this.modalCtrl.dismiss({
            'dismissed': true,
        });
    }

    get course() { return this.createEditForm.get('course'); }

    get semester() { return this.createEditForm.get('semester'); }

    get grade() { return this.createEditForm.get('grade'); }

    get credits() { return this.createEditForm.get('credits'); }

}
