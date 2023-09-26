const BASIC_URL = 'https://restcountries.com/v3.1/';

export function fetchCountries(name) {
  return fetch(
    `${BASIC_URL}name/${name}?fields=name,capital,population,flags,languages`
  ).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  });
}
