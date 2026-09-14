"use client";

import styled from "styled-components";
import { Truck, Clock, Zap } from "lucide-react";

const DeliveryOptions = ({
  deliveryOption,
  handleDeliveryOptionChange,
  nextStep,
}) => {
  return (
    <Section>
      <SectionTitle>Options de livraison</SectionTitle>

      <OptionsContainer>
        <DeliveryOption
          $selected={deliveryOption === "standard"}
          onClick={() => handleDeliveryOptionChange("standard")}
        >
          <OptionIcon>
            <Truck size={24} />
          </OptionIcon>
          <OptionContent>
            <OptionTitle>Livraison standard</OptionTitle>
            <OptionDescription>3-5 jours ouvrables</OptionDescription>
          </OptionContent>
          <OptionPrice>30 MAD</OptionPrice>
          <RadioButton>
            <input
              type="radio"
              name="deliveryOption"
              value="standard"
              checked={deliveryOption === "standard"}
              onChange={() => handleDeliveryOptionChange("standard")}
            />
            <RadioMark />
          </RadioButton>
        </DeliveryOption>

        <DeliveryOption
          $selected={deliveryOption === "express"}
          onClick={() => handleDeliveryOptionChange("express")}
        >
          <OptionIcon>
            <Zap size={24} />
          </OptionIcon>
          <OptionContent>
            <OptionTitle>Livraison express</OptionTitle>
            <OptionDescription>1-2 jours ouvrables</OptionDescription>
          </OptionContent>
          <OptionPrice>50 MAD</OptionPrice>
          <RadioButton>
            <input
              type="radio"
              name="deliveryOption"
              value="express"
              checked={deliveryOption === "express"}
              onChange={() => handleDeliveryOptionChange("express")}
            />
            <RadioMark />
          </RadioButton>
        </DeliveryOption>

        <DeliveryOption
          $selected={deliveryOption === "sameDay"}
          onClick={() => handleDeliveryOptionChange("sameDay")}
        >
          <OptionIcon>
            <Clock size={24} />
          </OptionIcon>
          <OptionContent>
            <OptionTitle>Livraison le jour même</OptionTitle>
            <OptionDescription>
              Casablanca uniquement (commandes avant 12h)
            </OptionDescription>
          </OptionContent>
          <OptionPrice>80 MAD</OptionPrice>
          <RadioButton>
            <input
              type="radio"
              name="deliveryOption"
              value="sameDay"
              checked={deliveryOption === "sameDay"}
              onChange={() => handleDeliveryOptionChange("sameDay")}
            />
            <RadioMark />
          </RadioButton>
        </DeliveryOption>
      </OptionsContainer>

      <DeliveryInfo>
        <InfoTitle>Informations importantes</InfoTitle>
        <InfoList>
          <InfoItem>
            Les livraisons sont effectuées du lundi au samedi de 9h à 18h.
          </InfoItem>
          <InfoItem>
            Vous recevrez un appel de notre livreur avant la livraison.
          </InfoItem>
          <InfoItem>
            Les délais de livraison peuvent varier en fonction de votre
            localisation.
          </InfoItem>
          <InfoItem>
            Pour les zones rurales ou éloignées, des frais supplémentaires
            peuvent s'appliquer.
          </InfoItem>
        </InfoList>
      </DeliveryInfo>

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

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const DeliveryOption = styled.div`
  display: flex;
  align-items: center;
  padding: 1.25rem;
  border: 1px solid
    ${(props) => (props.$selected ? props.theme.primary : "#e0e0e0")};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${(props) =>
    props.$selected ? `${props.theme.primary}10` : "white"};

  &:hover {
    border-color: ${(props) => props.theme.primary};
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
  color: ${(props) => props.theme.primary};
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

const OptionPrice = styled.div`
  font-weight: 600;
  margin-right: 1.5rem;
  color: ${(props) => props.theme.primary};
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

const DeliveryInfo = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 1.25rem;
  margin-bottom: 2rem;
`;

const InfoTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const InfoList = styled.ul`
  padding-left: 1.5rem;
`;

const InfoItem = styled.li`
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: ${(props) => props.theme.textSecondary};

  &:last-child {
    margin-bottom: 0;
  }
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

export default DeliveryOptions;
