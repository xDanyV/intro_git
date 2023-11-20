let tablaTareas = document.getElementById("listaTareas");

let Tareas = [];

document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("tareas")) {
        Tareas = JSON.parse(localStorage.getItem("tareas"));
        Tareas.forEach(function(tarea){
            agregarFromStorage(tarea);
        });
    }
});

const btnAgregar = document.getElementById("btnAgregar");

btnAgregar.onclick = function () {
    agregarTarea();
}

function agregarFromStorage(tarea) {
    let li = document.createElement("li");

    li.innerHTML = tarea;
    li.classList.add("list-group-item");

    li.onclick = function () {
        li.classList.toggle("tachado");
    }

    tablaTareas.appendChild(li);
    document.getElementById("txtTarea").value = "";
}

function agregarTarea() {
    let Tarea = document.getElementById("txtTarea").value;
    
    if (Tarea == "") {
        alert("Agrega una tarea");
    } else {
        Tareas.push(Tarea);
        let li = document.createElement("li");

        li.innerHTML = Tarea;
        li.classList.add("list-group-item");

        li.onclick = function () {
            li.classList.toggle("tachado");
        }

        tablaTareas.appendChild(li);
        document.getElementById("txtTarea").value = "";

        localStorage.setItem("tareas", JSON.stringify(Tareas));

    }
}
