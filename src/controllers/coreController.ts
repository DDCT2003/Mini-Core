import { db } from "../utils/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { Employee } from "../models/employees";
import { Project } from "../models/projects";
import { Task } from "../models/tasks";

export const addEmployee = async (employee: Employee) => {
  try {
    const employeesCollectionRef = collection(db, "employees");
    await addDoc(employeesCollectionRef, {
      ...employee,
      timeStamp: serverTimestamp(),
    });
  } catch (err) {
    throw new Error("Error adding employee: " + err.message);
  }
};

export const addProject = async (project: Project) => {
  try {
    const projectsCollectionRef = collection(db, "projects");
    await addDoc(projectsCollectionRef, {
      ...project,
      timeStamp: serverTimestamp(),
    });
  } catch (err) {
    throw new Error("Error adding project: " + err.message);
  }
};

export const addTask = async (task: Task) => {
  try {
    const tasksCollectionRef = collection(db, "tasks");
    await addDoc(tasksCollectionRef, {
      ...task,
      timeStamp: serverTimestamp(),
    });
  } catch (err) {
    throw new Error("Error adding task: " + err.message);
  }
};

export const fetchEmployees = async (): Promise<Employee[]> => {
  try {
    const employeesCollection = collection(db, "employees");
    const employeesSnapshot = await getDocs(employeesCollection);
    return employeesSnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Employee)
    );
  } catch (err) {
    console.error("Error fetching employees:", err);
    throw new Error("Error fetching employees: " + err.message);
  }
};

export const fetchProjects = async (): Promise<Project[]> => {
  try {
    const projectsCollection = collection(db, "projects");
    const projectsSnapshot = await getDocs(projectsCollection);
    return projectsSnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Project)
    );
  } catch (err) {
    console.error("Error fetching projects:", err);
    throw new Error("Error fetching projects: " + err.message);
  }
};

export const fetchTasks = async (): Promise<Task[]> => {
  try {
    const tasksCollection = collection(db, "tasks");
    const tasksSnapshot = await getDocs(tasksCollection);
    return tasksSnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Task)
    );
  } catch (err) {
    console.error("Error fetching tasks:", err);
    throw new Error("Error fetching tasks: " + err.message);
  }
};
