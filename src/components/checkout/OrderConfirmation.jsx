"use client";

import styled from "styled-components";
import { Link } from "react-router-dom";
import { CheckCircle, Package, ArrowRight, Phone } from "lucide-react";

const OrderConfirmation = ({ orderNumber, total, formData }) => {
  const getEstimatedDelivery = () => {
    const today = new Date();
    const deliveryDate = new Date(today);

    switch (formData.deliveryOption) {
      case "express":
        deliveryDate.setDate(today.getDate() + 2);
        break;
      case "sameDay":
        break;
      default:
        deliveryDate.setDate(today.getDate() + 5);
    }

    return deliveryDate.toLocaleDateString("fr-MA", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <ConfirmationContainer>
      <SuccessIcon>
        <CheckCircle size={60} />
      </SuccessIcon>

      <ConfirmationTitle>Commande confirmée !</ConfirmationTitle>

      <OrderNumber>Commande #{orderNumber}</OrderNumber>

      <ConfirmationMessage>
        Merci pour votre commande. Nous avons bien reçu votre demande et nous
        préparons votre colis. Vous recevrez un email de confirmation avec les
        détails de votre commande.
      </ConfirmationMessage>

      <OrderDetailsCard>
        <OrderDetailRow>
          <DetailLabel>
            <Package size={18} />
            Livraison estimée
          </DetailLabel>
          <DetailValue>
            {formData.deliveryOption === "sameDay"
              ? "Aujourd'hui"
              : getEstimatedDelivery()}
          </DetailValue>
        </OrderDetailRow>

        <OrderDetailRow>
          <DetailLabel>Adresse de livraison</DetailLabel>
          <DetailValue>
            {formData.address}, {formData.city}
          </DetailValue>
        </OrderDetailRow>

        <OrderDetailRow>
          <DetailLabel>Mode de paiement</DetailLabel>
          <DetailValue>Paiement à la livraison</DetailValue>
        </OrderDetailRow>

        <OrderDetailRow>
          <DetailLabel>Total à payer</DetailLabel>
          <DetailValue>{total} MAD</DetailValue>
        </OrderDetailRow>
      </OrderDetailsCard>

      <ContactInfo>
        <Phone size={18} />
        <span>
          Notre service client est disponible pour vous aider au{" "}
          <strong>+212 522 123 456</strong>
        </span>
      </ContactInfo>

      <ActionButtons>
        <TrackOrderButton>Suivre ma commande</TrackOrderButton>

        <ContinueShoppingLink to="/">
          Continuer mes achats
          <ArrowRight size={16} />
        </ContinueShoppingLink>
      </ActionButtons>
    </ConfirmationContainer>
  );
};

const ConfirmationContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 3rem 2rem;
  text-align: center;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const SuccessIcon = styled.div`
  color: ${(props) => props.theme.primary};
  margin-bottom: 1.5rem;
`;

const ConfirmationTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const OrderNumber = styled.div`
  font-size: 1.1rem;
  color: ${(props) => props.theme.textSecondary};
  margin-bottom: 1.5rem;
`;

const ConfirmationMessage = styled.p`
  color: ${(props) => props.theme.textSecondary};
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const OrderDetailsCard = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  text-align: left;
`;

const OrderDetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #eaeaea;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.25rem;
  }
`;

const DetailLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;

  svg {
    color: ${(props) => props.theme.primary};
  }
`;

const DetailValue = styled.div`
  color: ${(props) => props.theme.textSecondary};
  font-weight: 500;
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  color: ${(props) => props.theme.textSecondary};

  svg {
    color: ${(props) => props.theme.primary};
  }
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const TrackOrderButton = styled.button`
  background-color: ${(props) => props.theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.primaryHover};
  }
`;

const ContinueShoppingLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: none;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 1rem;
  font-weight: 600;
  color: ${(props) => props.theme.text};
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export default OrderConfirmation;
