document.getElementById('caixa_roxa').addEventListener('change', function (event) {
  var fileName = event.target.files[0] ? event.target.files[0].name : "Nenhum arquivo selecionado";
  document.getElementById('file-name').textContent = fileName;
});

document.getElementById('submitArquivosIa').addEventListener('click', function () {
  const fileInput = document.getElementById('caixa_roxa');
  const files = fileInput.files;

  if (files.length === 0) {
    alert("Por favor, selecione um ou mais arquivos.");
    return;
  }

  document.getElementById('loading-screen').classList.remove('hidden');

  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append('files', files[i]);  // Adiciona cada arquivo ao FormData
  }
  document.getElementById('resultTable').innerHTML = ""

  fetch('http://127.0.0.1:5000/upload', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        document.getElementById('result').innerText = `Erro: ${data.error}`;
      } else {
        data.resultados.forEach(res => {
          let resposta = res.conteudo

          const linhaCard = document.createElement("tr")
          let linha = `<th>${res.filename}</th><th>${resposta.sentimento}</th><th>${resposta.Bert}</th><th>${resposta.Naive}</th><th>${resposta.validadeDoc}</th><th>${resposta.resultadoFinal}</th>`
          linhaCard.innerHTML = linha
          document.getElementById('resultTable').appendChild(linhaCard)
        });
        document.getElementById('loading-screen').classList.add('hidden')
      }
      document.getElementById('loading-screen').classList.add('hidden')
    })
    .catch(error => {
      document.getElementById('loading-screen').classList.add('hidden')
    });
})

