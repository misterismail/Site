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
        alert("Erro no banco!")
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
        alert("Erro no banco!")
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
        alert("Erro no banco!")
    }
}

async function fetchEvent(eventId) {
    try {
        const response = await fetch(apiUrl + `/api/v2/event/${eventId}`);
        const event = await response.json();

        const Info = JSON.parse(localStorage.getItem("eventos")) || []

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

        localStorage.setItem("eventos", JSON.stringify(Info))

    } catch (error) {
        alert("Erro no banco!")
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

document.addEventListener('DOMContentLoaded', async function () {
    const loginInfo = JSON.parse(localStorage.getItem("login")) || []
    let user = loginInfo[0]
    await fetchFuncio(user.id)

    const funcionarioInfo = JSON.parse(localStorage.getItem("funcioInfos")) || []
    let idFuncionario = funcionarioInfo[0]

    await fetchEventFunc(idFuncionario.id)

    const eventFuncio = JSON.parse(localStorage.getItem("EventFuncio")) || []
    eventFuncio.forEach(async evento => {
        await fetchEvent(evento.id)
    })

    await fetchSolicit(idFuncionario.id)
})