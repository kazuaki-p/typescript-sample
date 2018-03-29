import React from "react";
import { createStore, Action, Reducer, Dispatch } from 'redux';
import { Provider, connect } from 'react-redux';

type Actions = fetchAction;

enum ActionTypes {
  RECEIVE_FETCH_DATA = 'RECEIVE_FETCH_DATA'
}

interface fetchAction extends Action {
  type: ActionTypes.RECEIVE_FETCH_DATA;
  response: any;
}

const fetchData = (json: any): fetchAction => ({
  type: ActionTypes.RECEIVE_FETCH_DATA, response: json
})

type AppProps = {
  actions: ActionDispatcher;
} & State;

class App extends React.Component<AppProps, {}> {

  constructor(props: AppProps) {

    super(props);

  }

  componentWillMount() {

    this.props.actions.fetchData();

  }

  render(){

    const fetchData = this.props.fetchData;

    return <div>
            <div>{JSON.stringify(fetchData)}</div>
            <p>aaa</p>
           </div>

  }
}

interface State {

  fetchData: any

}

const initialState: State = {
  fetchData:{}
};

class ActionDispatcher {

  constructor(private dispatch: (action: Actions) => void) {}

  public fetchData() {

    return fetch('http://localhost:3000/example/a', {credentials: 'same-origin'})
      .then(response => {
        if (response.status < 400) {
          return response.json().then((json)=>this.dispatch(fetchData(json)));
        } else {
          console.log(response);
        }
      })

  }
}

const TotalApp = connect(
  (state: State) => ({ fetchData:state.fetchData }),
  (dispatch: Dispatch<Actions>) => ({actions: new ActionDispatcher(dispatch)})
)(App);

const reducer = (state:State=initialState, action: Actions | any):State => {

  switch (action.type) {

    case ActionTypes.RECEIVE_FETCH_DATA:

      return { ...state, fetchData: action.response};

    default:

      return state;

  }

}

const store = createStore( reducer );

const example = (props:any) =>(<Provider store={store}><TotalApp /></Provider>);

export default example;
