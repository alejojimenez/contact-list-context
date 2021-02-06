import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { ContactCard } from "../component/ContactCard.js";
import { Modal } from "../component/Modal";
import { Context } from "../store/appContext.js";

export const Contacts = props => {
	const [state, setState] = useState({
		showModal: false,
		idDeleteContact: null
	});
	const { store, actions } = useContext(Context);
	useEffect(() => {
		actions.getContacts();
	}, []);

	return (
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
								key={index}
								id={++index}
								contact={item}
								// contact={contact}
								onDelete={() => setState({ showModal: true, idDeleteContact: data.id })}
							/>
						))}
					</ul>
				</div>
			</div>
			<Modal
				show={state.showModal}
				onClose={() => setState({ showModal: false, idDeleteContact: null })}
				idDeleteContact={state.idDeleteContact}
			/>
		</div>
	);
};
