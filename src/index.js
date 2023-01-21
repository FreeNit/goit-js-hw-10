import './css/styles.css';
import { fetchCountries } from './JS/components/fetchCountries';
import countriesTemplate from './templates/countries-cards.hbs';
import countryTemplate from './templates/country.hbs';

var debounce = require('lodash.debounce');
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryEl = document.querySelector('.country-info');

inputEl.addEventListener(
  'input',
  debounce(event => {
    // get country from input
    let countryName = event.target.value.trim();

    // check if country name has characters
    if (countryName.length === 0) {
      countryEl.innerHTML = '';
      countryListEl.innerHTML = '';
      return;
    }

    // call function get countries data
    fetchCountries(countryName).then(countries => {
      // clear content
      countryEl.innerHTML = '';
      countryListEl.innerHTML = '';

      if (countries.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }

      // * from 2 - 10
      if (countries.length <= 10 && countries.length >= 2) {
        // console.log(countries);
        // console.log(createCountriesMarkup(countries));
        // const countriesMarkup = createCountriesMarkup(countries);
        // countriesEl.innerHTML = countriesMarkup;

        countryEl.innerHTML = '';
        const countriesMarkup = countries
          .map(country => {
            // console.log(country);
            return countriesTemplate(country);
          })
          .join('');

        // console.log(countriesMarkup);

        countryListEl.innerHTML = countriesMarkup;
      }

      if (countries.length === 1) {
        console.log(countries[0]);

        countryListEl.innerHTML = '';
        const country = countries[0];
        console.log(countryTemplate(country));
        const countryMarkup = countryTemplate(country);

        countryEl.innerHTML = countryMarkup;
      }
    });

    //
  }, DEBOUNCE_DELAY)
);

// ! create markup for countries with function
// function createCountriesMarkup(countries) {
//   return countries
//     .map(({ flags, name }) => {
//       return `
//             <li class='countries__item'>
//               <img
//                 src='${flags.svg}'
//                 alt='${name.official}'
//                 class='countries__flag'
//               />
//               <p class='countries__name'>${name.official}</p>
//             </li>
//           `;
//     })
//     .join('');
// }
