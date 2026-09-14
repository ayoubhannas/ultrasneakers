"use client";

import { useState } from "react";
import styled from "styled-components";
import { Heart } from "lucide-react";
import { useWishlist } from "../../context/WishlistContext";

const WishlistButtonContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: ${(props) =>
    props.$active ? props.theme.primary + "20" : props.theme.backgroundAlt};
  border: 1px solid
    ${(props) =>
      props.$active ? props.theme.primary : props.theme.borderColor};
  color: ${(props) =>
    props.$active ? props.theme.primary : props.theme.textSecondary};
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    background-color: ${(props) =>
      props.$active ? props.theme.primary + "30" : props.theme.hoverBackground};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle,
      ${(props) => props.theme.primary + "40"} 0%,
      transparent 70%
    );
    opacity: 0;
    transform: scale(0.5);
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  ${(props) =>
    props.$animate &&
    `
    &::after {
      opacity: 1;
      transform: scale(2);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
  `}
`;

const HeartIcon = styled(Heart)`
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease;

  ${(props) =>
    props.$active &&
    `
    fill: ${props.theme.primary};
    stroke: ${props.theme.primary};
  `}

  ${(props) =>
    props.$animate &&
    `
    transform: scale(1.3);
  `}
`;

const WishlistButton = ({ product }) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [animate, setAnimate] = useState(false);

  const active = isInWishlist(product.id);

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (active) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
      setAnimate(true);
      setTimeout(() => setAnimate(false), 600);
    }
  };

  return (
    <WishlistButtonContainer
      onClick={handleToggleWishlist}
      $active={active}
      $animate={animate}
      aria-label={
        active
          ? "Retirer de la liste de souhaits"
          : "Ajouter à la liste de souhaits"
      }
      type="button"
    >
      <HeartIcon size={18} $active={active} $animate={animate} />
    </WishlistButtonContainer>
  );
};

export default WishlistButton;
