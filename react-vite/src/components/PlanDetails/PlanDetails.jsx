import './PlanDetails.css';
import { fetchPlan } from '../../redux/training_plans';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import OpenModalButton from '../OpenModalButton/OpenModalButton';

const PlanDetails = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const { planId } = useParams();
    const {setModalContent} = useModal();
    const sessionUser = useSelector(state => state.session.user)
    const plan = useSelector(state => state.plans.planDetails[planId]);
    const id = sessionUser ? sessionUser.id : null
    console.log(plan)

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
          if (!ulRef.current.contains(e.target)) {
            setShowMenu(false);
          }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
      }, [showMenu]);

      const closeMenu = () => setShowMenu(false);

      useEffect(() => {
        dispatch(fetchPlan(planId))
    }, [planId, dispatch])

    return (
        <h1>1</h1>
    )
}

export default PlanDetails
