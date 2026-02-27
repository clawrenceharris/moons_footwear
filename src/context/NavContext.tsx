/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from "react";

interface NavContextType {
  isNavOpen: boolean;
  openNav: () => void;
  closeNav: () => void;
  activeLink: string;
  setActiveLink: (link: string) => void;
}

const NavContext = createContext<NavContextType | undefined>(undefined);

const useNav = () => {
  const context = useContext(NavContext);
  if (!context) {
    throw new Error("useNav must be used within a Navigation Provider");
  }
  return context;
};

const NavProvider = ({ children }: { children: ReactNode }) => {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const [activeLink, setActiveLink] = useState<string>("home");

  const closeNav = () => {
    const nav = document.getElementById("nav");
    if (!nav) return;
    nav.classList.remove("open");
    nav.classList.add("closed");
    setIsNavOpen(false);
  };
  const openNav = () => {
    const nav = document.getElementById("nav");
    nav?.classList.add("open");
    nav?.classList.remove("closed");

    setIsNavOpen(true);
  };

  return (
    <NavContext.Provider
      value={{
        isNavOpen,
        openNav,
        closeNav,
        activeLink,
        setActiveLink,
      }}
    >
      {children}
    </NavContext.Provider>
  );
};

export { useNav, NavProvider };
