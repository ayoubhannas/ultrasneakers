"use client";

import { useState } from "react";
import styled from "styled-components";
import { MapPin, Phone, Mail } from "lucide-react";
import {
  FaFacebookF,
  FaTiktok,
  FaWhatsapp,
  FaInstagram,
  FaTelegramPlane,
} from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";
import SizeGuideModal from "./SizeGuideModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

const Footer = () => {
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  const toggleSizeGuide = () => {
    setShowSizeGuide(!showSizeGuide);
  };

  const openModal = (modalName) => {
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const modalContents = {
    "notre-histoire": {
      title: "Notre Histoire",
      content:
        "Découvrez l'histoire passionnante de notre marque ULTRASNEAKERS. Fondée par des passionnés de sneakers en 2020, ULTRASNEAKERS est née d'une vision simple : offrir des sneakers authentiques et de qualité à des prix accessibles au Maroc. Notre parcours a commencé modestement, mais notre engagement envers la qualité et l'authenticité nous a rapidement permis de nous développer et de devenir une référence dans le domaine des sneakers au Maroc.",
    },
    "nos-magasins": {
      title: "Nos Magasins",
      content:
        "Retrouvez nos boutiques physiques à Casablanca et bientôt dans d'autres villes du Maroc. Notre magasin principal est situé au cœur de Casablanca, offrant une expérience d'achat unique avec un large choix de sneakers des meilleures marques. Nos conseillers experts sont à votre disposition pour vous aider à trouver la paire parfaite qui correspond à votre style et à vos besoins.",
    },
    durabilite: {
      title: "Durabilité",
      content:
        "Nos engagements pour une mode plus durable et responsable. Chez ULTRASNEAKERS, nous sommes conscients de notre responsabilité envers l'environnement. Nous nous engageons à réduire notre empreinte écologique en adoptant des pratiques commerciales durables. Nous privilégions les emballages recyclables et travaillons avec des marques qui partagent nos valeurs environnementales.",
    },
    carrieres: {
      title: "Carrières",
      content:
        "Rejoignez notre équipe dynamique et passionnée ! ULTRASNEAKERS est toujours à la recherche de talents qui partagent notre passion pour les sneakers et notre engagement envers l'excellence du service client. Nous offrons un environnement de travail stimulant où la créativité et l'initiative sont valorisées.",
    },
    faq: {
      title: "FAQ",
      content:
        "Trouvez les réponses à vos questions fréquemment posées concernant nos produits, les commandes, les livraisons, les retours et bien plus encore. Notre FAQ est régulièrement mise à jour pour vous fournir les informations les plus précises et pertinentes.",
    },
    "livraison-retours": {
      title: "Livraison & Retours",
      content:
        "Informations sur nos politiques de livraison et de retour. Nous proposons la livraison dans tout le Maroc avec des délais variant de 24 à 72 heures selon votre localisation. La livraison est gratuite pour toute commande supérieure à 1000 MAD. Concernant les retours, vous disposez de 14 jours à compter de la réception de votre commande pour nous retourner un article.",
    },
    "conditions-generales": {
      title: "Conditions Générales",
      content:
        "Consultez nos conditions générales de vente. Nos conditions générales de vente définissent les termes et conditions régissant l'utilisation de notre site web et l'achat de produits sur notre plateforme. Elles couvrent des aspects importants tels que les modalités de commande, les prix, les paiements, les livraisons, les retours et les garanties.",
    },
    confidentialite: {
      title: "Confidentialité",
      content:
        "Chez ULTRASNEAKERS, nous accordons une grande importance à la protection de vos données personnelles. Notre politique de confidentialité détaille comment nous collectons, utilisons, stockons et protégeons vos informations. Nous nous engageons à respecter votre vie privée et à utiliser vos données uniquement dans le cadre de nos services.",
    },
    cookies: {
      title: "Cookies",
      content:
        "Notre site utilise des cookies pour améliorer votre expérience de navigation et personnaliser nos services. Les cookies sont de petits fichiers texte stockés sur votre appareil qui nous aident à comprendre comment vous utilisez notre site. Vous pouvez à tout moment modifier vos préférences concernant les cookies dans les paramètres de votre navigateur.",
    },
    accessibilite: {
      title: "Accessibilité",
      content:
        "ULTRASNEAKERS s'engage à rendre son site web accessible à tous les utilisateurs, y compris ceux ayant des handicaps. Nous travaillons continuellement à l'amélioration de l'accessibilité de notre plateforme en suivant les normes et les meilleures pratiques du secteur.",
    },
  };

  return (
    <>
      <FooterContainer>
        <FooterContent>
          <FooterSection>
            <FooterTitle>À PROPOS</FooterTitle>
            <FooterLinks>
              <FooterLink
                as="button"
                onClick={() => openModal("notre-histoire")}
              >
                Notre Histoire
              </FooterLink>
              <FooterLink as="button" onClick={() => openModal("nos-magasins")}>
                Nos Magasins
              </FooterLink>
              <FooterLink as="button" onClick={() => openModal("durabilite")}>
                Durabilité
              </FooterLink>
              <FooterLink as="button" onClick={() => openModal("carrieres")}>
                Carrières
              </FooterLink>
            </FooterLinks>
          </FooterSection>

          <FooterSection>
            <FooterTitle>AIDE</FooterTitle>
            <FooterLinks>
              <FooterLink as="button" onClick={() => openModal("faq")}>
                FAQ
              </FooterLink>
              <FooterLink
                as="button"
                onClick={() => openModal("livraison-retours")}
              >
                Livraison & Retours
              </FooterLink>
              <FooterLink
                as="button"
                onClick={() => openModal("conditions-generales")}
              >
                Conditions Générales
              </FooterLink>
              <FooterLink as="button" onClick={toggleSizeGuide}>
                Guide des Tailles
              </FooterLink>
            </FooterLinks>
          </FooterSection>

          <FooterSection>
            <FooterTitle>CONTACT</FooterTitle>
            <ContactInfo>
              <ContactItem>
                <MapPin size={16} />
                <span>Casablanca</span>
              </ContactItem>
              <ContactItem>
                <Phone size={16} />
                <span>+212 709 089 060</span>
              </ContactItem>
              <ContactItem>
                <Mail size={16} />
                <span>ultrasneakers1@gmail.com</span>
              </ContactItem>
            </ContactInfo>
          </FooterSection>

          <FooterSection>
            <FooterTitle>SUIVEZ-NOUS</FooterTitle>
            <SocialLinksVertical>
              <SocialLinkItem>
                <SocialLink
                  href="https://www.facebook.com/share/18ymfRTStz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <FaFacebookF size={20} />
                  <SocialLinkText>Facebook</SocialLinkText>
                </SocialLink>
              </SocialLinkItem>
              <SocialLinkItem>
                <SocialLink
                  href="https://www.instagram.com/ultrasneakers.ma"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <FaInstagram size={20} />
                  <SocialLinkText>Instagram</SocialLinkText>
                </SocialLink>
              </SocialLinkItem>
              <SocialLinkItem>
                <SocialLink
                  href="https://www.tiktok.com/@ultra..sneakers?_t=ZM-8w5GIXTLFd1&_r=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                >
                  <FaTiktok size={20} />
                  <SocialLinkText>TikTok</SocialLinkText>
                </SocialLink>
              </SocialLinkItem>
              <SocialLinkItem>
                <SocialLink
                  href="https://wa.me/212709089060"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Whatsapp"
                >
                  <FaWhatsapp size={20} />
                  <SocialLinkText>WhatsApp</SocialLinkText>
                </SocialLink>
              </SocialLinkItem>
              <SocialLinkItem>
                <SocialLink
                  href="#"
                  aria-label="Telegram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTelegramPlane size={20} />
                  <SocialLinkText>Telegram</SocialLinkText>
                </SocialLink>
              </SocialLinkItem>
              <SocialLinkItem>
                <SocialLink
                  href="https://www.threads.net/@ultrasneakers.ma"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Threads"
                >
                  <FaThreads size={20} />
                  <SocialLinkText>Threads</SocialLinkText>
                </SocialLink>
              </SocialLinkItem>
            </SocialLinksVertical>
          </FooterSection>
        </FooterContent>

        <FooterBottom>
          <Copyright>
            © {new Date().getFullYear()} ULTRASNEAKERS. Tous droits réservés.
          </Copyright>
          <FooterBottomLinks>
            <FooterBottomLink
              as="button"
              onClick={() => openModal("confidentialite")}
            >
              Confidentialité
            </FooterBottomLink>
            <FooterBottomLink as="button" onClick={() => openModal("cookies")}>
              Cookies
            </FooterBottomLink>
            <FooterBottomLink
              as="button"
              onClick={() => openModal("accessibilite")}
            >
              Accessibilité
            </FooterBottomLink>
          </FooterBottomLinks>
        </FooterBottom>
      </FooterContainer>

      {showSizeGuide && <SizeGuideModal onClose={toggleSizeGuide} />}

      <Dialog open={!!activeModal} onOpenChange={closeModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {modalContents[activeModal]?.title || "Information"}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {modalContents[activeModal]?.content || "Contenu non disponible."}
          </DialogDescription>
          <DialogClose asChild>
            <CloseButton>Fermer</CloseButton>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};

const FooterContainer = styled.footer`
  background-color: ${(props) => props.theme.backgroundAlt};
  color: ${(props) => props.theme.text};
  padding: 4rem 2rem 2rem;

  @media (max-width: 768px) {
    padding: 3rem 1rem 1.5rem;
  }
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  letter-spacing: 1px;
`;

const FooterLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FooterLink = styled.a`
  color: ${(props) => props.theme.textSecondary};
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s;
  background: none;
  border: none;
  text-align: left;
  padding: 0;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.primary};
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${(props) => props.theme.textSecondary};
  font-size: 0.9rem;

  svg {
    color: ${(props) => props.theme.primary};
  }
`;

const SocialLinksVertical = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SocialLinkItem = styled.div`
  margin: 0;
  padding: 0;
`;

const SocialLink = styled.a`
  color: ${(props) => props.theme.textSecondary};
  transition: color 0.2s;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;

  &:hover {
    color: ${(props) => props.theme.primary};
  }
`;

const SocialLinkText = styled.span`
  font-size: 0.9rem;
`;

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 2rem;
  margin-top: 3rem;
  border-top: 1px solid ${(props) => props.theme.borderColor};

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
`;

const Copyright = styled.div`
  color: ${(props) => props.theme.textSecondary};
  font-size: 0.85rem;
`;

const FooterBottomLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const FooterBottomLink = styled.a`
  color: ${(props) => props.theme.textSecondary};
  text-decoration: none;
  font-size: 0.85rem;
  transition: color 0.2s;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.primary};
  }
`;

const CloseButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${(props) => props.theme.primary};
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  margin-top: 1rem;
  align-self: flex-end;

  &:hover {
    background-color: ${(props) => props.theme.primaryHover};
  }
`;

export default Footer;
