export const restaurantRow = (restaurant) => {
  const {_id, name, address} = restaurant;

  const tr = document.createElement('tr');
  tr.dataset.id = _id;
  tr.innerHTML = `
    <td class="restaurant-name">${name}</td>
    <td>${address}</td>
  `;

  return tr;
};

export const restaurantModal = (restaurant, menu) => {
  const {name, address, postalCode, city, phone, company} = restaurant;
  const {courses} = menu ?? {};

  let menuHtml = '<ul class="menu-list">';
  courses?.forEach(({name: courseName, price, diets}) => {
    const priceLabel = price ? price : '?€';
    menuHtml += `<li>${courseName}, ${priceLabel}. ${diets ?? ''}</li>`;
  });
  menuHtml += '</ul>';

  return `
    <h1>${name}</h1>
    <p>${address}</p>
    <p>${postalCode}, ${city}</p>
    <p>${phone}</p>
    <p>${company}</p>
    ${courses?.length ? menuHtml : '<p>No menu available today.</p>'}
    <button id="close-modal-btn" type="button">Close</button>
  `;
};