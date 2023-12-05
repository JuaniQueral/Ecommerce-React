import React, { useContext, useEffect, useState } from 'react';
import { APIContext } from '../services/api/api.context';
import { AuthenticationContext } from '../services/authentication/authentication.context';
import { useNavigate } from 'react-router';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import ProductTable from './ProductTable';
import ProductForm from './ProductForm';

const Products = () => {
  const { toggleLoading } = useContext(APIContext);
  const { user } = useContext(AuthenticationContext);
  const navigation = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    toggleLoading(true);
    fetch('https://tup-ecommerce.onrender.com/product', {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => response.json())
      .then((productsData) => {
        setProducts(productsData);
        toggleLoading(false);
      })
      .catch((error) => {
        toggleLoading(false);
      });
  }, []);

  const [editing, setEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({ id: null, name: '', price: 0, stock: 0, imageUrl: '' });

  const addProduct = (product) => {
    toggleLoading(true);
    fetch('https://tup-ecommerce.onrender.com/product/create', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        toast.success('!Alta con éxito!', {
          position: 'top-center',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        setProducts([...products, { id: products.length + 1, ...response }]);
        setTimeout(() => {
          toggleLoading(false);
        }, 1500);
      })
      .catch((error) => {
        toggleLoading(false);
        toast.error('Ocurrio un error el dar de alta el producto', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      });
  };

  const deleteProduct = (id) => {
    toggleLoading(true);
    fetch(`https://tup-ecommerce.onrender.com/product/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        toast.success('!Eliminacion con éxito!', {
          position: 'top-center',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        setProducts(products.filter((product) => product.id !== id));
        setTimeout(() => {
          toggleLoading(false);
        }, 1500);
      })
      .catch((error) => {
        toggleLoading(false);
        toast.error('No se pudo eliminar el producto.', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      });
  };

  const editProduct = (product) => {
    setEditing(true);
    setCurrentProduct(product);
  };

  const updateProduct = (id, updatedProduct) => {
    toggleLoading(true);
    fetch('https://tup-ecommerce.onrender.com/product', {
      method: 'PUT',
      body: JSON.stringify(updatedProduct),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        toast.success('!Actualizacion con éxito!', {
          position: 'top-center',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        setProducts(products.map((product) => (product.id === id ? updatedProduct : product)));
        setTimeout(() => {
          toggleLoading(false);
        }, 1500);
      })
      .catch((error) => {
        toggleLoading(false);
        toast.error('No se pudo actualizar el producto.', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      });
  };

  return (
    <div className='app-container'>
      <Button
        onClick={() => {
          navigation('/home');
        }}
      >
        Volver
      </Button>
      <h1>ABM de Productos</h1>
      <ProductTable products={products} deleteProduct={deleteProduct} editProduct={editProduct} />
      <ProductForm
        addProduct={addProduct}
        updateProduct={updateProduct}
        editing={editing}
        setEditing={setEditing}
        currentProduct={currentProduct}
        setCurrentProduct={setCurrentProduct}
      />
    </div>
  );
};

export default Products;
