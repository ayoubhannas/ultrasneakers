// "use client";

// import { useEffect, useState } from "react";
// import { createPortal } from "react-dom";
// import styled, { keyframes } from "styled-components";
// import { Check, X } from "lucide-react";

// export const notifyCartToast = ({
//   title = "Produit ajouté au panier",
//   productName = "",
//   showActions = true,
//   variant = "success",
// }) => {
//   if (typeof window === "undefined") return;

//   window.dispatchEvent(
//     new CustomEvent("cart:toast", {
//       detail: { title, productName, showActions, variant },
//     }),
//   );
// };

// export const notifyCartAdded = (product = {}) => {
//   notifyCartToast({
//     title: "Produit ajouté au panier",
//     productName: product.name || "Produit",
//     showActions: true,
//     variant: "success",
//   });
// };

// export const openCartDrawer = () => {
//   if (typeof window === "undefined") return;
//   window.dispatchEvent(new CustomEvent("cart:drawer:open"));
// };

// const slideIn = keyframes`
//   from {
//     opacity: 0;
//     transform: translateY(-8px) translateX(12px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0) translateX(0);
//   }
// `;

// const slideOut = keyframes`
//   from {
//     opacity: 1;
//     transform: translateY(0) translateX(0);
//   }
//   to {
//     opacity: 0;
//     transform: translateY(-8px) translateX(12px);
//   }
// `;

// const ToastRoot = styled.div`
//   position: fixed;
//   top: 1.25rem;
//   right: 1.25rem;
//   z-index: 2000;
//   width: min(360px, calc(100vw - 2rem));
//   background: #aaa9a9;
//   border: 1px solid ${(props) => props.theme.borderColor};
//   border-left: 3px solid ${(props) => props.theme.primary};
//   box-shadow: 0 18px 35px rgba(15, 23, 42, 0.12);
//   border-radius: 0.75rem;
//   padding: 0.9rem 0.85rem 0.75rem;
//   color: ${(props) => props.theme.text};
//   animation: ${(props) => (props.$isLeaving ? slideOut : slideIn)} 0.22s ease;
// `;

// const ToastHeader = styled.div`
//   display: flex;
//   align-items: flex-start;
//   gap: 0.75rem;
// `;

// const IconWrap = styled.div`
//   width: 2rem;
//   height: 2rem;
//   background: rgba(212, 55, 55, 0.1);
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   color: ${(props) => props.theme.primary};
//   flex-shrink: 0;
// `;

// const TextGroup = styled.div`
//   flex: 1;
//   min-width: 0;
// `;

// const ToastTitle = styled.p`
//   margin: 0;
//   font-size: 0.95rem;
//   font-weight: 600;
//   line-height: 1.35;
//   color: ${(props) => props.theme.text};
// `;

// const ProductName = styled.p`
//   margin: 0.2rem 0 0;
//   font-size: 0.8rem;
//   line-height: 1.4;
//   color: ${(props) => props.theme.textSecondary};
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
// `;

// const CloseButton = styled.button.attrs({ type: "button" })`
//   border: none;
//   background: transparent;
//   color: ${(props) => props.theme.textSecondary};
//   cursor: pointer;
//   width: 2rem;
//   height: 2rem;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   transition:
//     background-color 0.2s ease,
//     color 0.2s ease;

//   &:hover,
//   &:focus-visible {
//     background: rgba(15, 23, 42, 0.06);
//     color: ${(props) => props.theme.text};
//     outline: none;
//   }
// `;

// const ToastFooter = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   margin-top: 0.7rem;
// `;

// const ViewCartButton = styled.button.attrs({ type: "button" })`
//   border: 1px solid ${(props) => props.theme.borderColor};
//   background: #ffffff;
//   color: ${(props) => props.theme.text};
//   padding: 0.55rem 0.9rem;
//   font-size: 0.8rem;
//   font-weight: 600;
//   border-radius: 9999px;
//   cursor: pointer;
//   transition: all 0.2s ease;

//   &:hover,
//   &:focus-visible {
//     border-color: ${(props) => props.theme.primary};
//     color: ${(props) => props.theme.primary};
//     outline: none;
//   }
// `;

// const CartToast = () => {
//   const [visible, setVisible] = useState(false);
//   const [title, setTitle] = useState("Produit ajouté au panier");
//   const [productName, setProductName] = useState("");
//   const [showActions, setShowActions] = useState(true);
//   const [isLeaving, setIsLeaving] = useState(false);

//   useEffect(() => {
//     let timeoutId;

//     const handleToast = (event) => {
//       const {
//         title: nextTitle,
//         productName: nextProductName,
//         showActions: nextShowActions,
//       } = event.detail || {};

//       setTitle(nextTitle || "Produit ajouté au panier");
//       setProductName(nextProductName || "");
//       setShowActions(nextShowActions !== false);
//       setIsLeaving(false);
//       setVisible(true);

//       if (timeoutId) clearTimeout(timeoutId);
//       timeoutId = setTimeout(() => {
//         setIsLeaving(true);
//         setTimeout(() => setVisible(false), 180);
//       }, 4000);
//     };

//     if (typeof window !== "undefined") {
//       window.addEventListener("cart:toast", handleToast);
//     }

//     return () => {
//       if (typeof window !== "undefined") {
//         window.removeEventListener("cart:toast", handleToast);
//       }
//       if (timeoutId) clearTimeout(timeoutId);
//     };
//   }, []);

//   const handleClose = () => {
//     setIsLeaving(true);
//     setTimeout(() => setVisible(false), 180);
//   };

//   const handleOpenCart = () => {
//     handleClose();
//     openCartDrawer();
//   };

//   if (!visible) return null;

//   return createPortal(
//     <ToastRoot
//       aria-live="polite"
//       aria-atomic="true"
//       role="status"
//       $isLeaving={isLeaving}
//     >
//       <ToastHeader>
//         <IconWrap aria-hidden="true">
//           <Check size={16} strokeWidth={2.5} />
//         </IconWrap>

//         <TextGroup>
//           <ToastTitle>{title}</ToastTitle>
//           {productName && <ProductName>{productName}</ProductName>}
//         </TextGroup>

//         <CloseButton
//           aria-label="Fermer la notification"
//           onClick={handleClose}
//           title="Fermer"
//         >
//           <X size={16} />
//         </CloseButton>
//       </ToastHeader>

//       {showActions && (
//         <ToastFooter>
//           <ViewCartButton onClick={handleOpenCart}>
//             Voir le panier
//           </ViewCartButton>
//         </ToastFooter>
//       )}
//     </ToastRoot>,
//     document.body,
//   );
// };

// export default CartToast;

"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styled, { keyframes } from "styled-components";
import { Check, X } from "lucide-react";

export const notifyCartToast = ({
  title = "Produit ajouté au panier",
  productName = "",
  showActions = true,
}) => {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent("cart:toast", {
      detail: { title, productName, showActions },
    }),
  );
};

export const notifyCartAdded = (product = {}) => {
  notifyCartToast({
    title: "Produit ajouté au panier",
    productName: product.name || "Produit",
    showActions: true,
  });
};

export const openCartDrawer = () => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("cart:drawer:open"));
};

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-12px);
  }
`;

const ToastRoot = styled.div`
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 2000;
  width: min(370px, calc(100vw - 2rem));
  box-sizing: border-box;
  background: #ffffff;
  color: #111111;
  border: 1px solid #e8e8e8;
  border-left: 4px solid #ff4d55;
  border-radius: 4px;
  box-shadow: 0 14px 35px rgba(0, 0, 0, 0.14);
  padding: 1rem;
  animation: ${(props) => (props.$isLeaving ? slideOut : slideIn)} 0.22s ease
    forwards;

  @media (max-width: 480px) {
    top: 1rem;
    right: 1rem;
  }
`;

const ToastHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
`;

const IconWrap = styled.div`
  width: 2.15rem;
  height: 2.15rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff0f1;
  color: #ff4d55;
  border: 1px solid #ffd9dc;
  border-radius: 3px;
`;

const TextGroup = styled.div`
  flex: 1;
  min-width: 0;
  padding-top: 0.05rem;
`;

const ToastTitle = styled.p`
  margin: 0;
  color: #111111;
  font-size: 0.92rem;
  font-weight: 700;
  line-height: 1.35;
`;

const ProductName = styled.p`
  margin: 0.23rem 0 0;
  color: #6d6d6d;
  font-size: 0.82rem;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CloseButton = styled.button.attrs({ type: "button" })`
  width: 2rem;
  height: 2rem;
  padding: 0;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  background: transparent;
  color: #4c4c4c;
  cursor: pointer;
  transition:
    background 0.2s ease,
    color 0.2s ease;

  &:hover,
  &:focus-visible {
    background: #f3f3f3;
    color: #111111;
    outline: none;
  }
`;

const ToastFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.9rem;
  padding-top: 0.8rem;
  border-top: 1px solid #eeeeee;
`;

const ViewCartButton = styled.button.attrs({ type: "button" })`
  border: 1px solid #ff4d55;
  border-radius: 3px;
  background: #ff4d55;
  color: #ffffff;
  padding: 0.58rem 1rem;
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
  transition:
    background 0.2s ease,
    border-color 0.2s ease;

  &:hover,
  &:focus-visible {
    background: #111111;
    border-color: #111111;
    outline: none;
  }
`;

const CartToast = () => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("Produit ajouté au panier");
  const [productName, setProductName] = useState("");
  const [showActions, setShowActions] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    let timeoutId;
    let closeTimeoutId;

    const closeToast = () => {
      setIsLeaving(true);
      closeTimeoutId = setTimeout(() => setVisible(false), 220);
    };

    const handleToast = (event) => {
      const {
        title: nextTitle,
        productName: nextProductName,
        showActions: nextShowActions,
      } = event.detail || {};

      setTitle(nextTitle || "Produit ajouté au panier");
      setProductName(nextProductName || "");
      setShowActions(nextShowActions !== false);
      setIsLeaving(false);
      setVisible(true);

      clearTimeout(timeoutId);
      clearTimeout(closeTimeoutId);

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
    setTimeout(() => setVisible(false), 220);
  };

  const handleOpenCart = () => {
    handleClose();
    openCartDrawer();
  };

  if (!visible) return null;

  return createPortal(
    <ToastRoot
      role="status"
      aria-live="polite"
      aria-atomic="true"
      $isLeaving={isLeaving}
    >
      <ToastHeader>
        <IconWrap aria-hidden="true">
          <Check size={17} strokeWidth={2.7} />
        </IconWrap>

        <TextGroup>
          <ToastTitle>{title}</ToastTitle>
          {productName && <ProductName>{productName}</ProductName>}
        </TextGroup>

        <CloseButton
          aria-label="Fermer la notification"
          title="Fermer"
          onClick={handleClose}
        >
          <X size={18} />
        </CloseButton>
      </ToastHeader>

      {showActions && (
        <ToastFooter>
          <ViewCartButton onClick={handleOpenCart}>
            Voir le panier
          </ViewCartButton>
        </ToastFooter>
      )}
    </ToastRoot>,
    document.body,
  );
};

export default CartToast;
