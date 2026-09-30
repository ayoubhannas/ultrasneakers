"use client";

import { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles.jsx";
import { lightTheme, darkTheme } from "./styles/Theme.js";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Footer from "./components/Footer.jsx";
import FeaturedProducts from "./components/pages/FeaturedProducts.jsx";
import "./App.css";

function App() {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("ultrasneakers-theme");
    return storedTheme || "light";
  });

  useEffect(() => {
    const nextTheme = theme === "dark" ? "dark" : "light";
    localStorage.setItem("ultrasneakers-theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    window.dispatchEvent(
      new CustomEvent("theme:change", { detail: nextTheme }),
    );
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <AppContainer>
        <Navbar toggleTheme={toggleTheme} theme={theme} />
        <Hero />
        <FeaturedProducts />
        <Footer />
      </AppContainer>
    </ThemeProvider>
  );
}

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export default App;
