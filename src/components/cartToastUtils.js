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
