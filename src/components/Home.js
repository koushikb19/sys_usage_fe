import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CPU from './Graphs/CPU';
import Container from '@material-ui/core/Container'
import axios from 'axios';
import Memory from './Graphs/Memory.js';



export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            hasGPU: false
        }
    }

    componentDidMount = async () => {
        const response = await axios.get("http://127.0.0.1:5000/getData/hasGpu")
        if (response.data.hasGPU) {
            this.setState({ hasGPU: true })
        }
    }

    handleChange = (event, newValue) => {
        this.setState({ value: newValue });
        console.log(newValue);
    }

    render() {
        return (
            <div>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <Typography variant="h6" color="inherit">System Usage</Typography>
                    </Toolbar>
                </AppBar>
                <AppBar position="static">
                    <Tabs value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example">
                        <Tab label="CPU" />
                        <Tab label="Memory" />
                        <Tab label="GPU" />
                    </Tabs>
                </AppBar>
                <br></br>
                {this.state.value === 0 &&
                    <Container maxWidth="md">
                        <Card >
                            <CardContent>
                                <CPU />
                            </CardContent>
                        </Card>
                    </Container>
                }
                {this.state.value === 1 &&
                    <Container maxWidth="md">
                        <Card >
                            <CardContent>
                                <Memory />
                            </CardContent>
                        </Card>
                    </Container>
                }

                {this.state.value === 2 &&
                    !this.state.hasGPU &&
                    <Typography variant="h4" color="inherit">No GPUs Found</Typography>
                }



            </div>
        )
    }
}
