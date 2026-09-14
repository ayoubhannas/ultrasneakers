"use client";

import { useEffect, useRef } from "react";
import styled from "styled-components";
import { Heart, Trash2, ShoppingBag, X, AlertCircle } from "lucide-react";
import { useWishlist } from "../../context/WishlistContext";
import { createPortal } from "react-dom";
import { useCart } from "../../context/CartContext";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  opacity: ${(props) => (props.$isOpen ? "1" : "0")};
  visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
  transition:
    opacity 0.2s ease,
    visibility 0.2s ease;
`;

const ModalContainer = styled.div`
  background-color: ${(props) => props.theme.cardBackground};
  border-radius: 0.5rem;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  width: 100%;
  max-width: 600px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  border: 1px solid ${(props) => props.theme.borderColor};
  transform: ${(props) =>
    props.$isOpen ? "translateY(0)" : "translateY(-20px)"};
  transition: transform 0.3s ease;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
`;

const ModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: ${(props) => props.theme.primary};
  }
`;

const WishlistCount = styled.span`
  background-color: ${(props) => props.theme.primary};
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.125rem 0.375rem;
  border-radius: 9999px;
  margin-left: 0.5rem;
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

const ModalContent = styled.div`
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
`;

const ModalFooter = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid ${(props) => props.theme.borderColor};
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button.attrs({ type: "button" })`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  border-radius: 0.375rem;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;

  ${(props) =>
    props.$variant === "primary"
      ? `
    background-color: ${props.theme.primary};
    color: white;
    border: none;
    
    &:hover {
      background-color: ${props.theme.primaryHover};
    }
  `
      : props.$variant === "outline"
        ? `
    background-color: transparent;
    color: ${props.theme.text};
    border: 1px solid ${props.theme.borderColor};
    
    &:hover {
      background-color: ${props.theme.hoverBackground};
    }
  `
        : props.$variant === "danger"
          ? `
    background-color: #ef4444;
    color: white;
    border: none;
    
    &:hover {
      background-color: #dc2626;
    }
  `
          : `
    background-color: ${props.theme.backgroundAlt};
    color: ${props.theme.text};
    border: none;
    
    &:hover {
      background-color: ${props.theme.hoverBackground};
    }
  `}
`;

const WishlistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;

  @media (min-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const WishlistItem = styled.div`
  background-color: ${(props) => props.theme.backgroundAlt};
  border-radius: 0.375rem;
  border: 1px solid ${(props) => props.theme.borderColor};
  overflow: hidden;
  transition:
    transform 0.2s,
    box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
`;

const WishlistItemImage = styled.div`
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  ${WishlistItem}:hover img {
    transform: scale(1.05);
  }
`;

const RemoveButton = styled.button.attrs({ type: "button" })`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 9999px;
  background-color: rgba(255, 255, 255, 0.8);
  color: #ef4444;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #ef4444;
    color: white;
  }
`;

const WishlistItemContent = styled.div`
  padding: 0.75rem;
`;

const WishlistItemTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 600;
  margin: 0 0 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const WishlistItemPrice = styled.div`
  font-weight: 600;
  color: ${(props) => props.theme.primary};
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
`;

const WishlistItemCategory = styled.div`
  font-size: 0.75rem;
  color: ${(props) => props.theme.textSecondary};
  margin-bottom: 0.75rem;
`;

const WishlistItemActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const EmptyWishlist = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  text-align: center;
`;

const EmptyWishlistIcon = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: ${(props) => props.theme.backgroundAlt};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;

  svg {
    color: ${(props) => props.theme.textSecondary};
  }
`;

const EmptyWishlistTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
`;

const EmptyWishlistText = styled.p`
  color: ${(props) => props.theme.textSecondary};
  margin: 0 0 1.5rem;
  max-width: 24rem;
  font-size: 0.875rem;
`;

const WishlistModal = ({ isOpen, onClose }) => {
  const { wishlist, wishlistCount, removeFromWishlist, clearWishlist } =
    useWishlist();
  const modalRef = useRef(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
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

  const handleRemoveItem = (productId, e) => {
    e.stopPropagation();
    removeFromWishlist(productId);
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    addToCart({
      ...product,
      selectedSize: product.sizes?.[0]?.size || "EUR 40",
      selectedColor: "Black",
      quantity: 1,
    });
  };

  const handleClearWishlist = () => {
    clearWishlist();
  };

  const handleProductClick = (productId) => {
    window.location.href = `/product/${productId}`;
    onClose();
  };

  const getImageUrl = (product) => {
    if (!product || !product.images)
      return "/placeholder.svg?height=200&width=200";

    if (Array.isArray(product.images) && product.images.length > 0) {
      const image = product.images[0];
      if (typeof image === "string") return image;
      if (image && image.path)
        return `http://localhost:8000/storage/${image.path}`;
    }

    return "/placeholder.svg?height=200&width=200";
  };

  const getCategoryName = (product) => {
    if (!product) return "";
    if (typeof product.category === "string") return product.category;
    if (
      product.category &&
      typeof product.category === "object" &&
      product.category.name
    ) {
      return product.category.name;
    }
    return "";
  };

  return createPortal(
    <ModalOverlay $isOpen={isOpen}>
      <ModalContainer ref={modalRef} $isOpen={isOpen}>
        <ModalHeader>
          <ModalTitle>
            <Heart size={18} />
            Ma Liste de Souhaits
            {wishlistCount > 0 && (
              <WishlistCount>{wishlistCount}</WishlistCount>
            )}
          </ModalTitle>
          <CloseButton onClick={onClose} aria-label="Close wishlist">
            <X size={18} />
          </CloseButton>
        </ModalHeader>

        <ModalContent>
          {wishlistCount > 0 ? (
            <WishlistGrid>
              {wishlist.map((product) => (
                <WishlistItem
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                >
                  <WishlistItemImage>
                    <img
                      src={getImageUrl(product) || "/placeholder.svg"}
                      alt={product.name || "Product"}
                    />
                    <RemoveButton
                      onClick={(e) => handleRemoveItem(product.id, e)}
                    >
                      <X size={14} />
                    </RemoveButton>
                  </WishlistItemImage>
                  <WishlistItemContent>
                    <WishlistItemTitle>
                      {product.name || "Product"}
                    </WishlistItemTitle>
                    <WishlistItemPrice>
                      {typeof product.price === "number"
                        ? `${product.price.toFixed(2)} MAD`
                        : ""}
                    </WishlistItemPrice>
                    <WishlistItemCategory>
                      {getCategoryName(product)}
                    </WishlistItemCategory>
                    <WishlistItemActions>
                      <Button
                        $variant="primary"
                        onClick={(e) => handleAddToCart(product, e)}
                        style={{
                          width: "100%",
                          fontSize: "0.75rem",
                          padding: "0.5rem 0.75rem",
                        }}
                      >
                        <ShoppingBag size={14} />
                        Ajouter au panier
                      </Button>
                    </WishlistItemActions>
                  </WishlistItemContent>
                </WishlistItem>
              ))}
            </WishlistGrid>
          ) : (
            <EmptyWishlist>
              <EmptyWishlistIcon>
                <AlertCircle size={20} />
              </EmptyWishlistIcon>
              <EmptyWishlistTitle>
                Votre liste de souhaits est vide
              </EmptyWishlistTitle>
              <EmptyWishlistText>
                Les articles ajoutés à votre liste de souhaits apparaîtront ici.
                Commencez à explorer et ajoutez vos produits préférés !
              </EmptyWishlistText>
            </EmptyWishlist>
          )}
        </ModalContent>

        <ModalFooter>
          <Button $variant="outline" onClick={onClose}>
            Continuer vos achats
          </Button>
          {wishlistCount > 0 && (
            <Button $variant="danger" onClick={handleClearWishlist}>
              <Trash2 size={16} />
              Vider la liste
            </Button>
          )}
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>,
    document.body,
  );
};

export default WishlistModal;
