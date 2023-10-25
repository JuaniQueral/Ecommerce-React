import React from "react";
import "./Tools.css";

import ToolItem from "../ToolItem/ToolItem";

const Tools = ({ tools, filterName, filterPrice }) => {
  if (tools.length === 0) {
    return <></>;
  }

  const filteredTools = tools
    .filter(
      (tool) =>
        tool.name.toLowerCase().includes(filterName.toLowerCase()) &&
        tool.price <= filterPrice
    )
    .map((tool) => (
      <ToolItem
        key={tool.id}
        toolName={tool.name}
        toolBrand={tool.brand}
        toolPrice={tool.price}
        toolImage={tool.image}
        toolDescription={tool.description}
      />
    ));

  return (
    <div className="tools">
      {filteredTools.length === 0 ? (
        <p>No hay herramientas disponibles que coincidan con los filtros</p>
      ) : (
        filteredTools
      )}
    </div>
  );
};

export default Tools;
