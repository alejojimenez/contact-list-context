import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export const EditContact = props => {
	const { actions, store } = useContext(Context);
	const contact = store.allContacts.find(element => element.id == props.match.params.id);
	const [state, setState] = useState(contact);

	const [disabledButton, setDisabledButton] = useState(true);

	useEffect(() => {
		if (state.full_name && state.address && state.phone && state.email) {
			setDisabledButton(false);
		} else {
			setDisabledButton(true);
		}
	}, [state]); // reloads the page every time the state changes

	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Edit contact</h1>
				<form>
					<div className="form-group">
						<label>Full Name</label>
						<input
							onChange={event => {
								setState({ ...state, full_name: event.target.value });
							}}
							type="text"
							className="form-control"
							placeholder="Full Name"
							value={state.full_name}
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							onChange={event => {
								setState({ ...state, email: event.target.value });
							}}
							type="email"
							className="form-control"
							placeholder="Enter email"
							value={state.email}
						/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input
							onChange={event => {
								setState({ ...state, phone: event.target.value });
							}}
							type="phone"
							className="form-control"
							placeholder="Enter phone"
							value={state.phone}
						/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input
							onChange={event => {
								setState({ ...state, address: event.target.value });
							}}
							type="text"
							className="form-control"
							placeholder="Enter address"
							value={state.address}
						/>
					</div>
					<button
						disabled={disabledButton}
						onClick={() => {
							actions.editContacts(
								state.full_name,
								state.address,
								state.phone,
								state.email,
								props.match.params.id
							);
							props.history.push("/");
						}}
						type="button"
						className={`btn ${disabledButton ? "btn-secondary" : "btn-primary"} form-control`}>
						save
					</button>
					<Link className="mt-3 w-100 text-center" to="/">
						or get back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
};

EditContact.propTypes = {
	match: PropTypes.object,
	history: PropTypes.object
};
