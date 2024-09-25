const apiUrl = 'http://localhost:3000' //Pegar link novo
//Caso esteja o link de localhost alterar para o seguinte:  https://sanofiapi.onrender.com

async function fetchSolicit(funcId) {
    try {
        const response = await fetch(apiUrl + `/api/v2/solic2/${funcId}`);
        const funcionarios = await response.json();

        const Info = []

        console.log(funcionarios)

        if (Array.isArray(funcionarios)) {
            funcionarios.forEach(colectInfo => {
                let solic = {
                    id: colectInfo.ID_SOLICITACAO,
                    data: colectInfo.DATA_SOLICITACAO,
                    motivo: colectInfo.MOTIVO_SOLICITACAO,
                    prev: colectInfo.DATA_PREVISTA_ENTREGA,
                    status: colectInfo.STATUS_SOLICITACAO,
                    equipamentos: colectInfo.EQUIPAMENTOS_SOLICITADOS,
                    solicitante: colectInfo.ID_FUNCIONARIO
                }
                Info.push(solic)
            })
        } else {
            let solic = {
                id: funcionarios.ID_SOLICITACAO,
                data: funcionarios.DATA_SOLICITACAO,
                motivo: funcionarios.MOTIVO_SOLICITACAO,
                prev: funcionarios.DATA_PREVISTA_ENTREGA,
                status: funcionarios.STATUS_SOLICITACAO,
                equipamentos: funcionarios.EQUIPAMENTOS_SOLICITADOS,
                solicitante: funcionarios.ID_FUNCIONARIO
            }
            Info.push(solic)
        }
        localStorage.setItem("minhasSolicitacoes", JSON.stringify(Info))


    } catch (error) {
        //alert("Erro no banco!")
    }
}

async function fetchAprovacao(liderId) {
    try {
        const response = await fetch(apiUrl + `/api/v2/liderados/${liderId}`);
        const liderados = await response.json();

        if (liderados.message == 'User not found') {
            return
        }

        const Info = []

        if (Array.isArray(liderados)) {
            liderados.forEach(colectInfo => {
                let funcioEvent = {
                    liderado: colectInfo.ID_FUNC,
                    nome: colectInfo.NOME_COMPLETO,
                    email: colectInfo.EMAIL
                }
                Info.push(funcioEvent)
            })
        } else {
            let funcioEvent = {
                liderado: liderados.ID_FUNC,
                nome: liderados.NOME_COMPLETO,
                email: liderados.EMAIL
            }
            Info.push(funcioEvent)
        }

        localStorage.setItem("liderados", JSON.stringify(Info))

    } catch (error) {
        //alert("Erro no banco!")
    }
}

async function fetchAprovarSolicitacoes(eventId) {
    try {
        const response = await fetch(apiUrl + `/api/v2/solicAprov?ids=${eventId}`);
        const aprovarsolic = await response.json();

        console.log(aprovarsolic)

        if (aprovarsolic.message == 'Nenhuma solicitação encontrada.') {
            return
        }

        const Info = []

        if (Array.isArray(aprovarsolic)) {
            aprovarsolic.forEach(colectInfo => {
                let solic = {
                    id: colectInfo.ID_SOLICITACAO,
                    data: colectInfo.DATA_SOLICITACAO,
                    motivo: colectInfo.MOTIVO_SOLICITACAO,
                    equipamentos: colectInfo.EQUIPAMENTOS_SOLICITADOS,
                    status: colectInfo.STATUS_SOLICITACAO,
                    solicitante: colectInfo.ID_FUNCIONARIO
                }
                Info.push(solic)
            })
        } else {
            let solic = {
                id: aprovarsolic.ID_SOLICITACAO,
                data: aprovarsoliccolectInfo.DATA_SOLICITACAO,
                motivo: aprovarsoliccolectInfo.MOTIVO_SOLICITACAO,
                equipamentos: aprovarsolic.EQUIPAMENTOS_SOLICITADOS,
                status: aprovarsolic.STATUS_SOLICITACAO,
                solicitante: aprovarsoliccolectInfo.ID_FUNCIONARIO
            }
            Info.push(solic)
        }

        localStorage.setItem("aprovacoes", JSON.stringify(Info))

    } catch (error) {
        //alert("Erro no banco!")
    }
}


async function loading() {
    const funcionarioInfo = JSON.parse(localStorage.getItem("funcioInfos")) || []
    let idFuncionario = funcionarioInfo[0]

    await fetchSolicit(idFuncionario.id)

    await fetchAprovacao(idFuncionario.id)

    let lideradosUser = []
    const liderados = JSON.parse(localStorage.getItem("liderados")) || []
    liderados.forEach(evento => {
        lideradosUser.push(evento.liderado)
    })

    await fetchAprovarSolicitacoes(lideradosUser)
}

document.addEventListener('DOMContentLoaded', async function () {
    //document.getElementById('resultTable').innerText = ""

    await loading()

    const liderados = JSON.parse(localStorage.getItem("aprovacoes")) || []
    const minhas = JSON.parse(localStorage.getItem("minhasSolicitacoes")) || []
    const funcio = JSON.parse(localStorage.getItem("liderados")) || []

    liderados.forEach(res => {
        let nome
        funcio.forEach(func => {
            if (func.liderado == res.solicitante) nome = func.nome
        })
        const linhaCard = document.createElement("tr")
        let data = res.data.split("T")
        let linha = `<td><input type="checkbox" id=${res.id} class='id_solic'/></td><td>${data[0]}</td><td>${nome}</td><td>${res.motivo}</td><td>${res.equipamentos}</td><td>${res.status}</td>`
        linhaCard.innerHTML = linha
        document.getElementById('resultTable1').appendChild(linhaCard)
    })

    minhas.forEach(res => {
        const linhaCard = document.createElement("tr")
        let data = res.data.split("T")
        let linha = `<td>${data[0]}</td><td>${res.motivo}</td><td>${res.equipamentos}</td><td>${res.status}</td><td>${res.prev}</td>`
        linhaCard.innerHTML = linha
        document.getElementById('resultTable2').appendChild(linhaCard)
    })
})

document.getElementById('mySolic').addEventListener("click", function () {
    document.getElementById('mySolicTable').classList.remove("hidden")
    document.getElementById('aprovTable').classList.add("hidden")
    document.getElementById('mySolic').classList.add("azul2")
    document.getElementById('timeSolic').classList.remove("azul2")
    //document.getElementById('reprovarSolic').classList.add("hidden")
    //document.getElementById('aprovarSolic').classList.add("hidden")

})

document.getElementById('timeSolic').addEventListener("click", function () {
    document.getElementById('mySolicTable').classList.add("hidden")
    document.getElementById('aprovTable').classList.remove("hidden")
    document.getElementById('mySolic').classList.remove("azul2")
    document.getElementById('timeSolic').classList.add("azul2")
    //document.getElementById('reprovarSolic').classList.remove("hidden")
    //document.getElementById('aprovarSolic').classList.remove("hidden")

})