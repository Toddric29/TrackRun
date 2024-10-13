import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { fetchPlansByTag } from "../../redux/tags";
import { fetchPlans } from "../../redux/training_plans";
import { NavLink} from 'react-router-dom';

function TagDetailPage() {
    const [isLoaded, setIsLoaded] = useState(false)
  const {tagId} = useParams();
  const plans = useSelector((state) => state.tags.tags)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlansByTag(tagId))
    .then(() => setIsLoaded(true))
  }, [dispatch]);

  if (!isLoaded) {
    return (
        <h1>Loading...</h1>
    )
}

  return (
    <div className="tag-details">
        {plans[0] && <div className="tag-title">
            <h1 className="title">{plans[0].Tags[0].name}</h1>
        </div>}
        <div className="followed-plans">
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
    </div>
  )
}

export default TagDetailPage;
