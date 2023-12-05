class Gasto {
    constructor(id, cantidad, categoria, descripcion) {
        this.id = id;
        this.cantidad = cantidad;
        this.categoria = categoria;
        this.descripcion = descripcion;
    }
}

class ControlGastos {
    constructor() {
        this.gastos = JSON.parse(localStorage.getItem("gastos")) || [];
    }

    agregarGastos(cantidad, categoria, descripcion) {
        let nuevoId = 1;
        if (this.gastos.length > 0) {
            const ids = this.gastos.map(g => g.id);
            nuevoId = Math.max(...ids) + 1;
        }
        const gasto = new Gasto(nuevoId, cantidad, categoria, descripcion)

        this.gastos.push(gasto);

        localStorage.setItem("gastos", JSON.stringify(this.gastos));
        return gasto;
    }

    eliminarGasto(id) {
        if (confirm("¿Estás seguro de que quieres eliminar este gasto?")) {
            this.gastos = this.gastos.filter(g => g.id !== id);
            localStorage.setItem("gastos", JSON.stringify(this.gastos));
            return true;
        }
        return false;

    }

    obtenerTotal() {
        let total = 0;
        this.gastos.forEach(g => {
            total = total + g.cantidad;
        })
        return total;
    }
    editarGasto(idEdit, cantidad, categoria, descripcion) {
        const gastoEditIndex = this.gastos.findIndex(g => g.id === idEdit);

        if (gastoEditIndex !== -1) {
            // Actualizar los datos del gasto
            this.gastos[gastoEditIndex].cantidad = cantidad;
            this.gastos[gastoEditIndex].categoria = categoria;
            this.gastos[gastoEditIndex].descripcion = descripcion;

            // Guardar los cambios en localStorage
            localStorage.setItem("gastos", JSON.stringify(this.gastos));

            return this.gastos[gastoEditIndex];
        } else {
            console.error("El gasto con el ID especificado no fue encontrado.");
            return null;
        }
    }


}

const control = new ControlGastos();
const formG = document.getElementById("formGastos");
const listaGastos = document.getElementById("listaGastos");
const btnDelRegistros = document.getElementById("btnDelRegistros");


formG.addEventListener("submit", (e) => {
    e.preventDefault();

    const idEdit = parseInt(formG.dataset.idEdit, 10) || 0;
    let gasto = [];


    if (idEdit != 0 || isNaN(idEdit)) {

        const cantidad = parseFloat(document.getElementById("txtCantidad").value);
        const categoria = document.getElementById("selectCategoria").value;
        const descripcion = document.getElementById("txtDescripcion").value;


        gasto = control.editarGasto(idEdit, cantidad, categoria, descripcion);

        formG.dataset.idEdit = 0;
        location.reload();
    } else {
        const cantidad = parseFloat(document.getElementById("txtCantidad").value);
        const categoria = document.getElementById("selectCategoria").value;
        const descripcion = document.getElementById("txtDescripcion").value;

        gasto = control.agregarGastos(cantidad, categoria, descripcion);
        formG.reset();
    }

    actualizarUI(gasto);
    calcularTotal();

    formG.reset();

});


function actualizarUI(gasto) {
    const li = document.createElement("li");
    li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

    const divContenido = document.createElement("div");

    const cantidad = document.createElement("p");
    cantidad.textContent = `$ ${gasto.cantidad}`;

    const categoria = document.createElement("p");
    categoria.textContent = `Categoría: ${gasto.categoria}`;

    const descripcion = document.createElement("p");
    descripcion.textContent = `Descripción: ${gasto.descripcion}`;

    divContenido.appendChild(cantidad);
    divContenido.appendChild(categoria);
    divContenido.appendChild(descripcion);

    const btnEliminar = document.createElement("button");
    btnEliminar.innerHTML = "X";
    btnEliminar.classList.add("btn", "btn-danger", "btn-sm");
    btnEliminar.onclick = function () {
        if (control.eliminarGasto(gasto.id)) {
            li.remove();
            calcularTotal();
        }
    };

    li.addEventListener("dblclick", function () {
        cargaDatos(gasto);
    });

    li.appendChild(divContenido);
    li.appendChild(btnEliminar);
    listaGastos.appendChild(li);

    calcularTotal();
}

function cargaDatos(gasto) {
    const cantidadInput = document.getElementById("txtCantidad");
    const categoriaInput = document.getElementById("selectCategoria");
    const descripcionInput = document.getElementById("txtDescripcion");

    formG.dataset.idEdit = gasto.id;
    cantidadInput.value = gasto.cantidad;
    categoriaInput.value = gasto.categoria;
    descripcionInput.value = gasto.descripcion;
}


document.addEventListener("DOMContentLoaded", () => {
    control.gastos.forEach(g => {
        actualizarUI(g);
    });
    calcularTotal();
});

function calcularTotal() {
    const total = document.getElementById("totalGastos");

    total.innerHTML = `$ ` + control.obtenerTotal();
}

btnDelRegistros.addEventListener("click", function () {
    if (confirm("¿Estás seguro de que quieres eliminar todos los registros?")) {
        control.gastos = [];
        localStorage.removeItem("gastos");
        listaGastos.innerHTML = "";

        calcularTotal();
    }
});