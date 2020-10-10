export class GradeEntry {
  course: string;
  grade: number;
  credits: number;
  semester: string;

  constructor(
    course?: string,
    grade?: number,
    credits?: number,
    semester?: string
  ) {
    this.course = course;
    this.grade = grade;
    this.credits = credits;
    this.semester = semester;
  }
}
