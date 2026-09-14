import {baseUrl} from './variables.js';
import {fetchData} from './utils.js';
import {restaurantRow, restaurantModal} from './components.js';

const table = document.querySelector('table');
const dialog = document.querySelector('dialog');

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

const handleRestaurantClick = (event, restaurants) => {
  const nameCell = event.target.closest('.restaurant-name');
  if (!nameCell) return;

  document
    .querySelectorAll('.restaurant-name')
    .forEach((cell) => cell.classList.remove('highlight'));
  nameCell.classList.add('highlight');

  const {id} = nameCell.closest('tr').dataset;
  const restaurant = restaurants.find(({_id}) => _id === id);

  openRestaurantModal(restaurant);
};

const loadRestaurants = async () => {
  try {
    const restaurants = await fetchData(`${baseUrl}/restaurants`);
    const sorted = [...restaurants].sort((a, b) => a.name.localeCompare(b.name));

    sorted.forEach((restaurant) => table.appendChild(restaurantRow(restaurant)));

    table.addEventListener('click', (event) =>
      handleRestaurantClick(event, restaurants)
    );
  } catch (error) {
    console.error(error);
    table.insertAdjacentHTML(
      'afterend',
      `<p class="error">Failed to load restaurants: ${error.message}</p>`
    );
  }
};

loadRestaurants();