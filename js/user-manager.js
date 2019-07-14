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

  function mapUserJson(userJson) {
    userObject = {};
    userObject.picture = userJson.picture.large;
    userObject.firstName = userJson.name.first;
    userObject.lastName = userJson.name.last;
    userObject.gender = userJson.gender;
    userObject.email = userJson.email;
    userObject.age = userJson.dob.age;
    userObject.nationality = userJson.nat;
    userObject.phone = userJson.phone;
    userObject.street = userJson.location.street;
    userObject.city = userJson.location.city;
    userObject.state = userJson.location.state;

    return userObject;
  }

  function startApp(data) {
    users = data.results.map(mapUserJson);
    console.log(users);

    dom.sortButton.addEventListener('click', function () {
      users.sort(function (a, b) {
        return a.age - b.age;
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
          <li class="picture"><div><img src="${user.picture}"></div></li>
          <li class="name">${user.firstName} ${user.lastName}</li>
          <li class="gender">${user.gender}</li>
          <li class="email"><a href="mailto:${user.email}">${user.email}</a></li>
          <li>${user.age} years old</li>
          <li>Nationality: ${user.nationality}</li>
          <li>Phone: ${user.phone}</li>
          <li class="address">Address: ${user.street}, ${user.city}, ${user.state}</li>
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
    const newUser = data;

    return newUser;
  }

  function buildUserForm(mode, user, opener) {
    const form = document.createElement('div');
    form.classList.add('user-form');

    fields.forEach(field => {
      const inputGroup = document.createElement('div');

      const inputEl = document.createElement('input');
      inputEl.setAttribute('type', field.type);
      inputEl.setAttribute('name', field.name);
      if (mode === 'edit') {
        inputEl.value = users[user][field.name];
      }

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
        editedUser.picture = users[user].picture;
        users[user] = editedUser;
        displayUsers();
        form.classList.add('hidden');
        opener.classList.remove('hidden');
      });
    }
    form.appendChild(confirmButton);

    const cancelButton = document.createElement('button');
    cancelButton.setAttribute('type', 'button');
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', function () {
      form.classList.add('hidden');
      if (mode === 'edit') {
        opener.classList.remove('hidden');
      }
    });
    form.appendChild(cancelButton);

    return form;
  }

  function showAddUserForm() {
    if (!dom.addUserForm.firstChild) {
      const form = buildUserForm('new');
      dom.addUserForm.appendChild(form);
    }
    dom.addUserForm.firstChild.classList.remove('hidden');
  }

  function handleEditUser(event, userIndex) {
    const button = event.target;
    const userEl = event.target.parentElement;

    button.classList.add('hidden');

    const form = buildUserForm('edit', userIndex, button);

    userEl.appendChild(form);
  }
}