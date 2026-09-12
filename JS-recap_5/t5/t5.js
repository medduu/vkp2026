const apiUrl = 'https://media1.edu.metropolia.fi/restaurant/api/v1';

const table = document.querySelector('table');
const dialog = document.querySelector('dialog');

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
  }
  return await response.json();
};

const renderRestaurant = (restaurant) => {
  const tr = document.createElement('tr');
  tr.dataset.id = restaurant._id;
  tr.innerHTML = `
    <td class="restaurant-name">${restaurant.name}</td>
    <td>${restaurant.address}</td>
  `;
  table.appendChild(tr);
};

const renderMenu = (menu) => {
  const loading = dialog.querySelector('.menu-loading');
  if (!loading) return;

  // NOTE: verify this against what console.log(menu) actually prints —
  // adjust the property names below (e.g. course.name / course.title) to match.
  console.log('Daily menu response:', menu);

  if (!menu || !menu.courses || Object.keys(menu.courses).length === 0) {
    loading.textContent = 'No menu available for today.';
    return;
  }

  const items = Object.values(menu.courses)
    .map((course) => {
      const title = course.name ?? course.title?.en ?? course.title ?? 'Course';
      const price = course.price ? ` — ${course.price}` : '';
      return `<li>${title}${price}</li>`;
    })
    .join('');

  loading.outerHTML = `<ul class="menu-list">${items}</ul>`;
};

const handleRestaurantClick = async (event, restaurants) => {
  const nameCell = event.target.closest('.restaurant-name');
  if (!nameCell) return;

  document
    .querySelectorAll('.restaurant-name')
    .forEach((cell) => cell.classList.remove('highlight'));
  nameCell.classList.add('highlight');

  const id = nameCell.closest('tr').dataset.id;
  const restaurant = restaurants.find((item) => item._id === id);

  dialog.innerHTML = `
    <h2>${restaurant.name}</h2>
    <dl class="modal-details">
      <dt>Address</dt><dd>${restaurant.address}</dd>
      <dt>Postal code</dt><dd>${restaurant.postalCode}</dd>
      <dt>City</dt><dd>${restaurant.city}</dd>
      <dt>Phone</dt><dd>${restaurant.phone}</dd>
      <dt>Company</dt><dd>${restaurant.company}</dd>
    </dl>
    <h3>Today's menu</h3>
    <p class="menu-loading">Loading menu…</p>
    <button id="close-modal-btn" type="button">Close</button>
  `;
  dialog.showModal();
  dialog
    .querySelector('#close-modal-btn')
    .addEventListener('click', () => dialog.close());

  try {
    const menu = await fetchData(`${apiUrl}/restaurants/daily/${id}/en`);
    renderMenu(menu);
  } catch (error) {
    console.error(error);
    const loading = dialog.querySelector('.menu-loading');
    if (loading) loading.textContent = `Menu not available: ${error.message}`;
  }
};

const loadRestaurants = async () => {
  try {
    const restaurants = await fetchData(`${apiUrl}/restaurants`);
    const sorted = [...restaurants].sort((a, b) => a.name.localeCompare(b.name));
    sorted.forEach(renderRestaurant);

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