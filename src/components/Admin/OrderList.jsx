"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import { Search, Filter, Eye, Phone, Package, ShoppingBag } from "lucide-react";

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

  &.pl-8 {
    padding-left: 2rem;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
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
  box-shadow: ${(props) => props.theme.shadow};
  width: 100%;
  max-width: ${(props) => props.$maxWidth || "28rem"};
  padding: 1.5rem;
  position: relative;
  border: 1px solid ${(props) => props.theme.borderColor};
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

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.cardBackground};
  color: ${(props) => props.theme.text};
  font-size: 0.875rem;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.primary};
    box-shadow: 0 0 0 1px ${(props) => props.theme.primary};
  }
`;

const OrderListContainer = styled.div`
  background-color: ${(props) => props.theme.cardBackground};
  border-radius: 0.5rem;
  border: 1px solid ${(props) => props.theme.borderColor};
  overflow: hidden;
  width: 100%;
`;

const OrderListHeader = styled.div`
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

const SearchContainer = styled.div`
  position: relative;
  width: 100%;

  @media (min-width: 768px) {
    max-width: 320px;
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

const FilterContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const StatusBadge = styled(Badge)`
  background-color: ${(props) => {
    switch (props.$status) {
      case "New":
        return "rgba(255, 77, 77, 0.1)";
      case "Pending":
        return "rgba(234, 179, 8, 0.1)";
      case "Confirmed":
        return "rgba(59, 130, 246, 0.1)";
      case "Shipped":
        return "rgba(16, 185, 129, 0.1)";
      case "Cancelled":
        return "rgba(239, 68, 68, 0.1)";
      default:
        return "rgba(107, 114, 128, 0.1)";
    }
  }};
  color: ${(props) => {
    switch (props.$status) {
      case "New":
        return "#ff4d4d";
      case "Pending":
        return "#eab308";
      case "Confirmed":
        return "#3b82f6";
      case "Shipped":
        return "#10b981";
      case "Cancelled":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  }};
`;

const OrderDetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const DetailSection = styled.div`
  padding: 1rem;
  background-color: ${(props) => props.theme.backgroundAlt};
  border-radius: 0.5rem;
  border: 1px solid ${(props) => props.theme.borderColor};
`;

const DetailHeader = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const DetailItem = styled.div`
  display: flex;
  margin-bottom: 0.75rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const DetailLabel = styled.span`
  font-weight: 500;
  width: 120px;
  flex-shrink: 0;
`;

const DetailValue = styled.span`
  color: ${(props) => props.theme.textSecondary};
`;

const ProductItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};

  &:last-child {
    border-bottom: none;
  }
`;

const ProductImage = styled.img`
  width: 3rem;
  height: 3rem;
  object-fit: cover;
  border-radius: 0.25rem;
  margin-right: 1rem;
  border: 1px solid ${(props) => props.theme.borderColor};
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const ProductName = styled.div`
  font-weight: 500;
`;

const ProductMeta = styled.div`
  font-size: 0.875rem;
  color: ${(props) => props.theme.textSecondary};
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

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetailOpen, setOrderDetailOpen] = useState(false);
  const [changeStatusOpen, setChangeStatusOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setOrders([
        {
          id: "ORD-3245",
          customer: {
            name: "John Smith",
            phone: "+1 (555) 123-4567",
            city: "New York",
            address: "123 Broadway St, Apt 4B",
          },
          product: {
            name: "Air Max 270",
            category: "Sport",
            size: 42,
          },
          date: "2023-05-15",
          status: "New",
        },
        {
          id: "ORD-3244",
          customer: {
            name: "Sarah Johnson",
            phone: "+1 (555) 987-6543",
            city: "Los Angeles",
            address: "456 Sunset Blvd",
          },
          product: {
            name: "Classic Leather",
            category: "Classe",
            size: 39,
          },
          date: "2023-05-14",
          status: "Confirmed",
        },
        {
          id: "ORD-3243",
          customer: {
            name: "Michael Brown",
            phone: "+1 (555) 456-7890",
            city: "Chicago",
            address: "789 Michigan Ave",
          },
          product: {
            name: "Ultra Boost",
            category: "Sport",
            size: 44,
          },
          date: "2023-05-13",
          status: "Shipped",
        },
        {
          id: "ORD-3242",
          customer: {
            name: "Emily Davis",
            phone: "+1 (555) 234-5678",
            city: "Miami",
            address: "101 Ocean Drive",
          },
          product: {
            name: "Luxury Sneaker",
            category: "Luxey",
            size: 41,
          },
          date: "2023-05-12",
          status: "Pending",
        },
        {
          id: "ORD-3241",
          customer: {
            name: "David Wilson",
            phone: "+1 (555) 876-5432",
            city: "Seattle",
            address: "202 Pine Street",
          },
          product: {
            name: "Street Runner",
            category: "Classe",
            size: 43,
          },
          date: "2023-05-11",
          status: "Cancelled",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setOrderDetailOpen(true);
  };

  const handleChangeStatus = (order) => {
    setSelectedOrder(order);
    setChangeStatusOpen(true);
  };

  const updateOrderStatus = (e) => {
    const newStatus = e.target.value;
    setOrders(
      orders.map((order) =>
        order.id === selectedOrder.id ? { ...order, status: newStatus } : order
      )
    );
    setChangeStatusOpen(false);
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.phone.includes(searchTerm) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusTranslation = (status) => {
    switch (status) {
      case "New":
        return "Nouveau";
      case "Pending":
        return "En Attente";
      case "Confirmed":
        return "Confirmé";
      case "Shipped":
        return "Expédié";
      case "Cancelled":
        return "Annulé";
      default:
        return status;
    }
  };

  return (
    <>
      <OrderListHeader>
        <SearchContainer>
          <SearchIcon>
            <Search size={16} />
          </SearchIcon>
          <Input
            placeholder="Rechercher par nom ou téléphone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
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
                {statusFilter === "all"
                  ? "Tous les Statuts"
                  : getStatusTranslation(statusFilter)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent $open={dropdownOpen}>
              <DropdownMenuItem
                onClick={() => {
                  setStatusFilter("all");
                  setDropdownOpen(false);
                }}
              >
                Tous les Statuts
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setStatusFilter("New");
                  setDropdownOpen(false);
                }}
              >
                Nouveau
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setStatusFilter("Pending");
                  setDropdownOpen(false);
                }}
              >
                En Attente
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setStatusFilter("Confirmed");
                  setDropdownOpen(false);
                }}
              >
                Confirmé
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setStatusFilter("Shipped");
                  setDropdownOpen(false);
                }}
              >
                Expédié
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setStatusFilter("Cancelled");
                  setDropdownOpen(false);
                }}
              >
                Annulé
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </FilterContainer>
      </OrderListHeader>

      <OrderListContainer>
        {loading ? (
          <div style={{ padding: "2rem", textAlign: "center" }}>
            Loading orders...
          </div>
        ) : filteredOrders.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Commande</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Produit</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <div>{order.customer.name}</div>
                      <div style={{ fontSize: "0.75rem", color: "#666" }}>
                        {order.customer.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div>{order.product.name}</div>
                      <div style={{ fontSize: "0.75rem", color: "#666" }}>
                        {order.product.category}, Size: {order.product.size}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(order.date)}</TableCell>
                  <TableCell>
                    <StatusBadge $status={order.status}>
                      {getStatusTranslation(order.status)}
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
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewOrder(order)}
                      >
                        <Eye size={16} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleChangeStatus(order)}
                      >
                        Changer le Statut
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <EmptyState>
            <Package size={48} />
            <EmptyStateTitle>Aucune commande trouvée</EmptyStateTitle>
            <EmptyStateDescription>
              {searchTerm || statusFilter !== "all"
                ? "Essayez d'ajuster votre recherche ou votre filtre pour trouver ce que vous cherchez."
                : "Aucune commande n'a encore été passée."}
            </EmptyStateDescription>
          </EmptyState>
        )}
      </OrderListContainer>

      <Dialog $open={orderDetailOpen}>
        <DialogContent $maxWidth="48rem">
          <DialogHeader>
            <DialogTitle>
              Détails de la Commande - {selectedOrder?.id}
            </DialogTitle>
            <DialogDescription>
              Informations complètes sur cette commande.
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <OrderDetailGrid>
              <DetailSection>
                <DetailHeader>
                  <Phone size={16} />
                  Informations Client
                </DetailHeader>
                <DetailItem>
                  <DetailLabel>Nom:</DetailLabel>
                  <DetailValue>{selectedOrder.customer.name}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Téléphone:</DetailLabel>
                  <DetailValue>{selectedOrder.customer.phone}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Ville:</DetailLabel>
                  <DetailValue>{selectedOrder.customer.city}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Adresse:</DetailLabel>
                  <DetailValue>{selectedOrder.customer.address}</DetailValue>
                </DetailItem>
              </DetailSection>

              <DetailSection>
                <DetailHeader>
                  <Package size={16} />
                  Informations Commande
                </DetailHeader>
                <DetailItem>
                  <DetailLabel>ID Commande:</DetailLabel>
                  <DetailValue>{selectedOrder.id}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Date:</DetailLabel>
                  <DetailValue>{formatDate(selectedOrder.date)}</DetailValue>
                </DetailItem>
                <DetailItem>
                  <DetailLabel>Statut:</DetailLabel>
                  <DetailValue>
                    <StatusBadge $status={selectedOrder.status}>
                      {getStatusTranslation(selectedOrder.status)}
                    </StatusBadge>
                  </DetailValue>
                </DetailItem>
              </DetailSection>

              <DetailSection style={{ gridColumn: "1 / -1" }}>
                <DetailHeader>
                  <ShoppingBag size={16} />
                  Informations Produit
                </DetailHeader>
                <ProductItem>
                  <ProductImage
                    src="/placeholder.svg?height=100&width=100"
                    alt={selectedOrder.product.name}
                  />
                  <ProductInfo>
                    <ProductName>{selectedOrder.product.name}</ProductName>
                    <ProductMeta>
                      Catégorie: {selectedOrder.product.category} | Taille:{" "}
                      {selectedOrder.product.size}
                    </ProductMeta>
                  </ProductInfo>
                </ProductItem>
              </DetailSection>
            </OrderDetailGrid>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setOrderDetailOpen(false)}>
              Fermer
            </Button>
            <Button
              onClick={() => {
                setOrderDetailOpen(false);
                handleChangeStatus(selectedOrder);
              }}
            >
              Changer le Statut
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog $open={changeStatusOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Changer le Statut de la Commande</DialogTitle>
            <DialogDescription>
              Mettre à jour le statut pour la commande {selectedOrder?.id}.
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div style={{ padding: "1rem 0" }}>
              <Label htmlFor="status">Sélectionner un nouveau statut</Label>
              <Select
                id="status"
                defaultValue={selectedOrder.status}
                onChange={updateOrderStatus}
                style={{ marginTop: "0.5rem" }}
              >
                <option value="New">Nouveau</option>
                <option value="Pending">En Attente</option>
                <option value="Confirmed">Confirmé</option>
                <option value="Shipped">Expédié</option>
                <option value="Cancelled">Annulé</option>
              </Select>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setChangeStatusOpen(false)}
            >
              Annuler
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OrderList;
