import React, { Component } from 'react';
import { Router, Route, Link, BrowserRouter, withRouter  } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import config from './json/usLargeAirports.json';

const airportList=config;
class AirportToSports extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: null,
			airList:airportList,
			addingFraction:false,
			addedFraction:false,			
			result:0,
			denomMax:(10-2),
			denomMin:2,		
			matchList:[],
			min:0,
			max:20,			
			//operand:"\u00d7",
			operand:"+",
			operation:'add',
			rangeUnder20:true,
			selectAirportX:'',
			rows:[]
		}
		var selectedAirportX='';		
		var i=this.state.min,len=this.state.max;
		while(i++ <= len)this.state.rows.push(i-1)
	}
	showAirport(){
		return (
			<div>
			{this.selectedAirportX}
			</div>
		)
	}

	selectAirport(e){
		var val=e.currentTarget.textContent;
		console.log(val);
		this.selectedAirportX=val;
		this.setState({selectAirportX:val});
		//document.location('/Info?'+val);
	
	}
	filterSearch(e){
		var val = e.currentTarget.value.toLowerCase(), i,len, tmpArr=[], iata, nm, lat, lon, airList=this.state.airList;
		console.log(val);
		if(val===''){
			this.setState({matchList:[]});
			return;
		}
		for(i=0,len=airList.length;i<len;i+=1){
			nm=airList[i]['name'];
			iata=airList[i]['iata'];
			lat=airList[i]['lat'];
			lon=airList[i]['lon'];
			if(iata.toLowerCase().indexOf(val)===0 || nm.toLowerCase().indexOf(val)===0){
			tmpArr.push({name:nm,iata:iata,sz:airList[i]['size'],url:'/Info?nm='+nm+'&iata='+iata+'&lat='+lat+'&lon='+lon});
				//tmpArr.push(nm +'|'+iata);
			}
		}
		this.setState({matchList:tmpArr});
	}
// {this.showAirport()}
// <div>{this.state.selectAirportX}</div> 
	render() {
		return (
			<div className="searchBar">
				<input type="text" placeholder="Airport"  onChange={this.filterSearch.bind(this)} />
					<ul className="matchList">
						{this.state.matchList.map(
							function(item){
								return (
									<li className="airportList" data-val="{item}" key={item.iata} 
									//onClick={() => this.props.router.push('/Info')}>
									onClick={this.selectAirport.bind(this)}>
									<a href={item.url} className="redirect">
										<ul className="searchResults">
											<li className="AirportName">{item.name}|</li>
											<li className="AirportInfo">"{item.iata}" is a {item.sz} airport</li>
										</ul>
									</a>
									</li>
								)
							},this)
						}
					</ul>
					
			</div>

		)
	}
}
export default AirportToSports;

