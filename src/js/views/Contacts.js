import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { ContactCard } from "../component/ContactCard.js";
import { Modal } from "../component/Modal";
import { Context } from "../store/appContext.js";

export const Contacts = () => {
	const [state, setState] = useState({
		showModal: false,
		idDeleteContact: null,
		idEditContact: null
	});
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getContacts();
	}, []);

	console.log("Entrando a Contacts en component Constacts", store.allContacts);

	return (
		<>
			<div className="container">
				<div>
					<p className="text-right my-3">
						<Link className="btn btn-success" to="/add">
							Add new contact
						</Link>
					</p>
					<div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
						<ul className="list-group pull-down" id="contact-list">
							{store.allContacts.map((item, index) => (
								<ContactCard
									name={item.full_name}
									address={item.address}
									phone={item.phone}
									email={item.email}
									key={index}
									index={index}
									id={item.id}
									onDelete={() => setState({ showModal: true, idDeleteContact: item.id })}
									onEdit={() => setState({ idEditContact: item.id })}
								/>
							))}
						</ul>
					</div>
				</div>
				<Modal
					show={state.showModal}
					onClose={() => setState({ showModal: false })}
					idToDelete={state.idDeleteContact}
				/>
			</div>
		</>
	);
};
