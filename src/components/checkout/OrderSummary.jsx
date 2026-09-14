"use client";

import styled from "styled-components";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const OrderSummary = ({
  cartItems,
  subtotal,
  deliveryFee,
  total,
  deliveryOption,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <SummaryContainer>
      <SummaryHeader onClick={() => setIsExpanded(!isExpanded)}>
        <SummaryTitle>Récapitulatif de commande</SummaryTitle>
        <ExpandButton>
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </ExpandButton>
      </SummaryHeader>

      {isExpanded && (
        <SummaryContent>
          <ItemsList>
            {cartItems.map((item) => (
              <SummaryItem key={item.id}>
                <ItemImage src={item.image} alt={item.name} />
                <ItemDetails>
                  <ItemName>{item.name}</ItemName>
                  <ItemMeta>
                    <span>Couleur: {item.color}</span>
                    <span>Taille: {item.size}</span>
                    <span>Qté: {item.quantity}</span>
                  </ItemMeta>
                  <ItemPrice>{item.price} MAD</ItemPrice>
                </ItemDetails>
              </SummaryItem>
            ))}
          </ItemsList>

          <PromoCodeSection>
            <PromoCodeInput type="text" placeholder="Code promo" />
            <ApplyButton>Appliquer</ApplyButton>
          </PromoCodeSection>

          <SummaryRow>
            <span>Sous-total</span>
            <span>{subtotal} MAD</span>
          </SummaryRow>

          <SummaryRow>
            <span>Livraison</span>
            <span>{deliveryFee} MAD</span>
          </SummaryRow>

          <SummaryTotal>
            <span>Total</span>
            <span>{total} MAD</span>
          </SummaryTotal>

          <PaymentMethod>
            <PaymentMethodTitle>Mode de paiement</PaymentMethodTitle>
            <PaymentMethodValue>Paiement à la livraison</PaymentMethodValue>
          </PaymentMethod>

          <DeliveryMethod>
            <DeliveryMethodTitle>Mode de livraison</DeliveryMethodTitle>
            <DeliveryMethodValue>
              {deliveryOption === "standard" &&
                "Livraison standard (3-5 jours)"}
              {deliveryOption === "express" && "Livraison express (1-2 jours)"}
              {deliveryOption === "sameDay" && "Livraison le jour même"}
            </DeliveryMethodValue>
          </DeliveryMethod>
        </SummaryContent>
      )}
    </SummaryContainer>
  );
};

const SummaryContainer = styled.div`
  background-color: white;
  border-left: 1px solid #eaeaea;

  @media (max-width: 1024px) {
    border-left: none;
    border-top: 1px solid #eaeaea;
  }
`;

const SummaryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #eaeaea;
  cursor: pointer;
`;

const SummaryTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
`;

const ExpandButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SummaryContent = styled.div`
  padding: 1.5rem;
`;

const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
  max-height: 300px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background: #ddd;
    border-radius: 2px;
  }
`;

const SummaryItem = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const ItemImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
  background-color: #f5f5f5;
  border-radius: 4px;
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const ItemName = styled.div`
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const ItemMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: ${(props) => props.theme.textSecondary};
  margin-bottom: 0.25rem;
`;

const ItemPrice = styled.div`
  font-weight: 600;
`;

const PromoCodeSection = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const PromoCodeInput = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.primary};
  }
`;

const ApplyButton = styled.button`
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 0 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #eaeaea;
  }
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-top: 1px solid #eaeaea;

  &:first-of-type {
    border-top: none;
  }
`;

const SummaryTotal = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  border-top: 1px solid #eaeaea;
  border-bottom: 1px solid #eaeaea;
  font-weight: 600;
  font-size: 1.1rem;
`;

const PaymentMethod = styled.div`
  margin-top: 1.5rem;
`;

const PaymentMethodTitle = styled.div`
  font-size: 0.9rem;
  color: ${(props) => props.theme.textSecondary};
  margin-bottom: 0.5rem;
`;

const PaymentMethodValue = styled.div`
  font-weight: 500;
`;

const DeliveryMethod = styled.div`
  margin-top: 1rem;
`;

const DeliveryMethodTitle = styled.div`
  font-size: 0.9rem;
  color: ${(props) => props.theme.textSecondary};
  margin-bottom: 0.5rem;
`;

const DeliveryMethodValue = styled.div`
  font-weight: 500;
`;

export default OrderSummary;
