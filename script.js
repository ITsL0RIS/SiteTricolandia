document.addEventListener("DOMContentLoaded", () => {
    const userForm = document.getElementById("userForm");
    const userList = document.getElementById("userList");
    const searchInput = document.getElementById("search");
    const clearUsersBtn = document.getElementById("clearUsers");
    const clearFormBtn = document.getElementById("clearForm");

    // Carregar usuários ao iniciar a página
    displayUsers();

    // Cadastrar novo usuário
    userForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();

        if (name === "" || email === "") {
            alert("Preencha todos os campos!");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];
        
        if (users.some(user => user.email === email)) {
            alert("E-mail já cadastrado!");
            return;
        }

        users.push({ name, email, date: new Date().toLocaleString() });
        localStorage.setItem("users", JSON.stringify(users));
        userForm.reset();
        displayUsers();
    });

    // Exibir usuários cadastrados
    function displayUsers(filter = "") {
        userList.innerHTML = "";
        let users = JSON.parse(localStorage.getItem("users")) || [];

        users
            .filter(user => user.name.includes(filter) || user.email.includes(filter))
            .forEach((user) => {
                const li = document.createElement("li");
                li.className = "product";
                li.innerHTML = `
                    <h3>${user.name}</h3>
                    <p>${user.email}</p>
                    <span>Data: ${user.date}</span>
                    <button class="btn delete-btn" onclick="deleteUser('${user.email}')">Excluir</button>
                `;
                userList.appendChild(li);
            });
    }

    // Excluir usuário específico
    window.deleteUser = function (email) {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users = users.filter(user => user.email !== email);
        localStorage.setItem("users", JSON.stringify(users));
        displayUsers();
    };

    // Excluir todos os usuários
    clearUsersBtn.addEventListener("click", () => {
        if (confirm("Tem certeza que deseja excluir todos os usuários?")) {
            localStorage.removeItem("users");
            displayUsers();
        }
    });

    //Limpar formulário
    clearFormBtn.addEventListener("click", () => {
        userForm.reset();
    });

    // Pesquisar usuários
    searchInput.addEventListener("input", (e) => {
        displayUsers(e.target.value.trim());
    });
});
