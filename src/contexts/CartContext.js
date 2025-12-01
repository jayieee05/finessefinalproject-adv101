'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('finesse_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('finesse_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, options = {}) => {
    const {
      quantity = 1,
      size = null,
      material = 'Gold'
    } = options;

    setCartItems(prevItems => {
      // Check if item already exists with same product, size, and material
      const existingItemIndex = prevItems.findIndex(
        item => item.id === product.id && 
        item.size === size && 
        item.material === material
      );

      if (existingItemIndex > -1) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Add new item
        return [...prevItems, {
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          priceValue: product.priceValue,
          quantity,
          size,
          material,
          category: product.category
        }];
      }
    });
  };

  const removeFromCart = (itemId, size = null, material = 'Gold') => {
    setCartItems(prevItems => 
      prevItems.filter(item => 
        !(item.id === itemId && item.size === size && item.material === material)
      )
    );
  };

  const updateQuantity = (itemId, newQuantity, size = null, material = 'Gold') => {
    if (newQuantity <= 0) {
      removeFromCart(itemId, size, material);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId && item.size === size && item.material === material
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.priceValue * item.quantity), 0);
  };

  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        isCartOpen,
        toggleCart,
        openCart,
        closeCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

