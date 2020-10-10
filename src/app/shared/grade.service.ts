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

    public updateGradeList(gradeEntry: GradeEntry) {
        let data: GradeEntry[] = this.getGradeList();
        if (!data) {
            data = [];
        }
        data.push(gradeEntry);
        localStorage.setItem(this.GRADE_LIST, JSON.stringify(data));
    }

}
