import React from "react";
import { toast } from "react-toastify";

interface BlocksData {
    id: number;
    name: string;
    color: string;
}

export default class Demo extends React.Component {
    state = {
        block_names: []
    };

    componentDidMount() {
        this.load();
    }

    private async load() {
        const response = await fetch(`/api/blocks`).then(response => {
            if (response.status !== 200) {
                toast.error(`Unable to load blocks: ${response.status}`, { position: toast.POSITION.TOP_CENTER });
                return;
            }
            return response;
        });
        const resp = (response ? await response.json() : []) as Array<BlocksData>;
        this.setState({ block_names: resp.map(blockData => blockData.name) });
    }

    render() {
        return (
            <div className="component-app" >
                {
                    this.state.block_names.map(blockName => {
                        return <p>{blockName}</p>
                    })
                }
            </div >
        );
    }
}