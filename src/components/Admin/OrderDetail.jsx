import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import api from "../../Api/authApi";

const Container = styled.div`
  background: ${(props) => props.theme.cardBackground};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 0.5rem;
  padding: 1.5rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1.5rem;

  @media (max-width: 640px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.25rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.section`
  padding: 1rem;
  background: ${(props) => props.theme.backgroundAlt};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 0.5rem;
`;

const Label = styled.div`
  color: ${(props) => props.theme.textSecondary};
  font-size: 0.8rem;
  margin-bottom: 0.25rem;
`;

const Value = styled.div`
  font-weight: 500;
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 0.375rem;
  background: ${(props) => props.theme.cardBackground};
  color: ${(props) => props.theme.text};
`;

const Message = styled.div`
  padding: 2rem;
  text-align: center;
  color: ${(props) => (props.$error ? "#dc2626" : props.theme.textSecondary)};
`;

const OrderDetail = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await api.get(`/api/admin/orders/${orderId}`);
        setOrder(response.data.data);
      } catch (requestError) {
        setError(
          requestError.response?.data?.message ||
            "Impossible de charger cette commande.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const updateStatus = async (event) => {
    const status = event.target.value;
    try {
      const response = await api.patch(`/api/admin/orders/${order.id}/status`, {
        status,
      });
      setOrder(response.data.data);
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Impossible de modifier le statut.",
      );
    }
  };

  if (loading) return <Message>Chargement de la commande...</Message>;
  if (error) return <Message $error>{error}</Message>;
  if (!order) return <Message>Commande introuvable.</Message>;

  return (
    <Container>
      <Header>
        <Title>{order.order_number}</Title>
        <Select value={order.status} onChange={updateStatus}>
          <option value="nouvelle">Nouvelle</option>
          <option value="confirmée">Confirmée</option>
          <option value="expédiée">Expédiée</option>
          <option value="livrée">Livrée</option>
          <option value="annulée">Annulée</option>
        </Select>
      </Header>

      <Grid>
        <Section>
          <Label>Client</Label>
          <Value>
            {order.customer_first_name} {order.customer_last_name}
          </Value>
          <Label>Téléphone</Label>
          <Value>{order.customer_phone}</Value>
          {order.customer_email && (
            <>
              <Label>Email</Label>
              <Value>{order.customer_email}</Value>
            </>
          )}
        </Section>
        <Section>
          <Label>Adresse</Label>
          <Value>
            {order.address}, {order.city}
          </Value>
          <Label>Date</Label>
          <Value>{new Date(order.created_at).toLocaleString("fr-MA")}</Value>
        </Section>
      </Grid>

      <Section style={{ marginTop: "1rem" }}>
        <Label>Produits commandés</Label>
        {order.items.map((item) => (
          <div
            key={item.id}
            style={{
              padding: "0.75rem 0",
              borderBottom: "1px solid currentColor",
            }}
          >
            {item.product_name} · Taille {item.size} · {item.quantity} x{" "}
            {item.unit_price} MAD
          </div>
        ))}
        <Value style={{ marginTop: "1rem" }}>
          Sous-total produits : {order.subtotal} MAD
        </Value>
        <Value>
          Frais de livraison :{" "}
          {Number(order.delivery_fee) === 0
            ? "Livraison gratuite (0 MAD)"
            : `${order.delivery_fee} MAD`}
        </Value>
        <Value>Total final : {order.total} MAD</Value>
      </Section>
    </Container>
  );
};

export default OrderDetail;
