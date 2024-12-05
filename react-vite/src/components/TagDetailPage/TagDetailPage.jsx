import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { fetchPlansByTag } from "../../redux/tags";
import { NavLink} from 'react-router-dom';

function TagDetailPage() {
    const [isLoaded, setIsLoaded] = useState(false)
  const {tagId} = useParams();
  const tags = useSelector((state) => state.tags.tags)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlansByTag(tagId))
    .then(() => setIsLoaded(true))
  }, [dispatch, tagId]);

  if (!isLoaded) {
    return (
        <h1>Loading...</h1>
    )
}

  return (
    <div className="tag-details">
      {tags.length == 0 && <div>Hello</div>}
        {tags[0] && <div className="tag-title">
            <h1 className="title">{tags[0].Tags[0].name}</h1>
        </div>}
        <div className="followed-plans">
        {Object.values(tags).map(tag => {
                return (
                    <div key={tag.training_plan_id} className='followed-plan-title'>
                    <h2 className='f-plan-title'>
                        <NavLink className='nav-link' to={`/training-plans/${tag.training_plan_id}`}>
                        • {tag.title}
                        </NavLink>
                        </h2>
                        <p className='plan-body'>
                        {tag.body}
                            </p>
                            </div>
                )
            })}
        </div>
    </div>
  )
}

export default TagDetailPage;
