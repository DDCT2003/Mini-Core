import { useState } from "react";
import { addEmployee } from "../controllers/coreController.ts";
import { useNavigate } from "react-router-dom";
import "../styles/styles.css";

const Employee = () => {
  const [data, setData] = useState({
    name: "",
    surname: "",
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
      const employeeData = {
        ...data,
      };

      await addEmployee(employeeData);
      navigate(-1);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h1>Create Employee</h1>
      <form onSubmit={handleAdd}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          placeholder="Name"
          value={data.name}
          onChange={handleInput}
          required
        />
        <label htmlFor="surname">Surname</label>
        <input
          id="surname"
          type="text"
          placeholder="Surname"
          value={data.surname}
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

export default Employee;
