import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import "./ToolForm.css";

const ToolForm = ({ onToolAdded, onHideForm }) => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null); // Cambiado a null para manejar la imagen
  const [description, setDescription] = useState("");
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Check form");
      setFormValid(name && brand && price && image && description);
    }, 500);

    return () => {
      console.log("Cleanup");
      clearTimeout(timer);
    };
  }, [name, brand, price, image, description]);

  const changeNameHandler = (event) => {
    setName(event.target.value);
  };

  const changeBrandHandler = (event) => {
    setBrand(event.target.value);
  };

  const changePriceHandler = (event) => {
    setPrice(event.target.value);
  };

  const changeImageHandler = (event) => {
    // Manejar la carga de la imagen
    if (event.target.files.length > 0) {
      const selectedImage = event.target.files[0];
      setImage(selectedImage);
    }
  };

  const changeDescriptionHandler = (event) => {
    setDescription(event.target.value);
  };

  const addToolHandler = (event) => {
    event.preventDefault();
    const newTool = {
      id: Math.random(),
      name,
      brand,
      price,
      image,
      description,
    };
    onToolAdded(newTool);
  };

  const hideFormHandler = (event) => {
    event.preventDefault();
    onHideForm();
  };

  return (
    <form>
      <div className="new-tool-controls">
        <div className="new-tool-control">
          <label>Nombre</label>
          <input
            onChange={changeNameHandler}
            type="text"
            className="input-control"
          />
        </div>
        <div className="new-tool-control">
          <label>Marca</label>
          <input
            onChange={changeBrandHandler}
            type="text"
            className="input-control"
          />
        </div>
        <div className="new-tool-control">
          <label>Precio</label>
          <input
            onChange={changePriceHandler}
            type="number"
            className="input-control"
            min="1"
          />
        </div>
        <div className="new-tool-control">
          <label>Imagen</label>
          <input
            onChange={changeImageHandler}
            type="file"
            className="input-control"
          />
        </div>
        <div className="new-tool-control">
          <label>Descripción</label>
          <input
            onChange={changeDescriptionHandler}
            type="text"
            className="input-control"
          />
        </div>
      </div>
      <div className="new-tool-actions">
        <button onClick={hideFormHandler}>Guardar</button>
        <Button disabled={!formValid} onClick={addToolHandler}>
          Agregar Producto
        </Button>
      </div>
    </form>
  );
};

export default ToolForm;
