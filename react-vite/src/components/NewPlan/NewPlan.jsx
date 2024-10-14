import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPlan } from '../../redux/training_plans';
import './NewPlan.css'


const CreatePlanForm = () => {
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState({})

  const updateTitle = (e) => setTitle(e.target.value);
  const updateBody = (e) => setBody(e.target.value);


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


    dispatch(createPlan(payload))
    .then( (newPlan) =>  {
      navigate(`/training-plans/${newPlan.id}`)
    })
    .catch(async res => {
        const errors = await res.json()
        console.log(errors)
        setErrors(errors.errors)
    })
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    navigate(`/training-plans`)
  };

  return (
    <section className="new-form-holder centered middled">
        <h1 className='title'>Create a Plan</h1>
      <form className="create-plan-form" onSubmit={handleSubmit}>
        <div>
          <p className='comment-title'>Title</p>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={updateTitle}
          className="modal-input" />
          {errors.title && (<p className="modal-error">{errors.title}</p>)}
        </div>
        <p className='comment-title'>Body</p>
        <div>
        <textarea
          type="text"
          placeholder="Body"
          value={body}
          onChange={updateBody}
          className="modal-text-area" />
          {errors.body && (<p className="modal-error">{errors.body}</p>)}
        </div>
        <span style={{display: 'flex', justifyContent: 'center'}}>
        <button style={{alignItems: 'center'}}className='button-modal3' type="submit">Create New Plan</button>
        <button className='button-modal2' type="button" onClick={handleCancelClick}>Cancel</button>
        </span>
      </form>
    </section>
  );
};

export default CreatePlanForm;
