const form = document.getElementById('contact-form')
const contactList = document.getElementById('contact-list')
const init = {method: 'POST', headers: {'content-type': 'application/json'}, body: ''}


form.addEventListener('submit', handleSubmit)

getContacts().then(show)

function handleSubmit() {
	// get form data
	// send contact data to the server
	// update contact list in view

	const contact = getFormData()
	sendContact(contact).then(({success}) => {
		if (success) {
			const li = document.createElement('li')
			li.textContent = `${contact.firstName} ${contact.lastName}: ${contact.phone}`
			contactList.append(li)
			form.reset()
		}
	})
	// addContactToList(contact)
}

function getFormData() {
	const conactInfo = {}
	conactInfo.firstName = form.firstname.value
	conactInfo.lastName = form.lastname.value
	conactInfo.phone = form.phone.value
	return conactInfo
}

function sendContact(contact) {
	const json = JSON.stringify(contact)
	init.body = json
	return fetch('/api/contact', init).then(response => response.json())
}

function getContacts() {
	return fetch('/api/contacts').then(response => response.json())
}

function show(contacts) {
	// let html = ''
	// for (const contact of contacts) {
	// 	html += `<li>${contact.firstName} ${contact.lastName}: ${contact.phone}</li>`
	// }
	// contactList.innerHTML = html

	contactList.replaceChildren(...contacts.map(contact => Object.assign(
		document.createElement('li'), {textContent: `${contact.firstName} ${contact.lastName}: ${contact.phone}`}
	)))
}





