const getState = ({ getStore, setStore }) => {
	return {
		store: {
			//Your data structures, A.K.A Entities
			allContacts: []
		},
		actions: {
			// Agregar un nuevo Contacto a la Agenda
			addContacts: (name, address, phone, email) => {
				console.log("---Flux add - Put Contact---");
				fetch("https://assets.breatheco.de/apis/fake/contact/", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						full_name: name,
						email,
						agenda_slug: "alejo",
						address,
						phone
					})
				})
					.then(data => data.json().then(response => ({ status: data.status, resMsg: response.msg })))
					.then(({ status, resMsg }) => {
						if (status === 400) alert(resMsg);
					})
					.catch(err => alert(err.message));
			},
			// Eliminar un Contacto de la Agenda
			delContacts: idToDelete => {
				console.log("---Flux Delete Contact---");
				fetch(`https://assets.breatheco.de/apis/fake/contact/${idToDelete}`, {
					method: "DELETE",
					headers: { "Content-Type": "application/json" }
				})
					.then(res => res.json())
					.then(() => {
						fetch("https://assets.breatheco.de/apis/fake/contact/agenda/alejo")
							.then(red => red.json())
							.then(data => setStore({ allContacts: data }));
					})
					.catch(err => alert(err.message));
			},
			// Cambiar valores de un Contacto de la Agenda
			editContacts: (name, address, phone, email, idToEdit) => {
				fetch(`https://assets.breatheco.de/apis/fake/contact/${idToEdit}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						agenda_slug: "alejo",
						full_name: name,
						email,
						address,
						phone
					})
				})
					.then(data => data.json().then(response => ({ status: data.status, resMsg: response.msg })))
					.then(({ status, resMsg }) => {
						if (status === 400) alert(resMsg);
					})
					.then(() => {
						fetch("https://assets.breatheco.de/apis/fake/contact/agenda/alejo")
							.then(res => res.json())
							.then(data => setStore({ allContacts: data }));
					})
					.catch(err => alert(err.message));
			},
			// Obtener de la API todos los Contactos de la Agenda
			getContacts: () => {
				console.log("---Flux Get Contacts---");
				const config = {
					method: "GET",
					headers: {
						"Content-type": "application/json"
					}
				};
				fetch("https://assets.breatheco.de/apis/fake/contact/agenda/alejo", config)
					.then(response => response.json())
					.then(data => {
						console.log("--json-allContacts--", data);
						setStore({ allContacts: data });
					})
					.catch(error => console.log(error));
			}
		}
	};
};

export default getState;
