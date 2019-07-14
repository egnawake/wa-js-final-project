document.addEventListener('DOMContentLoaded', init);

function init() {
  const dom = {
    userList: document.getElementById('userList'),
    sortButton: document.getElementById('sortAgeButton'),
    addButton: document.getElementById('addUserButton'),
    addUserForm: document.getElementById('addUserForm')
  };

  const defaultAvatar = './assets/avatar.svg';

  const fields = [
    { name: 'firstName', type: 'text', label: 'First name' },
    { name: 'lastName', type: 'text', label: 'Last name' },
    { name: 'gender', type: 'text', label: 'Gender' },
    { name: 'email', type: 'email', label: 'Email' },
    { name: 'age', type: 'number', label: 'Age' },
    { name: 'nationality', type: 'text', label: 'Nationality' },
    { name: 'phone', type: 'tel', label: 'Phone' },
    { name: 'street', type: 'text', label: 'Street' },
    { name: 'city', type: 'text', label: 'City' },
    { name: 'state', type: 'text', label: 'State' }
  ];

  const apiUrl = 'https://randomuser.me/api/?results=20';
  let users = [];

  function getRandomUsers() {
    return fetch(apiUrl).then(response => response.json());
  }

  getRandomUsers().then(startApp);

  function startApp(data) {
    users = data.results;

    dom.sortButton.addEventListener('click', function () {
      users.sort(function (a, b) {
        return a.dob.age - b.dob.age;
      });
      displayUsers();
    });

    dom.addButton.addEventListener('click', function () {
      showAddUserForm();
    });

    displayUsers();
  }

  function displayUsers() {
    if (dom.userList.firstChild) {
      dom.userList.innerHTML = '';
    }

    const list = document.createElement('ul');
    list.classList.add('user-list');

    users.forEach((user, index) => {
      const userEl = document.createElement('li');
      userEl.classList.add('card');

      userEl.innerHTML = `
        <ul class="info">
          <li class="picture"><div><img src="${user.picture.large}"></div></li>
          <li class="name">${user.name.first} ${user.name.last}</li>
          <li class="gender">${user.gender}</li>
          <li><a href="mailto:${user.email}">${user.email}</a></li>
          <li>${user.dob.age} years old</li>
          <li>Nationality: ${user.nat}</li>
          <li>Phone: ${user.phone}</li>
          <li class="address">Address: ${user.location.street}, ${user.location.city}, ${user.location.state}</li>
        </ul>
      `;

      const editButton = document.createElement('button');
      editButton.setAttribute('type', 'button');
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', function (event) {
        handleEditUser(event, index);
      });

      const removeButton = document.createElement('button');
      removeButton.setAttribute('type', 'button');
      removeButton.addEventListener('click', function () {
        users.splice(index, 1);
        displayUsers();
      });
      removeButton.textContent = 'Remove';

      userEl.appendChild(editButton);
      userEl.appendChild(removeButton);
      list.appendChild(userEl);
    });

    dom.userList.appendChild(list);
  }

  function getFormValues(form) {
    const inputEls = form.querySelectorAll('input');

    values = {};
    inputEls.forEach(input => {
      values[input.getAttribute('name')] = input.value;
    });

    return values;
  }

  function createUser(data) {
    const newUser = {};

    newUser.picture = {};
    newUser.picture.large = defaultAvatar;
    newUser.name = {};
    newUser.name.first = data.firstName;
    newUser.name.last = data.lastName;
    newUser.gender = data.gender;
    newUser.email = data.email;
    newUser.dob = {};
    newUser.dob.age = data.age;
    newUser.nat = data.nationality;
    newUser.phone = data.phone;
    newUser.location = {};
    newUser.location.street = data.street;
    newUser.location.city = data.city;
    newUser.location.state = data.state;

    return newUser;
  }

  function buildUserForm(mode, user) {
    const form = document.createElement('div');
    form.classList.add('user-form');

    fields.forEach(field => {
      const inputGroup = document.createElement('div');

      const inputEl = document.createElement('input');
      inputEl.setAttribute('type', field.type);
      inputEl.setAttribute('name', field.name);

      const label = document.createElement('label');
      label.textContent = field.label;

      inputGroup.appendChild(label);
      inputGroup.appendChild(inputEl);
      form.appendChild(inputGroup);
    });

    const confirmButton = document.createElement('button');
    confirmButton.setAttribute('type', 'button');
    confirmButton.textContent = 'Accept';
    if (mode === 'new') {
      confirmButton.addEventListener('click', function () {
        const values = getFormValues(form);
        users.push(createUser(values));
        displayUsers();
        form.classList.add('hidden');
      });
    } else if (mode === 'edit') {
      confirmButton.addEventListener('click', function () {
        const values = getFormValues(form);
        const editedUser = createUser(values);
        editedUser.picture.large = users[user].picture.large;
        users[user] = editedUser;
        displayUsers();
        form.classList.add('hidden');
      });
    }
    form.appendChild(confirmButton);

    const cancelButton = document.createElement('button');
    cancelButton.setAttribute('type', 'button');
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', function () {
      form.classList.add('hidden');
    });
    form.appendChild(cancelButton);

    return form;
  }

  function showAddUserForm() {
    if (!dom.addUserForm.firstChild) {
      const form = buildUserForm();
      dom.addUserForm.appendChild(form);
    }
    dom.addUserForm.firstChild.classList.remove('hidden');
  }

  function handleEditUser(event, userIndex) {
    const userEl = event.target.parentElement;
    event.target.classList.add('hidden');

    const form = buildUserForm('edit', userIndex);

    userEl.appendChild(form);
  }
}