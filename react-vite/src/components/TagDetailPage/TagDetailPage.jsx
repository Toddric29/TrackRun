import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { fetchPlansByTag } from "../../redux/tags";
import { fetchPlans } from "../../redux/training_plans";

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
                {Object.values(plans).map(plan => {
            return (
                <div key={plan.body} className="plans-details">
                    <div className="plan-title">
                        {plan.title}
                    </div>
                    <div className="plan-body">
                        {plan.body}
                    </div>
                </div>
            )
        })}
    </div>
  )
}

export default TagDetailPage;
