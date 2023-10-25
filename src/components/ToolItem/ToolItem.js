import React from "react";

import "./ToolItem.css";

import ToolCard from "../ToolCard/ToolCard";

const ToolItem = ({
  toolName,
  toolBrand,
  toolPrice,
  toolImage,
  toolDescription,
}) => {
  return (
    <ToolCard>
      <h2>{toolName}</h2>
      <h3>{toolBrand}</h3>
      <h3>{toolPrice} </h3>
      <p>{toolImage}</p>
      <p>{toolDescription}</p>
    </ToolCard>
  );
};

export default ToolItem;
