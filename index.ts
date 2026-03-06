#!/usr/bin/env node
const { Command } = require('commander')
const axios = require('axios') //it helps with fetch 

const program = new Command()

program
    .command('greet <name>')
    .action((name) => {
        console.log(`Hello ${name}`)
    })


program
    .command('add <a> <b>')
    .action((a, b) => {
        console.log(Number(a) + Number(b))
    })
program
    .command('sub <a> <b>')
    .action((a, b) => {
        console.log(Number(a) - Number(b))
    })

program
    .command('mul <a> <b>')
    .action((a, b) => {
        console.log(Number(a) * Number(b))
    })
program
    .command('div <a> <b>')
    .action((a, b) => {
        console.log(Number(a) / Number(b))
    })
program
    .command('melon <kuchv>')
    .action((kuchv) => {
        console.log(`Gayatri ${kuchv}`)
    })
program
    .command('s <hee>')
    .action((hee) => {
        console.log(`sneha ${hee}`)
    })
program
    .command('joke')
    .action(async () => {
        try {
            const res = await axios.get("https://official-joke-api.appspot.com/random_joke")
            const { setup, punchline } = res.data
            console.log(setup)
            await new Promise(resolve => {
                setTimeout(resolve, 2000)
            })
            console.log(punchline)
        }
        catch (err) {
            console.log(err)
        }
    })
program
    .command("quote")
    .description("Fetch a random quote")
    .action(async () => {
        try {
            const response = await axios.get("https://zenquotes.io/api/random");
            const data = response.data[0];
            console.log(`\n"${data.q}"\n  - ${data.a}\n`);
        } catch (error) {
            console.error("Error fetching quote:", error.message);
        }
    });

program
    .command("pokemon <name>")
    .description("Fetch information about a pokemon")
    .action(async (name) => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
            const data = response.data;
            console.log(`\nName: ${data.name.toUpperCase()}`);
            console.log(`Height: ${data.height}`);
            console.log(`Weight: ${data.weight}`);
            console.log(`Base Experience: ${data.base_experience}`);
            const types = data.types.map((t) => t.type.name).join(", ");
            console.log(`Types: ${types}\n`);
        } catch (error) {
            console.error(`Error fetching info for pokemon "${name}":`, error.response?.status === 404 ? "Not found" : error.message);
        }
    });

program.parse()
