import './AllPlans.css';
import { fetchPlans } from '../../redux/training_plans';
import { useEffect, useState} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { NavLink} from 'react-router-dom';
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";

const AllPlans = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [showMenu, setShowMenu] = useState(false);
    const dispatch = useDispatch()
    const plans = useSelector((state) => state.plans.allPlans)
    const sessionUser = useSelector(state => state.session.user)
    const user = sessionUser ? sessionUser.id : null

    const toggleMenu = (e) => {
        e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
        setShowMenu(!showMenu);
      };

      useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
          if (ulRef.current && !ulRef.current.contains(e.target)) {
            setShowMenu(false);
          }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
      }, [showMenu]);

      const closeMenu = () => setShowMenu(false);

    useEffect(() => {
        dispatch(fetchPlans())
        .then(() => setIsLoaded(true))
    }, [dispatch])

    if (!isLoaded) {
        return (
            <h1>Loading...</h1>
        )
    }


    return (
        <div>
            <div className='title'>
                <h1>Training Plans</h1>
            </div>
            <div className='followed-plans'>
            {Object.values(plans).map(plan => {
                return (
                    <div className='followed-plan-title'>
                    <h2 className='f-plan-title'>
                        <NavLink className='nav-link' key={plan.id} to={`/training-plans/${plan.id}`}>
                        • {plan.title}
                        </NavLink>
                        </h2>
                        <p className='plan-body'>
                        {plan.body}
                            </p>
                            </div>
                )
            })}
            </div>
            <div className='navigation-div'>
                {user !== null && <NavLink className='nav-link' to={'/training-plans/new'}>
                    Create Your Own Training Plan</NavLink>}
            </div>
            <div className='navigation-div'>
                {user === null && <OpenModalMenuItem
                itemText="Sign in to create a training plan!"
                className='nav-link'
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />}
            </div>
            <div className='navigation-div'>
                {user === null && <OpenModalMenuItem
                itemText="No account? Sign up here!"
                onItemClick={closeMenu}
                className='nav-link'
                modalComponent={<SignupFormModal />}
              />}
            </div>
        </div>
    )
}

export default AllPlans
