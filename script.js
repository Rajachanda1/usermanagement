document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('user-form');
    const userTableBody = document.getElementById("tableBody")
    const errorMessage = document.getElementById('error-message');

    let users = [];

    async function fetchUsers() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await response.json();
            users = data;
            renderUserList();
        } catch (error) {
            errorMessage.innerHTML = '<p>Error fetching users from API</p>';
        }
    }

    function renderUserList() {
        userTableBody.innerHTML = '';

        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
                <td>${user.company.name}</td>
                <td>
                    <button class="edit-btn" data-id="${user.id}">Edit</button>
                    <button class="delete-btn" data-id="${user.id}">Delete</button>
                </td>
            `;
            userTableBody.appendChild(row);
        });

        addEventListeners();
    }

    function addEventListeners() {
        const editButtons = document.querySelectorAll('.edit-btn');
        const deleteButtons = document.querySelectorAll('.delete-btn');

        editButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const userId = e.target.getAttribute('data-id');
                editUser(userId);
                deleteUser(userId);
            });
        });

        deleteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const userId = e.target.getAttribute('data-id');
                deleteUser(userId);
            });
        });
    }

    function editUser(userId) {
        const user = users.find(u => u.id == userId);
        if (user) {
            document.getElementById('name').value = user.name;
            document.getElementById('username').value = user.username;
            document.getElementById('email').value = user.email;
            document.getElementById('department').value = user.company.name;
        }
    }

    function deleteUser(userId) {
        users = users.filter(u => u.id != userId);
        renderUserList();
    }

    userForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newUser = {
            id: Date.now(),
            name: document.getElementById('name').value,
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            company: {
                name: document.getElementById('department').value
            }
        };

        users.push(newUser);
        renderUserList();

        userForm.reset();
    });

    fetchUsers();
});