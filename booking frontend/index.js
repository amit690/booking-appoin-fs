const form = document.querySelector('.input-form');
const table = document.querySelector('.marks-table tbody');
let edit_id = -1;

async function postUser(user) {
    try {
        const response = await axios.post("http://localhost:3000/user", user);
        display(response.data);
        document.getElementById('name').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('email').value = '';
    } catch (error) {
        console.log(error);
    }
}

async function getUsers() {
    try {
        const response = await axios.get("http://localhost:3000/user");
        return response.data.users;
    } catch (error) {
        console.log(error);
        return [];
    }
}

async function deleteUser(id, row) {
    try {
        await axios.delete(`http://localhost:3000/user/${id}`);
        row.remove();
    } catch (error) {
        console.log(error);
    }
}

async function updateUser(id, user) {
    try {
        await axios.put(`http://localhost:3000/user/${id}`, user);
        const row = document.querySelector(`tr[data-id="${id}"]`);
        row.children[0].textContent = user.name;
        row.children[1].textContent = user.phone;
        row.children[2].textContent = user.email;

        row.style.backgroundColor = '';
        document.getElementById('name').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('email').value = '';
        edit_id = -1;
    } catch (error) {
        console.log(error);
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    const user = { name, phone, email };
    const users = await getUsers();
    const phoneExists = users.some(u => u.phone === phone);

    if (!phoneExists && edit_id === -1) {
        postUser(user);
    } else if (edit_id !== -1) {
        updateUser(edit_id, user);
    } else {
        alert('Phone number already exists');
    }
});

function display(user) {
    const row = document.createElement('tr');
    row.setAttribute('data-id', user.id);

    const nameCell = document.createElement('td');
    nameCell.textContent = user.name;
    row.appendChild(nameCell);

    const phoneCell = document.createElement('td');
    phoneCell.textContent = user.phone;
    row.appendChild(phoneCell);

    const emailCell = document.createElement('td');
    emailCell.textContent = user.email;
    row.appendChild(emailCell);

    const actionCell = document.createElement('td');

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'deletebtn';
    deleteBtn.onclick = () => deleteUser(user.id, row);
    actionCell.appendChild(deleteBtn);

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'editbtn';
    editBtn.onclick = () => editUser(user);
    actionCell.appendChild(editBtn);

    row.appendChild(actionCell);
    table.appendChild(row);
}

function editUser(user) {
    document.getElementById('name').value = user.name;
    document.getElementById('phone').value = user.phone;
    document.getElementById('email').value = user.email;
    edit_id = user.id;

    const row = document.querySelector(`tr[data-id="${user.id}"]`);
    row.style.backgroundColor = '#ffff99';
}

document.addEventListener('DOMContentLoaded', async () => {
    const users = await getUsers();
    users.forEach(display);
});
