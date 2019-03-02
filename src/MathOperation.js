import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AirportToSports from './AirportToSports';

class MathOperation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: null,
			clickedLetters:[],
			matchedLetters: [],
			digits:[],
			alphabet: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"],
			max:9,
			min:0,
			answer:'',
			maxA:10,
			minA:2,			
			topOperand:0,
			botOperand:0,
			numerator:0,
			denominator:0,	
			lastAnswer:'',			
			fraction:0,	
			success:false,
			addingFraction:false,
			addedFraction:false,			
			result:0,
			denomMax:(10-2),
			denomMin:2,			
			//operand:"\u00d7",
			operand:"+",
			operation:'add',
			rangeUnder20:true,
			rows:[]
		}
		this.state.topOperand=Math.floor(Math.random() * Math.floor(this.state.maxA-this.state.minA))+this.state.minA;
		this.state.botOperand=Math.floor(Math.random() * Math.floor(this.state.maxA-this.state.minA))+this.state.minA;		
		this.state.denominator=Math.floor(Math.random() * Math.floor(this.state.denomMax))+this.state.denomMin;
		this.state.numerator=Math.floor(Math.random() * Math.floor(this.state.denominator*10))+this.state.denomMin;	
	
		if(this.state.botOperand>this.state.topOperand){//Make sure smaller number is on bottom, way kids are taught
			var tmp=this.state.botOperand;
			this.state.topOperand=this.state.botOperand;
			this.state.botOperand=tmp;
		}		
		var i=this.state.min,len=this.state.max;
		while(i++ <= len)this.state.rows.push(i-1)
	}
	resetEquations(){
		var topOperand, botOperand, tmp;
		switch(this.state.operation){
			case "add": 
			case "sub": 
			case "mult": 					
				topOperand=Math.floor(Math.random() * Math.floor(this.state.maxA-this.state.minA))+this.state.minA;
				botOperand=Math.floor(Math.random() * Math.floor(this.state.maxA-this.state.minA))+this.state.minA;	
				break;
				
			case "div": 
				tmp=Math.floor(Math.random() * Math.floor(this.state.maxA-this.state.minA))+this.state.minA;
				botOperand=Math.floor(Math.random() * Math.floor(this.state.maxA-this.state.minA))+this.state.minA;	
				topOperand=tmp*botOperand;
				break;
				
			case "fraction": 
				var dn=Math.floor(Math.random() * Math.floor(this.state.denomMax))+this.state.denomMin,
				nm=Math.floor(Math.random() * Math.floor(this.state.denominator*10))+this.state.denomMin;
				this.setState({denominator:dn,numerator:nm})
				topOperand=nm;
				botOperand=dn;
				break;	
				
			default: break;
			
		}
		if(botOperand>topOperand){//Make sure smaller number is on bottom, way kids are taught
			var tmp=botOperand;
			topOperand=botOperand;
			botOperand=tmp;
		}	
		this.setState({
			topOperand:topOperand,
			botOperand:botOperand,
			addingFraction:false,
			addedFraction:false,
			fraction:0,
			answer:'',
			digits:[]
			});	
		
	}
	checkNumberOrOperation(e) {
		var val = e.currentTarget.textContent, digs=this.state.digits, fractionMatch=false;
		//this.state.clickedLetters.push(val);
		
		if(val==="\u2713"){//select an answer
			var compare=this.findValue(this.state.answer);
			//if(this.state.answer===this.state.result){
			console.log(compare+'===='+this.state.answer);
			if(this.state.operation==="fraction"){
				var myFraction=Math.round((compare-Math.floor(compare))*this.state.denominator);
				if(myFraction==this.state.fraction)fractionMatch=true;
			}
			else{
				fractionMatch=true;
			}			
			if(parseInt(compare)===parseInt(this.state.answer) && fractionMatch){
				console.log(val+' - correct answer');	
				
				this.setState({
					success:true,
					lastAnswer:compare
				}, function(){
						var that=this;
						setTimeout(function(){
							that.setState({success:false});
							that.resetEquations();},
						1000)
					}
				);
				//this.resetEquations();
				return;
			}
			else{
				console.log(val+' - WRONG answer - '+ this.state.answer+'=='+this.state.result);	
				this.setState({fraction:0});
				this.setState({addingFraction:false});
				this.setState({addedFraction:false});
			}	
			this.setState({answer:''});
			this.setState({digits:[]})
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
		if(this.state.addingFraction && /^[0-9]+$/.test(val)){
			console.log(val);
			this.setState({
				fraction:val,
				addingFraction:false,
				addedFraction:true
			});			
			return;
		}		
		if(/\d{1,2}\/\d{1,2}/.test(val)){
			console.log(val);
			this.setState({addingFraction:true});
			return;
		}

		digs.push(val);
		this.setState({
			digits:digs,
			answer:digs.join('')
		});
		console.log(val);		

	}
	findOperaton(val){
		var result=false;
		switch(this.state.operation){
			case "add": result= (val===(this.state.topOperand+this.state.botOperand));break;
			case "sub": result= (val===(this.state.topOperand-this.state.botOperand));break;
			case "mult": result= (val===(this.state.topOperand*this.state.botOperand));break;
			case "div": result= ((val/this.state.topOperand)===this.state.botOperand);break;
			case "fraction": result= ((val/this.state.topOperand)===this.state.botOperand);break;			
			default: result= false;
		}		
		return result;
	}
	findValue(val){
		var result=false;
		switch(this.state.operation){
			case "add": result= (this.state.topOperand+this.state.botOperand);break;
			case "sub": result= (this.state.topOperand-this.state.botOperand);break;
			case "mult": result= (this.state.topOperand*this.state.botOperand);break;
			case "div": result= (this.state.topOperand/this.state.botOperand);break;
			case "fraction": result= (this.state.topOperand/this.state.botOperand);break;
			default: result= false;
		}		
		return result;
	}	
	giveAnswer(e){
		var val = parseInt(e.currentTarget.textContent), compare;
		//this.state.answer.push(val);
		compare=this.findOperaton(val);
		if(compare){
			console.log(val+" is correct!!!");
			this.setState({
					success:true,
					lastAnswer:val,
					answer:val
				}, 				//callback on when the state is set for these values,this includes a delay.  Need to pass it "this"
				function(){
					var that=this;
					setTimeout(function(){
						that.setState({success:false});
						that.resetEquations();
					},1000)
				}
			);			
			//this.resetEquations();
		}
		else{
			console.log(val+" is wrong, the correct answer is "+(this.findValue(val))+", try again!");
			this.setState({
				lastAnswer:val,
				answer:val
			})	
		}
	}
	pickOperation(e){
		var val = e.currentTarget.value, ops={'add':'+','sub':'\u2212','mult':'\u00d7','div':'\u00f7','fraction':'\u00f7'};
		
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
				{AirportToSports.showAirportX}
				<div className="operation">
					<div id="adding">
						+<input type="radio" name="operation" value="add" selected={true} onClick={this.pickOperation.bind(this)} />
					</div>
					<div id="subtract">
						−<input type="radio" name="operation" value="sub" onClick={this.pickOperation.bind(this)} />
					</div>
					<div id="multiply">
						×<input type="radio" name="operation" value="mult" onClick={this.pickOperation.bind(this)} />
					</div>
					<div id="divide">
						÷<input type="radio" name="operation" value="div" onClick={this.pickOperation.bind(this)} />
					</div>
					<div id="fraction">
						÷&#x00bc;&#x00bd;&#x2153;<input type="radio" name="operation" value="fraction" onClick={this.pickOperation.bind(this)} />
					</div>
				</div>		
				<div className="card">
					<div className="equation">
						<div className="equationContainer">
							<div id="topSpacer">&nbsp;</div>
							<div id="top">{this.state.topOperand}</div>
						</div>
						<div className="equationContainer">		
							<div id="botSpacer">{this.state.operand}</div>
							<div id="bot">{this.state.botOperand}</div>
						</div>		
						<hr/>
						<div id="total">{this.state.answer}
							<div className={this.state.addedFraction||this.state.addingFraction?"fraction":"none"}>
								<span className="fup" data-val="numerator">{this.state.fraction}</span>
								<span className="bar">/</span>
								<span className="fdn" data-val="denominator">{this.state.denominator}</span>
							</div>						
						</div>
						
						<div id="MultDiv"></div>	
					</div>
					<div id="answers" className={this.state.rangeUnder20?"":"none"} >
						<ul className={!this.state.success?"numbers":"none"}>
							{this.state.alphabet.map(
								function(item){
									return (
										<li className="numberValues" data-val="{item}" key={item}  onClick={this.giveAnswer.bind(this)}>{item}</li>
									)
								},this)
							}
						</ul>
						<div className={this.state.success?"numbers":"none"}>
							<div className="correct">{this.state.lastAnswer}<br/>&#x263A;</div>
						</div>						
					</div>
					<div id="answersMulDiv" className={this.state.rangeUnder20?"none":""} >
						<ul className={!this.state.success?"numbers":"none"}>
							{this.state.rows.map(
								function(item){
									return (
										<li className="numberValues" data-val="{item}" key={item}  onClick={this.checkNumberOrOperation.bind(this)}>{item}</li>
									)
								},this)
							}
						</ul>
						<div className={this.state.success?"numbers":"none"}>
							<div className="correct">{this.state.lastAnswer}<br/>&#x263A;</div>
						</div>
						<ul className={!this.state.success?"numbers":"none"}>
							<li className="numberValues" data-val="bksp" onClick={this.checkNumberOrOperation.bind(this)}>{'\u232B'}</li>
							<li className="numberValues" data-val="answer" onClick={this.checkNumberOrOperation.bind(this)}>{'\u2713'}</li>
							<li className={this.state.operation==="fraction"?"fractContainer":"none"} data-val="fraction" onClick={this.checkNumberOrOperation.bind(this)}>
								<div className="fraction">
									<span className="fup" data-val="numerator">{this.state.fraction}</span>
									<span className="bar">/</span>
									<span className="fdn" data-val="denominator">{this.state.denominator}</span>
								</div>
							
							</li>
						</ul>
					</div>				
				</div>
			</div>
		)
	}
}
export default MathOperation;

