

document.addEventListener("DOMContentLoaded", () => {
    const campo_r = document.getElementById("campo_respuesta");

    fetch("/memoria", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(response => response.json())
        .then(data => {
            //console.log(data.message.response);
            campo_r.innerHTML = data.message.response;
        })
        .catch((error) => {
            console.error("Error: " + error);
        })
})

document.getElementById("btn_enviar").addEventListener("click", async () => {
    const prompt_v = document.getElementById("prompt").value;

    const chatContainer = document.getElementById("chat_container");

    const divRespuestaInicial = document.createElement("div");
    divRespuestaInicial.classList.add("message", "user-message");
    divRespuestaInicial.textContent = prompt_v;

    try {
        
        const response = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: prompt_v })
        });

        const data = await response.json();

        const divRespuestaIA = document.createElement("div");
        divRespuestaIA.classList.add("message", "bot-message");
        divRespuestaIA.textContent = data.message.response;

        chatContainer.prepend(divRespuestaIA);
        chatContainer.prepend(divRespuestaInicial);
    } catch (error) {
        console.error("Error: ", error);
    }

    document.getElementById("prompt").value = "";
});
