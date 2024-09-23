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

async function fetchSolicit(userId) {
    try {
        const response = await fetch(apiUrl + `/api/v2/solic/${userId}`);
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

async function fetchEventFunc(userId) {
    try {
        const response = await fetch(apiUrl + `/api/v2/eventfunc/${userId}`);
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
        localStorage.setItem("solicitacoesInfos", JSON.stringify(Info))

    } catch (error) {
        alert("Erro no banco!")
    }
}

async function fetchEvent(userId) {
    try {
        const response = await fetch(apiUrl + `/api/v2/event/${userId}`);
        const event = await response.json();

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
        localStorage.setItem("solicitacoesInfos", JSON.stringify(Info))

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
})