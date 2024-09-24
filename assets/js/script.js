const apiUrl = 'http://localhost:3000' //Pegar link novo
//Caso esteja o link de localhost alterar para o seguinte:  https://sanofiapi.onrender.com

async function fetchFuncio(userId) {
    try {
        const response = await fetch(apiUrl + `/api/v2/funcio/${userId}`);
        const funcionarios = await response.json();

        let funcio = {
            id: funcionarios.ID_FUNC,
            cargo: funcionarios.JOBS_ID_JOB,
            depart: funcionarios.DEPARTAMENTOS_ID_DEPT,
            lider: funcionarios.ID_LIDER
        }
        const Info = []
        Info.push(funcio)
        localStorage.setItem("funcioInfos", JSON.stringify(Info))

    } catch (error) {
        //alert("Erro no banco!")
    }
}

async function fetchSolicit(funcId) {
    try {
        const response = await fetch(apiUrl + `/api/v2/solic/${funcId}`);
        const funcionarios = await response.json();

        const Info = []

        if (Array.isArray(funcionarios)) {
            funcionarios.forEach(colectInfo => {
                let funcio = {
                    id: colectInfo.ID_SOLIC,
                    data: colectInfo.DT_SOLIC,
                    quant: colectInfo.QUANTIDADE,
                    motivo: colectInfo.MOTIVO,
                    prev: colectInfo.PREV_ENTREGA,
                    status: colectInfo.STATUS,
                    solicitante: colectInfo.FUNCIONARIOS_ID_FUNC
                }
                Info.push(funcio)
            })
        } else {
            let funcio = {
                id: funcionarios.ID_SOLIC,
                data: funcionarios.DT_SOLIC,
                quant: funcionarios.QUANTIDADE,
                motivo: funcionarios.MOTIVO,
                prev: funcionarios.PREV_ENTREGA,
                status: funcionarios.STATUS,
                solicitante: funcionarios.FUNCIONARIOS_ID_FUNC
            }
            Info.push(funcio)
        }
        localStorage.setItem("solicitacoesInfos", JSON.stringify(Info))


    } catch (error) {
        //alert("Erro no banco!")
    }
}

async function fetchEventFunc(funcId) {
    try {
        const response = await fetch(apiUrl + `/api/v2/eventfunc/${funcId}`);
        const eventFunc = await response.json();

        console.log(eventFunc)

        const Info = []

        if (Array.isArray(eventFunc)) {
            eventFunc.forEach(colectInfo => {
                let funcioEvent = {
                    eventId: colectInfo.EVENT_ID_EVENT,
                    funcId: colectInfo.FUNC_ID_FUNC,
                    aprov: colectInfo.ORGANIZADOR
                }
                Info.push(funcioEvent)
            })
        } else {
            let funcioEvent = {
                eventId: eventFunc.EVENT_ID_EVENT,
                funcId: eventFunc.FUNC_ID_FUNC,
                aprov: eventFunc.ORGANIZADOR
            }
            Info.push(funcioEvent)
        }
        localStorage.setItem("EventFuncio", JSON.stringify(Info))

    } catch (error) {
        //alert("Erro no banco!")
    }
}

async function fetchEvent(eventId) {
    try {
        const response = await fetch(apiUrl + `/api/v3/events?ids=${eventId}`);
        const event = await response.json();

        const Info = JSON.parse(localStorage.getItem("eventos")) || []

        if (Array.isArray(event)) {
            event.forEach(colectInfo => {
                let funcioEvent = {
                    eventId: colectInfo.ID_EVENT,
                    data: colectInfo.DT_EVENT,
                    nome: colectInfo.NOME,
                    tipo: colectInfo.TIPO,
                    formato: colectInfo.FORMATO,
                    GBU: colectInfo.GBU,
                    statusEvent: colectInfo.STATUS,
                    obs: colectInfo.OBSERVACAO,
                    area: colectInfo.AREA
                }
            Info.push(funcioEvent)
            })
        } else {
            let funcioEvent = {
                eventId: event.ID_EVENT,
                data: event.DT_EVENT,
                nome: event.NOME,
                tipo: event.TIPO,
                formato: event.FORMATO,
                GBU: event.GBU,
                statusEvent: event.STATUS,
                obs: event.OBSERVACAO,
                area: event.AREA
            }
            Info.push(funcioEvent)
        }

        localStorage.setItem("eventCalendar", JSON.stringify(Info))

    } catch (error) {
        //alert("Erro no banco!")
    }
}

// async function fetchSolicitAprov() {
//     try {
//         const response = await fetch(apiUrl + "/api/v2/");
//         const funcionarios = await response.json();

//         funcionarios.forEach(colectInfo => {
//             let funcio = {
//                 id: ID_SOLIC,
//                 data: colectInfo.DT_SOLIC,
//                 quant: colectInfo.QUANTIDADE,
//                 motivo: colectInfo.MOTIVO,
//                 prev: colectInfo.PREV_ENTREGA,
//                 status: colectInfo.STATUS,
//                 solicitante: colectInfo.FUNCIONARIOS_ID_FUNC
//             }
//             const Info = []
//             Info.push(funcio)
//             localStorage.setItem("solicitacoesInfos", JSON.stringify(Info))
//         })
//     } catch (error) {
//         alert("Erro no banco!")
//     }
// }

async function fetchUsers(usuario, senha) {
    valida = 0
    try {
        const response = await fetch(apiUrl + `/api/v2/users/${usuario}`);
        const users = await response.json()

        if (usuario === users.USUARIO && senha === users.SENHA) {
            let login = {
                id: users.ID_USER,
                acess: users.ACESSO,
                newAcess: users.PRI_ACCESS
            }
            const loginInfo = []
            loginInfo.push(login)
            localStorage.setItem("login", JSON.stringify(loginInfo))

            document.querySelector('#loading-screen p').innerHTML = "Carregando Informações..."

            await fetchFuncio(login.id)

            const funcionarioInfo = JSON.parse(localStorage.getItem("funcioInfos")) || []
            let idFuncionario = funcionarioInfo[0]

            await fetchEventFunc(idFuncionario.id)

            let eventosFuncionarioList = []
            const eventFuncio = JSON.parse(localStorage.getItem("EventFuncio")) || []
            console.log("Aqui!")
            console.log(eventFuncio)
            eventFuncio.forEach(evento => {
                eventosFuncionarioList.push(evento.eventId)
            })
            console.log("Aqui!")
            console.log(eventosFuncionarioList)
            await fetchEvent(eventosFuncionarioList)

            await fetchSolicit(idFuncionario.id)

            window.location.href = 'Inicio.html'
            valida = 1
        }

    } catch (error) {
        alert("User ou senha invalidos!")
    } finally {
        return valida
    }
}

function erroLogin() {
    document.querySelectorAll(".input-group")
        .forEach((input) => {
            input.classList.remove("input-group");
            input.classList.add("input-group-error");
        })
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.login-form')

    form.addEventListener('submit', async function (event) {
        event.preventDefault()

        document.getElementById('loading-screen').classList.remove('hidden');

        const user = document.getElementById('user').value
        const senha = document.getElementById('senha').value

        erroLogin()
        let invalid = await fetchUsers(user, senha)
        if (invalid == 0) {
            document.getElementById('loading-screen').classList.add('hidden')
        };
    });
});
