import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { profileActions } from '../actions/profile';
import { useHistory } from 'react-router-dom';

export enum DELETEType {
	PROFILE = 'profile',
	EXPERIENCE = 'experience',
	EDUCATION = 'education'
}

export type TConfirmationModal = {
	type: DELETEType;
	modalIsOpen: boolean;
	deleteEducation(id: number, history: any): Promise<void>;
	deleteExperience(id: number, history: any): Promise<void>;
	deleteProfile(history: any): Promise<void>;
	id?: any;
};

const ConfirmationModal: React.FC<TConfirmationModal> = ({
	type,
	id,
	modalIsOpen,
	deleteEducation,
	deleteExperience,
	deleteProfile
}) => {
	const [ isOpen, setIsOpen ] = useState(modalIsOpen);
	const closeModal = () => {
		setIsOpen(false);
	};
	const history = useHistory();

	const doAction = () => {
		if (type === DELETEType.EDUCATION) {
			deleteEducation(id, history);
		}
		if (type === DELETEType.EXPERIENCE) {
			deleteExperience(id, history);
		}
		if (type === DELETEType.PROFILE) {
			deleteProfile(history);
		}
		closeModal();
	};
	useEffect(
		() => {
			setIsOpen(modalIsOpen);
		},
		[ modalIsOpen ]
	);
	return (
		<Modal isOpen={isOpen} onRequestClose={closeModal}>
			<h2>Are you sure you want to delete your {type}?</h2>
			{/* <button onClick={closeModal}>close</button> */}
			<div className="btn-container">
				<button type="button" className="btn btn-light" onClick={closeModal}>
					Cancel
				</button>
				<button type="button" className="btn btn-primary" onClick={doAction}>
					Ok
				</button>
			</div>
		</Modal>
	);
};

export default connect(null, { ...profileActions })(ConfirmationModal);
