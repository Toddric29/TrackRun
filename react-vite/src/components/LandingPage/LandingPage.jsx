import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as tagActions from '../../redux/tags'
import './LandingPage.css'

const LandingPage = () => {
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false)
    const dispatch = useDispatch()
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
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


      useEffect(() => {
        dispatch(tagActions.fetchTags())
          .then(() => setIsLoaded(true))
    }, [dispatch]);


    if (!isLoaded) {
        return (
            <h1>Loading...</h1>
        )
    }

    return (
        <div className='landing-page'>
            <h1 className='title'>Find Training Plans By Clicking on the Tags Below!</h1>
            {Object.values(tags).map(tag => {
                return (
                    <div className='tags'key={tag.id}
                    onClick={() => navigate(`/training-plans/tags/${tag.id}`)}>
                        <h2 className='tag'>{tag.name}</h2>
                    </div>
                )
            })}
        </div>
    )
}

export default LandingPage
