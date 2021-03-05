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
        const ref = this;
        socket.on('connect', function () {
            console.log("Connected");
        });
        socket.on('send_data', function (response) {
            console.log("In usage_details");
            if (ref.state.data.length >= 10) {
                const arr = [...ref.state.data];
                arr.splice(0, 1);
                ref.setState({ data: arr })

            }
            ref.setState({ data: [...ref.state.data, response] });
            console.log(ref.state.data);
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
