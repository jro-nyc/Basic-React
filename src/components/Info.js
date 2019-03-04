import React, { Component } from 'react';
import { Router, Route, Link, BrowserRouter  } from 'react-router-dom';
import Script from 'react-load-script';
//import {Script} from 'react-scripts';
import './Info.css';

const search = document.location.search; 
const params = new URLSearchParams(search);
const iata = params.get('iata');
const nm = params.get('nm');
//import airportData from 'http://www.airport-data.com/api/ap_info.json?iata='+iata;
//const airportList=airportData;

class Info extends React.Component {
	constructor(props) {
		super(props);
		
		const search = document.location.search; 
		const params = new URLSearchParams(search);
		const iata = params.get('iata');
		this.state = {
			value: null,
			clickedLetters:[],
			//airList:airportList,
			created:'',
			loaded:'',
			error:'',
			caption:'',
			isLoaded:false,
			items:null,
			matchedLetters: [],
			urlJSON:'http://www.airport-data.com/api/ap_info.json?iata='+iata,
			url:'http://www.airport-data.com/airport/'+iata+'/',
			misses:0,
			alphabet: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
		};
		
		//console.log('"'+random+'" in constructor');
	}
	myUpdate(e){
		//console.log('hi:you have '+this.state.lives+' lives left and have matched '+this.state.matchedLetters.length+' letters out of '+this.state.myLetters.length+' and '+this.state.misses+' misses');
		if(this.state.lives<1 || (this.state.matchedLetters.length===this.state.myLetters.length)){
			var randomNum=Math.floor((Math.random() * this.state.words.length))
			var random = this.state.words[randomNum].toUpperCase();
			var _letters=random.split("");
			this.state.words.splice(randomNum, 1);
			this.setState({
			  value: null,
			  clickedLetters:[],
			  matchedLetters: [],
        lives:(_letters.length===4?7:6),
	      misses:0,
			  initialLives:(_letters.length===4?7:6),
			  randomWord:'',
			  alphabet: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
			  myLetters : _letters,
			})
			//console.log('"'+random+'" in myUpdate');
		}
	}

	getMyRandom(e) {
		var randomNum=Math.floor((Math.random() * this.state.words.length))
		var random = this.state.words[randomNum].toUpperCase();
		this.state.words.splice(randomNum, 1);
		this.setState({
			randomWord: random,
		});
	}



	checkLetter(e) {
		var val = e.currentTarget.textContent;
		this.state.clickedLetters.push(val);
		if( this.state.lives < 1 ) {
			//console.log('Sorry, outta lives');
			return;
		}

		var _this = this, match=false;
		this.state.myLetters.forEach(function(letter) {
			if (letter === val) {
				_this.state.matchedLetters.push(letter)
				_this.setState({
					matchedLetters: _this.state.matchedLetters,
				});
				match=true;
			}
		});
		if(match){
      //console.log('We have a match!');
			this.setState( {
				clickedLetters:this.state.clickedLetters,
			});

		}
		else{
      //console.log('We NO have NO match!');
			this.setState({
				clickedLetters:this.state.clickedLetters,
				misses:this.state.misses+1,
				lives:this.state.lives-1,
			})
			if( this.state.lives < 1 ) {
				//console.log('outta lives');
				if(this.state.myLetters.length !== this.state.matchedLetters.length) {
					//console.log('and'+this.state.myLetters.length+'!=='+this.state.matchedLetters.length);
					var randomNum=Math.floor((Math.random() * this.state.words.length))
					var random = this.state.words[randomNum];
					var _letters=random.split("");
					this.state.words.splice(randomNum, 1);
					this.setState( {
						value: null,
						clickedLetters:[],
						matchedLetters: [],
            lives:(_letters.length===4?7:6),
						misses:0,
						initialLives:(_letters.length===4?7:6),
						alphabet: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
						myLetters : _letters,
					 });
					//console.log(random)
				}
			}
		}
		//console.log('you have '+this.state.lives+' lives left,matched '+this.state.matchedLetters.length+' letters of '+this.state.myLetters.length+' and a value of:'+this.state.myLetters+' and value of:'+val+' and '+this.state.misses+' misses');
	}
	handleScriptCreate(e){
		this.setState({
					created: "We have CREATED the script tag"
		});
		
	}	
	handleScriptError(e){
		this.setState({
					error: "We have an ERROR in creating the script tag"
				});		
		
	}	
	handleScriptLoad(e){
				this.setState({
					loaded: "We have LOADED the script tag, voila",
					caption: "Here is the airport info for "+nm
				});
				//this.getJSON2()
		
		
	}		//console.log('you have '+this.state.lives+' lives left,matched '+this.state.matchedLetters.length+' letters of '+this.state.myLetters.length+' and a value of:'+this.state.myLetters+' and value of:'+val+' and '+this.state.misses+' misses');
	
	handleScriptCreateI(e){
		this.setState({
					created: "We have CREATED the script tag"
		});
		
	}	
	handleScriptErrorI(e){
		this.setState({
					error: "We have an ERROR in creating the script tag"
				});		
		
	}	
	handleScriptLoadI(e){
				this.setState({
					loaded: "We have LOADED the script tag, voila",
					caption: "Here is the airport info for "+nm
				});
				//this.getJSON2()
		
		
	}
	/*
	getJSON(){
		fetch('http://www.airport-data.com/api/ap_info.json?iata='+iata)
			.then(results => results.json())
			.then(json => {
				this.setState({
					isLoaded: true,
					items: json                           
				})
			});
	}	*/
	getJSON2 = async() => {
		const api_call = await fetch('http://www.airport-data.com/api/ap_info.json?iata='+iata);
		const data = await api_call.json();
		console.log(data);
	
    }			
	doCaption(){
		this.setState({
			caption: "Here is the airport info for "+nm
		});		
	}	
	
	//getJSON2();
	//getJSON();
	//getMyRandom();
	render() {
		return (
			<div className="Info">
				<div  className="none">
					<Script 
						url={this.state.url}
						onCreate={this.handleScriptCreate.bind(this)}
						onError={this.handleScriptError.bind(this)}
						onLoad={this.handleScriptLoad.bind(this)}
						/>
					<h5>{this.state.created}</h5>
					<h5>{this.state.error}</h5>
					<h5>{this.state.loaded}</h5>
					
				</div>
				<h3>{this.state.caption}</h3>
				<iframe name="airportInfo" id="airportInfo" src={this.state.url} width="100%" height="500" 
				onLoad={this.handleScriptLoadI.bind(this)} onError={this.handleScriptErrorI.bind(this)} />
			</div>
		)
	}
}

export default Info;
