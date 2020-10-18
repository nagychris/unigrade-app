import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GradeEntry} from "../services/GradeEntry";
import {GradeService} from "../services/grade.service";
import {AlertService} from "../services/alert.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
    selector: 'app-create-edit',
    templateUrl: './create-edit.component.html',
    styleUrls: ['./create-edit.component.scss'],
})
export class CreateEditComponent implements OnInit {
    private id: number;
    createEditForm: FormGroup;
    @Input() gradeEntry: GradeEntry;

    constructor(private location: Location,
                private formBuilder: FormBuilder,
                private gradeService: GradeService,
                private alertService: AlertService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.id = +this.route.snapshot.params.id;

        if (this.id) {
            this.gradeEntry = this.gradeService.getGradeById(this.id);
        } else {
            this.gradeEntry = {
                course: '',
                semester: '',
                grade: 0,
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
        let message: string;
        if (!this.id) { // new gradeEntry --> add to list
            this.gradeService.addGrade(this.createEditForm.getRawValue());
            message = 'Grade created successfully.'
        } else { // edit existing gradeEntry
            this.gradeService.updateGrade(this.createEditForm.getRawValue());
            message = 'Grade updated successfully.';
        }
        this.alertService.presentToastWithMsg(message);
        this.router.navigate(['tabs/tab1']);
    }

    cancel() {
        this.location.back();
    }

    get course() { return this.createEditForm.get('course'); }

    get semester() { return this.createEditForm.get('semester'); }

    get grade() { return this.createEditForm.get('grade'); }

    get credits() { return this.createEditForm.get('credits'); }

}
