"use client";

import { useState } from "react";
import styled from "styled-components";

const AddressForm = ({ formData, handleChange, nextStep }) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "city",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "Ce champ est obligatoire";
      }
    });

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Veuillez entrer une adresse email valide";
    }

    // Phone validation - Moroccan phone numbers typically start with 06, 07, or 05
    if (formData.phone && !/^(0[5-7])[0-9]{8}$/.test(formData.phone)) {
      newErrors.phone =
        "Veuillez entrer un numéro de téléphone marocain valide";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      nextStep();
    }
  };

  return (
    <Section>
      <SectionTitle>Adresse de livraison</SectionTitle>
      <FormContainer onSubmit={handleSubmit}>
        <FormRow>
          <FormGroup>
            <Label htmlFor="firstName">Prénom *</Label>
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
            <Label htmlFor="lastName">Nom *</Label>
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
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label htmlFor="email">Email *</Label>
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
            <Label htmlFor="phone">Téléphone *</Label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="0600000000"
              $hasError={!!errors.phone}
            />
            {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
          </FormGroup>
        </FormRow>

        <FormGroup>
          <Label htmlFor="address">Adresse *</Label>
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
          <Label htmlFor="addressLine2">Complément d'adresse</Label>
          <Input
            type="text"
            id="addressLine2"
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleChange}
          />
        </FormGroup>

        <FormRow>
          <FormGroup>
            <Label htmlFor="city">Ville *</Label>
            <Select
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              $hasError={!!errors.city}
            >
              <option value="">Sélectionnez votre ville</option>
              <option value="Agadir">Agadir</option>
              <option value="Ahfir">Ahfir</option>
              <option value="Ait Melloul">Ait Melloul</option>
              <option value="Al Hoceima">Al Hoceima</option>
              <option value="Assilah">Assilah</option>
              <option value="Azemmour">Azemmour</option>
              <option value="Azilal">Azilal</option>
              <option value="Beni Mellal">Beni Mellal</option>
              <option value="Berkane">Berkane</option>
              <option value="Berrechid">Berrechid</option>
              <option value="Boujdour">Boujdour</option>
              <option value="Boulemane">Boulemane</option>
              <option value="Casablanca">Casablanca</option>
              <option value="Chefchaouen">Chefchaouen</option>
              <option value="Dakhla">Dakhla</option>
              <option value="Drarga">Drarga</option>
              <option value="El Hajeb">El Hajeb</option>
              <option value="El Jadida">El Jadida</option>
              <option value="Errachidia">Errachidia</option>
              <option value="Essaouira">Essaouira</option>
              <option value="Fès">Fès</option>
              <option value="Figuig">Figuig</option>
              <option value="Guelmim">Guelmim</option>
              <option value="Guercif">Guercif</option>
              <option value="Ifrane">Ifrane</option>
              <option value="Kénitra">Kénitra</option>
              <option value="Khemisset">Khemisset</option>
              <option value="Khenifra">Khenifra</option>
              <option value="Khouribga">Khouribga</option>
              <option value="Ksar El Kebir">Ksar El Kebir</option>
              <option value="Larache">Larache</option>
              <option value="Laâyoune">Laâyoune</option>
              <option value="Marrakech">Marrakech</option>
              <option value="Martil">Martil</option>
              <option value="M'diq">M'diq</option>
              <option value="Meknès">Meknès</option>
              <option value="Midelt">Midelt</option>
              <option value="Mohammédia">Mohammédia</option>
              <option value="Nador">Nador</option>
              <option value="Ouarzazate">Ouarzazate</option>
              <option value="Oued Zem">Oued Zem</option>
              <option value="Oujda">Oujda</option>
              <option value="Rabat">Rabat</option>
              <option value="Safi">Safi</option>
              <option value="Salé">Salé</option>
              <option value="Sefrou">Sefrou</option>
              <option value="Settat">Settat</option>
              <option value="Sidi Bennour">Sidi Bennour</option>
              <option value="Sidi Ifni">Sidi Ifni</option>
              <option value="Sidi Kacem">Sidi Kacem</option>
              <option value="Sidi Slimane">Sidi Slimane</option>
              <option value="Skhirat">Skhirat</option>
              <option value="Tan-Tan">Tan-Tan</option>
              <option value="Taounate">Taounate</option>
              <option value="Taourirt">Taourirt</option>
              <option value="Tarfaya">Tarfaya</option>
              <option value="Taroudant">Taroudant</option>
              <option value="Taza">Taza</option>
              <option value="Temara">Temara</option>
              <option value="Tétouan">Tétouan</option>
              <option value="Tinghir">Tinghir</option>
              <option value="Tiznit">Tiznit</option>
              <option value="Zagora">Zagora</option>
            </Select>
            {errors.city && <ErrorMessage>{errors.city}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="region">Région</Label>
            <Input
              type="text"
              id="region"
              name="region"
              value={formData.region}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="postalCode">Code postal</Label>
            <Input
              type="text"
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
            />
          </FormGroup>
        </FormRow>

        <FormGroup>
          <Label htmlFor="notes">Instructions de livraison (facultatif)</Label>
          <Textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Informations supplémentaires pour le livreur"
            rows={3}
          />
        </FormGroup>

        <CountryInfo>
          <strong>Pays de livraison:</strong> Maroc
        </CountryInfo>

        <ContinueButton type="submit">Continuer</ContinueButton>
      </FormContainer>
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

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid
    ${(props) => (props.$hasError ? props.theme.primary : "#e0e0e0")};
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${(props) =>
      props.$hasError ? props.theme.primary : props.theme.primary};
  }
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid
    ${(props) => (props.$hasError ? props.theme.primary : "#e0e0e0")};
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;

  &:focus {
    outline: none;
    border-color: ${(props) =>
      props.$hasError ? props.theme.primary : props.theme.primary};
  }
`;

const Textarea = styled.textarea`
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
  resize: vertical;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.primary};
  }
`;

const ErrorMessage = styled.div`
  color: ${(props) => props.theme.primary};
  font-size: 0.8rem;
  margin-top: 0.5rem;
`;

const CountryInfo = styled.div`
  padding: 0.75rem;
  background-color: #f5f5f5;
  border-radius: 4px;
  font-size: 0.9rem;
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
  margin-top: 1rem;

  &:hover {
    background-color: ${(props) => props.theme.primaryHover};
  }
`;

export default AddressForm;
