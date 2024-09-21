const loginInfo = JSON.parse(localStorage.getItem("login")) || []

loginInfo.forEach(login => { 
    let nivel = login.acess
    if (nivel == 'master'){
        cardMaster()
    }
})

function cardMaster(){
    const cardTarefa = `<a href="./Usuarios_acessos.html"><img class="config" src="./assets/image/config.png" alt="alt text" /></a>`
    const card = document.createElement("div")
    card.innerHTML = cardTarefa
    document.querySelector("#navBar").appendChild(card)
}