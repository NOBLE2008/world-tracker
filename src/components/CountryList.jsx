import React, { useContext } from "react";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import { CityContext } from "../context/CityContext";

export default function CountryList() {
  const { cities } = useContext(CityContext);
  const count = [];
  return (
    <div className={styles.countryList}>
      {cities.map((item, i) => {
        if (count.includes(item.country)) return;
        count.push(item.country);
        return <CountryItem country={item} key={i} />;
      })}
    </div>
  );
}
