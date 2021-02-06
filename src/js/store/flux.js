const getState = ({ getStore, setStore }) => {
	return {
		store: {
			//Your data structures, A.K.A Entities
			allContacts: [],
			singleContact: {}
		},
		actions: {
			//(Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()
			// fetchContacts: async (id = null) => {
			// 	let url = "https://assets.breatheco.de/apis/fake/contact/agenda/alejo";
			// 	if (id != null) {
			// 		url += "/" + id;
			// 		console.log("Link", url);
			// 	}
			// 	let res = await fetch(url);
			// 	if (res.ok) {
			// 		let body = await res.json();
			// 		if (id == null) {
			// 			setStore({ contacts: body });
			// 		}
			// 		return true;
			// 	} else {
			// 		console.log(res.status);
			// 		return false;
			// 	}
			// },
			// para los metodos post y put
			// let url = "https://assets.breatheco.de/apis/fake/contact/"

			// Fetch ContactList
			// getContacts: () => {
			// 	console.log("---Flux Get Contacts---");
			// 	const config = {
			// 		method: "GET",
			// 		headers: {
			// 			"Content-type": "application/json"
			// 		}
			// 	};
			// 	const response = fetch("https://assets.breatheco.de/apis/fake/contact/agenda/alejo", config);
			// 	const json = response.json();
			// 	console.log("--json-allContacts--", json);
			// 	setStore({ allContacts: json.results });
			// 	console.log("todos los contactos", allContacts);
			// }

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
						console.log(data);
						setStore({ allContacts: data });
					})
					.catch(error => console.log(error));
			}
		}
	};
};

export default getState;
