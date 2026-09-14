"use client";

import { useState } from "react";
import styled from "styled-components";
import { CreditCard, Lock } from "lucide-react";

const PaymentForm = ({ initialValues, onSubmit }) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, "");
    const formatted = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
    return formatted.substring(0, 19);
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData((prev) => ({
      ...prev,
      cardNumber: formatted,
    }));

    if (errors.cardNumber) {
      setErrors((prev) => ({
        ...prev,
        cardNumber: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    const requiredFields = [
      "cardName",
      "cardNumber",
      "expiryMonth",
      "expiryYear",
      "cvv",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    if (
      formData.cardNumber &&
      formData.cardNumber.replace(/\D/g, "").length !== 16
    ) {
      newErrors.cardNumber = "Please enter a valid 16-digit card number";
    }

    if (formData.cvv && !/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = "Please enter a valid CVV";
    }

    const currentYear = new Date().getFullYear() % 100;

    if (formData.expiryYear && formData.expiryMonth) {
      const year = Number.parseInt(formData.expiryYear, 10);
      const month = Number.parseInt(formData.expiryMonth, 10);

      if (
        year < currentYear ||
        (year === currentYear && month < currentMonth)
      ) {
        newErrors.expiryMonth = "Card has expired";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <FormContainer>
      <FormSection>
        <SectionTitle>Payment Method</SectionTitle>
        <PaymentMethods>
          <PaymentMethod $selected={true}>
            <PaymentMethodRadio>
              <input
                type="radio"
                name="paymentMethod"
                value="creditCard"
                checked={true}
                readOnly
              />
              <RadioMark />
            </PaymentMethodRadio>
            <PaymentMethodInfo>
              <PaymentMethodName>Credit / Debit Card</PaymentMethodName>
              <PaymentMethodIcons>
                <CreditCard size={20} />
              </PaymentMethodIcons>
            </PaymentMethodInfo>
          </PaymentMethod>
        </PaymentMethods>
      </FormSection>

      <FormSection>
        <SectionTitle>Card Information</SectionTitle>
        <FormGrid>
          <FormGroup $fullWidth>
            <Label htmlFor="cardName">Name on Card *</Label>
            <Input
              type="text"
              id="cardName"
              name="cardName"
              value={formData.cardName}
              onChange={handleChange}
              placeholder="John Doe"
              $hasError={!!errors.cardName}
            />
            {errors.cardName && <ErrorMessage>{errors.cardName}</ErrorMessage>}
          </FormGroup>

          <FormGroup $fullWidth>
            <Label htmlFor="cardNumber">Card Number *</Label>
            <CardNumberInput>
              <Input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleCardNumberChange}
                placeholder="1234 5678 9012 3456"
                $hasError={!!errors.cardNumber}
              />
              <CardIcon>
                <CreditCard size={20} />
              </CardIcon>
            </CardNumberInput>
            {errors.cardNumber && (
              <ErrorMessage>{errors.cardNumber}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label>Expiration Date *</Label>
            <ExpiryContainer>
              <Select
                name="expiryMonth"
                value={formData.expiryMonth}
                onChange={handleChange}
                $hasError={!!errors.expiryMonth}
              >
                <option value="">Month</option>
                {Array.from({ length: 12 }, (_, i) => {
                  const month = i + 1;
                  return (
                    <option
                      key={month}
                      value={month.toString().padStart(2, "0")}
                    >
                      {month.toString().padStart(2, "0")}
                    </option>
                  );
                })}
              </Select>

              <Select
                name="expiryYear"
                value={formData.expiryYear}
                onChange={handleChange}
                $hasError={!!errors.expiryYear}
              >
                <option value="">Year</option>
                {Array.from({ length: 10 }, (_, i) => {
                  const year = new Date().getFullYear() + i;
                  return (
                    <option
                      key={year}
                      value={(year % 100).toString().padStart(2, "0")}
                    >
                      {year}
                    </option>
                  );
                })}
              </Select>
            </ExpiryContainer>
            {(errors.expiryMonth || errors.expiryYear) && (
              <ErrorMessage>
                {errors.expiryMonth || errors.expiryYear}
              </ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="cvv">CVV *</Label>
            <Input
              type="text"
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              placeholder="123"
              maxLength={4}
              $hasError={!!errors.cvv}
            />
            {errors.cvv && <ErrorMessage>{errors.cvv}</ErrorMessage>}
          </FormGroup>
        </FormGrid>

        <SaveCardOption>
          <Checkbox>
            <input
              type="checkbox"
              id="saveCard"
              name="saveCard"
              checked={formData.saveCard}
              onChange={handleChange}
            />
            <CheckboxMark />
          </Checkbox>
          <Label htmlFor="saveCard" $inline>
            Save card for future purchases
          </Label>
        </SaveCardOption>

        <SecureNotice>
          <Lock size={14} />
          <span>Your payment information is secure and encrypted</span>
        </SecureNotice>
      </FormSection>

      <FormActions>
        <ContinueButton onClick={handleSubmit}>Review Order</ContinueButton>
      </FormActions>
    </FormContainer>
  );
};

const FormContainer = styled.form`
  padding: 1.5rem;
`;

const FormSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  grid-column: ${(props) => (props.$fullWidth ? "1 / -1" : "auto")};
`;

const Label = styled.label`
  display: ${(props) => (props.$inline ? "inline" : "block")};
  margin-bottom: ${(props) => (props.$inline ? "0" : "0.5rem")};
  font-weight: 500;
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid
    ${(props) =>
      props.$hasError ? props.theme.primary : props.theme.borderColor};
  border-radius: 4px;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${(props) =>
      props.$hasError ? props.theme.primary : props.theme.primary};
  }
`;

const CardNumberInput = styled.div`
  position: relative;
`;

const CardIcon = styled.div`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${(props) => props.theme.textSecondary};
`;

const ExpiryContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid
    ${(props) =>
      props.$hasError ? props.theme.primary : props.theme.borderColor};
  border-radius: 4px;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${(props) =>
      props.$hasError ? props.theme.primary : props.theme.primary};
  }
`;

const ErrorMessage = styled.div`
  color: ${(props) => props.theme.primary};
  font-size: 0.8rem;
  margin-top: 0.5rem;
`;

const PaymentMethods = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PaymentMethod = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 1px solid
    ${(props) =>
      props.$selected ? props.theme.primary : props.theme.borderColor};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: ${(props) =>
    props.$selected ? `${props.theme.primary}10` : props.theme.background};
`;

const PaymentMethodRadio = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
  margin-right: 1rem;

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

const PaymentMethodInfo = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PaymentMethodName = styled.div`
  font-weight: 600;
`;

const PaymentMethodIcons = styled.div`
  display: flex;
  gap: 0.5rem;
  color: ${(props) => props.theme.textSecondary};
`;

const SaveCardOption = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
`;

const Checkbox = styled.div`
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

const CheckboxMark = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  border-radius: 4px;
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
    left: 6px;
    top: 2px;
    width: 5px;
    height: 10px;
    border: solid ${(props) => props.theme.primary};
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  input:checked ~ & {
    border-color: ${(props) => props.theme.primary};
    background-color: ${(props) => `${props.theme.primary}10`};
  }
`;

const SecureNotice = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
  color: ${(props) => props.theme.textSecondary};
  font-size: 0.85rem;
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const ContinueButton = styled.button`
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

export default PaymentForm;
