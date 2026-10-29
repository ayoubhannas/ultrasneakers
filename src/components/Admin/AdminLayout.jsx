"use client";

import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../../styles/Theme";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  LogOut,
  Moon,
  Sun,
  Menu,
  X,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "@/Redux/Auth/authSlice";
import api from "../../Api/authApi";

const AdminLayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
`;

const Sidebar = styled.aside`
  width: ${(props) => (props.$isOpen ? "min(250px, calc(100vw - 3rem))" : "0")};
  background-color: ${(props) => props.theme.backgroundAlt};
  border-right: 1px solid ${(props) => props.theme.borderColor};
  transition: width 0.3s ease;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  height: 100dvh;
  z-index: 101;
  box-shadow: ${(props) =>
    props.$isOpen ? "0 8px 32px rgba(0, 0, 0, 0.2)" : "none"};

  @media (min-width: 768px) {
    width: 250px;
    position: fixed;
    box-shadow: none;
  }
`;

const SidebarBackdrop = styled.button`
  display: none;

  @media (max-width: 767px) {
    display: ${(props) => (props.$isOpen ? "block" : "none")};
    position: fixed;
    inset: 0;
    z-index: 100;
    border: 0;
    background: rgba(0, 0, 0, 0.45);
  }
`;

const SidebarHeader = styled.div`
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
`;

const Logo = styled.h1`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${(props) => props.theme.primary};
  margin: 0;
`;

const SidebarNav = styled.nav`
  padding: 1rem 0;
`;

const NavItem = styled.div`
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  color: ${(props) => (props.$active ? props.theme.primary : props.theme.text)};
  background-color: ${(props) =>
    props.$active ? props.theme.hoverBackground : "transparent"};
  cursor: pointer;
  transition: all 0.2s ease;
  border-left: 3px solid
    ${(props) => (props.$active ? props.theme.primary : "transparent")};

  &:hover {
    background-color: ${(props) => props.theme.hoverBackground};
    color: ${(props) =>
      props.$active ? props.theme.primary : props.theme.textSecondary};
  }

  svg {
    margin-right: 0.75rem;
  }
`;

const MainContent = styled.main`
  flex: 1;
  min-width: 0;
  padding: 1.5rem;
  margin-left: 0;
  transition: margin-left 0.3s ease;
  width: 100%;

  @media (min-width: 768px) {
    margin-left: 250px;
    width: calc(100% - 250px);
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const TopBar = styled.header`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
`;

const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;

  @media (max-width: 480px) {
    font-size: 1.15rem;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  color: ${(props) => props.theme.text};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 0.375rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.hoverBackground};
  }
`;

const MobileMenuButton = styled(IconButton)`
  @media (min-width: 768px) {
    display: none;
  }
`;

const AdminLayout = () => {
  const dispatch = useDispatch();
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("ultrasneakers-theme");
    return savedTheme
      ? savedTheme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [newOrderCount, setNewOrderCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleTheme = () => {
    const newThemeValue = !darkMode;
    setDarkMode(newThemeValue);
    localStorage.setItem(
      "ultrasneakers-theme",
      newThemeValue ? "dark" : "light",
    );
  };

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light",
    );
    document.body.style.backgroundColor = darkMode ? "#121212" : "#ffffff";
    document.body.style.color = darkMode ? "#f5f5f5" : "#1a1a1a";
  }, [darkMode]);

  useEffect(() => {
    const fetchNewOrderCount = async () => {
      try {
        const response = await api.get("/api/admin/dashboard");
        setNewOrderCount(response.data.data.ordersByStatus.new || 0);
      } catch {
        setNewOrderCount(0);
      }
    };

    fetchNewOrderCount();
    const interval = window.setInterval(fetchNewOrderCount, 30000);
    return () => window.clearInterval(interval);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/admin/login");
  };

  const navigateTo = (path) => {
    navigate(path);
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes("dashboard")) return "Tableau de Bord";
    if (path.includes("products/add")) return "Ajouter un Produit";
    if (path.includes("products/edit")) return "Modifier un Produit";
    if (path.includes("products")) return "Gestion des Produits";
    if (path.includes("orders")) return "Gestion des Commandes";
    return "Tableau de Bord";
  };

  const isActive = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <AdminLayoutContainer>
        <Sidebar $isOpen={sidebarOpen}>
          <SidebarHeader>
            <Logo>UltraSneakers</Logo>
          </SidebarHeader>
          <SidebarNav>
            <NavItem
              $active={isActive("dashboard")}
              onClick={() => navigateTo("/admin/dashboard")}
            >
              <LayoutDashboard size={18} />
              Tableau de Bord
            </NavItem>
            <NavItem
              $active={isActive("products")}
              onClick={() => navigateTo("/admin/products")}
            >
              <ShoppingBag size={18} />
              Produits
            </NavItem>
            <NavItem
              $active={isActive("orders")}
              onClick={() => navigateTo("/admin/orders")}
            >
              <Package size={18} />
              Commandes
              {newOrderCount > 0 && (
                <span
                  style={{
                    marginLeft: "auto",
                    backgroundColor: "#ef4444",
                    color: "white",
                    borderRadius: "9999px",
                    minWidth: "1.25rem",
                    height: "1.25rem",
                    padding: "0 0.25rem",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                  }}
                >
                  {newOrderCount}
                </span>
              )}
            </NavItem>
          </SidebarNav>
        </Sidebar>

        <SidebarBackdrop
          type="button"
          $isOpen={sidebarOpen}
          aria-label="Fermer le menu d’administration"
          onClick={() => setSidebarOpen(false)}
        />

        <MainContent $sidebarOpen={sidebarOpen}>
          <TopBar>
            <div style={{ display: "flex", alignItems: "center" }}>
              <MobileMenuButton onClick={toggleSidebar}>
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </MobileMenuButton>
              <PageTitle>{getPageTitle()}</PageTitle>
            </div>
            <ActionButtons>
              <IconButton
                onClick={toggleTheme}
                aria-label={
                  darkMode ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </IconButton>
              <IconButton onClick={handleLogout}>
                <LogOut size={20} />
              </IconButton>
            </ActionButtons>
          </TopBar>
          <Outlet />
        </MainContent>
      </AdminLayoutContainer>
    </ThemeProvider>
  );
};

export default AdminLayout;
