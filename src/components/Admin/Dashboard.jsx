"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import {
  ShoppingBag,
  Package,
  AlertCircle,
  TrendingUp,
  CheckCircle,
  Truck,
  XCircle,
} from "lucide-react";
import api from "../../Api/authApi";

const Card = styled.div`
  background-color: ${(props) => props.theme.cardBackground};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 0.5rem;
  overflow: hidden;
`;

const Progress = ({ value, className }) => {
  return (
    <div
      className={className}
      style={{
        width: "100%",
        height: "8px",
        backgroundColor: "rgba(0,0,0,0.1)",
        borderRadius: "9999px",
        overflow: "hidden",
        marginTop: "8px",
      }}
    >
      <div
        style={{
          width: `${value * 100}%`,
          height: "100%",
          backgroundColor: "#ff4d4d",
          borderRadius: "9999px",
        }}
      />
    </div>
  );
};

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
  width: 100%;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StatsCard = styled(Card)`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.cardBackground};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 0.5rem;
  box-shadow: ${(props) => props.theme.shadow};
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${(props) => props.theme.shadow};
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  background-color: ${(props) => `${props.theme.primary}20`};
  color: ${(props) => props.theme.primary};
`;

const CardTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${(props) => props.theme.textSecondary};
  margin: 0;
`;

const CardValue = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0.5rem 0;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: ${(props) => props.$color || props.theme.textSecondary};
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 2rem 0 1rem;
`;

const OrderStatusSection = styled.div`
  margin-top: 2rem;
  width: 100%;
`;

const StatusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatusCard = styled(Card)`
  padding: 1.25rem;
  background-color: ${(props) => props.theme.cardBackground};
  border: 1px solid ${(props) => props.theme.borderColor};
  box-shadow: ${(props) => props.theme.shadow};
`;

const StatusHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const StatusIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 0.375rem;
  margin-right: 0.75rem;
  background-color: ${(props) => props.$bgColor || `${props.theme.primary}20`};
  color: ${(props) => props.$color || props.theme.primary};
`;

const StatusTitle = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
`;

const StatusValue = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0.5rem 0;
`;

const NotificationsSection = styled.div`
  margin-top: 2rem;
  width: 100%;
`;

const NotificationsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const NotificationItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: ${(props) => props.theme.cardBackground};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 0.5rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.hoverBackground};
  }
`;

const NotificationContent = styled.div`
  margin-left: 1rem;
`;

const NotificationTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0 0 0.25rem;
`;

const NotificationTime = styled.p`
  font-size: 0.75rem;
  color: ${(props) => props.theme.textSecondary};
  margin: 0;
`;

const DashboardMessage = styled.div`
  padding: 2rem;
  text-align: center;
  color: ${(props) => props.theme.textSecondary};
  background-color: ${(props) => props.theme.cardBackground};
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 0.5rem;
`;

const DashboardError = styled(DashboardMessage)`
  color: #dc2626;
`;

const DashboardSkeleton = styled.div`
  height: 7rem;
  border-radius: 0.5rem;
  background: linear-gradient(
    90deg,
    ${(props) => props.theme.backgroundAlt} 25%,
    ${(props) => props.theme.cardBackground} 50%,
    ${(props) => props.theme.backgroundAlt} 75%
  );
  background-size: 200% 100%;
  animation: dashboard-loading 1.4s infinite;

  @keyframes dashboard-loading {
    from {
      background-position: 200% 0;
    }
    to {
      background-position: -200% 0;
    }
  }
`;

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalOrders: 0,
    newOrdersToday: 0,
    totalProducts: 0,
    ordersByStatus: {
      new: 0,
      confirmed: 0,
      shipped: 0,
      cancelled: 0,
    },
    notifications: [],
    availability: {},
  });

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get("/api/admin/dashboard");
      setStats(response.data.data);
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Impossible de charger les données du tableau de bord.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
    const interval = window.setInterval(fetchDashboard, 30000);
    return () => window.clearInterval(interval);
  }, []);

  const orderStatuses = Object.values(stats.ordersByStatus).filter(
    (value) => typeof value === "number",
  );
  const totalKnownOrders = orderStatuses.reduce(
    (total, value) => total + value,
    0,
  );
  const progressFor = (value) =>
    totalKnownOrders > 0 && typeof value === "number"
      ? value / totalKnownOrders
      : 0;
  const displayValue = (value) =>
    value === null || value === undefined ? "Donnée indisponible" : value;

  if (loading) {
    return (
      <DashboardGrid>
        <DashboardSkeleton />
        <DashboardSkeleton />
        <DashboardSkeleton />
        <DashboardSkeleton />
      </DashboardGrid>
    );
  }

  if (error) {
    return (
      <DashboardError>
        {error}
        <button type="button" onClick={fetchDashboard}>
          Réessayer
        </button>
      </DashboardError>
    );
  }

  return (
    <div style={{ width: "100%" }}>
      <DashboardGrid>
        <StatsCard>
          <CardHeader>
            <CardTitle>Total des Commandes</CardTitle>
            <IconWrapper>
              <Package size={20} />
            </IconWrapper>
          </CardHeader>
          <CardValue>{displayValue(stats.totalOrders)}</CardValue>
          <CardFooter>
            <span>Données réelles indisponibles</span>
          </CardFooter>
        </StatsCard>

        <StatsCard>
          <CardHeader>
            <CardTitle>Nouvelles Commandes Aujourd'hui</CardTitle>
            <IconWrapper>
              <AlertCircle size={20} />
            </IconWrapper>
          </CardHeader>
          <CardValue>{displayValue(stats.newOrdersToday)}</CardValue>
          <CardFooter>
            <span>Nécessite attention</span>
          </CardFooter>
        </StatsCard>

        <StatsCard>
          <CardHeader>
            <CardTitle>Total des Produits</CardTitle>
            <IconWrapper>
              <ShoppingBag size={20} />
            </IconWrapper>
          </CardHeader>
          <CardValue>{stats.totalProducts}</CardValue>
          <CardFooter>
            <span>Toutes catégories confondues</span>
          </CardFooter>
        </StatsCard>

        <StatsCard>
          <CardHeader>
            <CardTitle>Taux de Conversion</CardTitle>
            <IconWrapper>
              <TrendingUp size={20} />
            </IconWrapper>
          </CardHeader>
          <CardValue>{displayValue(stats.conversionRate)}</CardValue>
          <CardFooter>
            <span>Calcul impossible avec les données disponibles</span>
          </CardFooter>
        </StatsCard>
      </DashboardGrid>

      <OrderStatusSection>
        <SectionTitle>Commandes par Statut</SectionTitle>
        <StatusGrid>
          <StatusCard>
            <StatusHeader>
              <StatusIcon $bgColor="rgba(255, 77, 77, 0.2)" $color="#ff4d4d">
                <AlertCircle size={16} />
              </StatusIcon>
              <StatusTitle>Nouvelles Commandes</StatusTitle>
            </StatusHeader>
            <StatusValue>{displayValue(stats.ordersByStatus.new)}</StatusValue>
            <Progress
              value={progressFor(stats.ordersByStatus.new)}
              className="h-2 mt-2"
            />
          </StatusCard>

          <StatusCard>
            <StatusHeader>
              <StatusIcon $bgColor="rgba(59, 130, 246, 0.2)" $color="#3b82f6">
                <CheckCircle size={16} />
              </StatusIcon>
              <StatusTitle>Commandes Confirmées</StatusTitle>
            </StatusHeader>
            <StatusValue>
              {displayValue(stats.ordersByStatus.confirmed)}
            </StatusValue>
            <Progress
              value={progressFor(stats.ordersByStatus.confirmed)}
              className="h-2 mt-2"
            />
          </StatusCard>

          <StatusCard>
            <StatusHeader>
              <StatusIcon $bgColor="rgba(16, 185, 129, 0.2)" $color="#10b981">
                <Truck size={16} />
              </StatusIcon>
              <StatusTitle>Commandes Expédiées</StatusTitle>
            </StatusHeader>
            <StatusValue>
              {displayValue(stats.ordersByStatus.shipped)}
            </StatusValue>
            <Progress
              value={progressFor(stats.ordersByStatus.shipped)}
              className="h-2 mt-2"
            />
          </StatusCard>

          <StatusCard>
            <StatusHeader>
              <StatusIcon $bgColor="rgba(239, 68, 68, 0.2)" $color="#ef4444">
                <XCircle size={16} />
              </StatusIcon>
              <StatusTitle>Commandes Annulées</StatusTitle>
            </StatusHeader>
            <StatusValue>
              {displayValue(stats.ordersByStatus.cancelled)}
            </StatusValue>
            <Progress
              value={progressFor(stats.ordersByStatus.cancelled)}
              className="h-2 mt-2"
            />
          </StatusCard>
        </StatusGrid>
      </OrderStatusSection>

      <NotificationsSection>
        <SectionTitle>Notifications en Attente</SectionTitle>
        <NotificationsList>
          {stats.notifications.length > 0 ? (
            stats.notifications.map((notification) => (
              <NotificationItem key={notification.id}>
                <StatusIcon>
                  <AlertCircle size={16} />
                </StatusIcon>
                <NotificationContent>
                  <NotificationTitle>
                    {translateNotification(notification.title)}
                  </NotificationTitle>
                  <NotificationTime>
                    {translateTimeAgo(notification.time)}
                  </NotificationTime>
                </NotificationContent>
              </NotificationItem>
            ))
          ) : (
            <DashboardMessage>
              Aucune donnée de notification disponible.
            </DashboardMessage>
          )}
        </NotificationsList>
      </NotificationsSection>
    </div>
  );
};

const translateNotification = (title) => {
  return title
    .replace("New order", "Nouvelle commande")
    .replace("Order", "Commande")
    .replace("needs confirmation", "nécessite une confirmation")
    .replace("is ready to ship", "est prête à être expédiée")
    .replace("Low stock alert", "Alerte de stock bas")
    .replace("New customer feedback received", "Nouveau retour client reçu");
};

const translateTimeAgo = (timeAgo) => {
  return timeAgo
    .replace("minutes ago", "minutes")
    .replace("minute ago", "minute")
    .replace("hours ago", "heures")
    .replace("hour ago", "heure")
    .replace("days ago", "jours")
    .replace("day ago", "jour");
};

export default Dashboard;
