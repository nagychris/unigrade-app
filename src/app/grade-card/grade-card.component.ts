import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { GradeEntryModel } from "../models/grade-entry.model";
import { ActionSheetController } from "@ionic/angular";

@Component({
	selector: "app-grade-card",
	templateUrl: "./grade-card.component.html",
	styleUrls: ["./grade-card.component.scss"],
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

	constructor(public actionSheetCtrl: ActionSheetController) {}

	ngOnInit() {}

	async presentActionSheet() {
		const actionSheet = await this.actionSheetCtrl.create({
			header: this.gradeEntry.course,
			cssClass: "grade-action-sheet",
			buttons: [
				{
					text: "Edit",
					handler: () => {
						this.editClicked.emit(this.gradeEntry);
					},
				},
				{
					text: "Delete",
					role: "destructive",
					handler: () => {
						this.deleteClicked.emit(this.gradeEntry);
					},
				},
				{
					text: "Cancel",
					role: "cancel",
				},
			],
		});
		await actionSheet.present();
	}

	evaluateColor(): string {
		const grade = this.gradeEntry.grade;
		if (grade) {
			if (grade <= 2.7) {
				return "success";
			} else if (grade <= 3.7) {
				return "warning";
			} else {
				return "danger";
			}
		}
	}
}
