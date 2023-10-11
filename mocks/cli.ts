import { cac } from 'cac'

const cli = cac('my-cli');

// --- options ---
cli.option('--type [type]', 'Choose a project type', {
	default: 'node',
})
cli.option('--name <name>', 'Provide your name')
cli.option('--port <port>', '[number]  port to listen to')

cli.command('[root]', 'activate JARVIS service').action((files, options) => {
	console.log('JARVIS is online!');
})

// --- commands ---
cli.command('lint [...files]', 'Lint files').action((files, options) => {
	console.log(files, options)
})

cli.command('hi [...files]', 'Lint files').action((files, options) => {
	console.log('testing ')
	console.log(files, options)
})


cli.help()

cli.version('0.0.1')

cli.parse()

