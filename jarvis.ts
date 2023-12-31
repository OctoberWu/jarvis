import { cac } from 'cac'
import { createServer } from "./src/node/server"

const cli = cac('my-cli')

// --- options ---
cli.option('--type [type]', 'Choose a project type', {
	default: 'node',
})
cli.option('--name <name>', 'Provide your name')
cli.option('--port <port>', '[number]  port to listen to')

cli.command('[root]', 'activate JARVIS service').action((files, options) => {
	console.log('JARVIS is online!');
	createServer()
})

// --- commands ---
cli.command('greets [...files]', 'Jarvis greeting test').action((files, options) => {
	console.log('CIAO!')
	// console.log(files, options)
})


cli.help()

cli.version('0.0.1')

cli.parse()

