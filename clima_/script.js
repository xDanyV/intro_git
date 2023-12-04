

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("searchBtn").onclick = function () {
        carga_clima();
    };
});

function carga_clima() {
    const api_Key = "9e24c975965f1dce510991cdf1d323b9";
    const ciudad = document.getElementById("txtCiudad").value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${api_Key}&units=metric&lang=es`;

    document.getElementById("errorAlert").classList.add("d-none");
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Ciudad no encontrada");
            }
            return response.json();
        })
        .then(data => {
            mostrar_Datos(data);
        })
        .catch(error => {
            mostrarError(error.message);
        });
}


function mostrar_Datos(data) {
    const climaInfoDiv = document.getElementById("climaInfo");
    console.log(data);
    climaInfoDiv.innerHTML = `
        <h2 class="mb-4">${data.name}</h2>
        <p>Temperatura: ${data.main.temp}°C</p>
        <p>Descripción: ${data.weather[0].description}</p>
        <p>Humedad: ${data.main.humidity}%</p>
        <p>Temperatura Máxima: ${data.main.temp_max}°C</p>
        <p>Temperatura Mínima: ${data.main.temp_min}°C</p>
    `;
    climaInfoDiv.classList.remove("d-none");
}

document.getElementById("searchBtn").onclick

function mostrarError(mensaje) {
    const errorAlert = document.getElementById("errorAlert");
    errorAlert.textContent = mensaje;
    errorAlert.classList.remove("d-none");

    const climaInfoDiv = document.getElementById("climaInfo");
    climaInfoDiv.classList.add("d-none");
}