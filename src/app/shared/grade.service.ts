import {Injectable} from "@angular/core";
import {GradeEntry} from "./GradeEntry";

@Injectable({
    providedIn: "root",
})
export class GradeService {
    private GRADE_LIST = 'gradeList';

    constructor() {
    }

    public getGradeList() {
        return JSON.parse(localStorage.getItem(this.GRADE_LIST));
    }

    private setGradeList(gradeList: GradeEntry[]) {
        localStorage.setItem(this.GRADE_LIST, JSON.stringify(gradeList));
    }

    public addGrade(gradeEntry: GradeEntry) {
        let gradeList: GradeEntry[] = this.getGradeList();
        if (!gradeList) {
            gradeList = [];
        }
        gradeEntry.id = gradeList.length + 1;
        gradeList.push(gradeEntry);
        this.setGradeList(gradeList);
    }

    public updateGrade(gradeEntry: GradeEntry) {
        let gradeList: GradeEntry[] = this.getGradeList();
        gradeList.forEach((entry, index) => {
            if (entry.id === gradeEntry.id) {
                gradeList.splice(index, 1, gradeEntry);
            }
        });
        this.setGradeList(gradeList);
    }

    public removeGrade(gradeEntry: GradeEntry) {
        let gradeList: GradeEntry[] = this.getGradeList();
        gradeList.forEach((entry, index) => {
            if (entry.id === gradeEntry.id) {
                gradeList.splice(index,1);
            }
        });
        this.setGradeList(gradeList);
    }

    public filterItems(searchTerm) {
        const grades = this.getGradeList();
        return grades.filter(grade => {
            return grade.course.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        })
    }

}
