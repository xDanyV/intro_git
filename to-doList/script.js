let tablaTareas = document.getElementById("listaTareas");

let Tareas = [];

document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("tareas")) {
        Tareas = JSON.parse(localStorage.getItem("tareas"));
        Tareas.forEach(function(tarea){
            agregarFromStorage(tarea.texto,tarea.completada);
        });
    }
});

const btnAgregar = document.getElementById("btnAgregar");

btnAgregar.onclick = function () {
    agregarTarea();
}

const btnDeleteCache = document.getElementById("btnDeleteCache");

btnDeleteCache.onclick = function(){
    localStorage.removeItem("tareas");
    location.reload(true);
}

function agregarFromStorage(tarea,completada) {
    let li = document.createElement("li");

    li.innerHTML = tarea;
    li.classList.add("list-group-item");

    
    if (completada) {
        li.classList.add("tachado");
    }

    li.onclick = function () {
        li.classList.toggle("tachado");

        completada = !completada;
        actualizarTarea(tarea, completada);
    }

    tablaTareas.appendChild(li);
    document.getElementById("txtTarea").value = "";
}

function agregarTarea() {
    let Tarea = document.getElementById("txtTarea").value;
    
    if (Tarea == "") {
        alert("Agrega una tarea");
    } else {
        Tareas.push({texto: Tarea, completada: false});
        let li = document.createElement("li");

        li.innerHTML = Tarea;
        li.classList.add("list-group-item");

        li.onclick = function () {
            li.classList.toggle("tachado");
            actualizarTarea(Tarea);
        }

        tablaTareas.appendChild(li);
        document.getElementById("txtTarea").value = "";

        localStorage.setItem("tareas", JSON.stringify(Tareas));

    }
}

function actualizarTarea(texto){
    Tareas.forEach(function(item){
        if(item.texto == texto){
            item.completada = !item.completada;
            localStorage.setItem("tareas", JSON.stringify(Tareas));
            return;
        }
    });
}
