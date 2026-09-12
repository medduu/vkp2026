// array for todo list
const todoList = [
  {
    id: 1,
    task: 'Learn HTML',
    completed: true,
  },
  {
    id: 2,
    task: 'Learn CSS',
    completed: true,
  },
  {
    id: 3,
    task: 'Learn JS',
    completed: false,
  },
  {
    id: 4,
    task: 'Learn TypeScript',
    completed: false,
  },
  {
    id: 5,
    task: 'Learn React',
    completed: false,
  },
];

// add your code here

const ul = document.querySelector('ul');

function renderTodo(todo) {
  const checkedAttr = todo.completed ? 'checked' : '';

  const html = `
    <li data-id="${todo.id}">
      <input type="checkbox" id="todo-${todo.id}" ${checkedAttr}>
      <label for="todo-${todo.id}">${todo.task}</label>
      <button class="delete-btn">Delete</button>
    </li>
  `;

  ul.insertAdjacentHTML('beforeend', html);
}

todoList.forEach(renderTodo);

ul.addEventListener('change', (event) => {
  if (event.target.type === 'checkbox') {
    const li = event.target.closest('li');
    const id = Number(li.dataset.id);

    const todo = todoList.find(item => item.id === id);
    todo.completed = event.target.checked;

    console.log('Updated todoList:', todoList);
  }
});

ul.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-btn')) {
    const li = event.target.closest('li');
    const id = Number(li.dataset.id);

    const index = todoList.findIndex(item => item.id === id);
    todoList.splice(index, 1);

    ul.removeChild(li);

    console.log('Updated todoList:', todoList);
  }
});

const addItemBtn = document.querySelector('#add-item-btn');
const dialog = document.querySelector('#add-dialog');
const addForm = document.querySelector('#add-form');
const cancelBtn = document.querySelector('#cancel-btn');
const newTaskInput = document.querySelector('#new-task');

addItemBtn.addEventListener('click', () => {
  dialog.showModal();
});

cancelBtn.addEventListener('click', () => {
  dialog.close();
  addForm.reset();
});

addForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const taskName = newTaskInput.value.trim();
  if (taskName === '') return;

  const newId = todoList.length > 0
    ? Math.max(...todoList.map(item => item.id)) + 1
    : 1;

  const newTodo = {
    id: newId,
    task: taskName,
    completed: false,
  };

  todoList.push(newTodo);
  renderTodo(newTodo);

  console.log('Updated todoList:', todoList);

  dialog.close();
  addForm.reset();
});