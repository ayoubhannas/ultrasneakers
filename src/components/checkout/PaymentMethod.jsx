"use client";

import styled from "styled-components";
import { CreditCard, DollarSign, Wallet, AlertCircle } from "lucide-react";

const PaymentMethod = ({
  paymentMethod,
  handlePaymentMethodChange,
  nextStep,
}) => {
  return (
    <Section>
      <SectionTitle>Mode de paiement</SectionTitle>

      <PaymentOptions>
        <PaymentOption
          $selected={paymentMethod === "cashOnDelivery"}
          onClick={() => handlePaymentMethodChange("cashOnDelivery")}
        >
          <OptionIcon>
            <DollarSign size={24} />
          </OptionIcon>
          <OptionContent>
            <OptionTitle>Paiement à la livraison</OptionTitle>
            <OptionDescription>
              Payez en espèces à la réception de votre commande
            </OptionDescription>
          </OptionContent>
          <RadioButton>
            <input
              type="radio"
              name="paymentMethod"
              value="cashOnDelivery"
              checked={paymentMethod === "cashOnDelivery"}
              onChange={() => handlePaymentMethodChange("cashOnDelivery")}
            />
            <RadioMark />
          </RadioButton>
        </PaymentOption>

        <PaymentOption
          $selected={paymentMethod === "creditCard"}
          $disabled={true}
          onClick={() => {}}
        >
          <OptionIcon $disabled={true}>
            <CreditCard size={24} />
          </OptionIcon>
          <OptionContent>
            <OptionTitle>Carte bancaire</OptionTitle>
            <OptionDescription>
              Paiement sécurisé par carte bancaire (bientôt disponible)
            </OptionDescription>
          </OptionContent>
          <DisabledBadge>Bientôt</DisabledBadge>
        </PaymentOption>

        <PaymentOption
          $selected={paymentMethod === "wallet"}
          $disabled={true}
          onClick={() => {}}
        >
          <OptionIcon $disabled={true}>
            <Wallet size={24} />
          </OptionIcon>
          <OptionContent>
            <OptionTitle>Portefeuille électronique</OptionTitle>
            <OptionDescription>
              Payez avec votre portefeuille électronique (bientôt disponible)
            </OptionDescription>
          </OptionContent>
          <DisabledBadge>Bientôt</DisabledBadge>
        </PaymentOption>
      </PaymentOptions>

      <PaymentInfo>
        <AlertCircle size={20} />
        <PaymentInfoText>
          <strong>Paiement à la livraison :</strong> Préparez le montant exact
          en espèces pour faciliter la transaction. Notre livreur vous remettra
          un reçu lors du paiement.
        </PaymentInfoText>
      </PaymentInfo>

      <ContinueButton onClick={nextStep}>Continuer</ContinueButton>
    </Section>
  );
};

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const PaymentOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const PaymentOption = styled.div`
  display: flex;
  align-items: center;
  padding: 1.25rem;
  border: 1px solid
    ${(props) => {
      if (props.$disabled) return "#e0e0e0";
      return props.$selected ? props.theme.primary : "#e0e0e0";
    }};
  border-radius: 8px;
  cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;
  background-color: ${(props) => {
    if (props.$disabled) return "#f9f9f9";
    return props.$selected ? `${props.theme.primary}10` : "white";
  }};
  opacity: ${(props) => (props.$disabled ? 0.7 : 1)};

  &:hover {
    border-color: ${(props) =>
      props.$disabled ? "#e0e0e0" : props.theme.primary};
  }
`;

const OptionIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #f5f5f5;
  margin-right: 1rem;
  color: ${(props) => (props.$disabled ? "#999" : props.theme.primary)};
`;

const OptionContent = styled.div`
  flex: 1;
`;

const OptionTitle = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const OptionDescription = styled.div`
  font-size: 0.85rem;
  color: ${(props) => props.theme.textSecondary};
`;

const RadioButton = styled.div`
  position: relative;
  width: 20px;
  height: 20px;

  input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }
`;

const RadioMark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid ${(props) => props.theme.borderColor};

  &:after {
    content: "";
    position: absolute;
    display: none;
  }

  input:checked ~ &:after {
    display: block;
  }

  &:after {
    top: 3px;
    left: 3px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${(props) => props.theme.primary};
  }

  input:checked ~ & {
    border-color: ${(props) => props.theme.primary};
  }
`;

const DisabledBadge = styled.div`
  background-color: #e0e0e0;
  color: #666;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-weight: 500;
`;

const PaymentInfo = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1.25rem;
  background-color: #fff9e6;
  border: 1px solid #ffe58f;
  border-radius: 8px;
  margin-bottom: 2rem;

  svg {
    flex-shrink: 0;
    color: #faad14;
  }
`;

const PaymentInfoText = styled.div`
  font-size: 0.9rem;
  color: #5c5c5c;
  line-height: 1.5;
`;

const ContinueButton = styled.button`
  background-color: ${(props) => props.theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 1rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;

  &:hover {
    background-color: ${(props) => props.theme.primaryHover};
  }
`;

export default PaymentMethod;
