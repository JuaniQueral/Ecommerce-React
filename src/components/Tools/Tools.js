import React from 'react';
import './Tools.css';

import ToolItem from '../ToolItem/ToolItem';

const Tools = ({ tools, filterName, addItemCart }) => {
  const toolsMapped =
    filterName === ''
      ? tools.map((tool) => <ToolItem addItemCart={addItemCart} key={tool.id} tool={tool} />)
      : tools
          .filter((tool) => tool.name.toLowerCase().includes(filterName.toLowerCase()))
          .map((tool) => <ToolItem addItemCart={addItemCart} key={tool.id} tool={tool} />);

  return <div className='tools'>{tools.length === 0 ? <p>No hay herramientas disponibles</p> : toolsMapped}</div>;
};

export default Tools;
