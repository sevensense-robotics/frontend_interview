import React from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface BlocksData {
    id: number;
    name: string;
    color: string;
}

interface ColorsData {
    id: number;
    name: string,
    hex: string
}

export default class Demo extends React.Component {

    state = {
        block_properties: [],
        allColors: []
    };

    componentDidMount() {
        this.load();
    }

    private async getRandomColor() {
        try {
            const response = await fetch(`/api/colors`).then(response => {
                if (response.status !== 200) {
                    toast.error(`Unable to load colors: ${response.status}`, { position: toast.POSITION.TOP_CENTER });
                    return;
                }
                return response;
            });
            const resp = (response ? await response.json() : []) as Array<ColorsData>;

            const allColors = resp.map(color => { return color.name });
            this.setState({ allColors: allColors })

            const color = allColors[Math.floor(Math.random() * allColors.length)];

            return color;
        } catch (error) {
            console.log(error);

        }
    }

    private async load() {
        try {
            const response = await fetch(`/api/blocks`).then(response => {

                return response;
            });
            const resp = (response ? await response.json() : []) as Array<BlocksData>;

            let props = resp.map(prop => {
                return {
                    name: prop.name,
                    color: prop.color
                }
            })
            this.setState({ block_properties: props })
        } catch (error) {
            console.log(error);
        }
    }

    private async setRandomColor(i) {
        try {
            let randomColor = await this.getRandomColor()
            const currentData = this.state.block_properties[i]

            while (currentData.color === randomColor) {
                randomColor = await this.getRandomColor()
            }
            currentData.color = randomColor
            this.setState({ currentData })

        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <div className="component-app" >
                {
                    this.state.block_properties.map((prop, i) => {
                        return <p key={i} onClick={() => this.setRandomColor(i)
                        } style={{ backgroundColor: prop.color }}>{prop.name}</p>
                    })
                }
                <ToastContainer />
            </div >
        );
    }
}