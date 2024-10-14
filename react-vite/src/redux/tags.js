const LOAD_TAGS = 'tags/loadTags'
const LOAD_PLAN_TAGS = 'tags/loadPlanTags'
const LOAD_PLAN_BY_TAG = 'tags/loadPlanByTag'

const loadTags = (payload) => ({
    type: LOAD_TAGS,
    payload
})

const loadPlanTag = (payload) => ({
    type: LOAD_PLAN_TAGS,
    payload
})

const loadPlanByTag = (payload) => ({
    type: LOAD_PLAN_BY_TAG,
    payload
})


export const fetchTags = () => async (dispatch) => {
    try {
        const res = await fetch('/api/tags')
        if(res.ok) {
            const data = await res.json();
            if (data.errors) {
                throw data;
            }

            dispatch(loadTags(data));
            return res
        } else {
            throw res
        }
    } catch (error) {
        const err = await error;
        return err
    }
}

export const fetchPlanTags = (planId) => async(dispatch) => {
  const res = await fetch(`/api/training-plans/${planId}/tags`);

  if (res.ok) {
    const data = await res.json()
    dispatch(loadPlanTag(data));
    return res
  }
}

export const fetchPlansByTag = (tagId) => async(dispatch) => {
    try {
        const res = await fetch(`/api/training-plans/tags/${tagId}`);
        if (res.ok) {
            const data = await res.json();
            if (data.errors) {
                throw new Error(data.errors);
            }
            dispatch(loadPlanByTag(data));
            return data;
        } else {
            throw new Error('Failed to fetch data');
        }
    } catch (error) {
        console.error('Fetch error:', error);
        return error;
    }
};

export const createPlanTag = (planId, payload) => async (dispatch) => {
    const res = await fetch(`/api/training-plans/${planId}/tags`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(loadPlanTag(data));
    } else {
        console.error('Fetch error:', res.statusText);
    }
    return res;
};

export const removePlanTag = (planId, tagId) => async () => {
    const res = await fetch(`/api/training-plans/${planId}/tags/${tagId}`, {
        method: 'DELETE'
    });
    return res
}



const initialState = {
    tags: {},
    allTags: {},
    tagById: {}
};

const tagsReducer = (state = initialState, action) => {
    let newState;
  switch (action.type) {
    case LOAD_TAGS:{
        const allTags = {...state.allTags}
        action.payload.forEach(tag => allTags[tag.id]={...tag})
        return {
            ...state,
            allTags
        }
    }
    case LOAD_PLAN_TAGS: {
        newState = {...state};
        newState.tags = action.payload;
        return newState
    }
    case LOAD_PLAN_BY_TAG: {
        newState = {...state};
        newState.tags = action.payload;
        return newState
    }
    default:
      return state;
  }
};

export default tagsReducer
