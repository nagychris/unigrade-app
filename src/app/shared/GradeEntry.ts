export class GradeEntry {
  id?: number;
  course: string = '';
  grade: number = 5.0;
  credits: number = 0;
  semester?: string; // optional, because not needed in the calculation
}
