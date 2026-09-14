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

const AdminLayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
`;

const Sidebar = styled.aside`
  width: ${(props) => (props.$isOpen ? "250px" : "0")};
  background-color: ${(props) => props.theme.backgroundAlt};
  border-right: 1px solid ${(props) => props.theme.borderColor};
  transition: width 0.3s ease;
  overflow: hidden;
  position: fixed;
  height: 100vh;
  z-index: 100;

  @media (min-width: 768px) {
    width: 250px;
    position: relative;
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
  padding: 1.5rem;
  margin-left: ${(props) => (props.$sidebarOpen ? "0" : "0")};
  transition: margin-left 0.3s ease;
  width: 100%;

  @media (min-width: 768px) {
    margin-left: ${(props) => (props.$sidebarOpen ? "250px" : "0")};
    width: calc(100% - ${(props) => (props.$sidebarOpen ? "250px" : "0")});
  }
`;

const TopBar = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
`;

const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
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
      newThemeValue ? "dark" : "light"
    );
  };

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
    document.body.style.backgroundColor = darkMode ? "#121212" : "#ffffff";
    document.body.style.color = darkMode ? "#f5f5f5" : "#1a1a1a";
  }, [darkMode]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/admin/login");
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
              onClick={() => navigate("/admin/dashboard")}
            >
              <LayoutDashboard size={18} />
              Tableau de Bord
            </NavItem>
            <NavItem
              $active={isActive("products")}
              onClick={() => navigate("/admin/products")}
            >
              <ShoppingBag size={18} />
              Produits
            </NavItem>
            <NavItem
              $active={isActive("orders")}
              onClick={() => navigate("/admin/orders")}
            >
              <Package size={18} />
              Commandes
            </NavItem>
          </SidebarNav>
        </Sidebar>

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
