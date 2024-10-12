import * as planActions from '../../redux/training_plans';
import * as userActions from '../../redux/users'
import * as activityActions from '../../redux/activities'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useModal } from '../../context/Modal';
import { useParams, useNavigate } from 'react-router-dom';
import './NewActivityModal.css';

function CreateActivityModal({planId}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal()
    const user = useSelector(state => state.session.user)
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [errors, setErrors] = useState({})


    const payload = {
        title,
        body
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(activityActions.createActivity(planId, payload))
        .then(() => {
            dispatch(activityActions.fetchPlanActivities(planId))
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
        <h1 className='title'>New Activity</h1>
      <form onSubmit={handleSubmit}>
        <label className='comment-title'>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="modal-input"
          />
        </label>
        {errors.title && <p className="modal-error">{errors.title}</p>}
        <label className='comment-title'>
          Body
          <input
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            className="modal-input"
          />
        </label>
        <button className='button-comment' type="submit">Create Activity</button>
      </form>
        </div>
    )
}

export default CreateActivityModal;
