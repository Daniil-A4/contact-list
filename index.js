const {createServer} = require('http')
const {readFileSync} = require('fs')
const contacts = []

const server = createServer()

server.listen(2005)

server.addListener('request', handleRequest) 



function handleRequest(request, response) {
	const {method, url} = request

	if (url.startsWith('/api/')) {
		const endPoint = url.split('/')[2]

		if (endPoint == 'contact' && method == 'POST') {
			getBody(request, body => {
				contacts.push(JSON.parse(body))
				response.end('{"success": true}')
			})
			// makeNextSteps(body)
		} 
		else if (endPoint == 'contacts' && method == 'GET') {
			response.end(JSON.stringify(contacts))
		}
	} 
	else {
		try {
			const file = readFileSync(url.slice(1) || 'index.html')
			response.end(file)
		} catch (error) {
			response.end('file is not found')
		}
	}
	
}

function getBody(stream, cb) {
	const chunks = []
	
	stream.addListener('data', chunk => chunks.push(chunk)) 
	stream.addListener('end', () => cb(Buffer.concat(chunks).toString()))

}

