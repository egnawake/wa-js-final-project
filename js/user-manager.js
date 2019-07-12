function toTitleCase(word) {
  return word[0].toUpperCase() + word.substring(1);
}

document.addEventListener('DOMContentLoaded', init);

function init() {
  const dom = {
    userList: document.getElementById('user-list'),
    sortButton: document.getElementById('sort-age'),
    addButton: document.getElementById('add-user'),
    addUserForm: document.getElementById('add-user-form')
  };

  const defaultAvatar = './assets/avatar.svg';

  const fields = [
    { name: 'firstName', type: 'text', label: 'First name' },
    { name: 'lastName', type: 'text', label: 'Last name' },
    { name: 'gender', type: 'text', label: 'Gender' },
    { name: 'email', type: 'email', label: 'Email' },
    { name: 'age', type: 'number', label: 'Age' },
    { name: 'nationality', type: 'text', label: 'Nationality' },
    { name: 'phone', type: 'phone', label: 'Phone' },
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
      showUserForm();
    });

    displayUsers();
  }

  function displayUsers() {
    if (dom.userList.firstChild) {
      dom.userList.innerHTML = '';
    }

    const list = document.createElement('ul');

    users.forEach((user, index) => {
      const userEl = document.createElement('li');

      userEl.innerHTML = `
        <ul class="card">
          <li><img src="${user.picture.large}"></li>
          <li>${user.name.first} ${user.name.last}</li>
          <li>${user.gender}</li>
          <li><a href="mailto:${user.email}">${user.email}</a></li>
          <li>${user.dob.age} years old</li>
          <li>Nationality: ${user.nat}</li>
          <li>Phone: ${user.phone}</li>
          <li>Address: ${user.location.street}, ${user.location.city}, ${user.location.state}</li>
        </ul>
      `;

      const removeButton = document.createElement('button');
      removeButton.setAttribute('type', 'button');
      removeButton.addEventListener('click', function () {
        users.splice(index, 1);
        displayUsers();
      });
      removeButton.textContent = 'Remove';

      userEl.appendChild(removeButton);
      list.appendChild(userEl);
    });

    dom.userList.appendChild(list);
  }

  function getFormValues() {
    inputEls = document.querySelectorAll('#add-user-form input');

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

  function buildUserForm() {
    fields.forEach(field => {
      const inputGroup = document.createElement('div');

      const inputEl = document.createElement('input');
      inputEl.setAttribute('type', field.type);
      inputEl.setAttribute('name', field.name);

      const label = document.createElement('label');
      label.textContent = field.label;

      inputGroup.appendChild(label);
      inputGroup.appendChild(inputEl);
      dom.addUserForm.appendChild(inputGroup);
    });

    const confirmButton = document.createElement('button');
    confirmButton.setAttribute('type', 'button');
    confirmButton.textContent = 'Accept';
    confirmButton.addEventListener('click', function () {
      const values = getFormValues();
      users.push(createUser(values));
      displayUsers();
      dom.addUserForm.classList.add('hidden');
    });

    dom.addUserForm.appendChild(confirmButton);
  }

  function showUserForm() {
    if (!dom.addUserForm.firstChild) {
      buildUserForm();
    } else {
      dom.addUserForm.classList.remove('hidden');
    }
  }
}