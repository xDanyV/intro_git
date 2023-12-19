const express = require("express");
//const { consultar } = require("./chat");

const { consultar } = require("./memoria");
const { iniciar_Conversacion } = require("./memoria");

const port = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/memoria", async (req, res) => {
    try {
        const respuesta = await iniciar_Conversacion();
        res.json({ message: respuesta });
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ error: error.message });
    }
})


app.post("/chat", async (req, res) => {
    const prompt = req.body.prompt;
    try {
        const respuesta = await consultar(prompt);
        res.json({ message: respuesta });
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ error: error.message });
    }
})

app.listen(port, () => {
    console.log("Servidor corriendo en http://localhost:" + port);
})