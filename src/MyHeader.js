import React, { Component } from 'react';
import logo from './logo.svg';
import './myHeader.css';
import AirportToSports from './AirportToSports';

class MyHeader extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
			myAir:AirportToSports.selectAirportX
		};
	}		
	determineClass(path) {
		//console.log('dc='+document.location.pathname+' and this='+path);
		if(document.location.pathname===path){
			return 'inactive';			
		}	
		else return '';
	}
	render() {
		return (
			<div>
				<div className="myHeader">
					<a href="/" className={this.determineClass('/')}><img src={logo} className="App-logo" alt="logo" /></a>
					<a href="/home" className={this.determineClass('/home')}>Home</a>
					<a href="/about" className={this.determineClass('/about')}>about</a>
					<a href="/contact" className={this.determineClass('/contact')}>contact</a>
					<a href="/MathOperation" className={this.determineClass('/MathOperation')}>MathOperation</a>
					<a href="/Hangman" className={this.determineClass('/Hangman')}>Hangman</a>					
					<a href="/App" className={this.determineClass('/App')}>Both</a>	
					<a href="/TicTacToe" className={this.determineClass('/TicTacToe')}>TicTacToe</a>	
					<a href="/Calculator" className={this.determineClass('/Calculator')}>Calculator</a>					
					<AirportToSports/>
				</div>
				<div>
				{this.state.myAir}
				</div>
				<div className={document.location.pathname==="/"?"intro":"none"}>
				
					<h2>
						Welcome to Jaime's home page, feel free to navigate to the appropriate location using the navigaton bar above.
					</h2>
					<h3>Happy Navigating!</h3>
				</div>
			</div>
		)
	}
}
export default MyHeader;

