import React, { Component } from 'react';
import { Router, Route, Link, BrowserRouter  } from 'react-router-dom';
import Script from 'react-load-script';
//import {Script} from 'react-scripts';
import './TicTacToe.css';

const search = document.location.search; 
const params = new URLSearchParams(search);
const iata = params.get('iata');
const nm = params.get('nm');
//import airportData from 'http://www.airport-data.com/api/ap_info.json?iata='+iata;
//const airportList=airportData;

class TicTacToe extends React.Component {
	constructor(props) {
		super(props);
		
		const search = document.location.search; 
		const params = new URLSearchParams(search);
		const iata = params.get('iata');
		this.state = {
			timesClicked: 0,
			selections:[],
			boxes:[
				{cls:"top left",val:null, indx:0},{cls:"top center",val:null, indx:1},{cls:"top right",val:null, indx:2},
				{cls:"middle left",val:null, indx:3},{cls:"middle center",val:null, indx:4},{cls:"middle right",val:null, indx:5},
				{cls:"bottom left",val:null, indx:6},{cls:"bottom center",val:null, indx:7},{cls:"bottom right",val:null, indx:8}
				],
			winner:null

		};
		
		//console.log('"'+random+'" in constructor');
	}
	evaluateState(boxes){
		let matches=[[0,1,2],[3,4,5],[6,7,8],[0,4,8],[0,3,6],[1,4,7],[2,4,6],[2,5,8]], totalMatches=0,
		X=[].fill('',0,8),O=[].fill('',0,8),
		match=false, checkX=[],checkO=[];
		for(let i=0,len=boxes.length;i<len;i+=1){
			if(boxes[i].val==='X'){
				X[i]='X';
				totalMatches+=1;
			}
			if(boxes[i].val==='O'){
				O[i]='O';
				totalMatches+=1;
			}
		}
		for(let i=0,len=matches.length;i<len;i+=1){
			if(X[matches[i][0]]==='X'&&X[matches[i][1]]==='X'&&X[matches[i][2]]==='X')match=matches[i];
			if(O[matches[i][0]]==='O'&&O[matches[i][1]]==='O'&&O[matches[i][2]]==='O')match=matches[i];
		//	if(X[matches[i][0]]==='X'&&X[matches[i][1]]==='X'&&X[matches[i][2]]==='X')match={X:matches[i]};
		//	if(O[matches[i][0]]==='O'&&O[matches[i][1]]==='O'&&O[matches[i][2]]==='O')match={O:matches[i]};
		}
		if(!match){//did we fill in all 9.....
			if(totalMatches===9)return [];
			else return match;
		}
		return match;
	}
	resetBoard(){
		let boxes=[
				{cls:"top left",val:null, indx:0},{cls:"top center",val:null, indx:1},{cls:"top right",val:null, indx:2},
				{cls:"middle left",val:null, indx:3},{cls:"middle center",val:null, indx:4},{cls:"middle right",val:null, indx:5},
				{cls:"bottom left",val:null, indx:6},{cls:"bottom center",val:null, indx:7},{cls:"bottom right",val:null, indx:8}
				];
		this.setState({
			timesClicked:0,
			boxes:boxes,
			winner:false
		});		
		
	}
	
	checkClick(e){
		let num,  val = e.currentTarget.textContent, indx=e.currentTarget.attributes['data-index'].value, match,
		boxes=this.state.boxes.slice();;
		if(val!==null&&val!==''){
			console.log('Already selected')
			return;
		}
		num=this.state.timesClicked+1;
		var newSel=(num%2?'X':'O');
		boxes[indx].val=newSel;
		match=this.evaluateState(boxes);
		if(match){
			if(match.length===0){
				for(let i=0,len=boxes.length;i<len;i+=1){
					boxes[i].cls+=" tie";
				}				
			}
			else{
				for(let i=0,len=match.length;i<len;i+=1){
					boxes[match[i]].cls+=" winner";
				}
			}
			this.setState({
					timesClicked:num,
					boxes:boxes,
					winner:match
				},function(){
						var that=this;
						setTimeout(function(){
							that.resetBoard();},
						1000)
				});		
			
		}
		else{
		this.setState({
				timesClicked:num,
				boxes:boxes,
				winner:match
			});
		}
		
	}
	render() {
		return (
			<div className="TicTacToe">
				<ul>
					
					{this.state.boxes.map(
						function(item){
							return (
								<li className={item.cls} data-index={item.indx} key={item.indx} onClick={this.checkClick.bind(this)}>{item.val}</li>
							)
						},this)
					}
				</ul>
			</div>
		)
	}
}

export default TicTacToe;
