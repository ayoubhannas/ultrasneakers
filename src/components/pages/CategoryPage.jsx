"use client";

import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { ShoppingBag, Heart } from "lucide-react";
import { useCart } from "../../context/CartContext.jsx";
import { useWishlist } from "../../context/WishlistContext.jsx";
import Navbar from "../Navbar.jsx";
import Footer from "../Footer.jsx";
import { GlobalStyles } from "../../styles/GlobalStyles.jsx";
import { lightTheme, darkTheme } from "../../styles/Theme.js";

const CategoryPage = () => {
  const location = useLocation();
  const [category, setCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("light");

  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();

  // Determine category from URL path
  useEffect(() => {
    const path = location.pathname;
    if (path === "/new-arrivals") {
      setCategory("new-arrivals");
    } else if (path === "/classe") {
      setCategory("classe");
    } else if (path === "/sport") {
      setCategory("sport");
    } else if (path === "/luxury") {
      setCategory("luxury");
    } else {
      setCategory("");
    }
  }, [location]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Get category title based on URL parameter
  const getCategoryTitle = () => {
    switch (category) {
      case "new-arrivals":
        return "Nouveaux Arrivages";
      case "classe":
        return "Collection Classe";
      case "sport":
        return "Collection Sport";
      case "luxury":
        return "Collection Luxury";
      default:
        return "Tous les Produits";
    }
  };

  // Get category description based on URL parameter
  const getCategoryDescription = () => {
    switch (category) {
      case "new-arrivals":
        return "Découvrez nos dernières sneakers avec les modèles les plus récents et les plus tendance.";
      case "classe":
        return "Des sneakers élégantes pour un style raffiné au quotidien.";
      case "sport":
        return "Des sneakers performantes pour vos activités sportives et votre confort.";
      case "luxury":
        return "Notre collection premium de sneakers de luxe pour un style incomparable.";
      default:
        return "Découvrez notre collection complète de sneakers.";
    }
  };

  useEffect(() => {
    // Only fetch products when category is set
    if (category) {
      fetchProducts();
    }
  }, [category]);

  const fetchProducts = () => {
    setLoading(true);
    try {
      const storedProducts = localStorage.getItem("ultrasneakers-products");
      let filteredProducts = [];

      if (storedProducts) {
        const allProducts = JSON.parse(storedProducts);

        // Filter products based on category
        if (category === "new-arrivals") {
          filteredProducts = allProducts.filter(
            (p) => p.category === "new-arrivals" || p.isNewArrival === true
          );
        } else if (category === "classe") {
          filteredProducts = allProducts.filter(
            (p) => p.category === "classe" || p.category === "Classe"
          );
        } else if (category === "sport") {
          filteredProducts = allProducts.filter(
            (p) => p.category === "sport" || p.category === "Sport"
          );
        } else if (category === "luxury") {
          filteredProducts = allProducts.filter(
            (p) =>
              p.category === "luxury" ||
              p.category === "Luxey" ||
              p.category === "Luxury"
          );
        } else {
          filteredProducts = allProducts;
        }
      } else {
        // Default products if none in localStorage
        filteredProducts = [
          {
            id: 1,
            name: "ADIDAS UltraBoost",
            price: 1899,
            category: "sport",
            images: ["/placeholder.svg?height=300&width=300"],
          },
          {
            id: 2,
            name: "NIKE Air Max",
            price: 1599,
            category: "sport",
            images: ["/placeholder.svg?height=300&width=300"],
          },
          {
            id: 3,
            name: "PUMA RS-X",
            price: 1299,
            category: "classe",
            images: ["/placeholder.svg?height=300&width=300"],
          },
          {
            id: 4,
            name: "NEW BALANCE 574",
            price: 1499,
            category: "classe",
            images: ["/placeholder.svg?height=300&width=300"],
          },
          {
            id: 5,
            name: "GUCCI Ace",
            price: 5999,
            category: "luxury",
            images: ["/placeholder.svg?height=300&width=300"],
          },
          {
            id: 6,
            name: "BALENCIAGA Triple S",
            price: 7099,
            category: "luxury",
            images: ["/placeholder.svg?height=300&width=300"],
          },
        ];

        // Filter based on category
        if (category) {
          filteredProducts = filteredProducts.filter(
            (p) => p.category.toLowerCase() === category.toLowerCase()
          );
        }
      }

      setProducts(filteredProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addToCart({
      ...product,
      selectedSize: "EUR 42", // Default size
      selectedColor: "Black", // Default color
      quantity: 1,
    });
  };

  const handleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Navbar toggleTheme={toggleTheme} theme={theme} />

      <PageContainer>
        <CategoryHeader>
          <CategoryTitle>{getCategoryTitle()}</CategoryTitle>
          <CategoryDescription>{getCategoryDescription()}</CategoryDescription>
        </CategoryHeader>

        <ProductsSection>
          {loading ? (
            <LoadingMessage>Chargement des produits...</LoadingMessage>
          ) : products.length === 0 ? (
            <EmptyMessage>
              Aucun produit trouvé pour cette catégorie.
            </EmptyMessage>
          ) : (
            <ProductsGrid>
              {products.map((product) => (
                <ProductCard key={product.id}>
                  <ProductImageContainer>
                    <Link to={`/product/${product.id}`}>
                      <ProductImage
                        src={
                          product.images?.[0] ||
                          "/placeholder.svg?height=300&width=300"
                        }
                        alt={product.name}
                      />
                    </Link>
                    <WishlistButton
                      onClick={() => handleWishlist(product)}
                      $active={isInWishlist(product.id)}
                    >
                      <Heart
                        size={20}
                        fill={
                          isInWishlist(product.id) ? "currentColor" : "none"
                        }
                      />
                    </WishlistButton>
                  </ProductImageContainer>

                  <ProductInfo>
                    <Link
                      to={`/product/${product.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <ProductName>{product.name}</ProductName>
                    </Link>
                    <ProductPrice>
                      {product.price.toLocaleString()} MAD
                    </ProductPrice>
                  </ProductInfo>

                  <AddToCartButton onClick={() => handleAddToCart(product)}>
                    <ShoppingBag size={16} />
                    Ajouter au panier
                  </AddToCartButton>
                </ProductCard>
              ))}
            </ProductsGrid>
          )}
        </ProductsSection>
      </PageContainer>

      <Footer />
    </ThemeProvider>
  );
};

const PageContainer = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const CategoryHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const CategoryTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${(props) => props.theme.text};

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CategoryDescription = styled.p`
  font-size: 1.1rem;
  color: ${(props) => props.theme.textSecondary};
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ProductsSection = styled.div`
  min-height: 400px;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ProductCard = styled.div`
  background-color: ${(props) => props.theme.cardBackground};
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.borderColor};
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const ProductImageContainer = styled.div`
  position: relative;
  padding-top: 100%;
  background-color: ${(props) => props.theme.backgroundAlt};
`;

const ProductImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 1rem;
  transition: transform 0.5s ease;

  ${ProductCard}:hover & {
    transform: scale(1.05);
  }
`;

const WishlistButton = styled.button`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background-color: ${(props) =>
    props.$active ? props.theme.primary + "20" : "rgba(255, 255, 255, 0.8)"};
  color: ${(props) => (props.$active ? props.theme.primary : props.theme.text)};
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;

  &:hover {
    background-color: ${(props) =>
      props.$active ? props.theme.primary + "30" : "white"};
  }
`;

const ProductInfo = styled.div`
  padding: 1.25rem;
`;

const ProductName = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.text};
`;

const ProductPrice = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${(props) => props.theme.primary};
`;

const AddToCartButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem;
  background-color: ${(props) => props.theme.primary};
  color: white;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.primaryHover};
  }
`;

const LoadingMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  font-size: 1.1rem;
  color: ${(props) => props.theme.textSecondary};
`;

const EmptyMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  font-size: 1.1rem;
  color: ${(props) => props.theme.textSecondary};
  text-align: center;
`;

export default CategoryPage;
