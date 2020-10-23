import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GradeEntry } from "../services/GradeEntry";
import { GradeService } from "../services/grade.service";
import { AlertService } from "../services/alert.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
	selector: "app-create-edit",
	templateUrl: "./create-edit.component.html",
	styleUrls: ["./create-edit.component.scss"],
})
export class CreateEditComponent implements OnInit {
	private id: number;
	createEditForm: FormGroup;
	@Input() gradeEntry: GradeEntry;

	constructor(
		private location: Location,
		private formBuilder: FormBuilder,
		private gradeService: GradeService,
		private alertService: AlertService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.id = +this.route.snapshot.params.id;

		if (this.id) {
			this.gradeEntry = this.gradeService.getGradeById(this.id);
		} else {
			this.gradeEntry = {
				course: "",
				semester: "",
				grade: 0,
				credits: 0,
				counts: true,
			};
		}

		this.createEditForm = this.formBuilder.group({
			course: [
				this.gradeEntry.course,
				[Validators.required, Validators.minLength(2)],
			],
			semester: [this.gradeEntry.semester, [Validators.required]],
			grade: [
				this.gradeEntry.grade,
				[Validators.required, Validators.min(1.0), Validators.max(5.0)],
			],
			credits: [
				this.gradeEntry.credits,
				[Validators.required, Validators.min(1)],
			],
			counts: [this.gradeEntry.counts],
		});
	}

	onSubmit() {
		if (!this.createEditForm.valid) {
			this.alertService.presentToastWithMsg(
				"Please fill in all required fields first.",
				"danger"
			);
		} else {
			let message: string,
				grade = this.createEditForm.getRawValue();
			if (!this.id) {
				// new gradeEntry --> add to list
				this.gradeService.addGrade(grade);
				message = "Grade created successfully.";
			} else {
				// edit existing gradeEntry
				grade.id = this.id;
				this.gradeService.updateGrade(grade);
				message = "Grade updated successfully.";
			}
			this.router.navigate(["tabs/home"]).then(() => {
				this.alertService.presentToastWithMsg(message).then(() => {
					this.createEditForm.reset();
				});
			});
		}
	}

	cancel() {
		this.location.back();
	}

	get course() {
		return this.createEditForm.get("course");
	}

	get semester() {
		return this.createEditForm.get("semester");
	}

	get grade() {
		return this.createEditForm.get("grade");
	}

	get credits() {
		return this.createEditForm.get("credits");
	}

	get counts() {
		return this.createEditForm.get("counts");
	}
}
