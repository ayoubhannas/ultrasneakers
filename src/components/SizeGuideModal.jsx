"use client";

import styled from "styled-components";
import { X } from "lucide-react";

const SizeGuideModal = ({ onClose }) => {
  return (
    <SizeGuideOverlay onClick={onClose}>
      <SizeGuideContent onClick={(e) => e.stopPropagation()}>
        <SizeGuideHeader>
          <SizeGuideTitle>Guide des Tailles</SizeGuideTitle>
          <CloseButton onClick={onClose}>
            <X size={24} />
          </CloseButton>
        </SizeGuideHeader>

        <SizeGuideDescription>
          Trouvez votre taille parfaite avec notre guide de conversion. Mesurez
          votre pied et utilisez le tableau ci-dessous pour déterminer votre
          taille idéale.
        </SizeGuideDescription>

        <SizeGuideInstructions>
          <InstructionTitle>Comment mesurer votre pied :</InstructionTitle>
          <InstructionList>
            <InstructionItem>
              1. Placez une feuille de papier contre un mur avec un bord droit.
            </InstructionItem>
            <InstructionItem>
              2. Tenez-vous debout sur la feuille de papier, le talon contre le
              mur.
            </InstructionItem>
            <InstructionItem>
              3. Marquez la position de votre orteil le plus long sur le papier.
            </InstructionItem>
            <InstructionItem>
              4. Mesurez la distance entre le bord du papier et la marque en
              centimètres.
            </InstructionItem>
          </InstructionList>
        </SizeGuideInstructions>

        <SizeGuideTable>
          <thead>
            <tr>
              <TableHeader>Longueur du pied (cm)</TableHeader>
              <TableHeader>EUR</TableHeader>
              <TableHeader>US (Homme)</TableHeader>
              <TableHeader>US (Femme)</TableHeader>
              <TableHeader>UK</TableHeader>
            </tr>
          </thead>
          <tbody>
            <tr>
              <TableCell>22.5</TableCell>
              <TableCell>36</TableCell>
              <TableCell>4</TableCell>
              <TableCell>5.5</TableCell>
              <TableCell>3.5</TableCell>
            </tr>
            <tr>
              <TableCell>23.0</TableCell>
              <TableCell>37</TableCell>
              <TableCell>5</TableCell>
              <TableCell>6.5</TableCell>
              <TableCell>4.5</TableCell>
            </tr>
            <tr>
              <TableCell>23.5</TableCell>
              <TableCell>38</TableCell>
              <TableCell>6</TableCell>
              <TableCell>7.5</TableCell>
              <TableCell>5.5</TableCell>
            </tr>
            <tr>
              <TableCell>24.0</TableCell>
              <TableCell>39</TableCell>
              <TableCell>6.5</TableCell>
              <TableCell>8</TableCell>
              <TableCell>6</TableCell>
            </tr>
            <tr>
              <TableCell>24.5</TableCell>
              <TableCell>40</TableCell>
              <TableCell>7</TableCell>
              <TableCell>8.5</TableCell>
              <TableCell>6.5</TableCell>
            </tr>
            <tr>
              <TableCell>25.0</TableCell>
              <TableCell>41</TableCell>
              <TableCell>8</TableCell>
              <TableCell>9.5</TableCell>
              <TableCell>7.5</TableCell>
            </tr>
            <tr>
              <TableCell>25.5</TableCell>
              <TableCell>42</TableCell>
              <TableCell>8.5</TableCell>
              <TableCell>10</TableCell>
              <TableCell>8</TableCell>
            </tr>
            <tr>
              <TableCell>26.0</TableCell>
              <TableCell>43</TableCell>
              <TableCell>9.5</TableCell>
              <TableCell>11</TableCell>
              <TableCell>9</TableCell>
            </tr>
            <tr>
              <TableCell>26.5</TableCell>
              <TableCell>44</TableCell>
              <TableCell>10</TableCell>
              <TableCell>11.5</TableCell>
              <TableCell>9.5</TableCell>
            </tr>
            <tr>
              <TableCell>27.0</TableCell>
              <TableCell>45</TableCell>
              <TableCell>11</TableCell>
              <TableCell>12.5</TableCell>
              <TableCell>10.5</TableCell>
            </tr>
            <tr>
              <TableCell>27.5</TableCell>
              <TableCell>46</TableCell>
              <TableCell>12</TableCell>
              <TableCell>13.5</TableCell>
              <TableCell>11.5</TableCell>
            </tr>
          </tbody>
        </SizeGuideTable>

        <SizeGuideTips>
          <TipsTitle>Conseils pour choisir la bonne taille :</TipsTitle>
          <TipsList>
            <TipsItem>
              • Si vous êtes entre deux tailles, optez pour la taille
              supérieure.
            </TipsItem>
            <TipsItem>
              • Mesurez vos pieds en fin de journée lorsqu'ils sont légèrement
              plus grands.
            </TipsItem>
            <TipsItem>
              • Tenez compte de l'épaisseur des chaussettes que vous prévoyez de
              porter.
            </TipsItem>
            <TipsItem>
              • Les tailles peuvent varier légèrement selon les marques et les
              modèles.
            </TipsItem>
          </TipsList>
        </SizeGuideTips>
      </SizeGuideContent>
    </SizeGuideOverlay>
  );
};

const SizeGuideOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
`;

const SizeGuideContent = styled.div`
  background-color: ${(props) => props.theme.background};
  border-radius: 8px;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme.backgroundAlt};
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.borderColor};
    border-radius: 3px;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const SizeGuideHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const SizeGuideTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  color: ${(props) => props.theme.text};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.textSecondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.hoverBackground};
    color: ${(props) => props.theme.text};
  }
`;

const SizeGuideDescription = styled.p`
  margin-bottom: 2rem;
  line-height: 1.6;
  color: ${(props) => props.theme.textSecondary};
`;

const SizeGuideInstructions = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: ${(props) => props.theme.backgroundAlt};
  border-radius: 8px;
`;

const InstructionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: ${(props) => props.theme.text};
`;

const InstructionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const InstructionItem = styled.div`
  color: ${(props) => props.theme.textSecondary};
  line-height: 1.5;
`;

const SizeGuideTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
  }
`;

const TableHeader = styled.th`
  padding: 1rem;
  background-color: ${(props) => props.theme.backgroundAlt};
  text-align: left;
  font-weight: 600;
  color: ${(props) => props.theme.text};
  border-bottom: 1px solid ${(props) => props.theme.borderColor};

  &:first-child {
    border-top-left-radius: 8px;
  }

  &:last-child {
    border-top-right-radius: 8px;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  color: ${(props) => props.theme.textSecondary};

  &:first-child {
    font-weight: 500;
    color: ${(props) => props.theme.text};
  }
`;

const SizeGuideTips = styled.div`
  padding: 1.5rem;
  background-color: ${(props) => props.theme.backgroundAlt};
  border-radius: 8px;
`;

const TipsTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: ${(props) => props.theme.text};
`;

const TipsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const TipsItem = styled.div`
  color: ${(props) => props.theme.textSecondary};
  line-height: 1.5;
`;

export default SizeGuideModal;
