import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./CityItem.module.css";
import { CityContext } from "../context/CityContext";

export default function CityItem({
  emoji,
  name,
  date,
  id,
  position,
}) {
  const { currentCity, deleteCity } = useContext(CityContext);
  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));

  const handleDelete = (id) => {
    return (e) => {
      e.preventDefault();
      deleteCity(id)
    };
  };
  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          currentCity.id === id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{name}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleDelete(id)}>
          &times;
        </button>
      </Link>
    </li>
  );
}
