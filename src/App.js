import { BrowserRouter, Route, Routes } from "react-router-dom";
import Core from "./views/Core";
import Employee from "./views/Employee";
import Project from "./views/Project";
import Task from "./views/Task";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Core />}></Route>
          <Route path="/employee" element={<Employee />}></Route>
          <Route path="/project" element={<Project />}></Route>
          <Route path="/task" element={<Task />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
