export interface Task {
  id: string;
  idEmployee: string;
  idProject: string;
  description: string;
  startDate: Date;
  estimatedDays: number;
  state: "In Progress" | "Done";
}
