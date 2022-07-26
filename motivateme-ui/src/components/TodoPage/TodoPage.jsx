import React from "react";
import "./TodoPage.css";
import TodoForm from "../TodoForm/TodoForm";
import TodoList from "../TodoList/TodoList";
import { useState } from "react";
import AccessForbidden from "../AccessForbidden/AccessForbidden";

export default function TodoPage({ user, setCurrPage }) {
  const [modalSelected, setModalSelected] = useState("");
  // const navigate = useNavigate();
  React.useEffect(() => {
    // if the user is logged in, then set the page to "todo"
    if (user !== undefined && user !== null) {
      setCurrPage("todo");
    }
  }, []);

  /*if the create btn was clicked pop up the create form*/
  const showModal = (formType) => {
    setModalSelected(formType);
  };



  return (
    <>{user !== null && user !== undefined ? 
      <><div className="todo-page">
    <h2 className="todo-title">To-Do</h2>
    <div className="todo-btns">
      <button
        className="todo-btn create"
        type="button"
        onClick={() => {
          showModal("create");
        }}
      >
        Create
      </button>
    </div>
    {modalSelected === "create" ? (
      <TodoForm formType={"create"} showModal={showModal} />
    ) : null}
    <div className="todo-wrapper">
      <TodoList showModal={showModal} modalSelected={modalSelected} />
    </div>
  </div></>
  : <>
    <AccessForbidden setCurrPage={setCurrPage} /></>}
    </>
    
  );
}
