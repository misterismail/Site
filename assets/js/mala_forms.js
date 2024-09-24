const apiUrl = "https://sanofiapi.onrender.com"
//Caso esteja o link de localhost alterar para o seguinte:  https://sanofiapi.onrender.com

async function armazenarSolicitacao( motivo, idFuncio, endereco) {
    fetch(apiUrl + '/api/v2/solicitacao', {
        method: 'POST',
        body: JSON.stringify({
            motivo: motivo,
            idFuncio: idFuncio,
            endereco: endereco
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Erro:', error))
}



document.getElementById("btn_EnvioSolicitacao").addEventListener('click', async function () {

    // document.querySelector("#QTDE_forms").classList.remove("erroIten")
    document.querySelector("#Endereco_forms").classList.remove("erroIten")
    document.querySelector("#Motivo_forms").classList.remove("erroIten")
    document.querySelectorAll("label.itens_malas").forEach((input) => { input.classList.remove("erroIten") })
    document.querySelectorAll("label.itens_perifericos").forEach((input) => { input.classList.remove("erroIten") })

    let equipamentos = [
        document.querySelector("#mala01").value,
        document.querySelector("#mala02").value,
        document.querySelector("#mala03").value,
        document.querySelector("#mala04").value,
        document.querySelector("#mala05").value,
        document.querySelector("#mala06").value,
        document.querySelector("#peri01").value,
        document.querySelector("#peri02").value,
        document.querySelector("#peri03").value,
        document.querySelector("#peri04").value,
        document.querySelector("#peri05").value,
        document.querySelector("#peri06").value
    ]

    let equipamentoValid = []

    let erro = false

    //let qtde = document.querySelector("#QTDE_forms").value
    let endereco = document.querySelector("#Endereco_forms").value
    let motivo = document.querySelector("#Motivo_forms").value

    // let valid1 = qtde > 0 ? true : false
    let valid2 = endereco != "" ? true : false
    let valid3 = motivo != "" ? true : false
    let valid4 = true
    equipamentos.forEach(element => {
        if (element <= 0 || element == "") {equipamentoValid.push(element)}  
    });

    if (equipamentos.length == equipamentoValid.length) {
        valid4 = false
    }

    console.log(valid4)

    // if (!valid1) {
    //     document.querySelector("#QTDE_forms").classList.add("erroIten")
    //     erro = true
    // }
    if (!valid2) {
        document.querySelector("#Endereco_forms").classList.add("erroIten")
        erro = true
    }
    if (!valid3) {
        document.querySelector("#Motivo_forms").classList.add("erroIten")
        erro = true
    }

    if (!valid4) {
        document.querySelectorAll("label.itens_malas").forEach((input) => { input.classList.add("erroIten") })
        document.querySelectorAll("label.itens_perifericos").forEach((input) => { input.classList.add("erroIten") })
        alert(`Verique as quantidades dos equipamentos!
MAX 15 - MIN 0`)
        erro = true
    }

    if (!erro) {
        //document.querySelector("#QTDE_forms").value = ""
        document.querySelector("#Endereco_forms").value = ""
        document.querySelector("#Motivo_forms").value = ""
        document.querySelectorAll("label.itens_malas").forEach((input) => { input.value = 0 })
        document.querySelectorAll("label.itens_perifericos").forEach((input) => { input.value = 0 })
        location.reload()

        const funcionarioInfo = JSON.parse(localStorage.getItem("funcioInfos")) || []
        let idFuncionario = funcionarioInfo[0]

        await armazenarSolicitacao(motivo, idFuncionario.id ,endereco)
        
        alert("Forms enviado!")
        //função para carregar dentr do banco de dados...





    } else {
        alert("corriga os apontamentos visuais!")
    }
})