import * as planActions from '../../redux/training_plans';
import * as userActions from '../../redux/users'
import * as activityActions from '../../redux/activities'
import * as planCommentActions from '../../redux/training_plan_comments'
import * as tagActions from '../../redux/tags'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import './DeleteTagModal.css';

function DeleteTagModal({tagId}) {
    const dispatch = useDispatch();
    const { planId} = useParams();
    const { closeModal } = useModal()
    console.log(tagId, '<-------PLANID')

    const handleSubmit = (e) => {
        e.preventDefault(e);
        dispatch(tagActions.removePlanTag(planId, tagId))
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
        <div className='pop-modal'>
        <div className='modal-content'>
        <h1 className='modal-h1'>Confirm Delete</h1>
    <h2 className='modal-h2'>Are you sure you want to remove this tag?</h2>
    <form>
    <div>
    <div>
    <button className='button-modal'
    type="button" onClick={handleSubmit}>Yes (Delete Tag)</button>
    </div>
    <div>
    <button className='button-modal2'
    type="button" onClick={handleCancel}>No (Keep Tag)</button>
    </div>
    </div>
    </form>
        </div>
    </div>
    )
}

export default DeleteTagModal;
