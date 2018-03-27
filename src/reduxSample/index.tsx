import React from "react";
import { createStore, Action, Reducer } from 'redux';
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


const fetchApiData = (dispatch: any) => {

  return fetch('http://localhost:3000/example/a', {credentials: 'same-origin'})
           .then(response => {
             if (response.status < 400) {
               return response.json().then((json)=>dispatch(fetchData(json)));
             } else {
               console.log(response);
             }
           })
}

interface AppProps {

  fetchData: any;
  dispatch: any;

}

class App extends React.Component<AppProps, {}> {

  constructor(props: AppProps) {

    super(props);

  }

  componentWillMount() {

    const {dispatch} = this.props;

    fetchApiData(dispatch);

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

const TotalApp = connect(
  (state: State) => ({ fetchData:state.fetchData })
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
