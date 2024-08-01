import React, { useContext, useEffect } from "react";
import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import { CityContext } from "../context/CityContext";
import Spinner from "./Spinner";

export default function CityList() {
  const { cities, setCities, isLoading } =
    useContext(CityContext);
  if (isLoading) return <Spinner />;
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => {
        return (
          <CityItem
            emoji={city.emoji}
            date={city.date}
            name={city.cityName}
            position={city.position}
            key={city.id}
            id={city.id}
          />
        );
      })}
    </ul>
  );
}
