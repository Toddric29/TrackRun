import * as planActions from '../../redux/training_plans';
import * as userActions from '../../redux/users'
import * as planCommentsActions from '../../redux/training_plan_comments'
import * as activityActions from '../../redux/activities'
import * as tagActions from '../../redux/tags'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useModal } from '../../context/Modal';
import { useParams, useNavigate } from 'react-router-dom';
import './NewTagModal.css';

function CreateTagModal({planId}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal()
    const user = useSelector(state => state.session.user)
    const [name, setName] = useState('');
    const [errors, setErrors] = useState({})


    const payload = {
        name
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(tagActions.createPlanTag(planId, payload))
        .then(() => {
            dispatch(tagActions.fetchPlanTags(planId))
        })
        .then(() => {
            closeModal()
        })
    }
    const handleCancel = () => {
        closeModal()
    };

    return (
        <div className='modal-comment'>
      <form className="modal-form" onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="modal-input"
          />
        </label>
        {errors.name && <p className="modal-error">{errors.name}</p>}
        <button className='button-comment' type="submit">Add a Tag</button>
      </form>
        </div>
    )
}

export default CreateTagModal;
