import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { AuthenticationContext } from "../services/authentication/authentication.context";
import ToggleTheme from "../ui/ToggleTheme";
import { APIContext } from "../services/api/api.context";
import NewTool from "../NewTool/NewTool";
import ToolsFilter from "../ToolFilter/ToolFilter";
import Tools from "../Tools/Tools";
import { RiShoppingCartLine } from "react-icons/ri"; // Importa el ícono del carrito

const Dashboard = () => {
  const { user, handleLogout } = useContext(AuthenticationContext);
  const { toggleLoading } = useContext(APIContext);

  const userName = user.email.split("@")[0];

  const [tools, setTools] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [filterPrice, setFilterPrice] = useState("");

  // Estado local para el carrito de compras
  const [cart, setCart] = useState([]);

  useEffect(() => {
    toggleLoading(true);

    fetch("http://tu-api.com/tools")
      .then((response) => response.json())
      .then((toolsData) => {
        setTools(toolsData);
        toggleLoading(false);
      })
      .catch((error) => {
        console.error(error);
        toggleLoading(false);
      });
  }, []);

  const navigation = useNavigate();

  const addToolHandler = (tool) => {
    // Implementa la lógica para agregar una nueva herramienta
    // Solo permitir agregar herramientas si el usuario tiene el rol "admin"
    if (user.role === "admin") {
      // Agregar la lógica para agregar la herramienta a la lista y a la API
      // Por ahora, agregaremos la herramienta al carrito local
      setCart([...cart, tool]);
    }
  };

  const filterNameChanged = (name) => {
    setFilterName(name);
  };

  const filterPriceChanged = (price) => {
    setFilterPrice(price);
  };

  const onLogoutHandler = () => {
    handleLogout();
    navigation("/login");
  };

  return (
    <>
      <Row className="me-2 my-4">
        <Col>
          <h4 className="text-left m-3">Hola {userName}</h4>
        </Col>
        <Col md={3} className="d-flex justify-content-end">
          <ToggleTheme />
          <Button className="ms-4" variant="primary" onClick={onLogoutHandler}>
            Cerrar sesión
          </Button>{" "}
          {/* Renderizar el carrito */}
          <div className="cart">
            <RiShoppingCartLine size={24} />{" "}
            {/* Renderiza el ícono del carrito */}
            <span className="item_total">{cart.length}</span>
          </div>
        </Col>
      </Row>

      {user.role === "admin" && <NewTool onToolAdded={addToolHandler} />}
      <ToolsFilter
        filterName={filterName}
        filterPrice={filterPrice}
        onFilterNameChange={filterNameChanged}
        onFilterPriceChange={filterPriceChanged}
      />
      <Tools filterName={filterName} filterPrice={filterPrice} tools={tools} />
    </>
  );
};

export default Dashboard;
