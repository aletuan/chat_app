function createStore(reducer, initialState) {
  let state = initialState;

  const getState = () => (state);

  const dispatch = (action) => {
    state = reducer(state, action);
  };

  return {
    getState,
    dispatch,
  };
}

function reducer(state, action) {
  if (action.type = 'ADD_MESSAGE') {
    return {
      messages: state.messages.concat(action.message),
    };
  } else {
    return state;
  }
}

// simple store
const initialState = { messages: []};
const store = createStore(reducer, initialState);

// action
const addMessageAction1 = {
  type: 'ADD_MESSSAGE',
  message: 'How does it look, Neil?',
};

store.dispatch(addMessageAction1);
const stateV1 = store.getState();

const addMessageAction2 = {
  type: 'ADD_MESSAGE',
  message: 'Looking good',
};

store.dispatch(addMessageAction2);
const stateV2 = store.getState();

console.log('State V1: ' + stateV1);
console.log('State V2: ' + stateV2);