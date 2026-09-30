"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styled, { keyframes, ThemeProvider } from "styled-components";
import { Check, ShoppingBag, X } from "lucide-react";
import { lightTheme, darkTheme } from "../styles/Theme.js";
import { openCartDrawer } from "./cartToastUtils.js";

const getCurrentThemeName = () => {
  if (typeof window === "undefined") return "light";

  const storedTheme = localStorage.getItem("ultrasneakers-theme");
  if (storedTheme === "dark" || storedTheme === "light") {
    return storedTheme;
  }

  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
};

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const modalIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -47%) scale(0.94);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

const modalOut = keyframes`
  from {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  to {
    opacity: 0;
    transform: translate(-50%, -47%) scale(0.94);
  }
`;

const progress = keyframes`
  from { transform: scaleX(1); }
  to { transform: scaleX(0); }
`;

const ToastBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: rgba(10, 10, 10, 0.28);
  backdrop-filter: blur(5px);
  animation: ${(props) => (props.$isLeaving ? fadeOut : fadeIn)} 0.22s ease
    forwards;
`;

const ToastRoot = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 2001;
  width: min(420px, calc(100vw - 2rem));
  overflow: hidden;
  box-sizing: border-box;
  background: ${(props) => props.theme.cardBackground};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 12px;
  box-shadow: ${(props) => props.theme.shadow};
  color: ${(props) => props.theme.text};
  animation: ${(props) => (props.$isLeaving ? modalOut : modalIn)} 0.28s
    cubic-bezier(0.16, 1, 0.3, 1) forwards;
`;

const TopLine = styled.div`
  height: 4px;
  background: linear-gradient(90deg, #ff4d55, #ff777d);
`;

const Content = styled.div`
  padding: 1.6rem 1.6rem 1.35rem;

  @media (max-width: 480px) {
    padding: 1.35rem 1.2rem 1.15rem;
  }
`;

const CloseButton = styled.button.attrs({ type: "button" })`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2rem;
  height: 2rem;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: ${(props) => props.theme.textSecondary};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover,
  &:focus-visible {
    background: ${(props) => props.theme.hoverBackground};
    color: ${(props) => props.theme.text};
    outline: none;
  }
`;

const SuccessIcon = styled.div`
  width: 3.4rem;
  height: 3.4rem;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 77, 77, 0.25);
  border-radius: 50%;
  background: rgba(255, 77, 77, 0.12);
  color: ${(props) => props.theme.primary};
`;

const ToastTitle = styled.h3`
  margin: 0;
  color: ${(props) => props.theme.text};
  font-size: 1.18rem;
  font-weight: 800;
  line-height: 1.3;
  text-align: center;
`;

const ProductName = styled.p`
  margin: 0.5rem auto 0;
  max-width: 300px;
  color: ${(props) => props.theme.textSecondary};
  font-size: 0.92rem;
  line-height: 1.4;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Divider = styled.div`
  height: 1px;
  margin: 1.3rem 0 1rem;
  background: ${(props) => props.theme.borderColor};
`;

const CartInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${(props) => props.theme.textSecondary};
  font-size: 0.82rem;
`;

const Actions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.7rem;
  margin-top: 1.2rem;
`;

const ContinueButton = styled.button.attrs({ type: "button" })`
  min-height: 2.8rem;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 5px;
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  font-size: 0.83rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover,
  &:focus-visible {
    border-color: ${(props) => props.theme.text};
    background: ${(props) => props.theme.hoverBackground};
    outline: none;
  }
`;

const ViewCartButton = styled.button.attrs({ type: "button" })`
  min-height: 2.8rem;
  border: 1px solid ${(props) => props.theme.primary};
  border-radius: 5px;
  background: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.background};
  font-size: 0.83rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover,
  &:focus-visible {
    border-color: ${(props) => props.theme.text};
    background: ${(props) => props.theme.primaryHover};
    outline: none;
  }
`;

const ProgressBar = styled.div`
  height: 3px;
  background: #ff4d55;
  transform-origin: left;
  animation: ${progress} 4s linear forwards;
`;

const CartToast = () => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("Produit ajouté au panier");
  const [productName, setProductName] = useState("");
  const [showActions, setShowActions] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);
  const [themeName, setThemeName] = useState(() => getCurrentThemeName());

  useEffect(() => {
    const syncTheme = () => setThemeName(getCurrentThemeName());

    syncTheme();

    const handleThemeChange = (event) => {
      if (event.detail) {
        setThemeName(event.detail);
      } else {
        syncTheme();
      }
    };

    const handleStorage = (event) => {
      if (event.key === "ultrasneakers-theme") {
        syncTheme();
      }
    };

    const observer = new MutationObserver(() => {
      syncTheme();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    window.addEventListener("theme:change", handleThemeChange);
    window.addEventListener("storage", handleStorage);

    return () => {
      observer.disconnect();
      window.removeEventListener("theme:change", handleThemeChange);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  useEffect(() => {
    let timeoutId;
    let closeTimeoutId;

    const closeToast = () => {
      setIsLeaving(true);
      closeTimeoutId = setTimeout(() => setVisible(false), 280);
    };

    const handleToast = (event) => {
      const {
        title: nextTitle,
        productName: nextProductName,
        showActions: nextShowActions,
      } = event.detail || {};

      clearTimeout(timeoutId);
      clearTimeout(closeTimeoutId);

      setTitle(nextTitle || "Produit ajouté au panier");
      setProductName(nextProductName || "");
      setShowActions(nextShowActions !== false);
      setIsLeaving(false);
      setVisible(true);

      timeoutId = setTimeout(closeToast, 4000);
    };

    window.addEventListener("cart:toast", handleToast);

    return () => {
      window.removeEventListener("cart:toast", handleToast);
      clearTimeout(timeoutId);
      clearTimeout(closeTimeoutId);
    };
  }, []);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => setVisible(false), 280);
  };

  const handleOpenCart = () => {
    handleClose();
    openCartDrawer();
  };

  const currentTheme = themeName === "dark" ? darkTheme : lightTheme;

  if (!visible) return null;

  return createPortal(
    <ThemeProvider theme={currentTheme}>
      <>
        <ToastBackdrop $isLeaving={isLeaving} onClick={handleClose} />

        <ToastRoot
          role="dialog"
          aria-modal="true"
          aria-live="polite"
          aria-label="Produit ajouté au panier"
          $isLeaving={isLeaving}
        >
          <TopLine />

          <CloseButton
            aria-label="Fermer la notification"
            title="Fermer"
            onClick={handleClose}
          >
            <X size={18} />
          </CloseButton>

          <Content>
            <SuccessIcon aria-hidden="true">
              <Check size={28} strokeWidth={2.5} />
            </SuccessIcon>

            <ToastTitle>{title}</ToastTitle>

            {productName && <ProductName>{productName}</ProductName>}

            <Divider />

            <CartInfo>
              <ShoppingBag size={16} strokeWidth={2} />
              Votre article est prêt dans le panier
            </CartInfo>

            {showActions && (
              <Actions>
                <ContinueButton onClick={handleClose}>
                  Continuer mes achats
                </ContinueButton>

                <ViewCartButton onClick={handleOpenCart}>
                  Voir le panier
                </ViewCartButton>
              </Actions>
            )}
          </Content>

          <ProgressBar />
        </ToastRoot>
      </>
    </ThemeProvider>,
    document.body,
  );
};

export default CartToast;
