import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./CityItem.module.css";

export default function CityItem({ emoji, name, date, setCities, id, position }) {
  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));

  const handleDelete = (id) => {
    return (e) => {
      e.stopPropagation();
      return setCities((cities) => {
        return cities.filter((c) => c.id !== id);
      });
    };
  };
  return (
    <li>
      <Link
        className={styles.cityItem}
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
