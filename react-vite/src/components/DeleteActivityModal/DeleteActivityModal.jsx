import * as planActions from '../../redux/training_plans';
import * as userActions from '../../redux/users'
import * as activityActions from '../../redux/activities'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import './DeleteActivityModal.css';

function DeleteActivityModal({activityId}) {
    const dispatch = useDispatch();
    const { planId } = useParams();
    const { closeModal } = useModal()
    console.log(planId, '<-------PLANID')

    const handleSubmit = (e) => {
        e.preventDefault(e);
        dispatch(activityActions.removeActivity(activityId))
        .then(() => {
            dispatch(activityActions.fetchPlanActivities(planId))
        })
        .then(() => {
            closeModal()
        })
        // .then(() => {
        //     dispatch(planActions.fetchPlans())
        // })
    }
    const handleCancel = () => {
        closeModal()
    };

    return (
        <>
        <h1>Confirm Delete</h1>
        <h2>Are you sure you want to remove this activity?</h2>
        <form>
        <div style={{textAlign:'center'}}>
        <div>
        <button style={{backgroundColor:'red', color:'#fff',border:'none', width:150}}
        type="button" onClick={handleSubmit}>Yes (Delete Activity)</button>
        </div>
        <div>
        <button style={{backgroundColor:'grey', color:'#fff',border:'none', width:150}}
        type="button" onClick={handleCancel}>No (Keep Activity)</button>
        </div>
        </div>
        </form>
        </>
    )
}

export default DeleteActivityModal;
