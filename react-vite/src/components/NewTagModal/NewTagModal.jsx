import * as tagActions from '../../redux/tags'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useModal } from '../../context/Modal';
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
    const handleCancelClick = (e) => {
      e.preventDefault();
      closeModal()
    };

    return (
        <div className='modal-comment'>
          <h1 className='title'>Add a Tag</h1>
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
        <span style={{display: 'flex', justifyContent: 'center'}}>
        <button className='button-comment' type="submit">Add Tag</button>
        <button className='button-comment2' type="button" onClick={handleCancelClick}>Cancel</button>
        </span>
      </form>
        </div>
    )
}

export default CreateTagModal;
