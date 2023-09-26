import './css/styles.css';

import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  nameCountryInput: document.querySelector('#search-box'),
  countrysList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.nameCountryInput.addEventListener(
  'input',
  debounce(countryNameInputHandler, DEBOUNCE_DELAY)
);

function countryNameInputHandler() {
  const searchQuery = refs.nameCountryInput.value.trim();

  if (!searchQuery) {
    clearAllInfo();
    return;
  }

  fetchCountries(searchQuery)
    .then(countryResponceHandler)
    .catch(err => {
      clearAllInfo();
      Notify.failure('Oops, there is no country with that name');
    });
}

function countryResponceHandler(countries) {
  if (countries.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (countries.length === 1) {
    clearAllInfo();
    refs.countryInfo.innerHTML = createOneCountryMarkup(countries[0]);
  } else {
    clearAllInfo();
    refs.countrysList.innerHTML = countries
      .map(createCountryListMarkup)
      .join('');
  }
}

function createCountryListMarkup({ flags, name }) {
  return `<li class="country-list-item">
      <img src="${flags.svg}" alt="country flag" width="40" height="40" />
      <p class="country-name">${name.official}</p>
      </li>`;
}

function createOneCountryMarkup({
  flags,
  name,
  capital,
  population,
  languages,
}) {
  return `<h2 class="country-name">
        <img
          src="${flags.svg}"
          width="60"
          height="60"
          alt="country flag"
        />
        ${name.official}
      </h2>
      <ul class="country__list--info">
        <li class="country__info--item"><b>Capital: </b>${capital}</li>
        <li class="country__info--item"><b>Population: </b>${population}</li>
        <li class="country__info--item">
          <b>Languages: </b>${Object.values(languages).join(', ')}
        </li>
      </ul>`;
}

function clearAllInfo() {
  refs.countryInfo.innerHTML = '';
  refs.countrysList.innerHTML = '';
}
