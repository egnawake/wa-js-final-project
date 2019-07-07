function toTitleCase(word) {
  return word[0].toUpperCase() + word.substring(1);
}

document.addEventListener('DOMContentLoaded', init);

function init() {
  const dom = {
    userList: document.getElementById('user-list')
  };
  const apiUrl = 'https://randomuser.me/api/?results=20';
  let users = [];

  function getRandomUsers() {
    return fetch(apiUrl).then(response => response.json());
  }

  getRandomUsers().then(startApp);

  function startApp(data) {
    users = data.results;
    displayUsers();
  }

  function displayUsers() {
    const list = document.createElement('ul');
    let items = '';

    users.forEach(user => {
      items += `
        <li>
          <ul class="card">
            <li><img src="${user.picture.large}"></li>
            <li>${toTitleCase(user.name.first)} ${toTitleCase(user.name.last)}</li>
            <li>${toTitleCase(user.gender)}</li>
            <li><a href="mailto:${user.email}">${user.email}</a></li>
            <li>${user.dob.age} years old</li>
            <li>Nationality: ${user.nat}</li>
            <li>Phone: ${user.phone}</li>
            <li>Address: ${user.location.street}, ${user.location.city}, ${user.location.state}</li>
          </ul>
        </li>
      `;
    });

    list.innerHTML = items;
    dom.userList.appendChild(list);
  }
}