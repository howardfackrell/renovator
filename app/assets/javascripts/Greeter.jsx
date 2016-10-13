var React = require('react');

class Greeter extends React.Component {
    render() {
        return (<p>Hello, {this.props.name}</p>)
    }
};

class TestComp extends React.Component {
    constructor(props) {
        super();
        this.state = { counter : 0};

        this.inc = this.inc.bind(this);
    }

    inc() {
        this.setState({
            counter: this.state.counter + 1
        });
    }

    render() {
        return (
            <div><h1>Does this work {this.state.counter}</h1>
                <button onClick={this.inc}>Click me</button>
            </div>
        )
    }
}


// export default Greeter;
module.exports = {Greeter, TestComp};