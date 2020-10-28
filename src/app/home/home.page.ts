import { Component } from "@angular/core";
import { GradeEntryModel } from "../models/grade-entry.model";
import { AlertController } from "@ionic/angular";
import { GradeService } from "../services/grade.service";
import { AlertService } from "../services/alert.service";
import { Router } from "@angular/router";

@Component({
	selector: "app-home",
	templateUrl: "home.page.html",
	styleUrls: ["home.page.scss"],
})
export class HomePage {
	searchTerm: string = "";
	currentGrades: GradeEntryModel[];
	noFilterResults: boolean = false;

	constructor(
		private gradeService: GradeService,
		public alertCtrl: AlertController,
		private alertService: AlertService,
		private router: Router
	) {}

	ionViewDidEnter() {
		this.currentGrades = this.gradeService.getGradeList();
	}

	getFilteredGrades() {
		this.currentGrades = this.gradeService.filterItems(this.searchTerm);
		if (!this.currentGrades) {
			this.noFilterResults = true;
		}
	}

	exportGrades(fileName?: string) {
		if (this.currentGrades && this.currentGrades.length) {
			this.gradeService.downloadCsv(this.currentGrades, fileName);
			this.alertService.presentToastWithMsg("Download started successfully.");
		} else {
			this.alertService.presentToastWithMsg("No data to export!", "danger");
		}
	}

	onNavigate(gradeEntry?: GradeEntryModel) {
		this.router.navigate(["tabs/create-edit", gradeEntry.id]);
	}

	deleteGrade(gradeEntry: GradeEntryModel) {
		this.alertService
			.presentConfirmationAlert(
				"Do you really want to remove the grade of <strong>" +
					gradeEntry.course +
					"</strong>?"
			)
			.then((confirm) => {
				if (confirm) {
					this.gradeService.removeGrade(gradeEntry);
					this.currentGrades = this.gradeService.getGradeList();
					this.alertService.presentToastWithMsg("Grade deleted successfully.");
				}
			});
	}

	updateCounts(gradeEntry: GradeEntryModel, counts: boolean) {
		gradeEntry.counts = counts;
		this.gradeService.updateGrade(gradeEntry);
	}
}
