"use client";

import { useState } from "react";
import styled from "styled-components";
import { Heart } from "lucide-react";
import { useWishlist } from "../../context/WishlistContext";
import WishlistModal from "./WishlistModal";

const WishlistIconContainer = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: ${(props) => props.theme.text};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.375rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.hoverBackground};
    color: ${(props) => props.theme.primary};
  }
`;

const WishlistCount = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background-color: ${(props) => props.theme.primary};
  color: white;
  font-size: 0.625rem;
  font-weight: 600;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate(25%, -25%);
`;

const WishlistIcon = () => {
  const { wishlistCount } = useWishlist();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <WishlistIconContainer
        onClick={handleOpenModal}
        aria-label="Voir la liste de souhaits"
      >
        <Heart size={20} />
        {wishlistCount > 0 && <WishlistCount>{wishlistCount}</WishlistCount>}
      </WishlistIconContainer>

      <WishlistModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default WishlistIcon;
