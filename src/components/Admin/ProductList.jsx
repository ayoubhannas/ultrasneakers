"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Filter,
  CheckCircle,
  XCircle,
  ShoppingBag,
} from "lucide-react";
import axios from "axios";

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  padding: ${(props) =>
    props.size === "sm" ? "0.375rem 0.75rem" : "0.5rem 1rem"};
  transition: all 0.2s;
  cursor: pointer;

  ${(props) =>
    props.variant === "outline"
      ? `
      background-color: transparent;
      border: 1px solid ${props.theme.borderColor};
      color: ${props.theme.text};
      
      &:hover {
        background-color: ${props.theme.hoverBackground};
      }
    `
      : props.variant === "ghost"
      ? `
      background-color: transparent;
      border: none;
      color: ${props.theme.text};
      
      &:hover {
        background-color: ${props.theme.hoverBackground};
      }
    `
      : props.variant === "destructive"
      ? `
      background-color: #ef4444;
      border: none;
      color: white;
      
      &:hover {
        background-color: #dc2626;
      }
    `
      : `
      background-color: ${props.theme.primary};
      border: none;
      color: white;
      
      &:hover {
        background-color: ${props.theme.primaryHover};
      }
    `}
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  padding-left: 2rem;
  border-radius: 0.375rem;
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.inputBackground};
  color: ${(props) => props.theme.text};
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.primary};
    box-shadow: 0 0 0 1px ${(props) => props.theme.primary};
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background-color: ${(props) => props.theme.tableHeaderBg};
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
`;

const TableRow = styled.tr`
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.tableRowHoverBg};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const TableHead = styled.th`
  text-align: left;
  padding: 0.75rem 1rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: ${(props) => props.theme.textSecondary};

  &.text-right {
    text-align: right;
  }
`;

const TableBody = styled.tbody``;

const TableCell = styled.td`
  padding: 1rem;
  font-size: 0.875rem;
  vertical-align: middle;

  &.text-right {
    text-align: right;
  }

  &.font-medium {
    font-weight: 500;
  }
`;

const Dialog = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: ${(props) => (props.$open ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 50;
`;

const DialogContent = styled.div`
  background-color: ${(props) => props.theme.cardBackground};
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 28rem;
  padding: 1.5rem;
  position: relative;
`;

const DialogHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const DialogTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const DialogDescription = styled.p`
  font-size: 0.875rem;
  color: ${(props) => props.theme.textSecondary};
`;

const DialogFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1.5rem;
`;

const DropdownMenu = styled.div`
  position: relative;
`;

const DropdownMenuTrigger = styled.div``;

const DropdownMenuContent = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  width: 12rem;
  background-color: ${(props) => props.theme.cardBackground};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 10;
  display: ${(props) => (props.$open ? "block" : "none")};
`;

const DropdownMenuItem = styled.div`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.hoverBackground};
  }
`;

const ProductListContainer = styled.div`
  background-color: ${(props) => props.theme.cardBackground};
  border-radius: 0.5rem;
  border: 1px solid ${(props) => props.theme.borderColor};
  overflow: hidden;
  width: 100%;
`;

const ProductListHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${(props) => props.theme.textSecondary};
  z-index: 1;
`;

const SearchContainer = styled.div`
  position: relative;
  width: 100%;

  @media (min-width: 768px) {
    max-width: 320px;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const ProductImage = styled.img`
  width: 3rem;
  height: 3rem;
  object-fit: cover;
  border-radius: 0.25rem;
  border: 1px solid ${(props) => props.theme.borderColor};
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: ${(props) =>
    props.$available ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)"};
  color: ${(props) => (props.$available ? "#10b981" : "#ef4444")};
`;

const ActionButton = styled(Button)`
  padding: 0.5rem;
  height: auto;
  background-color: ${(props) =>
    props.variant === "ghost" ? "transparent" : props.theme.iconButton};

  &:hover {
    background-color: ${(props) =>
      props.variant === "ghost"
        ? props.theme.hoverBackground
        : props.theme.iconButtonHover};
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;
  text-align: center;
`;

const EmptyStateTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 500;
  margin: 1rem 0 0.5rem;
`;

const EmptyStateDescription = styled.p`
  color: ${(props) => props.theme.textSecondary};
  margin-bottom: 1.5rem;
  max-width: 24rem;
`;

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [categories, setCategories] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await axios.get(
          "http://localhost:8000/api/admin/products"
        );
        setProducts(productsResponse.data.data);

        const categoriesResponse = await axios.get(
          "http://localhost:8000/api/categories"
        );
        setCategories(categoriesResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        setError("Erreur lors du chargement des données. Veuillez réessayer.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddProduct = () => {
    navigate("/admin/products/add");
  };

  const handleEditProduct = (productId) => {
    navigate(`/admin/products/edit/${productId}`);
  };

  const openDeleteDialog = (product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const handleDeleteProduct = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/api/admin/products/${productToDelete.id}`
      );
      setProducts(products.filter((p) => p.id !== productToDelete.id));
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      setError(
        error.response?.data?.message ||
          "Erreur lors de la suppression du produit. Veuillez réessayer."
      );
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || product.category?.name === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  if (error) {
    return (
      <div className="text-center p-8 text-red-500">
        {error}
        <Button
          onClick={() => setError(null)}
          variant="outline"
          className="mt-4"
        >
          Réessayer
        </Button>
      </div>
    );
  }

  return (
    <>
      <ProductListHeader>
        <SearchContainer>
          <SearchIcon>
            <Search size={16} />
          </SearchIcon>
          <Input
            placeholder="Rechercher des produits..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>
        <FilterContainer>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <Filter size={16} style={{ marginRight: "8px" }} />
                {categoryFilter === "all"
                  ? "Toutes les Catégories"
                  : categoryFilter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent $open={dropdownOpen}>
              <DropdownMenuItem
                onClick={() => {
                  setCategoryFilter("all");
                  setDropdownOpen(false);
                }}
              >
                Toutes les Catégories
              </DropdownMenuItem>
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category.id}
                  onClick={() => {
                    setCategoryFilter(category.name);
                    setDropdownOpen(false);
                  }}
                >
                  {category.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={handleAddProduct} size="sm">
            <Plus size={16} style={{ marginRight: "8px" }} />
            Ajouter un Produit
          </Button>
        </FilterContainer>
      </ProductListHeader>

      <ProductListContainer>
        {loading ? (
          <div className="p-8 text-center">Chargement des produits...</div>
        ) : filteredProducts.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produit</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Tailles</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <ProductImage
                        src={
                          product.images[0]?.image_url
                            ? `http://localhost:8000/storage/${product.images[0].image_url}`
                            : "/placeholder.svg?height=100&width=100"
                        }
                        alt={product.name}
                      />
                      <div>
                        <div style={{ fontWeight: "500" }}>{product.name}</div>
                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: "#666",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: "200px",
                          }}
                        >
                          {product.description}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{product.price} MAD</TableCell>
                  <TableCell>
                    {product.category?.name || "Sans catégorie"}
                  </TableCell>
                  <TableCell>
                    {product.sizes.map((size) => size.size).join(", ")}
                  </TableCell>
                  <TableCell>
                    <StatusBadge $available={product.status === "disponible"}>
                      {product.status === "disponible" ? (
                        <CheckCircle size={12} style={{ marginRight: "4px" }} />
                      ) : (
                        <XCircle size={12} style={{ marginRight: "4px" }} />
                      )}
                      {product.status === "disponible"
                        ? "Disponible"
                        : "Non Disponible"}
                    </StatusBadge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "8px",
                      }}
                    >
                      <ActionButton
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditProduct(product.id)}
                      >
                        <Edit size={16} />
                      </ActionButton>
                      <ActionButton
                        variant="ghost"
                        size="sm"
                        onClick={() => openDeleteDialog(product)}
                      >
                        <Trash2 size={16} />
                      </ActionButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <EmptyState>
            <ShoppingBag size={48} />
            <EmptyStateTitle>Aucun produit trouvé</EmptyStateTitle>
            <EmptyStateDescription>
              {searchTerm || categoryFilter !== "all"
                ? "Essayez d'ajuster votre recherche ou votre filtre pour trouver ce que vous cherchez."
                : "Commencez par ajouter votre premier produit."}
            </EmptyStateDescription>
            <Button onClick={handleAddProduct}>
              <Plus size={16} style={{ marginRight: "8px" }} />
              Ajouter un Produit
            </Button>
          </EmptyState>
        )}
      </ProductListContainer>

      <Dialog $open={deleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer le Produit</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer "{productToDelete?.name}" ?
              Cette action ne peut pas être annulée.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDeleteProduct}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductList;
