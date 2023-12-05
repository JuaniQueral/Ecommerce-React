import React from 'react';

const ProductTable = ({ products, deleteProduct, editProduct }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Imagen URL</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.stock}</td>
            <td>{product.imageUrl}</td>
            <td>
              <button className='edit-btn' onClick={() => editProduct(product)}>
                Editar
              </button>
              <button className='delete-btn' onClick={() => deleteProduct(product.id)}>
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
