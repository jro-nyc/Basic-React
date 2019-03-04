import React, { Component } from 'react';
import { Router, Route, Link, BrowserRouter  } from 'react-router-dom';

//import {Script} from 'react-scripts';
import './Calculator.css';

const search = document.location.search; 
const params = new URLSearchParams(search);
const iata = params.get('iata');
const nm = params.get('nm');
//import airportData from 'http://www.airport-data.com/api/ap_info.json?iata='+iata;
//const airportList=airportData;

class Calculator extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: null,
			clickedLetters:[],
			matchedLetters: [],
			digits:[],
			leftDigits:[],			
			rightDigits:[],			
			alphabet: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"],
			max:9,
			min:0,
			answer:'',
			answerXCF:'',
			answerSet:false,				
			lastAnswer:'',			
					
			result:0,		
			leftOperand:null,
			rightOperand:null,
			operand:null,
			operation:null,
			rangeUnder20:false,
			rows:[]
		}
	
		let i=this.state.min,len=this.state.max;
		while(i++ <= len)this.state.rows.push(i-1)
	}

	checkNumberOrOperation(e) {
		let val = e.currentTarget.textContent, digs=this.state.digits, leftDigs=this.state.leftDigits, rightDigs=this.state.rightDigits, 
		type=e.currentTarget.attributes['data-type'].value, operation=e.currentTarget.attributes['data-val'].value, result;
		//this.state.clickedLetters.push(val);
		
		if(type==='operation'){
			this.setState({operand:val,operation:operation,operationSet:true});
			console.log(operation);	
			return;
		}
		if(val==="="){
			switch(this.state.operation){
				case "add": result= this.state.leftOperand+this.state.rightOperand;break;
				case "sub": result= this.state.leftOperand-this.state.rightOperand;break;
				case "mult": result= this.state.leftOperand*this.state.rightOperand;break;
				case "div": result= this.state.leftOperand/this.state.rightOperand;break;		
				default: result= false;
			}				
			
			this.setState({
				answer:result,
				answerSet:true,
				digits:[],
				operationSet:false,	
				leftDigits:[],
				rightDigits:[]
				})
			return;			
			
		}
		if(val==="C"){
			this.setState({
				answer:'',
				answerSet:false,
				digits:[],
				leftDigits:[],
				rightDigits:[],
				leftOperand:null,
				rightOperand:null,
				operationSet:false,	
				operation:null,
				operand:null				
				})
		}
		if(val==="\u2713"){//select an answer
			let compare=this.findValue(this.state.answer);
			//if(this.state.answer===this.state.result){
			console.log(compare+'===='+this.state.answer);	
			
			this.setState({
				answer:'',
				digits:[],
				leftDigits:[],
				rightDigits:[],

				})
			return;
		}
		if(val==="\u232B"){//backspace
			if(this.state.addingFraction||this.state.addedFraction){
				this.setState({
					fraction:0,
					addingFraction:false,
					addedFraction:false
				});
			}
			else{
				digs.splice(digs.length-1,1);
				this.setState({
					digits:digs,
					answer:digs.join('')
				});			
					
			}
			console.log(val);
			return;
		}		
		if(/^[0-9]+$/.test(val)){
			console.log(val);
			digs.push(val);
			if(!this.state.operationSet)leftDigs.push(val);
			else rightDigs.push(val);
			this.setState({
				digits:digs,
				answer:digs.join(''),
				leftDigs:leftDigs.join(''),
				rightDigs:rightDigs.join(''),
				leftOperand:(this.state.operationSet?this.state.leftOperand:leftDigs.join('')),
				rightOperand:(!this.state.operationSet?this.state.rightOperand:rightDigs.join('')),
			});		
			return;
		}		

		console.log(val);		

	}
	pickOperation(e){
		let val = e.currentTarget.value, ops={'add':'+','sub':'\u2212','mult':'\u00d7','div':'\u00f7','fraction':'\u00f7'};
		
		this.setState({
				operation:val,
				operand:ops[val],
				rangeUnder20:(val==="add"||val==="sub"?true:false),
				answer:'',
				addedFraction:false,
				addingFraction:false,
				topOperand:(val==="fraction"?this.state.numerator:this.state.topOperand),
				botOperand:(val==="fraction"?this.state.denominator:this.state.botOperand),
			},		//callback on when the state is set for these values
			this.resetEquations
		);
		console.log(val);
		return;
	}
	render() {
		return (
			<div>	
				<div className="card">
					<div className={!this.state.answerSet?"calculatorEquation":"none"}>
						<div className="calculatorContainer">
							<div id="top">{this.state.leftOperand}</div>
						</div>
						<div className="calculatorContainer">		
							<div id="operandSpacer">{this.state.operand}</div>
							<div id="bot">{this.state.rightOperand}</div>
						</div>	
						<div className="calculatorContainer">							
							{this.state.answerXCF}				
						</div>					
						<hr/>						
						<div id="MultDiv"></div>	
					</div>
					<div className={this.state.answerSet?"EquationAndAnswer":"none"}>
						<div className="equationContainer">
							<div id="top">{this.state.leftOperand}</div>
							<div id="operandSpacer">{this.state.operand}</div>
							<div id="bot">{this.state.rightOperand}=</div>
						</div>	
						<div className="answerContainer">							
							{this.state.answer}				
						</div>					
						<hr/>						
						<div id="MultDiv"></div>	
					</div>
					<div id="answersMulDiv" className={this.state.rangeUnder20?"none":""} >
						<ul className={!this.state.success?"numbers":"none"}>
							{this.state.rows.map(
								function(item){
									return (
										<li className="numberValues" data-type="number" data-val="{item}" key={item}  onClick={this.checkNumberOrOperation.bind(this)}>{item}</li>
									)
								},this)
							}
						</ul>
						<div className={this.state.success?"numbers":"none"}>
							<div className="correct">{this.state.lastAnswer}<br/>&#x263A;</div>
						</div>
						<ul className={!this.state.success?"numbers":"none"}>
							<li className="numberValues" data-type="operation" data-val="add" onClick={this.checkNumberOrOperation.bind(this)}>+</li>							
							<li className="numberValues" data-type="operation" data-val="sub" onClick={this.checkNumberOrOperation.bind(this)}>-</li>							
							<li className="numberValues" data-type="operation" data-val="mult" onClick={this.checkNumberOrOperation.bind(this)}>x</li>							
							<li className="numberValues" data-type="operation" data-val="div" onClick={this.checkNumberOrOperation.bind(this)}>÷</li>							
							<li className="numberValues" data-type="C" data-val="C" onClick={this.checkNumberOrOperation.bind(this)}>C</li>							
							<li className="numberValues" data-type="spacing" data-val="bksp" onClick={this.checkNumberOrOperation.bind(this)}>{'\u232B'}</li>
							<li className="numberValues" data-type="spacing" data-val="answer" onClick={this.checkNumberOrOperation.bind(this)}>=</li>
						</ul>
					</div>				
				</div>	
			</div>
			
		)
	}
}
export default Calculator;
