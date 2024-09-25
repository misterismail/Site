const apiUrl = 'https://sanofiapi.onrender.com' //Pegar link novo
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
                let solic = {
                    id: colectInfo.ID_SOLIC,
                    data: colectInfo.DT_SOLIC,
                    quant: colectInfo.QUANTIDADE,
                    motivo: colectInfo.MOTIVO,
                    prev: colectInfo.PREV_ENTREGA,
                    status: colectInfo.STATUS,
                    solicitante: colectInfo.FUNCIONARIOS_ID_FUNC
                }
                Info.push(solic)
            })
        } else {
            let solic = {
                id: funcionarios.ID_SOLIC,
                data: funcionarios.DT_SOLIC,
                quant: funcionarios.QUANTIDADE,
                motivo: funcionarios.MOTIVO,
                prev: funcionarios.PREV_ENTREGA,
                status: funcionarios.STATUS,
                solicitante: funcionarios.FUNCIONARIOS_ID_FUNC
            }
            Info.push(solic)
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

        if (event.message == 'No events found') {
            return
        }

        const Info = []

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
                    liderado: colectInfo.ID_EVENT,
                    nome: colectInfo.NOME_COMPLETO,
                    email: colectInfo.EMAIL
                }
                Info.push(funcioEvent)
            })
        } else {
            let funcioEvent = {
                liderado: liderados.ID_EVENT,
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
        } else {
            document.querySelector('#loading-screen p').innerHTML = "Carregando Informações..."

            const login = JSON.parse(localStorage.getItem("login")) || []
            await fetchFuncio(login[0].id)

            const funcionarioInfo = JSON.parse(localStorage.getItem("funcioInfos")) || []
            let idFuncionario = funcionarioInfo[0]

            await fetchEventFunc(idFuncionario.id)

            let eventosFuncionarioList = []
            const eventFuncio = JSON.parse(localStorage.getItem("EventFuncio")) || []
            eventFuncio.forEach(evento => {
                eventosFuncionarioList.push(evento.eventId)
            })
            await fetchEvent(eventosFuncionarioList)

            // await fetchSolicit(idFuncionario.id)

            // await fetchAprovacao(idFuncionario.id)

            // let lideradosUser = []
            // const liderados = JSON.parse(localStorage.getItem("liderados")) || []
            // liderados.forEach(evento => {
            //     lideradosUser.push(evento.liderado)
            // })

            // await fetchAprovarSolicitacoes(lideradosUser)

            window.location.href = 'Inicio.html'
        }
    });
});
