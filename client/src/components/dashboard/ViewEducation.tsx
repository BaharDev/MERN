import React, { Fragment, useState } from 'react';
import { Education } from '../../types/profile';
import Moment from 'react-moment';
import { useHistory } from 'react-router-dom';
import ConfirmationModal, { DELETEType } from '../ConfirmationModal';

export type TViewEducation = {
  education: Education[];
};
export const ViewEducation: React.FC<TViewEducation> = ({ education }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<number>(0);


  const deleteAction = (id: any) => {
      setIsModalOpen(true);
      setItemToDelete(id);
  }
	return (
		<Fragment>
			<h2 className="my-2">Education Credentials</h2>
			<table className="table">
				<thead>
					<tr>
						<th>School</th>
						<th className="hide-sm">Degree</th>
						<th className="hide-sm">Years</th>
						<th />
					</tr>
				</thead>
				<tbody>
					{education &&
						education.map((e) => {
							return (
								<tr key={e._id}>
									<td>{e.school}</td>
									<td className="hide-sm">{e.degree}</td>
									<td className="hide-sm">
										<Moment format="YYYY/MM/DD">{e.from}</Moment> - {e.current ? `Current` : <Moment format="YYYY/MM/DD">{e.to}</Moment>}
									</td>
									<td>
										<button type="button" className="btn btn-danger" onClick={c=> deleteAction(e._id)}>Delete</button>
									</td>
								</tr>
							);
						})}
				</tbody>
			</table>
      <ConfirmationModal id={itemToDelete} type={DELETEType.EDUCATION} modalIsOpen={isModalOpen}  />
		</Fragment>
	);
};
