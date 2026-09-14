"use client";

import { useState } from "react";
import styled from "styled-components";

const ShippingForm = ({
  initialValues,
  onSubmit,
  shippingMethod,
  setShippingMethod,
}) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "zipCode",
      "country",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (formData.zipCode && !/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = "Please enter a valid zip code";
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
        <SectionTitle>Contact Information</SectionTitle>
        <FormGrid>
          <FormGroup>
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              $hasError={!!errors.firstName}
            />
            {errors.firstName && (
              <ErrorMessage>{errors.firstName}</ErrorMessage>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              $hasError={!!errors.lastName}
            />
            {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              $hasError={!!errors.email}
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              $hasError={!!errors.phone}
            />
            {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
          </FormGroup>
        </FormGrid>
      </FormSection>

      <FormSection>
        <SectionTitle>Shipping Address</SectionTitle>
        <FormGrid>
          <FormGroup $fullWidth>
            <Label htmlFor="address">Street Address *</Label>
            <Input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              $hasError={!!errors.address}
            />
            {errors.address && <ErrorMessage>{errors.address}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="city">City *</Label>
            <Input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              $hasError={!!errors.city}
            />
            {errors.city && <ErrorMessage>{errors.city}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="state">State/Province *</Label>
            <Input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              $hasError={!!errors.state}
            />
            {errors.state && <ErrorMessage>{errors.state}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="zipCode">Zip/Postal Code *</Label>
            <Input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              $hasError={!!errors.zipCode}
            />
            {errors.zipCode && <ErrorMessage>{errors.zipCode}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="country">Country *</Label>
            <Select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              $hasError={!!errors.country}
            >
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Australia">Australia</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="Japan">Japan</option>
            </Select>
            {errors.country && <ErrorMessage>{errors.country}</ErrorMessage>}
          </FormGroup>
        </FormGrid>
      </FormSection>

      <FormSection>
        <SectionTitle>Shipping Method</SectionTitle>
        <ShippingOptions>
          <ShippingOption
            $selected={shippingMethod === "standard"}
            onClick={() => setShippingMethod("standard")}
          >
            <ShippingOptionRadio>
              <input
                type="radio"
                name="shippingMethod"
                value="standard"
                checked={shippingMethod === "standard"}
                onChange={() => setShippingMethod("standard")}
              />
              <RadioMark />
            </ShippingOptionRadio>
            <ShippingOptionInfo>
              <ShippingOptionName>Standard Shipping</ShippingOptionName>
              <ShippingOptionDescription>
                Delivery in 5-7 business days
              </ShippingOptionDescription>
            </ShippingOptionInfo>
            <ShippingOptionPrice>Free</ShippingOptionPrice>
          </ShippingOption>

          <ShippingOption
            $selected={shippingMethod === "express"}
            onClick={() => setShippingMethod("express")}
          >
            <ShippingOptionRadio>
              <input
                type="radio"
                name="shippingMethod"
                value="express"
                checked={shippingMethod === "express"}
                onChange={() => setShippingMethod("express")}
              />
              <RadioMark />
            </ShippingOptionRadio>
            <ShippingOptionInfo>
              <ShippingOptionName>Express Shipping</ShippingOptionName>
              <ShippingOptionDescription>
                Delivery in 2-3 business days
              </ShippingOptionDescription>
            </ShippingOptionInfo>
            <ShippingOptionPrice>$12.99</ShippingOptionPrice>
          </ShippingOption>

          <ShippingOption
            $selected={shippingMethod === "overnight"}
            onClick={() => setShippingMethod("overnight")}
          >
            <ShippingOptionRadio>
              <input
                type="radio"
                name="shippingMethod"
                value="overnight"
                checked={shippingMethod === "overnight"}
                onChange={() => setShippingMethod("overnight")}
              />
              <RadioMark />
            </ShippingOptionRadio>
            <ShippingOptionInfo>
              <ShippingOptionName>Overnight Shipping</ShippingOptionName>
              <ShippingOptionDescription>
                Next business day delivery
              </ShippingOptionDescription>
            </ShippingOptionInfo>
            <ShippingOptionPrice>$24.99</ShippingOptionPrice>
          </ShippingOption>
        </ShippingOptions>
      </FormSection>

      <FormActions>
        <ContinueButton onClick={handleSubmit}>
          Continue to Payment
        </ContinueButton>
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
  display: block;
  margin-bottom: 0.5rem;
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

const ShippingOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ShippingOption = styled.div`
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

  &:hover {
    border-color: ${(props) => props.theme.primary};
  }
`;

const ShippingOptionRadio = styled.div`
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

const ShippingOptionInfo = styled.div`
  flex: 1;
`;

const ShippingOptionName = styled.div`
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const ShippingOptionDescription = styled.div`
  font-size: 0.85rem;
  color: ${(props) => props.theme.textSecondary};
`;

const ShippingOptionPrice = styled.div`
  font-weight: 600;
  color: ${(props) => props.theme.primary};
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

export default ShippingForm;
