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
  transition: transform 0.2s ease, box-shadow 0.2s ease;

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

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    newOrders: 0,
    totalProducts: 0,
    ordersByStatus: {
      new: 0,
      confirmed: 0,
      shipped: 0,
      cancelled: 0,
    },
    notifications: [],
  });

  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalOrders: 1248,
        newOrders: 24,
        totalProducts: 156,
        ordersByStatus: {
          new: 42,
          confirmed: 78,
          shipped: 103,
          cancelled: 15,
        },
        notifications: [
          {
            id: 1,
            title: "New order #3245 needs confirmation",
            time: "10 minutes ago",
          },
          { id: 2, title: "Order #3242 is ready to ship", time: "1 hour ago" },
          { id: 3, title: "Low stock alert: Air Max 270", time: "3 hours ago" },
          {
            id: 4,
            title: "New customer feedback received",
            time: "5 hours ago",
          },
        ],
      });
    }, 1000);
  }, []);

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
          <CardValue>{stats.totalOrders}</CardValue>
          <CardFooter $color="#10b981">
            <TrendingUp size={14} style={{ marginRight: "4px" }} />
            <span>+12.5% par rapport au mois dernier</span>
          </CardFooter>
        </StatsCard>

        <StatsCard>
          <CardHeader>
            <CardTitle>Nouvelles Commandes Aujourd'hui</CardTitle>
            <IconWrapper>
              <AlertCircle size={20} />
            </IconWrapper>
          </CardHeader>
          <CardValue>{stats.newOrders}</CardValue>
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
          <CardValue>24.8%</CardValue>
          <CardFooter $color="#10b981">
            <TrendingUp size={14} style={{ marginRight: "4px" }} />
            <span>+3.2% par rapport à la semaine dernière</span>
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
            <StatusValue>{stats.ordersByStatus.new}</StatusValue>
            <Progress
              value={stats.ordersByStatus.new / 200}
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
            <StatusValue>{stats.ordersByStatus.confirmed}</StatusValue>
            <Progress
              value={stats.ordersByStatus.confirmed / 200}
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
            <StatusValue>{stats.ordersByStatus.shipped}</StatusValue>
            <Progress
              value={stats.ordersByStatus.shipped / 200}
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
            <StatusValue>{stats.ordersByStatus.cancelled}</StatusValue>
            <Progress
              value={stats.ordersByStatus.cancelled / 200}
              className="h-2 mt-2"
            />
          </StatusCard>
        </StatusGrid>
      </OrderStatusSection>

      <NotificationsSection>
        <SectionTitle>Notifications en Attente</SectionTitle>
        <NotificationsList>
          {stats.notifications.map((notification) => (
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
          ))}
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
