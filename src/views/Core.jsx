import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import {
  fetchEmployees,
  fetchProjects,
  fetchTasks,
} from "../controllers/coreController.ts";
import "../styles/dataTablesStyles.css";

const Core = () => {
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState({ startDate: "", endDate: "" });
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeesData = await fetchEmployees();
        setEmployees(employeesData);

        const projectsData = await fetchProjects();
        setProjects(projectsData);

        const tasksData = await fetchTasks();
        setTasks(tasksData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFilter({ ...filter, [id]: value });
  };

  const handleFilter = () => {
    if (filter.startDate && filter.endDate) {
      const startDate = new Date(filter.startDate);
      const endDate = new Date(filter.endDate);
      const filtered = tasks
        .filter((task) => {
          const taskStartDate = new Date(task.startDate);
          return (
            taskStartDate >= startDate &&
            taskStartDate <= endDate &&
            task.state === "In Progress"
          );
        })
        .map((task) => {
          const taskStartDate = new Date(task.startDate);
          const taskEndDate = new Date(taskStartDate);
          taskEndDate.setDate(taskEndDate.getDate() + task.estimatedDays);

          const daysPassed = Math.floor(
            (endDate - taskEndDate) / (1000 * 60 * 60 * 24)
          );

          if (daysPassed <= 0) return null;

          const employee = employees.find((emp) => emp.id === task.idEmployee);
          const project = projects.find((proj) => proj.id === task.idProject);

          return {
            ...task,
            employeeName: `${employee?.name} ${employee?.surname}`,
            taskEndDate: taskEndDate.toISOString().split("T")[0],
            daysPassed: daysPassed,
            projectName: project?.projectName,
          };
        })
        .filter((task) => task !== null); 

      setFilteredTasks(filtered);
    }
  };

  const employeeColumns = [
    { name: "ID", selector: (row) => row.id, sortable: true },
    { name: "Nombre", selector: (row) => row.name, sortable: true },
    { name: "Apellido", selector: (row) => row.surname, sortable: true },
  ];

  const projectColumns = [
    { name: "ID", selector: (row) => row.id, sortable: true },
    {
      name: "Nombre del Proyecto",
      selector: (row) => row.projectName,
      sortable: true,
    },
  ];

  const taskColumns = [
    { name: "ID", selector: (row) => row.id, sortable: true },
    { name: "Empleado ID", selector: (row) => row.idEmployee, sortable: true },
    { name: "Proyecto ID", selector: (row) => row.idProject, sortable: true },
    { name: "Descripción", selector: (row) => row.description, sortable: true },
    { name: "Fecha de inicio", selector: (row) => row.startDate, sortable: true },
    { name: "Días estimados", selector: (row) => row.estimatedDays, sortable: true,},
    { name: "Estado", selector: (row) => row.state, sortable: true },
  ];

  const filteredColumns = [
    {
      name: "Nombre Empleado",
      selector: (row) => row.employeeName,
      sortable: true,
    },
    {
      name: "Descripción Tarea",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Fecha de inicio",
      selector: (row) => row.startDate,
      sortable: true,
    },
    {
      name: "Fecha fin",
      selector: (row) => row.taskEndDate,
      sortable: true,
    },
    {
      name: "Días pasados",
      selector: (row) => `${row.daysPassed} dias pasado`,
      sortable: true,
    },
    {
      name: "Nombre del proyecto",
      selector: (row) => row.projectName,
      sortable: true,
    },
  ];

  return (
    <div className="container">
      <h1>Tablas</h1>

      <div className="table-wrapper">
        <div className="header">
          <h2>Empleados</h2>
          <Link to="/employee">
            <button className="add-button">Añadir Empleado</button>
          </Link>
        </div>
        <DataTable columns={employeeColumns} data={employees} pagination />
      </div>

      <div className="table-wrapper">
        <div className="header">
          <h2>Proyectos</h2>
          <Link to="/project">
            <button className="add-button">Añadir Proyecto</button>
          </Link>
        </div>
        <DataTable columns={projectColumns} data={projects} pagination />
      </div>

      <div className="table-wrapper">
        <div className="header">
          <h2>Tareas</h2>
          <Link to="/task">
            <button className="add-button">Añadir Tarea</button>
          </Link>
        </div>
        <DataTable  columns={taskColumns} data={tasks} pagination />
      </div>

      <div className="filter-section">
        <label htmlFor="startDate">Fecha inicio</label>
        <input
          id="startDate"
          type="date"
          value={filter.startDate}
          onChange={handleInputChange}
        />
        <label htmlFor="endDate">Fecha fin</label>
        <input
          id="endDate"
          type="date"
          value={filter.endDate}
          onChange={handleInputChange}
        />
        <button className="filter-button" onClick={handleFilter}>
          Filter
        </button>
      </div>

      <div className="table-wrapper">
        <h2>Tareas Filtradas</h2>
        <DataTable columns={filteredColumns} data={filteredTasks} pagination />
      </div>
    </div>
  );
};

export default Core;
