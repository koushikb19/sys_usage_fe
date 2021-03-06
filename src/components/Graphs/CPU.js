import React, { Component } from 'react';
import axios from 'axios';
import LineChart from 'react-linechart';
import '../../../node_modules/react-linechart/dist/styles.css';


export default class CPU extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [{ x: 0, y: 0 }]
        }
        this.interval = null;
    }

    //Get's data from the flask API endpoint every second
    componentDidMount = async () => {
        const ref = this;
        this.interval = setInterval(async () => {
            const response = await axios.get("http://127.0.0.1:5000/getData/cpu");
            const data = this.state.data;
            ref.setState({
                data: [...data, { x: (data[data.length - 1].x + 1), y: response.data.cpu }]
            });
        }, 1000);

    }

    //Clears the interval once the componet is unmounted
    componentWillUnmount = () => {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div>
                <div className="App">
                    <LineChart
                        hidePoints
                        hideXLabel
                        hideXAxis
                        yLabel="Usage in percent"
                        height={400}
                        data={[{
                            color: "steelblue",
                            points: this.state.data
                        }]}
                        yMax="100"
                        yMIN="0"
                    />
                </div>
            </div>
        )
    }
}
