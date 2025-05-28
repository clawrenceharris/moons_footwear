import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { assets } from "../../assets";
import { useMediaQuery } from "@react-hook/media-query";
import SearchBar from "../SearchBar";
import { CartButton, MenuButton } from "../buttons";
import NavBar from "../NavBar";
import SideBar from "../SideBar";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();

  const cartButtonRef = useRef<HTMLButtonElement>(null);
  const isDesktop = useMediaQuery("screen and (min-width: 720px)");

  const onOpenNav = () => {
    setIsNavOpen(true);
  };
  const onCloseNav = () => {
    setIsNavOpen(false);
  };
  useEffect(() => {
    setIsNavOpen(false);
  }, [navigate]);
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("header");
      const headerHeight = header
        ? header.getBoundingClientRect().height + 100
        : 80;
      setShowMenu(window.scrollY > headerHeight);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header>
      {!showMenu && (
        <div className="header-container">
          <div className="header-top">
            <Link to={"/"}>
              {" "}
              <img className="logo" src={assets.logo} alt="logo" />
            </Link>
            <div className="content-row">
              <Link className="link signup-button" to="/auth/signup">
                Sign Up
              </Link>
              <Link className="link signin-button" to="/auth/signin">
                Log In
              </Link>
            </div>
          </div>

          <div className="header-bottom">
            <MenuButton
              id={!showMenu ? "menu-btn" : undefined}
              aria-controls="nav"
              aria-expanded={!isDesktop ? isNavOpen : undefined}
              onClick={onOpenNav}
            />

            <SearchBar
              tabIndex={showMenu ? -1 : undefined}
              aria-hidden={showMenu}
            />
            <Link
              aria-label="View favorites"
              tabIndex={showMenu ? -1 : undefined}
              aria-hidden={showMenu}
              to={"/favorites"}
            >
              <img className="heart" src={assets.heart} alt="heart" />
            </Link>
            <CartButton disabled={showMenu} />
          </div>
        </div>
      )}

      <SideBar onClose={onCloseNav} isOpen={isNavOpen}>
        <NavBar />
      </SideBar>

      <div
        role="region"
        aria-label="Sticky navigation bar"
        aria-hidden={!showMenu}
        className={`sticky-header
        ${showMenu ? "open" : "closed"}
          `}
      >
        <MenuButton
          id={showMenu ? "menu-btn" : undefined}
          aria-controls="nav"
          tabIndex={0}
          autoFocus
          aria-expanded={isNavOpen}
          onClick={onOpenNav}
        />
        <div className="content-row">
          <Link
            aria-label="View favorites"
            tabIndex={!showMenu ? -1 : undefined}
            aria-hidden={!showMenu}
            to={"/favorites"}
          >
            <img className="icon" src={assets.heart} alt="heart" />
          </Link>
          <CartButton
            ref={cartButtonRef}
            badgeStyle={{ borderColor: "white" }}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
