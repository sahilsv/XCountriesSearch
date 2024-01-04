import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);

  async function fetchData() {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const countries = await response.json();
      setData(countries);
      // console.log(response.data);
    } catch (err) {
      console.log("Error fetching API: " + err);
    }
  }

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   const { name, value } = e.target;

  //   const filteredData = data.filter((country) =>
  //     country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  //   );

  //   setData(filteredData);
  // };

  const filteredCountries = data
    ? data.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  useEffect(() => {
    fetchData();
  }, [searchTerm]);

  return (
    <div className="container">
      <div className="search-bar">
        
          <input
            type="text"
            value={searchTerm}
            placeholder="Search for countries..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />

      </div>
      <div className="country-container">
        {filteredCountries.map((country) => {
          return (
            <div key={country.cca3} className="card">
              <img
                src={country.flags.png}
                alt="country-flag"
                width={100}
                height={100}
              />
              <span><p>{country.name.common}</p></span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
