document.getElementById("btn_EnvioSolicitacao").addEventListener('click', function () {

    document.querySelector("#CPF_forms").classList.remove("erroIten")
    document.querySelector("#Endereco_forms").classList.remove("erroIten")
    document.querySelector("#area_solicitacao").classList.remove("erroIten")
    document.querySelectorAll("div.itens_malas").forEach((input) => { input.classList.remove("erroIten") })
    document.querySelectorAll("div.itens_perifericos").forEach((input) => { input.classList.remove("erroIten") })

    let equipamentos = [
        document.querySelector("#mala01").checked,
        document.querySelector("#mala02").checked,
        document.querySelector("#mala03").checked,
        document.querySelector("#mala04").checked,
        document.querySelector("#mala05").checked,
        document.querySelector("#mala06").checked,
        document.querySelector("#peri01").checked,
        document.querySelector("#peri02").checked,
        document.querySelector("#peri03").checked,
        document.querySelector("#peri04").checked,
        document.querySelector("#peri05").checked,
        document.querySelector("#peri06").checked
    ]

    let erro = false

    let cpf = document.querySelector("#CPF_forms").value
    let endereco = document.querySelector("#Endereco_forms").value
    let area = document.querySelector("#area_solicitacao").value

    let valid1 = cpf > 0 ? true : false
    let valid2 = endereco != "" ? true : false
    let valid3 = area != "" ? true : false
    let valid4 = equipamentos.includes(true)

    if (!valid1) {
        document.querySelector("#CPF_forms").classList.add("erroIten")
        erro = true
    }
    if (!valid2) {
        document.querySelector("#Endereco_forms").classList.add("erroIten")
        erro = true
    }
    if (!valid3) {
        document.querySelector("#area_solicitacao").classList.add("erroIten")
        erro = true
    }

    if (!valid4) {
        document.querySelectorAll("div.itens_malas").forEach((input) => { input.classList.add("erroIten") })
        document.querySelectorAll("div.itens_perifericos").forEach((input) => { input.classList.add("erroIten") })
        erro = true
    }

    if (!erro) {
        document.querySelector("#CPF_forms").value = ""
        document.querySelector("#Endereco_forms").value = ""
        document.querySelector("#area_solicitacao").value = ""
        document.querySelectorAll("div.itens_malas").forEach((input) => { input.checked = false })
        document.querySelectorAll("div.itens_perifericos").forEach((input) => { input.checked = false })
        location.reload()
        alert("Forms enviado!")
        //função para carregar dentr do banco de dados...
    } else {
        alert("corriga os apontamentos visuais!")
    }
})