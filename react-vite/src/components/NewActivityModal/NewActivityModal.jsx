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
        // console.log(payload, '<----PAYLOAd')
        // setErrors({})
        .then(() => {
            closeModal()
        })
    }
    const handleCancel = () => {
        closeModal()
    };

    return (
        <>
        <h1>New Activity</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        {errors.title && <p>{errors.title}</p>}
        <label>
          Body
          <input
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </label>
        <button type="submit">Create Activity</button>
      </form>
        </>
    )
}

export default CreateActivityModal;
