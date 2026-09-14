"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ShoppingBag, Heart } from "lucide-react";
import axios from "axios";
import { useWishlist } from "@/context/WishlistContext.jsx";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          "http://localhost:8000/api/product?featured=true"
        );
        setProducts(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error(error);
        setProducts([
          {
            id: 1,
            name: "UltraBoost Pro",
            price: 1899.9,
            images: [{ path: "/placeholder.svg" }],
          },
          {
            id: 2,
            name: "AirFlex Runner",
            price: 1599.9,
            images: [{ path: "/placeholder.svg" }],
          },
          {
            id: 3,
            name: "CloudStep Elite",
            price: 1999.9,
            images: [{ path: "/placeholder.svg" }],
          },
          {
            id: 4,
            name: "Velocity X",
            price: 1799.9,
            images: [{ path: "/placeholder.svg" }],
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  if (loading) {
    return <SectionContainer>Chargement des produits...</SectionContainer>;
  }

  return (
    <SectionContainer>
      <SectionHeader>
        <SectionTitle>Produits Vedettes</SectionTitle>
        <SectionSubtitle>
          Nos styles les plus populaires cette saison
        </SectionSubtitle>
      </SectionHeader>

      <ProductsGrid>
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id}>
              <ProductImageContainer>
                <Link to={`/product/${product.id}`}>
                  <ProductImage
                    src={
                      product.images?.[0]?.image_url
                        ? `http://localhost:8000/storage/${product.images[0].image_url}`
                        : "/placeholder.svg"
                    }
                    alt={product.name}
                  />
                </Link>
                <WishlistButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWishlist(product);
                  }}
                >
                  <Heart
                    size={20}
                    fill={isInWishlist(product.id) ? "currentColor" : "none"}
                  />
                </WishlistButton>
              </ProductImageContainer>

              <ProductContent>
                <Link
                  to={`/product/${product.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <ProductName>{product.name}</ProductName>
                </Link>
                <ProductPrice>
                  {product.price.toLocaleString()} MAD
                </ProductPrice>
              </ProductContent>
            </ProductCard>
          ))
        ) : (
          <NoProducts>
            Aucun produit vedette disponible pour le moment.
          </NoProducts>
        )}
      </ProductsGrid>
    </SectionContainer>
  );
};

const SectionContainer = styled.section`
  padding: 4rem 2rem;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.text};

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  color: ${(props) => props.theme.textSecondary};
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ProductCard = styled.div`
  background-color: ${(props) => props.theme.cardBackground};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${(props) => props.theme.shadow};
  }
`;

const ProductImageContainer = styled.div`
  position: relative;
  padding-top: 100%;
  height: 300px;
  background-color: ${(props) => props.theme.backgroundAlt};

  @media (max-width: 768px) {
    height: 200px;
  }
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
  top: 0.5rem;
  right: 0.5rem;
  background-color: ${(props) => props.theme.cardBackground};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${(props) => props.theme.text};
  z-index: 2;

  &:hover {
    background-color: ${(props) => props.theme.hoverBackground};
    color: ${(props) => props.theme.primary};
  }
`;

const ProductContent = styled.div`
  padding: 1rem;
`;

const ProductName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.text};
`;

const ProductPrice = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${(props) => props.theme.primary};
`;

const NoProducts = styled.div`
  text-align: center;
  color: ${(props) => props.theme.textSecondary};
  font-size: 1.2rem;
`;

export default FeaturedProducts;
