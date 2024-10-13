import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editPlan, fetchPlan } from '../../redux/training_plans';
import { useEffect } from 'react';
import './UpdatePlan.css'


const EditPlanForm = () => {
    const { planId } = useParams();
  const user = useSelector(state => state.session.user)
  const plan = useSelector(state => state.plans.planDetails[planId]);
  const [isLoaded, setIsLoaded] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState({})

  const updateTitle = (e) => setTitle(e.target.value);
  const updateBody = (e) => setBody(e.target.value);

  useEffect(() => {
    dispatch(fetchPlan(planId)).then(() => setIsLoaded(true))
  }, [planId, dispatch])

  useEffect(() => {
    if (!plan) return
    setTitle(plan.title);
    setBody(plan.body);
  },[plan])


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({})
    console.log(errors)


      if (!user) {
        return <p>Please Login</p>;
      }

    const payload = {
      title,
      body
    };


    dispatch(editPlan(payload, plan.id))
    .then(() => navigate(`/users/training-plans/`))
    .catch(async res => {
      const errors = await res.json()
      console.log(errors)
      setErrors(errors.errors)
    })
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    navigate(`/training-plans/${planId}`)
  };

  return (
    <section className="new-form-holder centered middled">
        <h1 className='title'>Update Your Plan</h1>
      <form className="create-plan-form" onSubmit={handleSubmit}>
        <div>
        <p className='comment-title'>Title</p>
        <input
          type="text"
          placeholder="Title"
          value={title}
          className="modal-input"
          onChange={updateTitle} />
          {errors.title && (<p className="modal-error">{errors.title}</p>)}
        </div>
        <p className='comment-title'>Body</p>
        <div>
        <textarea
          type="text"
          placeholder="Body"
          value={body}
          className="modal-text-area"
          onChange={updateBody} />
          {errors.body && (<p className="modal-error">{errors.body}</p>)}
        </div>
        <span style={{display: 'flex', justifyContent: 'center'}}>
        <button style={{alignItems: 'center'}}className='button-modal3' type="submit">Update Your Plan</button>
        <button className='button-modal2' type="button" onClick={handleCancelClick}>Cancel</button>
        </span>
      </form>
    </section>
  );
};

export default EditPlanForm;
