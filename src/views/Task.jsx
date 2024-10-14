import { useState, useEffect } from "react";
import {
  addTask,
  fetchEmployees,
  fetchProjects,
} from "../controllers/coreController.ts";
import { useNavigate } from "react-router-dom";
import { parseISO, formatISO } from "date-fns";
import "../styles/styles.css";

const Task = () => {
  const [data, setData] = useState({
    idEmployee: "",
    idProject: "",
    description: "",
    startDate: "",
    estimatedDays: "",
    state: "In Progress",
  });
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employees = await fetchEmployees();
        setEmployees(employees);

        const projects = await fetchProjects();
        setProjects(projects);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const handleInput = (e) => {
    const { id, value } = e.target;
    setData({
      ...data,
      [id]: value,
    });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      // Parse the startDate to ISO format
      const parsedDate = parseISO(data.startDate);
      const formattedDate = formatISO(parsedDate, { representation: "date" });

      const taskData = {
        ...data,
        startDate: formattedDate,
        estimatedDays: parseInt(data.estimatedDays),
      };

      await addTask(taskData);
      navigate(-1);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h1>Create Task</h1>
      <form onSubmit={handleAdd}>
        <label htmlFor="idEmployee">Employee</label>
        <select
          id="idEmployee"
          value={data.idEmployee}
          onChange={handleInput}
          required
        >
          <option value="">Select Employee</option>
          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.name} {employee.surname}
            </option>
          ))}
        </select>

        <label htmlFor="idProject">Project</label>
        <select
          id="idProject"
          value={data.idProject}
          onChange={handleInput}
          required
        >
          <option value="">Select Project</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.projectName}
            </option>
          ))}
        </select>

        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text"
          placeholder="Task Description"
          value={data.description}
          onChange={handleInput}
          required
        />

        <label htmlFor="startDate">Start Date</label>
        <input
          id="startDate"
          type="date"
          value={data.startDate}
          onChange={handleInput}
          required
        />

        <label htmlFor="estimatedDays">Estimated Days</label>
        <input
          id="estimatedDays"
          type="number"
          placeholder="Estimated Days"
          value={data.estimatedDays}
          onChange={handleInput}
          required
        />

        <label htmlFor="state">State</label>
        <select id="state" value={data.state} onChange={handleInput} required>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>

        <button type="submit">Create</button>
      </form>
      <button className="back-button" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
};

export default Task;
