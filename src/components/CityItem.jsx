import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./CityItem.module.css";

export default function CityItem({ emoji, name, date, setCities, id }) {
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
  const navigate = useNavigate();
  return (
    <li>
      <a
        className={styles.cityItem}
        onClick={(e) => {
          navigate(String(id));
        }}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{name}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleDelete(id)}>
          &times;
        </button>
      </a>
    </li>
  );
}
