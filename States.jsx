import React from 'react';
import Cities from "./Cities.jsx";

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = { states:[],
                        stateId:"",
        }

        this.change = this.change.bind(this);
        this.getStates();
    }



    change(val){
        this.state.stateId = val.target.value;
        this.forceUpdate();
    }

    getStates(){
        fetch('http://localhost:3000/states', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                return response.json()
            })
            .then((data) => {

                this.setState({ states: data });
                this.setState({ stateId: "" });

            })
    }


    render() {
        return (
            <div>
                <h1>{this.props.headerProp}</h1>

                <select onChange={this.change}>{this.state.states.map(node => <option value={node.id} key={node.id}>{node.name}</option>)}</select>

                <Cities stateId={this.state.stateId}/>

            </div>
        );
    }

}


App.defaultProps = {
    headerProp: "Brasil"
}

export default App;
