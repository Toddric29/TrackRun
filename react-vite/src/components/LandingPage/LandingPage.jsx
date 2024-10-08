import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import * as tagActions from '../../redux/tags'

const LandingPage = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const { planId } = useParams();
    const {setModalContent} = useModal();
    const sessionUser = useSelector(state => state.session.user)
    const user = sessionUser ? sessionUser.id : null
    const plans = useSelector(state => state.plans.planDetails);
    const plan = plans[planId];
    const followedPlans = useSelector((state) => state.userState.plansFollowed)
    const alreadyFollowed = Object.values(followedPlans).find(followedPlan => followedPlan.id == planId)
    const id = sessionUser ? sessionUser.id : null
    const activities = useSelector((state) => state.activities.planActivities)
    const planComments = useSelector((state) => state.planComments.planComments)
    const activityComments = useSelector((state) => state.activityComments.activityComments)
    const tags = useSelector((state) => state.tags.allTags)

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
        dispatch(tagActions.fetchTags())
          .then(() => setIsLoaded(true))
    }, [dispatch]);

    if (isLoaded) {
      console.log(tags, '<------tags')
    }

    if (!isLoaded) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <div>
            <h1>Welcome</h1>
            {Object.values(tags).map(tag => {
                return (
                    <div key={tag.id}>
                        <h2>{tag.name}</h2>
                    </div>
                )
            })}
        </div>
    )
}

export default LandingPage
