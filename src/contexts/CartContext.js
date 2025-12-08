'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

// API base URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export function CartProvider({ children }) {
  const { user, isAuthenticated, getToken } = useAuth();

  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from database or localStorage
  useEffect(() => {
    const loadCart = async () => {
      setIsLoading(true);
      try {
        if (isAuthenticated() && user) {
          // Load from database
          const token = getToken();
          const response = await fetch(`${API_URL}/cart`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          if (response.ok) {
            const data = await response.json();
            if (data.success) {
              setCartItems(data.items || []);
              
              // Sync localStorage cart to database if it exists
              const localCart = localStorage.getItem('finesse_cart');
              if (localCart) {
                try {
                  const localItems = JSON.parse(localCart);
                  if (localItems.length > 0) {
                    // Merge local cart into database
                    await syncLocalCartToDatabase(localItems, token);
                    // Reload from database after sync
                    const reloadResponse = await fetch(`${API_URL}/cart`, {
                      headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                      }
                    });
                    if (reloadResponse.ok) {
                      const reloadData = await reloadResponse.json();
                      if (reloadData.success) {
                        setCartItems(reloadData.items || []);
                      }
                    }
                    // Clear localStorage after sync
                    localStorage.removeItem('finesse_cart');
                  }
                } catch (error) {
                  console.error('Error syncing local cart:', error);
                }
              }
            }
          } else {
            // If database fails, fall back to localStorage
            loadFromLocalStorage();
          }
        } else {
          // Not logged in, use localStorage
          loadFromLocalStorage();
        }
      } catch (error) {
        console.error('Error loading cart:', error);
        loadFromLocalStorage();
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, [user, isAuthenticated]);

  // Helper to load from localStorage
  const loadFromLocalStorage = () => {
    const savedCart = localStorage.getItem('finesse_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  };

  // Helper to sync localStorage cart to database
  const syncLocalCartToDatabase = async (localItems, token) => {
    for (const item of localItems) {
      try {
        await fetch(`${API_URL}/cart/add`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            productId: item.id,
            quantity: item.quantity || 1,
            size: item.size || null,
            material: item.material || 'Gold'
          })
        });
      } catch (error) {
        console.error('Error syncing item to database:', error);
      }
    }
  };

  // Save cart to database or localStorage
  const saveCart = async (items) => {
    if (isAuthenticated() && user) {
      // Cart is managed by API calls, no need to save here
      // The API calls will update the database
      return;
    } else {
      // Save to localStorage
      localStorage.setItem('finesse_cart', JSON.stringify(items));
    }
  };

  const addToCart = async (product, options = {}) => {
    const {
      quantity = 1,
      size = null,
      material = 'Gold'
    } = options;

    if (isAuthenticated() && user) {
      // Add to database
      try {
        const token = getToken();
        const response = await fetch(`${API_URL}/cart/add`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            productId: product.id,
            quantity: quantity,
            size: size,
            material: material
          })
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setCartItems(data.items || []);
            return;
          }
        }
        // If API fails, fall back to local
        console.error('Failed to add to database cart, using local');
      } catch (error) {
        console.error('Error adding to database cart:', error);
        // Fall back to local
      }
    }

    // Add to local cart (for non-authenticated users or if API fails)
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
        saveCart(updatedItems);
        return updatedItems;
      } else {
        // Add new item
        const newItems = [...prevItems, {
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
        saveCart(newItems);
        return newItems;
      }
    });
  };

  const removeFromCart = async (itemId, size = null, material = 'Gold') => {
    if (isAuthenticated() && user) {
      // Remove from database
      try {
        const token = getToken();
        const response = await fetch(`${API_URL}/cart/remove`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            productId: itemId,
            size: size,
            material: material
          })
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setCartItems(data.items || []);
            return;
          }
        }
      } catch (error) {
        console.error('Error removing from database cart:', error);
        // Fall back to local
      }
    }

    // Remove from local cart
    setCartItems(prevItems => {
      const newItems = prevItems.filter(item => 
        !(item.id === itemId && item.size === size && item.material === material)
      );
      saveCart(newItems);
      return newItems;
    });
  };

  const updateQuantity = async (itemId, newQuantity, size = null, material = 'Gold') => {
    if (newQuantity <= 0) {
      await removeFromCart(itemId, size, material);
      return;
    }

    if (isAuthenticated() && user) {
      // Update in database
      try {
        const token = getToken();
        const response = await fetch(`${API_URL}/cart/update`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            productId: itemId,
            quantity: newQuantity,
            size: size,
            material: material
          })
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setCartItems(data.items || []);
            return;
          }
        }
      } catch (error) {
        console.error('Error updating database cart:', error);
        // Fall back to local
      }
    }

    // Update local cart
    setCartItems(prevItems => {
      const newItems = prevItems.map(item =>
        item.id === itemId && item.size === size && item.material === material
          ? { ...item, quantity: newQuantity }
          : item
      );
      saveCart(newItems);
      return newItems;
    });
  };

  const clearCart = async () => {
    if (isAuthenticated() && user) {
      // Clear database cart
      try {
        const token = getToken();
        const response = await fetch(`${API_URL}/cart/clear`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          setCartItems([]);
          return;
        }
      } catch (error) {
        console.error('Error clearing database cart:', error);
        // Fall back to local
      }
    }

    // Clear local cart
    setCartItems([]);
    localStorage.removeItem('finesse_cart');
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
        closeCart,
        isLoading
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

