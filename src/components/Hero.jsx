"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useTheme } from "next-themes";

const Hero = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc =
    mounted && resolvedTheme === "dark" ? "/logo-black.svg" : "/logo-white.svg";

  return (
    <HeroContainer>
      <HeroContent>
        <div>
          <HeroTagline>Collection Édition Limitée</HeroTagline>
          <HeroHeadline>Entrez dans le Style</HeroHeadline>
          <HeroDescription>
            Découvrez le meilleur des chaussures premium avec notre collection
            exclusive de sneakers de performance et de lifestyle.
          </HeroDescription>
          <ShopNowButton to="/shop">Acheter Maintenant</ShopNowButton>
        </div>
      </HeroContent>

      <HeroImageContainer>
        <div>
          <HeroImage
            src={logoSrc}
            alt="Sneaker Vedette"
            className="transition-opacity duration-300"
          />
        </div>
      </HeroImageContainer>
    </HeroContainer>
  );
};

const HeroContainer = styled.section`
  display: flex;
  min-height: 80vh;
  padding: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    padding: 1rem;
    min-height: auto;
  }
`;

const HeroContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem 0;
    text-align: center;
  }
`;

const HeroTagline = styled.p`
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin-bottom: 1rem;
  color: ${(props) => props.theme.primary};
`;

const HeroHeadline = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.1;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroDescription = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
  color: ${(props) => props.theme.textSecondary};

  @media (max-width: 768px) {
    margin: 0 auto 2rem;
  }
`;

const ShopNowButton = styled(Link)`
  font-size: 1rem;
  padding: 1rem 2rem;
  background-color: ${(props) => props.theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-decoration: none;
  display: inline-block;
  text-align: center;

  &:hover {
    background-color: ${(props) => props.theme.primaryHover};
  }

  @media (max-width: 768px) {
    margin: 0 auto;
  }
`;

const HeroImageContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const HeroImage = styled.img`
  max-width: 100%;
  height: 600px;
  transform: rotate(-10deg);
  transition: transform 0.5s ease, opacity 0.3s ease;

  &:hover {
    transform: rotate(-5deg) scale(1.05);
  }
`;

export default Hero;
