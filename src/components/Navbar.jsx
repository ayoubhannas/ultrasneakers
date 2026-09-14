"use client";

import { Link } from "react-router-dom";
import styled from "styled-components";
import { Moon, Sun, Heart, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";
import CartDrawer from "./CartDrawer.jsx";
import WishlistModal from "./Wishlist/WishlistModal.jsx";
import { useState, useEffect } from "react";

const Navbar = ({ toggleTheme, theme }) => {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  useEffect(() => {
    const handleOpenCart = () => setIsCartOpen(true);
    window.addEventListener("cart:drawer:open", handleOpenCart);

    return () => {
      window.removeEventListener("cart:drawer:open", handleOpenCart);
    };
  }, []);

  const handleOpenWishlist = () => {
    setIsWishlistOpen(true);
  };

  const handleCloseWishlist = () => {
    setIsWishlistOpen(false);
  };

  return (
    <NavbarContainer>
      <NavLinks>
        <NavLink to="/new-arrivals">Nouveautés</NavLink>
        <NavLink to="/classe">Classe</NavLink>
        <NavLink to="/sport">Sport</NavLink>
        <NavLink to="/luxury">Luxury</NavLink>
      </NavLinks>

      <BrandLogo to="/">ULTRASNEAKERS</BrandLogo>

      <NavIcons>
        <IconButton onClick={toggleTheme}>
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </IconButton>
        <IconButtonWithBadge onClick={handleOpenWishlist}>
          <Heart size={20} />
          {wishlistCount > 0 && <Badge>{wishlistCount}</Badge>}
        </IconButtonWithBadge>
        <IconButtonWithBadge onClick={() => setIsCartOpen(true)}>
          <ShoppingBag size={20} />
          {cartCount > 0 && <Badge>{cartCount}</Badge>}
        </IconButtonWithBadge>
      </NavIcons>

      <MobileMenuButton>
        <span></span>
        <span></span>
        <span></span>
      </MobileMenuButton>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <WishlistModal isOpen={isWishlistOpen} onClose={handleCloseWishlist} />
    </NavbarContainer>
  );
};

const NavbarContainer = styled.nav`
  display: flex;
  margin-top: -32px;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  position: sticky;
  z-index: 100;
  background-color: ${(props) => props.theme.background};
  transition: background-color 0.3s ease;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.text};
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: lowercase;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: ${(props) => props.theme.primary};
    transition: width 0.3s ease;
  }

  &:hover:after {
    width: 100%;
  }
`;

const BrandLogo = styled(Link)`
  font-family: "Anton", sans-serif;
  font-size: 2.5rem;
  font-weight: 400;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: ${(props) => props.theme.text};
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-decoration: none;

  @media (max-width: 768px) {
    position: static;
    transform: none;
  }
`;

const NavIcons = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme.text};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.hoverBackground};
  }
`;

const IconButtonWithBadge = styled(IconButton)`
  position: relative;
`;

const Badge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${(props) => props.theme.primary};
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MobileMenuButton = styled.button`
  display: none;
  flex-direction: column;
  justify-content: space-between;
  background: none;
  border: none;
  cursor: pointer;
  height: 20px;
  width: 25px;

  span {
    display: block;
    width: 25px;
    height: 2px;
    background-color: ${(props) => props.theme.text};
    transition: all 0.3s ease;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

export default Navbar;
