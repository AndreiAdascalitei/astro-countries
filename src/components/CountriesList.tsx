import { useState } from "react";
import styles from "./CountriesList.module.scss";

interface Country {
  name: { common: string };
  flags: { svg: string };
  capital: string[];
  languages: Record<string, string>;
  landlocked: boolean;
}

interface Props {
  countries: Country[];
}

export default function CountriesList({ countries }: Props) {
  const [showLandlocked, setShowLandlocked] = useState(false);

  const filteredCountries = showLandlocked
    ? countries.filter((c) => c.landlocked)
    : countries;

  return (
    <div>
       {/* 
        Toggle Switch - took it from here: https://www.w3schools.com/howto/howto_css_switch.asp 
        Best practice is to create a reusable UI component for this one, for later use. For simplicity, I'll keep it like this..
      // */}
      <div className={styles.toggleWrapper}>
        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={showLandlocked}
            onChange={() => setShowLandlocked(!showLandlocked)}
          />
          <span className={styles.slider}></span>
        </label>
        <span className={styles.label}>
          Show Landlocked
        </span>
      </div>

      <div className={styles.grid}>
        {filteredCountries.map((country) => (
            <div key={country.name.common} className={styles.card}>
                <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} className={styles.flag} />
                <h2>{country.name.common}</h2>
                <p>Capital: {country.capital ? country.capital[0] : "N/A"}</p>
                <p>Languages: {country.languages ? Object.values(country.languages).join(", ") : "N/A"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


