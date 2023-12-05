import React, { useContext } from 'react';

import './ToolItem.css';

import ToolCard from '../ToolCard/ToolCard';
import { Button } from 'react-bootstrap';
import { Role } from '../models/constantes';
import { AuthenticationContext } from '../services/authentication/authentication.context';

const ToolItem = ({ tool, addItemCart }) => {
  const { user } = useContext(AuthenticationContext);

  const addToolHandler = () => {
    addItemCart(tool);
  };

  return (
    <ToolCard>
      <div className='producto'>
        <div className='product_img'>
          <img src={tool.imageUrl} alt='img' />
        </div>
        <div className='producto_footer'>
          <h1> {tool.name} </h1>
          <p className='price'>${tool.price}</p>
          <p className='price'>Stock {tool.stock}</p>
        </div>
        {user.role === Role.USER && (
          <div className='button'>
            <Button className='btn' onClick={addToolHandler}>
              Añadir al carrito
            </Button>
          </div>
        )}
      </div>
    </ToolCard>
    // <Card style={{ width: '18rem' }}>
    //   <Card.Img variant='top' src={tool.imageUrl} />
    //   <Card.Body>
    //     <Card.Title>{tool.name}</Card.Title>
    //     <Card.Text>
    //       ${tool.price} - Stock {tool.stock}
    //     </Card.Text>
    //     <Button onClick={addToolHandler} variant='primary'>
    //       Añadir al carrito
    //     </Button>
    //   </Card.Body>
    // </Card>
  );
};

export default ToolItem;
