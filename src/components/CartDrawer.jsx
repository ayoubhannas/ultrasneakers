"use client";

import { useEffect, useRef } from "react";
import styled from "styled-components";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const DrawerOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  z-index: 1000;
  opacity: ${(props) => (props.$isOpen ? "1" : "0")};
  visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
  transition: opacity 0.2s ease, visibility 0.2s ease;
`;

const DrawerContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 400px;
  height: 100%;
  background-color: ${(props) => props.theme.cardBackground};
  box-shadow: -2px 0px 10px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  overflow-y: auto;
  transform: ${(props) =>
    props.$isOpen ? "translateX(0)" : "translateX(100%)"};
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
`;

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
`;

const DrawerTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CloseButton = styled.button.attrs({ type: "button" })`
  background: transparent;
  border: none;
  color: ${(props) => props.theme.textSecondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 0.375rem;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.hoverBackground};
    color: ${(props) => props.theme.text};
  }
`;

const DrawerContent = styled.div`
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
`;

const CartItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CartItem = styled.div`
  display: flex;
  gap: 1rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 0.375rem;
  border: 1px solid ${(props) => props.theme.borderColor};
`;

const ItemDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ItemName = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
`;

const ItemPrice = styled.div`
  font-weight: 600;
  color: ${(props) => props.theme.primary};
`;

const ItemMeta = styled.div`
  font-size: 0.875rem;
  color: ${(props) => props.theme.textSecondary};
`;

const ItemActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const QuantityButton = styled.button.attrs({ type: "button" })`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 0.25rem;
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.backgroundAlt};
  color: ${(props) => props.theme.text};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.hoverBackground};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantityText = styled.span`
  font-size: 0.875rem;
  min-width: 1.5rem;
  text-align: center;
`;

const RemoveButton = styled.button.attrs({ type: "button" })`
  background: none;
  border: none;
  color: ${(props) => props.theme.textSecondary};
  font-size: 0.75rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;

  &:hover {
    color: ${(props) => props.theme.primary};
    text-decoration: underline;
  }
`;

const EmptyCartMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem 0;
  gap: 1rem;
`;

const EmptyCartIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: ${(props) => props.theme.backgroundAlt};
  color: ${(props) => props.theme.textSecondary};
`;

const EmptyCartText = styled.p`
  font-size: 1rem;
  color: ${(props) => props.theme.textSecondary};
  margin: 0;
`;

const DrawerFooter = styled.div`
  padding: 1.5rem;
  border-top: 1px solid ${(props) => props.theme.borderColor};
`;

const CartSummary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;

  &.total {
    font-size: 1.125rem;
    font-weight: 600;
    padding-top: 0.75rem;
    margin-top: 0.75rem;
    border-top: 1px solid ${(props) => props.theme.borderColor};
  }
`;

const SummaryLabel = styled.span`
  color: ${(props) => props.theme.textSecondary};
`;

const SummaryValue = styled.span`
  font-weight: 500;
`;

const CheckoutButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.875rem;
  background-color: ${(props) => props.theme.primary};
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-weight: 500;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.primaryHover};
  }
`;

const ContinueShoppingButton = styled.button.attrs({ type: "button" })`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.875rem;
  background-color: transparent;
  color: ${(props) => props.theme.text};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 0.375rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 0.75rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.hoverBackground};
  }
`;

const CartDrawer = ({ isOpen, onClose }) => {
  const {
    cart,
    cartCount,
    removeFromCart,
    updateQuantity,
    subtotal,
    shipping,
    tax,
    total,
  } = useCart();
  const drawerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleIncreaseQuantity = (itemId) => {
    const item = cart.find((item) => item.id === itemId);
    if (item) {
      updateQuantity(itemId, item.quantity + 1);
    }
  };

  const handleDecreaseQuantity = (itemId) => {
    const item = cart.find((item) => item.id === itemId);
    if (item && item.quantity > 1) {
      updateQuantity(itemId, item.quantity - 1);
    }
  };

  const formatPrice = (price) => {
    return typeof price === "number" ? price.toFixed(2) : price;
  };

  return (
    <DrawerOverlay $isOpen={isOpen}>
      <DrawerContainer ref={drawerRef} $isOpen={isOpen}>
        <DrawerHeader>
          <DrawerTitle>
            <ShoppingBag size={20} />
            Votre Panier {cartCount > 0 && `(${cartCount})`}
          </DrawerTitle>
          <CloseButton onClick={onClose} aria-label="Fermer le panier">
            <X size={20} />
          </CloseButton>
        </DrawerHeader>

        <DrawerContent>
          {cart.length === 0 ? (
            <EmptyCartMessage>
              <EmptyCartIcon>
                <ShoppingBag size={24} />
              </EmptyCartIcon>
              <EmptyCartText>Votre panier est vide</EmptyCartText>
            </EmptyCartMessage>
          ) : (
            <CartItemsList>
              {cart.map((item) => (
                <CartItem key={item.id}>
                  <ItemImage
                    src={
                      item.images?.[0] || "/placeholder.svg?height=80&width=80"
                    }
                    alt={item.name}
                  />
                  <ItemDetails>
                    <ItemName>{item.name}</ItemName>
                    <ItemPrice>
                      {typeof item.price === "number"
                        ? `${formatPrice(item.price)} MAD`
                        : item.price}
                    </ItemPrice>
                    <ItemMeta>
                      {item.selectedSize && (
                        <span>Taille: {item.selectedSize}</span>
                      )}
                      {item.selectedColor && (
                        <span> | Couleur: {item.selectedColor}</span>
                      )}
                    </ItemMeta>
                    <ItemActions>
                      <QuantityControl>
                        <QuantityButton
                          onClick={() => handleDecreaseQuantity(item.id)}
                          disabled={item.quantity <= 1}
                          aria-label="Diminuer la quantité"
                        >
                          <Minus size={14} />
                        </QuantityButton>
                        <QuantityText>{item.quantity}</QuantityText>
                        <QuantityButton
                          onClick={() => handleIncreaseQuantity(item.id)}
                          aria-label="Augmenter la quantité"
                        >
                          <Plus size={14} />
                        </QuantityButton>
                      </QuantityControl>
                      <RemoveButton onClick={() => removeFromCart(item.id)}>
                        Supprimer
                      </RemoveButton>
                    </ItemActions>
                  </ItemDetails>
                </CartItem>
              ))}
            </CartItemsList>
          )}
        </DrawerContent>

        {cart.length > 0 && (
          <DrawerFooter>
            <CartSummary>
              <SummaryRow>
                <SummaryLabel>Sous-total</SummaryLabel>
                <SummaryValue>
                  {typeof subtotal === "number"
                    ? `${formatPrice(subtotal)} MAD`
                    : subtotal}
                </SummaryValue>
              </SummaryRow>
              <SummaryRow>
                <SummaryLabel>Livraison</SummaryLabel>
                <SummaryValue>
                  {shipping === 0
                    ? "Gratuite"
                    : typeof shipping === "number"
                    ? `${formatPrice(shipping)} MAD`
                    : shipping}
                </SummaryValue>
              </SummaryRow>
              <SummaryRow>
                <SummaryLabel>TVA</SummaryLabel>
                <SummaryValue>
                  {typeof tax === "number" ? `${formatPrice(tax)} MAD` : tax}
                </SummaryValue>
              </SummaryRow>
              <SummaryRow className="total">
                <SummaryLabel>Total</SummaryLabel>
                <SummaryValue>
                  {typeof total === "number"
                    ? `${formatPrice(total)} MAD`
                    : total}
                </SummaryValue>
              </SummaryRow>
            </CartSummary>
            <CheckoutButton to="/checkout">Procéder au paiement</CheckoutButton>
            <ContinueShoppingButton onClick={onClose}>
              Continuer vos achats
            </ContinueShoppingButton>
          </DrawerFooter>
        )}
      </DrawerContainer>
    </DrawerOverlay>
  );
};

export default CartDrawer;
