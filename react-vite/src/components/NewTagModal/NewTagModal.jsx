import * as tagActions from '../../redux/tags'
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useModal } from '../../context/Modal';
import './NewTagModal.css';

function CreateTagModal({planId}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal()
    const [name, setName] = useState('');
    const [errors, setErrors] = useState({})

    const MIN_NAME_LENGTH = 3;

    const handleNameChange = (e) => {
      const newName = e.target.value;
      setName(newName);

      if (newName.length >= MIN_NAME_LENGTH) {
        setErrors((prevErrors) => ({ ...prevErrors, name: undefined }));
      }
    };

    const payload = {
        name
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.length < MIN_NAME_LENGTH) {
          setErrors({ ...errors, name: `Name must be at least ${MIN_NAME_LENGTH} characters long.` });
          return;
        }
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
            onChange={handleNameChange}
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
