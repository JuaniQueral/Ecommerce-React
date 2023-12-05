import React from 'react';
import './ToolFilter.css';

const ToolsFilter = ({ nameValueFilter, onFilterNameChange }) => {
  const changeNameHandler = (event) => {
    const newNameFilter = event.target.value;
    onFilterNameChange(newNameFilter);
  };

  return (
    <div className='Tools-filter'>
      <div className='Tools-filter__control'>
        <input type='text' placeholder='Filtrar por nombre' onChange={changeNameHandler} value={nameValueFilter} />
      </div>
    </div>
  );
};

export default ToolsFilter;
