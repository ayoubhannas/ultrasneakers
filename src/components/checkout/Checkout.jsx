"use client";

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CartContext } from "../../context/CartContext";
import { formatPrice } from "../../utils/formatPrice";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart, subtotal, shipping, tax, total } =
    useContext(CartContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    clearCart();
    navigate("/checkout/success");
  };

  return (
    <CheckoutContainer>
      <CheckoutTitle>Paiement</CheckoutTitle>
      <CheckoutForm onSubmit={handleSubmit}>
        <SectionTitle>Informations de livraison</SectionTitle>
        <FormGroup>
          <FormLabel htmlFor="firstName">Prénom</FormLabel>
          <FormInput
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="lastName">Nom</FormLabel>
          <FormInput
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="email">Email</FormLabel>
          <FormInput
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="phone">Téléphone</FormLabel>
          <FormInput
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="address">Adresse</FormLabel>
          <FormInput
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="city">Ville</FormLabel>
          <FormInput
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="postalCode">Code postal</FormLabel>
          <FormInput
            type="text"
            id="postalCode"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="country">Pays</FormLabel>
          <FormInput
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </FormGroup>

        <SectionTitle>Méthode de paiement</SectionTitle>
        <PaymentOptions>
          <RadioLabel>
            <RadioInput
              type="radio"
              name="paymentMethod"
              value="creditCard"
              checked={paymentMethod === "creditCard"}
              onChange={() => setPaymentMethod("creditCard")}
            />
            Carte de crédit
          </RadioLabel>
          <RadioLabel>
            <RadioInput
              type="radio"
              name="paymentMethod"
              value="paypal"
              checked={paymentMethod === "paypal"}
              onChange={() => setPaymentMethod("paypal")}
            />
            PayPal
          </RadioLabel>
        </PaymentOptions>

        <SummaryTitle>Récapitulatif de la commande</SummaryTitle>
        <SummaryContainer>
          <SummaryRow>
            <SummaryLabel>Sous-total</SummaryLabel>
            <SummaryValue>{formatPrice(subtotal)} MAD</SummaryValue>
          </SummaryRow>
          <SummaryRow>
            <SummaryLabel>Livraison</SummaryLabel>
            <SummaryValue>{formatPrice(shipping)} MAD</SummaryValue>
          </SummaryRow>
          <SummaryRow>
            <SummaryLabel>Taxes</SummaryLabel>
            <SummaryValue>{formatPrice(tax)} MAD</SummaryValue>
          </SummaryRow>
          <SummaryRow $total>
            <SummaryLabel>Total</SummaryLabel>
            <SummaryValue>{formatPrice(total)} MAD</SummaryValue>
          </SummaryRow>
        </SummaryContainer>

        <ButtonContainer>
          <PlaceOrderButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Traitement..." : "Passer la commande"}
          </PlaceOrderButton>
          <BackToCartButton type="button" onClick={() => navigate("/cart")}>
            Retour au panier
          </BackToCartButton>
        </ButtonContainer>
      </CheckoutForm>
    </CheckoutContainer>
  );
};

export default CheckoutPage;

const CheckoutContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const CheckoutTitle = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const CheckoutForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled.h2`
  margin-top: 20px;
  margin-bottom: 10px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const FormLabel = styled.label`
  margin-bottom: 5px;
`;

const FormInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const PaymentOptions = styled.div`
  margin-bottom: 20px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
`;

const RadioInput = styled.input`
  margin-right: 5px;
`;

const SummaryTitle = styled.h3`
  margin-top: 20px;
  margin-bottom: 10px;
`;

const SummaryContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 20px;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  font-weight: ${(props) => (props.$total ? "bold" : "normal")};
`;

const SummaryLabel = styled.span``;

const SummaryValue = styled.span``;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PlaceOrderButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const BackToCartButton = styled.button`
  background-color: #f44336;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
