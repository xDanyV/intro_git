const { OpenAI } = require("langchain/llms/openai");
const { BufferMemory } = require("langchain/memory");
const { ConversationChain } = require("langchain/chains");
require('dotenv').config();
const pizzip = require("pizzip");
const fs = require("fs").promises;

const xlsx = require('xlsx');

//npm install xlsx

async function crear_escenario() {
    try {

        const prompt = './prompt.txt';
        const msj_txt = await fs.readFile(prompt, 'utf-8')


        const filePath = './data_Sample.xlsx';
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(worksheet);
        const excelDataAsString = JSON.stringify(data);

        const escenario = msj_txt + "\n" + excelDataAsString;

        return escenario;
    } catch (e) {
        console.error(e);
        return "";
    }
}

const readline = require("readline");
const { Console } = require("console");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const llm = new OpenAI({
    //openAIApiKey: "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",
    openAIApiKey: process.env.OPENAI_API_KEY,
});

const memory = new BufferMemory();
const chain = new ConversationChain({ llm: llm, memory: memory });

async function mensaje1(escenario) {
    try {
        const res1 = await chain.call({ input: escenario });
        console.log(res1);
    } catch (error) {
        console.log(error);
    }
}

async function iniciar_Conversacion() {
    const escenario = await crear_escenario();
    return await consultar(escenario);

}

async function consultar(prompt) {
    try {
        const res1 = await chain.call({ input: prompt });
        return(res1);
    } catch (error) {
        console.error('Error en consultar:', error);
        return "Error:Consultar";
    }
}

async function recibirMsj() {
    rl.question("Prompt (escriba salir para terminar):", async (input) => {
        if (input === "salir") {
            console.log("Terminar");
            process.exit(0);
        } else {
            await consultar(input);
            recibirMsj();
        }
    });
}

module.exports = {
    consultar,
    iniciar_Conversacion
};

