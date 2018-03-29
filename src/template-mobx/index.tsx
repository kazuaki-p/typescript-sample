import React from 'react';
import {observable} from 'mobx';
import {observer} from 'mobx-react'

const fetchData = () => {

    return　fetch('http://localhost:3000/example/a', {credentials: 'same-origin'})
                .then(response => {
                    if (response.status < 400) {
                        return response.json().then((json)=>{appState.fetchData=json});
                    } else {
                        console.log(response);
                    }
                })
}

@observer
class App extends React.Component<{data:any},{}> {
    constructor(props:any) {
        super(props);
    }
    componentWillMount() {
        fetchData();
    }
    render() {
        const {　data } = this.props;
        return  <div>
                    <div>{JSON.stringify(data.fetchData)}</div>
                    <p>aaa</p>
                </div>;
    }
}

class AppState {
    @observable fetchData:any;
    constructor() {
        this.fetchData={};
    }
}

const appState = new AppState();

const example = (props:any) => <App data={appState} />

export default example;