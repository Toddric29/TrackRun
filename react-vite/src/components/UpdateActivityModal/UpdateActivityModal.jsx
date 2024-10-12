import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as activityActions from '../../redux/activities'
import { useModal } from '../../context/Modal';
import { useParams } from 'react-router-dom';
import './UpdateActivityModal.css'

const EditActivityModal = ({activityId}) => {
    const { planId } = useParams();
    const activities = useSelector((state) => state.activities.planActivities)
    const activity = Object.values(activities).filter((activity) =>
        activity.id === activityId
    )
    const activity1 = activity[0]

  const dispatch = useDispatch();
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const updateTitle = (e) => setTitle(e.target.value);
  const updateBody = (e) => setBody(e.target.value);


  useEffect(() => {
    if (!activity1) return
    setTitle(activity1.title);
    setBody(activity1.body);
  },[activity1])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({})
    console.log(errors)




    dispatch(activityActions.editActivity({title: title, body: body}, activity1.id))
    .then(() => dispatch(activityActions.fetchPlanActivities(planId)))
    .then(closeModal)
  };
  return (
    <div className='modal-comment'>
      <form onSubmit={handleSubmit}>
      <label className='comment-title'>
          Title
          <input
            type="text"
            defaultValue={title}
            onChange={updateTitle}
            required
            className="modal-input"
          />
        </label>
        {errors.title && <p className="modal-error">{errors.title}</p>}
        <label className='comment-title'>
          Body
          <input
            type="text"
            defaultValue={body}
            onChange={updateBody}
            required
            className="modal-input"
          />
        </label>
        <button className='button-comment' type="submit">Update Activity</button>
      </form>
    </div>
  );
}

export default EditActivityModal;
