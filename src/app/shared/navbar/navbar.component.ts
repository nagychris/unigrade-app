import { Component, Input, OnInit } from "@angular/core";
import { GradeEntry } from "../../services/GradeEntry";

@Component({
	selector: "app-navbar",
	templateUrl: "./navbar.component.html",
	styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
	@Input() currentGrades: GradeEntry[];
	@Input() gpa: number;
	@Input() credits: number;

	constructor() {}

	ngOnInit() {
		console.log(this.currentGrades);
	}
}
