import React, { useState } from "react";
import "./ToolFilter.css";

const ToolsFilter = ({ onFilterNameChange, nameValueFilter }) => {
  // const [nameFilter, setNameFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  const changeNameHandler = (event) => {
    const newNameFilter = event.target.value;
    // setNameFilter(newNameFilter);
    onFilterNameChange(newNameFilter);
  };

  const changePriceHandler = (event) => {
    const newPriceFilter = event.target.value;
    setPriceFilter(newPriceFilter);
  };

  return (
    <div className="Tools-filter">
      <div className="Tools-filter__control">
        <input
          type="text"
          placeholder="Filtrar por nombre"
          value={nameValueFilter}
          onChange={changeNameHandler}
        />
      </div>
      <div className="Tools-filter__control">
        <input
          type="text"
          placeholder="Filtrar por precio"
          value={priceFilter}
          onChange={changePriceHandler}
        />
      </div>
    </div>
  );
};

export default ToolsFilter;
