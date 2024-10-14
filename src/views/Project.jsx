import { useState } from "react";
import { addProject } from "../controllers/coreController.ts";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";

const Project = () => {
  const [data, setData] = useState({
    projectName: "",
  });
  const navigate = useNavigate();

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
      const projectData = {
        ...data,
      };

      await addProject(projectData);
      navigate(-1);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h1>Create Project</h1>
      <form onSubmit={handleAdd}>
        <label htmlFor="projectName">Project Name</label>
        <input
          id="projectName"
          type="text"
          placeholder="Project Name"
          value={data.projectName}
          onChange={handleInput}
          required
        />
        <button type="submit">Create</button>
      </form>
      <button className="back-button" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
};

export default Project;
