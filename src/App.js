import React from 'react';

function createStore(reducer, initialState) {
  let state = initialState;
  const listeners = [];

  const getState = () => (state);

  const subscribe = (listener) => (
    listeners.push(listener)
  );

  const dispatch = (action) => {
    state = reducer(state, action);
    // this is more complex part
    listeners.forEach(l => l());
  };

  return {
    subscribe,
    getState,
    dispatch,
  };
}

function reducer(state, action) {
  if (action.type === 'ADD_MESSAGE') {
    return {
      messages: state.messages.concat(action.message),
    };
  } else if (action.type === 'DELETE_MESSAGE') {
    return {
      //another complex part
      // .. spread operator for array construction and destruction
      messages: [
        ...state.messages.slice(0, action.index),
        ...state.messages.slice(
          action.index + 1, state.messages.length
        ),
      ],
    };
  } else {
    return state;
  }
}

// simple store
const initialState = { messages: []};
const store = createStore(reducer, initialState);

class App extends React.Component {
  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  }

  render() {
    const messages = store.getState().messages;
    return (
      <div className='ui segment'>
        <MessageView messages={messages} />
        <MessageInput />
      </div>
    );
  };

}

class MessageInput extends React.Component {
  state = {
    value: '',
  };

  // update state of component when view clicked
  onChange = (e) => {
    this.setState({
      value: e.target.value,
    })
  };

  handleSubmit = () => {
    store.dispatch({
      type: 'ADD_MESSAGE',
      message: this.state.value,
    });

    this.setState({
      value: '',
    });
  };

  render() {
    return (
      <div className = 'ui input'>
        <input
          onChange={this.onChange}
          value={this.state.value}
          type='text' />
        <button 
          onClick={this.handleSubmit}
          className='ui primary button'
          type='submit'
        > 
        Submit
        </button>
      </div>
    )
  }
}

class MessageView extends React.Component {
  handleClick = (index) => {
    console.log('handleClick delete index ' + index);
    store.dispatch({
      type: 'DELETE_MESSAGE',
      index: index,
    });
  };

  render() {
    const messages = this.props.messages.map((message, index) => (
      <div
        className='comment'
        key='index'
        onClick={() => this.handleClick(index)}
      >
      {message}
      </div>
    ));

    return (
      <div className='ui comments'>
        {messages}
      </div>
    );
  }
}

export default App;
