import { createContext, useState } from 'react';

export const APIContext = createContext();

const cartValue = JSON.parse(localStorage.getItem('cart'));

export const APIContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState(cartValue ?? []);

  const setCartEmpty = () => {
    localStorage.removeItem('cart');
    setCart([]);
  };

  const handleAddItemToCart = (item) => {
    let orderItem = cart.find((itemValue) => itemValue.productId === item.id);
    let cartValue;
    if (orderItem) {
      orderItem.quantity++;
      cartValue = [...cart];
    } else {
      cartValue = [
        ...cart,
        {
          amount: item.price,
          quantity: 1,
          productId: item.id,
          productName: item.name,
          productImageUrl: item.imageUrl,
        },
      ];
    }
    setCart(cartValue);
    localStorage.setItem('cart', JSON.stringify(cartValue));
  };

  const updateCartQuantity = (index, newQuantity) => {
    if (newQuantity > 0) {
      const updatedCart = [...cart];
      updatedCart[index].quantity = newQuantity;
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  const toggleLoading = (value) => {
    setIsLoading(value);
  };

  return (
    <APIContext.Provider
      value={{ isLoading, toggleLoading, cart, handleAddItemToCart, updateCartQuantity, setCartEmpty }}
    >
      {children}
    </APIContext.Provider>
  );
};
