import {Component} from "@angular/core";
import {GradeEntry} from "../shared/GradeEntry";
import {GRADE_MOCKS} from "../shared/gradeEntryMockData";
import {ModalController} from "@ionic/angular";
import {CreateEditModalComponent} from "../create-edit-modal/create-edit-modal.component";

@Component({
    selector: "app-tab1",
    templateUrl: "tab1.page.html",
    styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
    currentGPA: number;
    currentGrades: GradeEntry[];


    constructor(public modalController: ModalController) {}

    ngOnInit() {
        this.calculateGPA();
        this.getCurrentGrades();
    }

    private calculateGPA() {
        const grades = GRADE_MOCKS;
        let gradeSum = 0,
            ectsSum = 0;

        grades.forEach((grade) => {
            gradeSum += grade.grade * grade.credits;
            ectsSum += grade.credits;
        });
        this.currentGPA = gradeSum / ectsSum;
    }

    private getCurrentGrades(): void {
        this.currentGrades = GRADE_MOCKS;
    }

    async presentModal() {
        const modal = await this.modalController.create({
            component: CreateEditModalComponent
        });

        return await modal.present();
    }

    private addGrade(
        course: string,
        grade: number,
        ects: number,
        semester: string
    ): void {
        let gradeEntry = new GradeEntry(course, grade, ects, semester);
        this.currentGrades.push(gradeEntry);
    }
}
