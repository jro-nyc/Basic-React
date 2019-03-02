import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MathOperation from './MathOperation';
import Hangman from './components/Hangman';


class App extends Component {
    constructor(props) {
		super(props);
		this.state = {

		};
	}	
	render() {
		return (
			<div className="App">

				<div className="mathOperationDiv">
					<MathOperation />
				</div>
				<Hangman />
			</div>
		);
	}
}

export default App;
