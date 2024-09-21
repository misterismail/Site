const apiUrl = 'https://sanofiapi.onrender.com' //Pegar link novo

async function fetchUsers(usuario, senha) {
    valida = 0
    try {
        const response = await fetch(apiUrl + "/api/v2/users");
        const users = await response.json();

        users.forEach(user => {
            if (usuario === user.USUARIO && senha === user.SENHA) {
                let login = {
                    id: user.ID_USER,
                    acess: user.ACESSO,
                    newAcess: user.PRI_ACCESS
                }
                const loginInfo = []
                loginInfo.push(login)
                localStorage.setItem("login", JSON.stringify(loginInfo))

                window.location.href = 'Inicio.html'
                valida = 1
            }
        })
    } catch (error) {
        alert("User ou senha invalidos!")
    } finally {
        return valida
    }
}

function erroLogin() {
    document.querySelectorAll(".input-group")
        .forEach((input) => {
            input.classList.remove("input-group")
            input.classList.add("input-group-error")
        })
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.login-form');

    form.addEventListener('submit', async function (event) {
        event.preventDefault()

        document.getElementById('loading-screen').classList.remove('hidden')

        const user = document.getElementById('user').value
        const senha = document.getElementById('senha').value

        erroLogin()
        let invalid = await fetchUsers(user, senha)
        if (invalid == 0) {
            document.getElementById('loading-screen').classList.add('hidden')
        }
    })
})
