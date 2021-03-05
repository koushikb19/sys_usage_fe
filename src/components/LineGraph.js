import React, { Component } from 'react';
import LineChart from 'react-linechart';
import '../../node_modules/react-linechart/dist/styles.css';


export default class LineGraph extends Component {

    render() {
        const data = [
            {
                color: "steelblue",
                points: [{ x: 10, y: 20 }, { x: 30, y: 50 }, { x: 70, y: -30 }],
            }
        ];
        return (
            <div>
                <div className="App">
                    <h1>My first LineChart</h1>
                    <LineChart
                        hidePoints
                        width={1000}
                        height={400}
                        data={data}
                        xMax="100"
                        yMax="100"
                    />
                </div>
            </div>
        )
    }
}
