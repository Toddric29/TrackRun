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
        console.log(newPlan, '<-----newPlan')
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
    // hideForm();
  };

  return (
    <section className="new-form-holder centered middled">
        <h1 style={{paddingRight: 400}}>Create a Plan</h1>
        <h2 style={{textAlign: 'center', paddingRight: 250}}>Where&apos;s your place located?</h2>
        <h3 style={{textAlign: 'center', paddingLeft: 30}}>Guests will only get your exact address once they
            booked a reservation.</h3>
      <form className="create-spot-form" onSubmit={handleSubmit}>
        <div>
          <p>Title</p>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={updateTitle} />
          {errors.title && (<p>{errors.title}</p>)}
        </div>
        <p>Body</p>
        <div>
        <input
          type="text"
          placeholder="Body"
          value={body}
          onChange={updateBody} />
          {errors.body && (<p>{errors.body}</p>)}
        </div>
        <span style={{paddingLeft: 450}}>
        <button type="submit">Create new Plan</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
        </span>
      </form>
    </section>
  );
};

export default CreatePlanForm;
