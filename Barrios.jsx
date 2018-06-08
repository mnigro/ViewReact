import React from 'react';

class Barrios extends React.Component {

    constructor(props) {
        super(props);

        this.state = { barrios:[],
            barrioId:"1",
        }

        //this.getBarrios(this.props.cityId);

    }

    getBarrios(id){
if (id=="" || id == "1") return;
        fetch('http://localhost:3000/neighborhoods/' + id , {
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

                this.setState({ barrioId: "" });
                this.setState({ barrios: data });
            })
    }

    componentWillMount(){
        this.getBarrios(this.props.cityId);
    }

    shouldComponentUpdate(newProps, newState) {
        if (this.state.barrioId == "") return true;
        this.getBarrios(newProps.cityId);
        return true;
    }

    render() {
        return (
            <div>
                <h1>{this.props.headerProp}</h1>

                <select>{this.state.barrios.map(node => <option value={node.id} key={node.id}>{node.name}</option>)}</select>

            </div>
        );
    }

}

export default Barrios;