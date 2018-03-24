import React from "react";

interface HelloProps { compiler: string; framework: string; }

export default class Hello extends React.Component<HelloProps, {}> {
    render() {
        return <h1>Helloo from {this.props.compiler} and {this.props.framework}!</h1>;
    }
}
