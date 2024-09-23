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

  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append('files', files[i]);  // Adiciona cada arquivo ao FormData
  }

  fetch('https://api-ia-site-challeng-sanofi.onrender.com/upload', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        document.getElementById('result').innerText = `Erro: ${data.error}`;
      } else {
        // Exibe os resultados para cada arquivo
        let resultText = '';
        data.resultados.forEach((res, index) => {
          resultText += `Arquivo ${index + 1}: ${res.conteudo}\n\n`;
        });
        document.getElementById('result').innerText = resultText;
      }
    })
    .catch(error => {
      document.getElementById('result').innerText = `Erro ao enviar: ${error}`;
    });
})
