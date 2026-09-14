"use client";

import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme } from "../../styles/Theme";
import { GlobalStyles } from "../../styles/GlobalStyles";
import {
  ChevronLeft,
  MapPin,
  Truck,
  CreditCard,
  CheckCircle,
} from "lucide-react";
import AddressForm from "./AddressForm";
import DeliveryOptions from "./DeliveryOptions";
import OrderSummary from "./OrderSummary";
import PaymentMethod from "./PaymentMethod";
import OrderConfirmation from "./OrderConfirmation";

const CheckoutPage = () => {
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    addressLine2: "",
    city: "",
    region: "",
    postalCode: "",
    notes: "",
    deliveryOption: "standard",
    paymentMethod: "cashOnDelivery",
  });

  const cartItems = [
    {
      id: 1,
      name: "UltraBoost Pro",
      price: 1299,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
      color: "Black",
      size: "42",
    },
    {
      id: 2,
      name: "AirFlex Runner",
      price: 999,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
      color: "Red",
      size: "43",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeliveryOptionChange = (option) => {
    setFormData((prev) => ({
      ...prev,
      deliveryOption: option,
    }));
  };

  const handlePaymentMethodChange = (method) => {
    setFormData((prev) => ({
      ...prev,
      paymentMethod: method,
    }));
  };

  const nextStep = () => {
    window.scrollTo(0, 0);
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    window.scrollTo(0, 0);
    setStep((prev) => prev - 1);
  };

  const placeOrder = () => {
    const newOrderNumber = `MA${Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0")}`;
    setOrderNumber(newOrderNumber);
    setOrderPlaced(true);
    window.scrollTo(0, 0);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryFee =
    formData.deliveryOption === "express"
      ? 50
      : formData.deliveryOption === "sameDay"
      ? 80
      : 30;
  const total = subtotal + deliveryFee;

  if (orderPlaced) {
    return (
      <ThemeProvider theme={lightTheme}>
        <GlobalStyles />
        <PageContainer>
          <OrderConfirmation
            orderNumber={orderNumber}
            total={total}
            formData={formData}
          />
        </PageContainer>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <PageContainer>
        <CheckoutContainer>
          <CheckoutHeader>
            <Logo>ULTRASNEAKERS</Logo>
            <StepsContainer>
              <Step $active={step === 1} $completed={step > 1}>
                <StepIcon>
                  <MapPin size={18} />
                </StepIcon>
                <StepLabel>Adresse</StepLabel>
              </Step>
              <StepConnector $completed={step > 1} />
              <Step $active={step === 2} $completed={step > 2}>
                <StepIcon>
                  <Truck size={18} />
                </StepIcon>
                <StepLabel>Livraison</StepLabel>
              </Step>
              <StepConnector $completed={step > 2} />
              <Step $active={step === 3} $completed={step > 3}>
                <StepIcon>
                  <CreditCard size={18} />
                </StepIcon>
                <StepLabel>Paiement</StepLabel>
              </Step>
              <StepConnector $completed={step > 3} />
              <Step $active={step === 4}>
                <StepIcon>
                  <CheckCircle size={18} />
                </StepIcon>
                <StepLabel>Confirmation</StepLabel>
              </Step>
            </StepsContainer>
          </CheckoutHeader>

          <CheckoutContent>
            <MainContent>
              {step > 1 && (
                <BackButton onClick={prevStep}>
                  <ChevronLeft size={18} />
                  Retour
                </BackButton>
              )}

              {step === 1 && (
                <AddressForm
                  formData={formData}
                  handleChange={handleChange}
                  nextStep={nextStep}
                />
              )}

              {step === 2 && (
                <DeliveryOptions
                  deliveryOption={formData.deliveryOption}
                  handleDeliveryOptionChange={handleDeliveryOptionChange}
                  nextStep={nextStep}
                />
              )}

              {step === 3 && (
                <PaymentMethod
                  paymentMethod={formData.paymentMethod}
                  handlePaymentMethodChange={handlePaymentMethodChange}
                  nextStep={nextStep}
                />
              )}

              {step === 4 && (
                <OrderReview
                  formData={formData}
                  cartItems={cartItems}
                  subtotal={subtotal}
                  deliveryFee={deliveryFee}
                  total={total}
                  placeOrder={placeOrder}
                />
              )}
            </MainContent>

            <OrderSummary
              cartItems={cartItems}
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              total={total}
              deliveryOption={formData.deliveryOption}
            />
          </CheckoutContent>
        </CheckoutContainer>
      </PageContainer>
    </ThemeProvider>
  );
};

const OrderReview = ({
  formData,
  cartItems,
  subtotal,
  deliveryFee,
  total,
  placeOrder,
}) => {
  return (
    <Section>
      <SectionTitle>Vérifiez votre commande</SectionTitle>

      <ReviewSection>
        <ReviewTitle>Adresse de livraison</ReviewTitle>
        <ReviewContent>
          <p>
            <strong>
              {formData.firstName} {formData.lastName}
            </strong>
          </p>
          <p>{formData.address}</p>
          {formData.addressLine2 && <p>{formData.addressLine2}</p>}
          <p>
            {formData.city}, {formData.region} {formData.postalCode}
          </p>
          <p>Maroc</p>
          <p>{formData.phone}</p>
          <p>{formData.email}</p>
        </ReviewContent>
      </ReviewSection>

      <ReviewSection>
        <ReviewTitle>Mode de livraison</ReviewTitle>
        <ReviewContent>
          {formData.deliveryOption === "standard" && (
            <p>Livraison standard (3-5 jours ouvrables) - 30 MAD</p>
          )}
          {formData.deliveryOption === "express" && (
            <p>Livraison express (1-2 jours ouvrables) - 50 MAD</p>
          )}
          {formData.deliveryOption === "sameDay" && (
            <p>Livraison le jour même (Casablanca uniquement) - 80 MAD</p>
          )}
        </ReviewContent>
      </ReviewSection>

      <ReviewSection>
        <ReviewTitle>Mode de paiement</ReviewTitle>
        <ReviewContent>
          <p>Paiement à la livraison</p>
          <p className="payment-note">
            Vous paierez le montant total de {total} MAD en espèces à la
            réception de votre commande.
          </p>
        </ReviewContent>
      </ReviewSection>

      <ReviewSection>
        <ReviewTitle>Articles commandés</ReviewTitle>
        <ReviewItems>
          {cartItems.map((item) => (
            <ReviewItem key={item.id}>
              <ReviewItemImage src={item.image} alt={item.name} />
              <ReviewItemDetails>
                <ReviewItemName>{item.name}</ReviewItemName>
                <ReviewItemMeta>
                  <span>Couleur: {item.color}</span>
                  <span>Taille: {item.size}</span>
                  <span>Quantité: {item.quantity}</span>
                </ReviewItemMeta>
                <ReviewItemPrice>{item.price} MAD</ReviewItemPrice>
              </ReviewItemDetails>
            </ReviewItem>
          ))}
        </ReviewItems>
      </ReviewSection>

      <DisclaimerText>
        En passant votre commande, vous acceptez nos conditions générales de
        vente et notre politique de confidentialité. Vous reconnaissez également
        que vous devrez payer le montant total en espèces à la livraison.
      </DisclaimerText>

      <PlaceOrderButton onClick={placeOrder}>
        Confirmer la commande
      </PlaceOrderButton>
    </Section>
  );
};

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 2rem 1rem;

  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
  }
`;

const CheckoutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const CheckoutHeader = styled.header`
  padding: 1.5rem;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 2px;
  color: ${(props) => props.theme.primary};
`;

const StepsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 600px;
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: ${(props) =>
    props.$active
      ? props.theme.primary
      : props.$completed
      ? props.theme.primary
      : props.theme.textSecondary};
  transition: color 0.3s ease;
`;

const StepIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.backgroundAlt};
  border: 2px solid currentColor;
`;

const StepLabel = styled.span`
  font-size: 0.85rem;
  font-weight: 500;

  @media (max-width: 480px) {
    display: none;
  }
`;

const StepConnector = styled.div`
  flex: 1;
  height: 2px;
  background-color: ${(props) =>
    props.$completed ? props.theme.primary : props.theme.borderColor};
  margin: 0 0.5rem;
  transition: background-color 0.3s ease;
`;

const CheckoutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.main`
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: ${(props) => props.theme.textSecondary};
  cursor: pointer;
  padding: 0.5rem;
  margin-bottom: 1.5rem;
  font-weight: 500;

  &:hover {
    color: ${(props) => props.theme.text};
  }
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const ReviewSection = styled.div`
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eaeaea;

  &:last-of-type {
    border-bottom: none;
  }
`;

const ReviewTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const ReviewContent = styled.div`
  p {
    margin: 0.25rem 0;
    color: ${(props) => props.theme.textSecondary};
  }

  .payment-note {
    margin-top: 0.5rem;
    font-style: italic;
  }
`;

const ReviewItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ReviewItem = styled.div`
  display: flex;
  gap: 1rem;
`;

const ReviewItemImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
  background-color: #f5f5f5;
  border-radius: 4px;
`;

const ReviewItemDetails = styled.div`
  flex: 1;
`;

const ReviewItemName = styled.div`
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const ReviewItemMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: ${(props) => props.theme.textSecondary};
  margin-bottom: 0.25rem;
`;

const ReviewItemPrice = styled.div`
  font-weight: 600;
`;

const DisclaimerText = styled.p`
  font-size: 0.85rem;
  color: ${(props) => props.theme.textSecondary};
  line-height: 1.5;
  margin-bottom: 2rem;
`;

const PlaceOrderButton = styled.button`
  width: 100%;
  background-color: ${(props) => props.theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 1rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.primaryHover};
  }
`;

export default CheckoutPage;
