import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:5000";
const socket = socketIOClient(ENDPOINT);

export default class LineGraph extends Component {

    constructor(props) {
        super(props);
        this.state = { data: [] }
    }


    componentDidMount = () => {
        console.log(this.state);
        const comp = this;
        socket.on('connect', function () {
            console.log("Connected");
        });
        socket.on('send_data', function (response) {
            console.log("In usage_details");
            comp.setState({ data: [...comp.state.data, response] });
            console.log(comp.state.data);
            // setTimeout(socket.emit("get_data"), 1000);
        });

        setInterval(() => {
            socket.emit("get_data");
        }, 1000);
    }

    getData = () => {
        socket.emit("get_data");
    }

    render() {
        return (
            <div>
                <h1>Hello! How are you doing?</h1>
                <button onClick={this.getData}>Get DATA</button>
            </div>
        )
    }
}
