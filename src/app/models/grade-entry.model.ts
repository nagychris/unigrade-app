export class GradeEntryModel {
    id?: number;
    course = '';
    grade = 5.0;
    credits = 0;
    counts = true;
    semester?: string; // optional, because not needed in the calculation
}
