"use client";

import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { Heart, Search } from "lucide-react";
import axios from "axios";
import { useWishlist } from "../../context/WishlistContext.jsx";
import Navbar from "../Navbar.jsx";
import Footer from "../Footer.jsx";
import { GlobalStyles } from "../../styles/GlobalStyles.jsx";
import { lightTheme, darkTheme } from "../../styles/Theme.js";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("ultrasneakers-theme");
    return storedTheme || "light";
  });

  const location = useLocation();
  const navigate = useNavigate();
  const productsPerPage = 16;

  useEffect(() => {
    const nextTheme = theme === "dark" ? "dark" : "light";
    localStorage.setItem("ultrasneakers-theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    window.dispatchEvent(
      new CustomEvent("theme:change", { detail: nextTheme }),
    );
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const page = Number.parseInt(queryParams.get("page") || "1");
    const search = queryParams.get("search") || "";

    setCurrentPage(page);
    setSearchTerm(search);
  }, [location.search]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await axios.get("http://localhost:8000/api/product", {
          params: {
            page: currentPage,
            limit: productsPerPage,
            search: searchTerm,
          },
        });

        let productsData = [];
        let total = 0;

        if (response.data.data && Array.isArray(response.data.data)) {
          productsData = response.data.data;
          total = response.data.total || response.data.data.length;
        } else if (Array.isArray(response.data)) {
          productsData = response.data;
          total = response.data.length;
        } else {
          productsData = [];
          total = 0;
        }

        const validatedProducts = productsData.map((product) => ({
          id: product.id || Math.random(),
          name: product.name || "Produit sans nom",
          price: Number(product.price) || 0,
          images: Array.isArray(product.images) ? product.images : [],
          category: product.category || "",
          description: product.description || "",
          status: product.status,
        }));

        setProducts(validatedProducts);
        setTotalPages(Math.ceil(total / productsPerPage));
      } catch (error) {
        console.error(error);
        setProducts([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, searchTerm]);

  const updateURL = (page, search) => {
    const params = new URLSearchParams();
    if (page !== 1) params.set("page", page.toString());
    if (search) params.set("search", search);

    const newUrl = `/shop${params.toString() ? `?${params.toString()}` : ""}`;
    navigate(newUrl, { replace: true });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    updateURL(page, searchTerm);
    window.scrollTo(0, 0);
  };

  const handleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const renderPaginationNumbers = () => {
    const pages = [];
    const maxVisiblePages = 3;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PageNumber
          key={i}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </PageNumber>,
      );
    }

    return pages;
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <PageContainer>
        <Navbar toggleTheme={toggleTheme} theme={theme} />

        <MainContent>
          <CollectionHeader>
            <SectionTitle>Collection</SectionTitle>
            <SectionSubtitle>
              Découvrez notre sélection de chaussures parfaites pour tous les
              styles
            </SectionSubtitle>
            <SearchBar>
              <Search size={17} aria-hidden="true" />
              <SearchInput
                type="search"
                aria-label="Rechercher un produit"
                placeholder="Rechercher un produit"
                value={searchTerm}
                onChange={(event) => updateURL(1, event.target.value)}
              />
            </SearchBar>
          </CollectionHeader>

          {location.state?.message && (
            <AvailabilityNotice role="alert">
              {location.state.message}
            </AvailabilityNotice>
          )}

          {loading ? (
            <LoadingContainer>
              <LoadingText>Chargement des produits...</LoadingText>
            </LoadingContainer>
          ) : products.length > 0 ? (
            <>
              <ProductsGrid>
                {products.map((product) => {
                  if (!product || typeof product !== "object") {
                    return null;
                  }

                  return (
                    <ProductCard key={product.id}>
                      <ProductImageContainer>
                        <Link to={`/product/${product.id}`}>
                          <ProductImage
                            src={
                              product.images &&
                              product.images.length > 0 &&
                              product.images[0]?.image_url
                                ? `http://localhost:8000/storage/${product.images[0].image_url}`
                                : "/placeholder.svg?height=300&width=300"
                            }
                            alt={product.name || "Produit"}
                            onError={(e) => {
                              e.target.src =
                                "/placeholder.svg?height=300&width=300";
                              e.target.alt = "Image non disponible";
                            }}
                          />
                        </Link>
                        <WishlistButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleWishlist(product);
                          }}
                        >
                          <Heart
                            size={16}
                            fill={
                              isInWishlist(product.id) ? "currentColor" : "none"
                            }
                          />
                        </WishlistButton>
                      </ProductImageContainer>

                      <ProductContent>
                        <Link
                          to={`/product/${product.id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <ProductName>
                            {product.name || "Produit sans nom"}
                          </ProductName>
                        </Link>
                        <ProductPrice>
                          {typeof product.price === "number"
                            ? product.price.toLocaleString()
                            : Number(product.price || 0).toLocaleString()}{" "}
                          MAD
                        </ProductPrice>
                      </ProductContent>
                    </ProductCard>
                  );
                })}
              </ProductsGrid>

              {totalPages > 1 && (
                <PaginationContainer>
                  <PaginationArrow
                    disabled={currentPage === 1}
                    onClick={() =>
                      currentPage > 1 && handlePageChange(currentPage - 1)
                    }
                  >
                    ‹ Previous
                  </PaginationArrow>

                  {renderPaginationNumbers()}

                  <PaginationArrow
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      currentPage < totalPages &&
                      handlePageChange(currentPage + 1)
                    }
                  >
                    Next ›
                  </PaginationArrow>
                </PaginationContainer>
              )}
            </>
          ) : (
            <NoProducts>
              <NoProductsText>
                {searchTerm
                  ? `Aucun produit trouvé pour "${searchTerm}"`
                  : "Aucun produit disponible pour le moment."}
              </NoProductsText>
            </NoProducts>
          )}
        </MainContent>

        <Footer />
      </PageContainer>
    </ThemeProvider>
  );
};

const PageContainer = styled.div`
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const AvailabilityNotice = styled.div`
  margin: 0 auto 1.5rem;
  padding: 0.875rem 1rem;
  max-width: 40rem;
  border: 1px solid #dc2626;
  color: #991b1b;
  background-color: #fef2f2;
  text-align: center;
`;

const MainContent = styled.main`
  flex: 1;
  width: min(100%, 1200px);
  padding: 0 2rem;
  margin: 0 auto;
  min-width: 0;

  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const CollectionHeader = styled.div`
  text-align: center;
  margin: 2rem 0;
`;

const SearchBar = styled.label`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: min(100%, 28rem);
  margin: 1.5rem auto 0;
  padding: 0.7rem 0.9rem;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 0.375rem;
  background-color: ${(props) => props.theme.cardBackground};
  color: ${(props) => props.theme.textSecondary};
`;

const SearchInput = styled.input`
  min-width: 0;
  width: 100%;
  border: 0;
  outline: 0;
  background: transparent;
  color: ${(props) => props.theme.text};
  font: inherit;
`;

const SectionTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.text};
`;

const SectionSubtitle = styled.p`
  font-size: 0.9rem;
  color: ${(props) => props.theme.textSecondary};
  margin-bottom: 0.5rem;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 0;
`;

const LoadingText = styled.p`
  font-size: 1rem;
  color: ${(props) => props.theme.textSecondary};
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin: 2rem 0;

  @media (min-width: 480px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

const ProductCard = styled.div`
  background-color: ${(props) => props.theme.cardBackground};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 0;
  overflow: hidden;
  transition: transform 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: relative;

  &:hover {
    transform: translateY(-3px);
  }
`;

const ProductImageContainer = styled.div`
  position: relative;
  height: 250px;
  background-color: ${(props) => props.theme.backgroundAlt};

  @media (max-width: 768px) {
    height: 200px;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 1rem;
`;

const WishlistButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: ${(props) => props.theme.cardBackground};
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${(props) => props.theme.textSecondary};
  z-index: 2;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  &:hover {
    color: #ff4d4d;
  }
`;

const ProductContent = styled.div`
  padding: 0.75rem;
  text-align: center;
`;

const ProductName = styled.h3`
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
  color: ${(props) => props.theme.text};
  text-align: center;
`;

const ProductPrice = styled.p`
  font-size: 0.85rem;
  font-weight: 600;
  color: #ff4d4d;
  text-align: center;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0 3rem 0;
  gap: 0.25rem;
`;

const PageNumber = styled.button`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0;
  background-color: ${(props) =>
    props.active ? props.theme.text : "transparent"};
  color: ${(props) =>
    props.active ? props.theme.background : props.theme.text};
  border: 1px solid
    ${(props) => (props.active ? props.theme.text : props.theme.borderColor)};
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.85rem;
  font-weight: 400;

  &:hover {
    background-color: ${(props) =>
      props.active ? props.theme.text : props.theme.hoverBackground};
  }
`;

const PaginationArrow = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.5rem;
  height: 30px;
  border-radius: 0;
  background-color: transparent;
  color: #333333;
  border: none;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  transition: all 0.2s;
  font-size: 0.85rem;

  &:hover {
    background-color: ${(props) => !props.disabled && "#f0f0f0"};
  }
`;

const NoProducts = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 0;
`;

const NoProductsText = styled.p`
  font-size: 1rem;
  color: #666666;
  text-align: center;
`;

export default Shop;
