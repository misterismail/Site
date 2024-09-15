var calendar
var selectedEvent
document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar')
    calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        height: '700px',
        fixedWeekCount: false,
        events: [],

        //Click na barra do evento
        // eventClick: function(info) {
        //     var eventObj = info.event;
        //     if (eventObj.url) {
        //         alert(
        //         'Clicked ' + eventObj.title + '.\n' +
        //         'Will open ' + eventObj.url + ' in a new tab'
        //         );

        //         window.open(eventObj.url);

        //         info.jsEvent.preventDefault(); // prevents browser from following link in current tab.
        //     } else {
        //         alert('Clicked ' + eventObj.title);
        //     }
        // }
    })

    const eventos = JSON.parse(localStorage.getItem("eventCalendar")) || []
    eventos.forEach(element => {
        calendar.addEvent(element)
    });

    calendar.render()

    //ADD eventos
    window.addEvent = function() {
        document.getElementById('txt_training').classList.remove("erroIten")
        document.getElementById('dt_evento').classList.remove("erroIten")
        document.getElementById('txt_training').classList.remove("erroIten")
        document.getElementById('txt_responsavel').classList.remove("erroIten")
        document.getElementById('TipoEvent').classList.remove("erroIten")
        document.getElementById('Areas').classList.remove("erroIten")
        document.getElementById('local_formato').classList.remove("erroIten")
        document.getElementById('Audiencia').classList.remove("erroIten")
        document.getElementById('dt_evento').classList.remove("erroIten")

        var title = document.getElementById('txt_training').value
        var responsavel = document.getElementById('txt_responsavel').value
        var tipo_evento = document.getElementById('TipoEvent').value
        var area = document.getElementById('Areas').value
        var local = document.getElementById('local_formato').value
        var audiencia = document.getElementById('Audiencia').value
        var date = document.getElementById('dt_evento').value

        let erroForms = false

        if (title == '') {
            document.getElementById('txt_training').classList.add("erroIten")
            erroForms = true
        }
        if (responsavel == ''){
            document.getElementById('txt_responsavel').classList.add("erroIten")
            erroForms = true
        }
        if (tipo_evento == ''){
            document.getElementById('TipoEvent').classList.add("erroIten")
            erroForms = true
        }
        if (area == ''){
            document.getElementById('Areas').classList.add("erroIten")
            erroForms = true
        }
        if (local == ''){
            document.getElementById('local_formato').classList.add("erroIten")
            erroForms = true
        }
        if (audiencia == ''){
            document.getElementById('Audiencia').classList.add("erroIten")
            erroForms = true
        }
        if (date == ''){
            document.getElementById('dt_evento').classList.add("erroIten")
            erroForms = true
        }
        if (!erroForms){
            document.getElementById('txt_training').value = ''
            document.getElementById('txt_responsavel').value = ''
            document.getElementById('TipoEvent').value = ''
            document.getElementById('Areas').value = ''
            document.getElementById('local_formato').value = ''
            document.getElementById('Audiencia').value = ''
            document.getElementById('dt_evento').value = ''

            var objectEvent = {
                id: Date.now(),
                title: title,
                respon: responsavel,
                tipo: tipo_evento,
                time: area,
                local: local,
                audiencia: audiencia,
                start: date,
                allDay: true
            }

            calendar.addEvent(objectEvent)
            salvarLocal(objectEvent)

            document.getElementById('cx_newEvent').classList.add('hidden')
            document.getElementById("cx_myEvents").classList.remove("hidden")
        }
    }
    //Deletar eventos
    
})

function salvarLocal (objectEvent) {
    const eventos = JSON.parse(localStorage.getItem("eventCalendar")) || []
    eventos.push(objectEvent)
    localStorage.setItem('eventCalendar', JSON.stringify(eventos))
    reloadPag()
}

function salvarAlteracao (objectEvent, tipo) {
    const eventos = JSON.parse(localStorage.getItem("eventCalendar")) || []
    let newEventos = []

    if (tipo == 1){
        eventos.forEach(evento => { 
            if(evento.id == objectEvent.id){
                evento = objectEvent
            }
            newEventos.push(evento)
        })
    } else {
        eventos.forEach(evento => { 
            if(evento.id != objectEvent){
                newEventos.push(evento)
            }
        })
    }
    localStorage.setItem('eventCalendar', JSON.stringify(newEventos))
    reloadPag()
}
//Alterar eventos
function editEvent(eventId) {
    const event = calendar.getEventById(eventId)
    const props = event._def.extendedProps
    selectedEvent = event

    document.getElementById('txt_training_edit').value = event.title
    document.getElementById('txt_responsavel_edit').value = props.respon
    document.getElementById('TipoEvent_edit').value = props.tipo
    document.getElementById('Areas_edit').value = props.time
    document.getElementById('local_formato_edit').value = props.local
    document.getElementById('Audiencia_edit').value = props.audiencia
    document.getElementById('dt_evento_edit').value = event.start.toISOString().split('T')[0]

    document.getElementById('cx_editEvent').classList.remove('hidden')
    document.getElementById("cx_myEvents").classList.add("hidden")
}

document.querySelector("#btn_salvar_edit").addEventListener('click', function updateEvent() {
    var title = document.getElementById('txt_training_edit').value
    var responsavel = document.getElementById('txt_responsavel_edit').value
    var tipo_evento = document.getElementById('TipoEvent_edit').value
    var area = document.getElementById('Areas_edit').value
    var local = document.getElementById('local_formato_edit').value
    var audiencia = document.getElementById('Audiencia_edit').value
    var date = document.getElementById('dt_evento_edit').value

    let erroForms = false

    if (title == '') {
        document.getElementById('txt_training').classList.add("erroIten")
        erroForms = true
    }
    if (responsavel == ''){
        document.getElementById('txt_responsavel').classList.add("erroIten")
        erroForms = true
    }
    if (tipo_evento == ''){
        document.getElementById('TipoEvent').classList.add("erroIten")
        erroForms = true
    }
    if (area == ''){
        document.getElementById('Areas').classList.add("erroIten")
        erroForms = true
    }
    if (local == ''){
        document.getElementById('local_formato').classList.add("erroIten")
        erroForms = true
    }
    if (audiencia == ''){
        document.getElementById('Audiencia').classList.add("erroIten")
        erroForms = true
    }
    if (date == ''){
        document.getElementById('dt_evento').classList.add("erroIten")
        erroForms = true
    }
    if (!erroForms){
        document.getElementById('txt_training').value = ''
        document.getElementById('txt_responsavel').value = ''
        document.getElementById('TipoEvent').value = ''
        document.getElementById('Areas').value = ''
        document.getElementById('local_formato').value = ''
        document.getElementById('Audiencia').value = ''
        document.getElementById('dt_evento').value = ''

        selectedEvent.setProp('title', title)
        selectedEvent.setExtendedProp('respon', responsavel)
        selectedEvent.setExtendedProp('tipo', tipo_evento)
        selectedEvent.setExtendedProp('time', area)
        selectedEvent.setExtendedProp('local', local)
        selectedEvent.setExtendedProp('audiencia', audiencia)
        selectedEvent.setStart(date)
        selectedEvent.setEnd(null);  // Remove o fim para garantir que seja um evento de um dia
        
        var objectEvent = {
            id: selectedEvent.id,
            title: title,
            respon: responsavel,
            tipo: tipo_evento,
            time: area,
            local: local,
            audiencia: audiencia,
            start: date,
            allDay: true
        }
        salvarAlteracao(objectEvent, 1)

    document.getElementById('cx_editEvent').classList.add('hidden')
    document.getElementById("cx_myEvents").classList.remove("hidden")
    }
})

function deleteEvent(eventId) {
    const event = calendar.getEventById(eventId)
    event.remove()

    salvarAlteracao(eventId, 0)
}

function reloadPag(){
    document.querySelector("#addEventos").innerHTML = ''
    document.querySelector("#myEventosEdit").innerHTML = ''

    const eventos = JSON.parse(localStorage.getItem("eventCalendar")) || []
    eventos.forEach(evento => {
        proxEventos(evento)
        myEventos(evento)
    });
}

//Loading da pagina
const eventos = JSON.parse(localStorage.getItem("eventCalendar")) || []
eventos.forEach(evento => {
    proxEventos(evento)
    myEventos(evento)
});

function proxEventos(evento){
    let date = evento.start
    date = date.split('-')
    const cardTarefa = `
    <div class="cardColumn">
        <h1>${evento.title}</h1>
        <h2>${evento.local} - ${date[2]}/${date[1]}</h2>
    </div>
    `
    const card = document.createElement("div")
    card.classList.add("ajustesFlex")
    card.innerHTML = cardTarefa
    document.querySelector("#addEventos").appendChild(card)
}

function myEventos(evento){
    let date = evento.start
    date = date.split('-')
    const cardTarefa = `
    <div class="cardColumnEdit">
        <div>
            <h1>${evento.title}</h1>
            <h2>${evento.local} - ${date[2]}/${date[1]}</h2>
        </div> 
        <div class="columnBTN">
            <button onclick="editEvent(${evento.id})"><img class="editar" src="./assets/editar.png"/></button>
            <button onclick="deleteEvent(${evento.id})"><img class="delete" src="./assets/delete.png"/></button>
        </div>
    </div>
    `
    const card = document.createElement("div")
    card.classList.add("ajustesFlex")
    card.innerHTML = cardTarefa
    document.querySelector("#myEventosEdit").appendChild(card)
}