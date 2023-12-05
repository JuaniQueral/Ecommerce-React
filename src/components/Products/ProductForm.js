import React, { useState } from 'react';

const ProductForm = ({ addProduct, updateProduct, editing, setEditing, currentProduct }) => {
  const initialFormState = { id: null, name: '', price: 0, stock: 0, imageUrl: '' };
  const [product, setProduct] = useState(initialFormState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!product.name || !product.price || !product.stock || !product.imageUrl) return;

    if (editing) {
      updateProduct(product.id, product);
      setEditing(false);
    } else {
      addProduct(product);
    }

    setProduct(initialFormState);
  };

  React.useEffect(() => {
    if (editing) {
      setProduct(currentProduct);
    } else {
      setProduct(initialFormState);
    }
  }, [editing, currentProduct]);

  return (
    <form onSubmit={handleSubmit} className='product-form'>
      <label>Nombre:</label>
      <input type='text' name='name' value={product.name} onChange={handleInputChange} />
      <label>Precio:</label>
      <input type='number' name='price' value={product.price} onChange={handleInputChange} />
      <label>Stock:</label>
      <input type='number' name='stock' value={product.stock} onChange={handleInputChange} />
      <label>Imagen URL:</label>
      <input type='text' name='imageUrl' value={product.imageUrl} onChange={handleInputChange} />
      <div className='mt-3'>
        <button type='submit' className={editing ? 'update-btn' : 'add-btn'}>
          {editing ? 'Actualizar' : 'Agregar'}
        </button>
        {editing && (
          <button className='cancel-btn' onClick={() => setEditing(false)}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default ProductForm;
