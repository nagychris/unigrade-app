export class GradeEntry {
  course: string;
  grade: number;
  ectsPoints: number;
  semester: string;

  constructor(
    course: string,
    grade: number,
    ectsPoints: number,
    semester: string
  ) {
    this.course = course;
    this.grade = grade;
    this.ectsPoints = ectsPoints;
    this.semester = semester;
  }
}
