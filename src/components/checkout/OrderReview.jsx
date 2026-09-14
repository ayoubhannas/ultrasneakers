"use client";

import styled from "styled-components";
import { Check } from "lucide-react";

const OrderReview = ({
  shippingInfo,
  paymentInfo,
  shippingMethod,
  onPlaceOrder,
}) => {
  const formatCardNumber = (cardNumber) => {
    if (!cardNumber) return "••••";
    const digits = cardNumber.replace(/\s/g, "");
    return `•••• •••• •••• ${digits.slice(-4)}`;
  };

  const getShippingMethodDetails = () => {
    switch (shippingMethod) {
      case "express":
        return {
          name: "Express Shipping",
          price: "$12.99",
          delivery: "2-3 business days",
        };
      case "overnight":
        return {
          name: "Overnight Shipping",
          price: "$24.99",
          delivery: "Next business day",
        };
      case "standard":
      default:
        return {
          name: "Standard Shipping",
          price: "Free",
          delivery: "5-7 business days",
        };
    }
  };

  const shippingMethodDetails = getShippingMethodDetails();

  return (
    <ReviewContainer>
      <ReviewSection>
        <SectionTitle>Review Your Order</SectionTitle>
        <ReviewMessage>
          <Check size={20} />
          <span>
            Please review your order details before placing your order.
          </span>
        </ReviewMessage>
      </ReviewSection>

      <ReviewSection>
        <SectionHeader>
          <SectionSubtitle>Shipping Information</SectionSubtitle>
        </SectionHeader>
        <InfoCard>
          <AddressInfo>
            <strong>
              {shippingInfo.firstName} {shippingInfo.lastName}
            </strong>
            <p>{shippingInfo.address}</p>
            <p>
              {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
            </p>
            <p>{shippingInfo.country}</p>
          </AddressInfo>
          <ContactInfo>
            <p>{shippingInfo.email}</p>
            <p>{shippingInfo.phone}</p>
          </ContactInfo>
        </InfoCard>
      </ReviewSection>

      <ReviewSection>
        <SectionHeader>
          <SectionSubtitle>Payment Method</SectionSubtitle>
        </SectionHeader>
        <InfoCard>
          <PaymentInfo>
            <strong>Credit Card</strong>
            <p>{formatCardNumber(paymentInfo.cardNumber)}</p>
            <p>
              Expires: {paymentInfo.expiryMonth}/{paymentInfo.expiryYear}
            </p>
          </PaymentInfo>
          <BillingInfo>
            <strong>{paymentInfo.cardName}</strong>
          </BillingInfo>
        </InfoCard>
      </ReviewSection>

      <ReviewSection>
        <SectionHeader>
          <SectionSubtitle>Shipping Method</SectionSubtitle>
        </SectionHeader>
        <InfoCard>
          <ShippingInfo>
            <strong>{shippingMethodDetails.name}</strong>
            <p>Estimated delivery: {shippingMethodDetails.delivery}</p>
          </ShippingInfo>
          <ShippingPrice>
            <strong>{shippingMethodDetails.price}</strong>
          </ShippingPrice>
        </InfoCard>
      </ReviewSection>

      <ReviewSection>
        <DisclaimerText>
          By placing your order, you agree to UltraSneakers' Terms of Service
          and Privacy Policy. You also acknowledge that your order may be
          subject to additional taxes and fees depending on your location.
        </DisclaimerText>
      </ReviewSection>

      <FormActions>
        <PlaceOrderButton onClick={onPlaceOrder}>Place Order</PlaceOrderButton>
      </FormActions>
    </ReviewContainer>
  );
};

const ReviewContainer = styled.div`
  padding: 1.5rem;
`;

const ReviewSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const ReviewMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background-color: ${(props) => `${props.theme.primary}10`};
  border-radius: 4px;
  color: ${(props) => props.theme.text};

  svg {
    color: ${(props) => props.theme.primary};
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const SectionSubtitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
`;

const InfoCard = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 4px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const AddressInfo = styled.div`
  p {
    margin: 0.25rem 0;
    color: ${(props) => props.theme.textSecondary};
  }
`;

const ContactInfo = styled.div`
  text-align: right;

  p {
    margin: 0.25rem 0;
    color: ${(props) => props.theme.textSecondary};
  }

  @media (max-width: 768px) {
    text-align: left;
  }
`;

const PaymentInfo = styled.div`
  p {
    margin: 0.25rem 0;
    color: ${(props) => props.theme.textSecondary};
  }
`;

const BillingInfo = styled.div`
  text-align: right;

  @media (max-width: 768px) {
    text-align: left;
  }
`;

const ShippingInfo = styled.div`
  p {
    margin: 0.25rem 0;
    color: ${(props) => props.theme.textSecondary};
  }
`;

const ShippingPrice = styled.div`
  text-align: right;

  @media (max-width: 768px) {
    text-align: left;
  }
`;

const DisclaimerText = styled.p`
  font-size: 0.85rem;
  color: ${(props) => props.theme.textSecondary};
  line-height: 1.5;
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const PlaceOrderButton = styled.button`
  background-color: ${(props) => props.theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.primaryHover};
  }
`;

export default OrderReview;
