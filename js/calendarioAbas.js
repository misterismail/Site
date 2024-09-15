document.querySelector("#btn_myEvents").addEventListener('click', function() {
    document.getElementById("cx_inicial").classList.add("hidden")
    document.getElementById("cx_myEvents").classList.remove("hidden")
})

document.querySelector("#btn_cx_inicial").addEventListener('click', function() {
    document.getElementById("cx_inicial").classList.remove("hidden")
    document.getElementById("cx_myEvents").classList.add("hidden")
})

document.querySelector("#btn_newEvent").addEventListener('click', function() {
    document.getElementById("cx_newEvent").classList.remove("hidden")
    document.getElementById("cx_myEvents").classList.add("hidden")
})

document.querySelector("#btn_cx_myEvents").addEventListener('click', function() {
    document.getElementById("cx_myEvents").classList.remove("hidden")
    document.getElementById("cx_newEvent").classList.add("hidden")
})

document.querySelector("#btn_cx_myEventsEdit").addEventListener('click', function() {
    document.getElementById('cx_editEvent').classList.add('hidden')
    document.getElementById("cx_myEvents").classList.remove("hidden")
})