import React from 'react';
import Barrios from "./Barrios.jsx";

class Cities extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            cities:[],
            cityId:"1"
        }
        this.change = this.change.bind(this);
        this.getCities(this.props.stateId);
    }

    change(val){
        this.state.cityId = val.target.value;
        this.forceUpdate();
    }

    getCities(id){
        if (id=="") return;
        fetch('http://localhost:3000/cities/' + id, {
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
                this.setState({ cityId: "" });
                this.setState({ cities: data });
            })

    }

    shouldComponentUpdate(newProps, newState) {
        if (this.state.cityId == "")
        {
            return true;
        }
        this.getCities(newProps.stateId);
        return true;
    }

    render() {
        return (
            <div>
                <h1>{this.props.headerProp}</h1>

                <select onChange={this.change}>{this.state.cities.map(node => <option value={node.id} key={node.id}>{node.name}</option>)}</select>

                <Barrios cityId={this.state.cityId}/>


            </div>
        );
    }

}

export default Cities;
