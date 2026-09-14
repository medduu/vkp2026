import {baseUrl} from './variables.js';
import {fetchData} from './utils.js';
import {restaurantRow, restaurantModal} from './components.js';

const table = document.querySelector('table');
const dialog = document.querySelector('dialog');
const filterButtons = document.querySelectorAll('.filter-btn');
const errorMessage = document.querySelector('#error-message');

let restaurants = [];

const showError = (message) => {
  errorMessage.textContent = message;
  errorMessage.hidden = false;
};

const clearError = () => {
  errorMessage.textContent = '';
  errorMessage.hidden = true;
};

// render a given list of restaurants into the table using map + forEach
const renderRestaurants = (list) => {
  [...table.querySelectorAll('tr:not(:first-child)')].forEach((row) => row.remove());

  const sorted = [...list].sort((a, b) => a.name.localeCompare(b.name));
  const rows = sorted.map((restaurant) => restaurantRow(restaurant));
  rows.forEach((row) => table.appendChild(row));
};

const openRestaurantModal = async (restaurant) => {
  dialog.innerHTML = '<p>Loading menu…</p>';
  dialog.showModal();

  try {
    const menu = await fetchData(`${baseUrl}/restaurants/daily/${restaurant._id}/en`);
    dialog.innerHTML = restaurantModal(restaurant, menu);
  } catch (error) {
    console.error(error);
    dialog.innerHTML = `
      <h1>${restaurant.name}</h1>
      <p>Menu not available: ${error.message}</p>
      <button id="close-modal-btn" type="button">Close</button>
    `;
  }

  dialog
    .querySelector('#close-modal-btn')
    ?.addEventListener('click', () => dialog.close());
};

const handleRestaurantClick = (event) => {
  const nameCell = event.target.closest('.restaurant-name');
  if (!nameCell) return;

  table
    .querySelectorAll('.restaurant-name')
    .forEach((cell) => cell.classList.remove('highlight'));
  nameCell.classList.add('highlight');

  const {id} = nameCell.closest('tr').dataset;
  const restaurant = restaurants.find(({_id}) => _id === id);

  if (!restaurant) {
    showError('Could not find that restaurant\'s details.');
    return;
  }

  openRestaurantModal(restaurant);
};

// the core requirement: filter by company using .filter() + arrow functions
const handleFilterClick = (event) => {
  const {company} = event.target.dataset;

  filterButtons.forEach((btn) => btn.classList.remove('active'));
  event.target.classList.add('active');

  const filtered =
    company === 'all'
      ? restaurants
      : restaurants.filter((restaurant) => restaurant.company === company);

  if (filtered.length === 0) {
    showError(`No restaurants found for ${company}.`);
  } else {
    clearError();
  }

  renderRestaurants(filtered);
};

const loadRestaurants = async () => {
  try {
    restaurants = await fetchData(`${baseUrl}/restaurants`);
    renderRestaurants(restaurants);
    clearError();
  } catch (error) {
    console.error(error);
    showError(`Failed to load restaurants: ${error.message}`);
  }
};

table.addEventListener('click', handleRestaurantClick);
filterButtons.forEach((button) =>
  button.addEventListener('click', handleFilterClick)
);

loadRestaurants();