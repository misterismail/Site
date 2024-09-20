const apiUrl = 'http://localhost:3000'

async function fetchFuncio() {
    try {
        const response = await fetch(apiUrl + "/api/v2/funcio");
        const funcionarios = await response.json();

        funcionarios.forEach(colectInfo => {
            let funcio = {
                id: colectInfo.ID_FUNC,
                cargo: colectInfo.JOBS_ID_JOB,
                depart: colectInfo.DEPARTAMENTOS_ID_DEPT,
                lider: colectInfo.ID_LIDER
            }
            const Info = []
            Info.push(funcio)
            localStorage.setItem("funcioInfos", JSON.stringify(Info))
        })
    } catch (error) {
        alert("Erro no banco!")
    }
}

async function fetchSolicit() {
    try {
        const response = await fetch(apiUrl + "/api/v2/");
        const funcionarios = await response.json();

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
            const Info = []
            Info.push(funcio)
            localStorage.setItem("solicitacoesInfos", JSON.stringify(Info))
        })
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