"use client";
import { isEmpty, size } from "lodash";
import { useState, useEffect } from "react";
import {
  addDocument,
  deleteDocument,
  getCollection,
  updateDocument,
} from "../actions";

export default function Home() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [id, setId] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      const result = await getCollection("tasks");
      if (result.statusResponse) {
        setTasks(result.data);
      }
    })();
  }, []);

  const validForm = () => {
    let isValid = true;
    setError(null);
    if (isEmpty(task)) {
      setError("Debes ingresar una tarea.");
      isValid = false;
    }

    return isValid;
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!validForm()) {
      return;
    }

    const result = await addDocument("tasks", { name: task });
    if (!result.statusResponse) {
      setError(result.error);
      return;
    }
    setTasks([...tasks, { ...result.data, name: task }]);
    setTask("");
  };

  const updateTask = async (e) => {
    e.preventDefault();
    if (isEmpty(task)) {
      console.log("Task empty");
      return;
    }
    const result = await updateDocument("tasks", id, { name: task });
    if (!result.statusResponse) {
      setError(result.error);
      return;
    }
    const newTask = { id, name: task };
    setTasks(tasks.map((item) => (item.id == id ? newTask : item)));
    setId("");

    setTask("");
  };

  const editTask = (editTask) => {
    setTask(editTask.name);
    setId(editTask.id);
  };

  const deleteTask = async (deleteTask) => {
    const result = await deleteDocument("tasks", deleteTask.id);
    if (!result.statusResponse) {
      setError(result.error);
      return;
    }
    setTasks(tasks.filter((item) => item.id !== deleteTask.id));
  };

  return (
    <div className="container mt-5">
      <h1>Tareas</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de Tareas</h4>
          {size(tasks) > 0 ? (
            <ul className="list-group">
              {tasks.map((task) => (
                <li className="list-group-item" key={task.id}>
                  {task.name}
                  <button
                    className="btn btn-danger btn-sm float-right mx-2"
                    onClick={() => deleteTask(task)}
                  >
                    Eliminar
                  </button>
                  <button
                    className="btn btn-warning btn-sm float-right"
                    onClick={() => editTask(task)}
                  >
                    Editar
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <li className="list-group-item">No hay tareas.</li>
          )}
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {id == "" ? "Agregar tarea" : "Modificar tarea"}
          </h4>
          <form onSubmit={id !== "" ? updateTask : addTask}>
            {error && <span className="text-danger">{error}</span>}
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese la tarea..."
              onChange={(text) => setTask(text.target.value)}
              value={task}
            />

            <button className="btn btn-dark btn-block" type="submit">
              {id == "" ? "Agregar" : "Modificar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
