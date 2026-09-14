"use client";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { Heart, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext.jsx";
import Navbar from "../Navbar.jsx";
import Footer from "../Footer.jsx";
import { notifyCartAdded, notifyCartToast } from "../CartToast.jsx";
import { GlobalStyles } from "../../styles/GlobalStyles.jsx";
import { lightTheme, darkTheme } from "../../styles/Theme.js";
import SizeGuideModalComponent from "../SizeGuideModal";

const DetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showSizeDropdown, setShowSizeDropdown] = useState(false);
  const [deliveryTime, setDeliveryTime] = useState({ min: 24, max: 72 });
  const [theme, setTheme] = useState("light");
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        console.log(`Fetching product with id: ${id}`);
        const response = await axios.get(
          `http://localhost:8000/api/product/${id}`,
        );
        const fetchedProduct = response.data;

        if (!fetchedProduct || !fetchedProduct.id) {
          throw new Error("Produit non trouvé");
        }

        fetchedProduct.sizes =
          fetchedProduct.sizes?.map((size) => `EUR ${size.size}`) || [];

        fetchedProduct.images = fetchedProduct.images?.map(
          (img) => `http://localhost:8000/storage/${img.image_url}`,
        ) || ["/placeholder.svg?height=500&width=500"];

        setProduct(fetchedProduct);
        if (fetchedProduct.sizes.length > 0) {
          setSelectedSize(fetchedProduct.sizes[0]);
        }
      } catch (error) {
        console.error("Erreur lors du chargement du produit:", error);
        setProduct({
          id: parseInt(id, 10),
          name: `Produit #${id} (Non trouvé)`,
          price: 0,
          description: "Désolé, ce produit n'a pas été trouvé.",
          sizes: ["EUR 40", "EUR 41", "EUR 42"],
          images: ["/placeholder.svg?height=500&width=500"],
          category: "Inconnu",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      notifyCartToast({
        title: "Veuillez sélectionner une taille",
        productName: product?.name || "Produit",
        showActions: false,
      });
      return;
    }

    addToCart({
      ...product,
      selectedSize,
      selectedColor: product.category?.name || "Default",
      quantity: 1,
    });

    notifyCartAdded(product);
  };

  const handleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const nextImage = () => {
    if (product && product.images) {
      setCurrentImageIndex((prev) =>
        prev === product.images.length - 1 ? 0 : prev + 1,
      );
    }
  };

  const prevImage = () => {
    if (product && product.images) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? product.images.length - 1 : prev - 1,
      );
    }
  };

  const toggleSizeGuide = () => {
    setShowSizeGuide(!showSizeGuide);
  };

  if (loading) {
    return (
      <LoadingContainer>Chargement des détails du produit...</LoadingContainer>
    );
  }

  if (!product) {
    return <ErrorContainer>Produit non trouvé</ErrorContainer>;
  }

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Navbar toggleTheme={toggleTheme} theme={theme} />
      <PageContainer>
        <MainContent>
          <ProductImagesSection>
            <MainImageContainer>
              <PrevButton onClick={prevImage}>
                <ChevronLeft size={24} />
              </PrevButton>

              <ProductImage
                src={
                  product.images[currentImageIndex] ||
                  "/placeholder.svg?height=600&width=600"
                }
                alt={product.name}
              />

              <NextButton onClick={nextImage}>
                <ChevronRight size={24} />
              </NextButton>
            </MainImageContainer>

            <ThumbnailsContainer>
              {product.images &&
                product.images.map((image, index) => (
                  <ThumbnailImage
                    key={index}
                    src={image || "/placeholder.svg?height=100&width=100"}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    $active={index === currentImageIndex}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
            </ThumbnailsContainer>
          </ProductImagesSection>

          <ProductDetailsSection>
            <BrandName>ULTRASNEAKERS</BrandName>

            <ProductName>{product.name}</ProductName>
            <ProductCategory>
              {product.category?.name || "Sans catégorie"}
            </ProductCategory>

            <ProductPrice>{product.price.toLocaleString()} MAD</ProductPrice>

            <SizeSection>
              <SizeHeader>
                <SizeTitle>Taille</SizeTitle>
                <SizeGuideLink onClick={toggleSizeGuide}>
                  Guide des tailles
                </SizeGuideLink>
              </SizeHeader>

              <SizeDropdown
                onClick={() => setShowSizeDropdown(!showSizeDropdown)}
              >
                <SelectedSize>
                  {selectedSize || "Sélectionner une taille"}
                </SelectedSize>
                <ChevronDown size={20} />

                {showSizeDropdown && (
                  <SizeOptions>
                    {product.sizes &&
                      product.sizes.map((size) => (
                        <SizeOption
                          key={size}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSize(size);
                            setShowSizeDropdown(false);
                          }}
                          $selected={size === selectedSize}
                        >
                          {size}
                        </SizeOption>
                      ))}
                  </SizeOptions>
                )}
              </SizeDropdown>
            </SizeSection>

            <ActionButtons>
              <AddToCartButton onClick={handleAddToCart}>
                Ajouter au panier
              </AddToCartButton>

              <WishlistButton
                onClick={handleWishlist}
                $active={isInWishlist(product.id)}
              >
                <Heart
                  size={20}
                  fill={isInWishlist(product.id) ? "currentColor" : "none"}
                />
                Wishlist
              </WishlistButton>
            </ActionButtons>

            <DeliveryInfo>
              <DeliveryTitle>Délai de livraison estimé</DeliveryTitle>
              <DeliveryDate>
                Entre {deliveryTime.min} et {deliveryTime.max} heures
              </DeliveryDate>
            </DeliveryInfo>

            <ProductDescription>
              <DescriptionTitle>Description</DescriptionTitle>
              <DescriptionText>{product.description}</DescriptionText>
            </ProductDescription>
          </ProductDetailsSection>
        </MainContent>
      </PageContainer>
      <Footer />

      {showSizeGuide && <SizeGuideModalComponent onClose={toggleSizeGuide} />}
    </ThemeProvider>
  );
};

const PageContainer = styled.div`
  margin: 20px auto;
  max-width: 1300px;
  padding-bottom: 4rem;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ProductImagesSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const MainImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.backgroundAlt};

  @media (max-width: 768px) {
    height: 400px;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
`;

const PrevButton = styled.button`
  position: absolute;
  left: 1rem;
  background: ${(props) => props.theme.cardBackground};
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: ${(props) => props.theme.shadow};
  z-index: 2;
  color: ${(props) => props.theme.text};

  &:hover {
    background-color: ${(props) => props.theme.hoverBackground};
  }
`;

const NextButton = styled(PrevButton)`
  left: auto;
  right: 1rem;
`;

const ThumbnailsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme.backgroundAlt};
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.borderColor};
    border-radius: 4px;
  }
`;

const ThumbnailImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid
    ${(props) => (props.$active ? props.theme.primary : "transparent")};

  &:hover {
    border-color: ${(props) => props.theme.primary};
  }
`;

const ProductDetailsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const BrandName = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${(props) => props.theme.text};
`;

const ProductName = styled.h1`
  font-size: 2rem;
  font-weight: 500;
  margin: 0;
  color: ${(props) => props.theme.text};
`;

const ProductCategory = styled.div`
  color: ${(props) => props.theme.textSecondary};
  font-size: 1rem;
`;

const ProductPrice = styled.div`
  font-size: 1.8rem;
  font-weight: 500;
  color: ${(props) => props.theme.primary};
`;

const SizeSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SizeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SizeTitle = styled.div`
  font-weight: 500;
  color: ${(props) => props.theme.text};
`;

const SizeGuideLink = styled.a`
  color: ${(props) => props.theme.textSecondary};
  text-decoration: underline;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.primary};
  }
`;

const SizeDropdown = styled.div`
  position: relative;
  border: 1px solid ${(props) => props.theme.borderColor};
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background-color: ${(props) => props.theme.cardBackground};
  color: ${(props) => props.theme.text};

  &:hover {
    border-color: ${(props) => props.theme.primary};
  }
`;

const SelectedSize = styled.div`
  font-weight: 500;
`;

const SizeOptions = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${(props) => props.theme.cardBackground};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-top: none;
  max-height: 300px;
  overflow-y: auto;
  z-index: 10;
`;

const SizeOption = styled.div`
  padding: 1rem;
  cursor: pointer;
  background-color: ${(props) =>
    props.$selected ? props.theme.hoverBackground : props.theme.cardBackground};
  color: ${(props) => props.theme.text};

  &:hover {
    background-color: ${(props) => props.theme.hoverBackground};
  }
`;

const ActionButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
`;

const AddToCartButton = styled.button`
  background-color: ${(props) => props.theme.primary};
  color: white;
  border: none;
  padding: 1rem;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.primaryHover};
  }
`;

const WishlistButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: ${(props) =>
    props.$active ? props.theme.hoverBackground : props.theme.cardBackground};
  color: ${(props) => props.theme.text};
  border: 1px solid ${(props) => props.theme.borderColor};
  padding: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${(props) => props.theme.primary};
  }
`;

const DeliveryInfo = styled.div`
  padding: 1rem;
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.backgroundAlt};
`;

const DeliveryTitle = styled.div`
  font-weight: 500;
  color: ${(props) => props.theme.text};
  margin-bottom: 0.5rem;
`;

const DeliveryDate = styled.div`
  color: ${(props) => props.theme.textSecondary};
`;

const ProductDescription = styled.div`
  margin-top: 1rem;
`;

const DescriptionTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: ${(props) => props.theme.text};
`;

const DescriptionText = styled.p`
  line-height: 1.6;
  color: ${(props) => props.theme.textSecondary};
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  font-size: 1.2rem;
  color: ${(props) => props.theme.textSecondary};
  background-color: ${(props) => props.theme.background};
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  font-size: 1.2rem;
  color: ${(props) => props.theme.primary};
  background-color: ${(props) => props.theme.background};
`;

export default DetailPage;
