// SearchBar.js

import React, { useState, useEffect } from "react";
import styles from "./SearchBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  HiOutlineShoppingCart,
  HiOutlineLogin,
  HiOutlineLogout,
  HiOutlineHeart,
  HiOutlineUser,
  HiMenu,
} from "react-icons/hi";
import { getUserByName } from "../../Redux/actions/productsActions";

export default function SearchBar({ busqueda, setBusqueda, filterSearch }) {
  const googleName = localStorage.getItem("googleName");
  const googleImage = localStorage.getItem("googleImage");
  const name = localStorage.getItem("username");
  const user = useSelector((state) => state.infoUser);
  const root = localStorage.getItem("root");
  const dispatch = useDispatch();

  const [storedUsername, setStoredUsername] = useState(
    localStorage.getItem("username")
  );

  const userInfo = user.length > 0 ? user[0] : "";

  useEffect(() => {
    setStoredUsername(localStorage.getItem("username"));
    dispatch(getUserByName(name));
  }, [dispatch, name]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const logOutGoogle = () => {
    localStorage.removeItem("googleName");
    localStorage.removeItem("username");
    localStorage.removeItem("googleImage");
    localStorage.removeItem("root");
    window.location.reload();
  };

  const handleChange = (event) => {
    setBusqueda(event.target.value);
    filterSearch(event.target.value);
  };

  const isLoggedIn = storedUsername || googleName;
  const imageProfile = isLoggedIn
    ? googleName
      ? googleImage
      : userInfo.imageProfile
      ? userInfo.imageProfile
      : root
      ? "https://acortar.link/wrpVGk"
      : "https://acortar.link/9rBdMA"
    : null;

  return (
    <div className={styles.searchBarContainer}>
      <input
        type="search"
        value={busqueda}
        onChange={handleChange}
        className={styles.searchInput}
        placeholder="BUSCAR"
      />
      <img src={imageProfile} className={styles.userIcon} alt="profile" />
      <div className={styles.menuSeparator}></div> {/* Separación */}
      {isLoggedIn ? (
        <div className={styles.hamburgerMenu} onClick={toggleMenu}>
          <HiMenu />
        </div>
      ) : (
        <Link to={"/login"} className={styles.loginIcon}>
          <HiOutlineLogin />
        </Link>
      )}
      {isMenuOpen && (
        <div className={styles.menu}>
          {isLoggedIn ? (
            <div className={styles.profileContainer}>
              <p className={styles.username}>{name || googleName}</p>
            </div>
          ) : (
            <Link to={"/login"}>
              <HiOutlineLogin className={styles.loginIcon} />
            </Link>
          )}
          <Link to={"/cart"} className={styles.menuItem}>
            <HiOutlineShoppingCart /> Carrito
          </Link>
          {user || googleName ? (
            <Link to={"/favorites"} className={styles.menuItem}>
              <HiOutlineHeart /> Favoritos
            </Link>
          ) : null}
          <Link to={"/userProfile"} className={styles.menuItem}>
            <HiOutlineUser /> Perfil
          </Link>
          {isLoggedIn && (
            <Link to={"/"} className={styles.menuItem} onClick={logOutGoogle}>
              <HiOutlineLogout /> Salir
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
