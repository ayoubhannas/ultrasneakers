"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [wishlistLoaded, setWishlistLoaded] = useState(false);
  const [canPersistWishlist, setCanPersistWishlist] = useState(false);

  useEffect(() => {
    const restoreWishlist = async () => {
      try {
        const savedWishlist = localStorage.getItem("ultrasneakers-wishlist");
        const parsedWishlist = savedWishlist ? JSON.parse(savedWishlist) : [];
        const response = await axios.get("http://localhost:8000/api/product");
        const products = Array.isArray(response.data)
          ? response.data
          : response.data?.data || [];
        const availableProducts = new Map(
          products.map((product) => [String(product.id), product]),
        );

        setWishlist(
          (Array.isArray(parsedWishlist) ? parsedWishlist : [])
            .map((product) => availableProducts.get(String(product.id)))
            .filter(Boolean),
        );
        setCanPersistWishlist(true);
      } catch (error) {
        console.error("Failed to validate wishlist products:", error);
        setWishlist([]);
      } finally {
        setWishlistLoaded(true);
      }
    };

    restoreWishlist();
  }, []);

  useEffect(() => {
    if (!wishlistLoaded || !canPersistWishlist) return;

    localStorage.setItem("ultrasneakers-wishlist", JSON.stringify(wishlist));
    setWishlistCount(wishlist.length);
  }, [canPersistWishlist, wishlist, wishlistLoaded]);

  const addToWishlist = async (product) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/product/${product.id}`,
      );
      const availableProduct = response.data;

      setCanPersistWishlist(true);
      setWishlist((prevWishlist) => {
        const exists = prevWishlist.some((item) => item.id === product.id);
        return exists
          ? prevWishlist
          : [...prevWishlist, { ...product, ...availableProduct }];
      });
      return true;
    } catch {
      return false;
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prevWishlist) => {
      return prevWishlist.filter((item) => item.id !== productId);
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
