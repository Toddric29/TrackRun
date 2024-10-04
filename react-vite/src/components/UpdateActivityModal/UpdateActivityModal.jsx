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
    console.log(activity1, '<------Body')

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
  console.log(activity, '<------oldBody')

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({})
    console.log(errors)




    dispatch(activityActions.editActivity({title: title, body: body}, activity1.id))
    .then(() => dispatch(activityActions.fetchPlanActivities(planId)))
    .then(closeModal)
  };
  return (
    <div className='modal'>
      <form onSubmit={handleSubmit}>
      <label>
          Title
          <input
            type="text"
            defaultValue={title}
            onChange={updateTitle}
            required
          />
        </label>
        {errors.title && <p>{errors.title}</p>}
        <label>
          Body
          <input
            type="text"
            defaultValue={body}
            onChange={updateBody}
            required
          />
        </label>
        <button type="submit">Update Activity</button>
      </form>
    </div>
  );
}

export default EditActivityModal;
