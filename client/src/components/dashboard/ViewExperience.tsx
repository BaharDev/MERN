import React, { Fragment, useState } from 'react';
import { Experience, Profile } from '../../types/profile';
import Moment from 'react-moment';
import ConfirmationModal, { DELETEType } from '../ConfirmationModal';

export type TViewExperience = {
	experience: Experience[];
};
export const ViewExperience: React.FC<TViewExperience> = ({ experience }) => {
	const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false);
	const [ itemToDelete, setItemToDelete ] = useState<number>(0);

	const deleteAction = (id: any) => {
		setIsModalOpen(true);
		setItemToDelete(id);
	};
	return (
		<Fragment>
			<h2 className="my-2">Experience Credentials</h2>
			<table className="table">
				<thead>
					<tr>
						<th>Company</th>
						<th className="hide-sm">Title</th>
						<th className="hide-sm">Years</th>
						<th />
					</tr>
				</thead>
				<tbody>
					{experience.map((e) => {
						return (
							<tr key={e._id}>
								<td>{e.company}</td>
								<td className="hide-sm">{e.title}</td>
								<td className="hide-sm">
									<Moment format="YYYY/MM/DD">{e.from}</Moment> -{' '}
									{e.current ? `Current` : <Moment format="YYYY/MM/DD">{e.to}</Moment>}
								</td>
								<td>
									<button
										type="button"
										onClick={(c) => deleteAction(e._id)}
										className="btn btn-danger"
									>
										Delete
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
			<ConfirmationModal id={itemToDelete} type={DELETEType.EXPERIENCE} modalIsOpen={isModalOpen} />
		</Fragment>
	);
};
