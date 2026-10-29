"use client";

import { Link } from "react-router-dom";
import styled from "styled-components";
import { Moon, Sun, Heart, ShoppingBag, Menu, X } from "lucide-react";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        <IconButton onClick={toggleTheme} aria-label="Changer de thème">
          {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
        </IconButton>
        <IconButtonWithBadge
          onClick={handleOpenWishlist}
          aria-label={`Wishlist${wishlistCount ? `, ${wishlistCount} articles` : ""}`}
        >
          <Heart size={20} />
          {wishlistCount > 0 && <Badge>{wishlistCount}</Badge>}
        </IconButtonWithBadge>
        <IconButtonWithBadge
          onClick={() => setIsCartOpen(true)}
          aria-label={`Panier${cartCount ? `, ${cartCount} articles` : ""}`}
        >
          <ShoppingBag size={20} />
          {cartCount > 0 && <Badge>{cartCount}</Badge>}
        </IconButtonWithBadge>
      </NavIcons>

      <MobileMenuButton
        type="button"
        aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={isMobileMenuOpen}
        onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
      >
        {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
      </MobileMenuButton>

      <MobileMenuPanel $isOpen={isMobileMenuOpen}>
        <MobileNavLinks>
          <NavLink
            to="/new-arrivals"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Nouveautés
          </NavLink>
          <NavLink to="/classe" onClick={() => setIsMobileMenuOpen(false)}>
            Classe
          </NavLink>
          <NavLink to="/sport" onClick={() => setIsMobileMenuOpen(false)}>
            Sport
          </NavLink>
          <NavLink to="/luxury" onClick={() => setIsMobileMenuOpen(false)}>
            Luxury
          </NavLink>
        </MobileNavLinks>
        <MobileMenuActions>
          <MobileActionButton
            type="button"
            onClick={() => {
              toggleTheme();
              setIsMobileMenuOpen(false);
            }}
            aria-label="Changer de thème"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            <span>Thème</span>
          </MobileActionButton>
          <MobileActionButton
            type="button"
            onClick={() => {
              handleOpenWishlist();
              setIsMobileMenuOpen(false);
            }}
            aria-label={`Wishlist${wishlistCount ? `, ${wishlistCount} articles` : ""}`}
          >
            <Heart size={20} />
            <span>Wishlist</span>
            {wishlistCount > 0 && <Badge>{wishlistCount}</Badge>}
          </MobileActionButton>
          <MobileActionButton
            type="button"
            onClick={() => {
              setIsCartOpen(true);
              setIsMobileMenuOpen(false);
            }}
            aria-label={`Panier${cartCount ? `, ${cartCount} articles` : ""}`}
          >
            <ShoppingBag size={20} />
            <span>Panier</span>
            {cartCount > 0 && <Badge>{cartCount}</Badge>}
          </MobileActionButton>
        </MobileMenuActions>
      </MobileMenuPanel>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <WishlistModal isOpen={isWishlistOpen} onClose={handleCloseWishlist} />
    </NavbarContainer>
  );
};

const NavbarContainer = styled.nav`
  display: flex;
  margin-top: 0;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: ${(props) => props.theme.background};
  transition: background-color 0.3s ease;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
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
    font-size: 1.25rem;
    letter-spacing: 2px;
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
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  height: 44px;
  width: 44px;
  color: ${(props) => props.theme.text};

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileMenuPanel = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: ${(props) => (props.$isOpen ? "grid" : "none")};
    gap: 1rem;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    padding: 1rem;
    background-color: ${(props) => props.theme.background};
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
    box-shadow: ${(props) => props.theme.shadow};
  }
`;

const MobileNavLinks = styled.div`
  display: grid;
  gap: 0.25rem;

  a {
    padding: 0.75rem 0.25rem;
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
  }
`;

const MobileMenuActions = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.5rem;
`;

const MobileActionButton = styled(IconButtonWithBadge)`
  width: 100%;
  height: auto;
  min-height: 56px;
  padding: 0.5rem 0.25rem;
  border-radius: 0.375rem;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.75rem;
`;

export default Navbar;
