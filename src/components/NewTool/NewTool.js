// NewTool.js
import React, { useState } from "react";
import "./NewTool.css";
import ToolForm from "../ToolForm/ToolForm";

const NewTool = ({ onToolAdded }) => {
  const [showForm, setShowForm] = useState(false);

  const onToolAddedHandler = (tool) => {
    console.log(tool);
    console.log("In new Tool");
    onToolAdded(tool);
  };
  const showToolForm = () => {
    setShowForm(true);
  };

  const hideToolForm = () => {
    setShowForm(false);
  };
  return (
    <div className="new-tool">
      {showForm ? (
        <ToolForm onHideForm={hideToolForm} onToolAdded={onToolAddedHandler} />
      ) : (
        <button onClick={showToolForm}>Cargar nueva herramienta</button>
      )}
    </div>
  );
};

export default NewTool;
