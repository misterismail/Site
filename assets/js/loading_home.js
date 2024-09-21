const loginInfo = JSON.parse(localStorage.getItem("login")) || []
const acessos = [
    {
    acesso: '1',
    txt: `<a href="./Malas.html"><img class="conf_malas" src=".\\assets\\\image\\conf_malas.png" alt="alt text" width="93%"/></a>`
    },
    {
    acesso: '2',
    txt:`<a href="./Ia.html"><img class="conf_agil" src=".\\assets\\image\\conf_agil.png" alt="alt text" width="93%"/></a>`
    },
    {
    acesso: '3',
    txt:`<a href="https://app.powerbi.com/reportEmbed?reportId=3d920963-bde0-4787-8c91-1cff9a263c26&autoAuth=true&ctid=11dbbfe2-89b8-4549-be10-cec364e59551"><img class="dash_agil" src=".\\assets\\\image\\dash_agil.png" alt="alt text" width="93%"/></a>`
    }
]

loginInfo.forEach(login => { 
    let nivel = login.acess

    //redSenha(login.newAcess)

    if (nivel == 'master'){
        cardMaster()
        acessos.forEach(cardInfo => card(cardInfo.txt))
    } else {
        let niveis = nivel.split(",")
        console.log(niveis)

        acessos.forEach(cardInfo => {
            if (niveis.includes(cardInfo.acesso)){
                card(cardInfo.txt)
            }
        })
    }
})

function cardMaster(){
    const cardTarefa = `<a href="./Usuarios_acessos.html"><img class="config" src="./assets/image/config.png" alt="alt text" /></a>`
    const card = document.createElement("div")
    card.innerHTML = cardTarefa
    document.querySelector("#navBar").appendChild(card)
}

function card(cardInfo){
    const card = document.createElement("div")
    card.innerHTML = cardInfo
    document.querySelector("#btnNavSite").appendChild(card)
}

// function redSenha(inputSenha){
//     if (inputSenha == 1) {
//         document.getElementById('modal').style.display = 'flex'
//     }   
// }

// document.getElementById('cancelar').addEventListener('click', function() {
//     document.getElementById('modal').style.display = 'none';
// }); 