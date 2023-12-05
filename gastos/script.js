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
        this.gastos = this.gastos.filter(g => g.id !== id);
        localStorage.setItem("gastos", JSON.stringify(this.gastos));
    }

    obtenerTotal() {
        let total = 0;
        this.gastos.forEach(g => {
            total = total + g.cantidad;
        })
        return total;
    }

}

const control = new ControlGastos();
const formG = document.getElementById("formGastos");
const listaGastos = document.getElementById("listaGastos");


formG.addEventListener("submit", (e) => {
    e.preventDefault();

    const cantidad = parseFloat(document.getElementById("txtCantidad").value);
    const categoria = document.getElementById("selectCategoria").value;
    const descripcion = document.getElementById("txtDescripcion").value;

    const gasto = control.agregarGastos(cantidad, categoria, descripcion);
    actualizarUI(gasto);
    calcularTotal();
});


function actualizarUI(gasto) {
    const li = document.createElement("li");
    li.innerHTML = `${gasto.categoria}, ${gasto.cantidad}, ${gasto.descripcion}`;

    const btnEliminar = document.createElement("button");
    btnEliminar.innerHTML = "X"
    btnEliminar.classList.add("btn", "btn-danger")
    btnEliminar.onclick = function () {
        control.eliminarGasto(gasto.id);
        li.remove();
    }
    li.appendChild(btnEliminar);
    listaGastos.appendChild(li);
    calcularTotal();
}

document.addEventListener("DOMContentLoaded", () => {
    control.gastos.forEach(g => {
        actualizarUI(g);
    });
    calcularTotal();
});

function calcularTotal() {
    const total = document.getElementById("totalGastos");

    total.innerHTML = `$ `+control.obtenerTotal();
}
