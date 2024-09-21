document.getElementById('caixa_roxa').addEventListener('change', function(event) {
    var fileName = event.target.files[0] ? event.target.files[0].name : "Nenhum arquivo selecionado";
    document.getElementById('file-name').textContent = fileName;
  });
  