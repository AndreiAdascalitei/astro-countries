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
      <button onClick={() => setShowLandlocked(!showLandlocked)}>
        {showLandlocked ? "Show All" : "Show Landlocked"}
      </button>
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


