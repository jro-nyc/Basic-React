import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, BrowserRouter  } from 'react-router-dom';
//import { Router, Route, Link} from 'react-router';
import './index.css';
import MyHeader from './MyHeader';
import App from './App';
import MathOperation from './MathOperation';
import Hangman from './components/Hangman';
import Info from './components/Info';
import TicTacToe from './components/TicTacToe';
import * as serviceWorker from './serviceWorker';

//Standard APP below
//ReactDOM.render(<App />, document.getElementById('root'));

const Home = () => (
	<div>
		<h1>Home...</h1>
	</div>
)

const About = () => (
	<div>
		<h1>About...</h1>
	</div>
)

const Contact = () => (
	<div>
		<h1>Contact...</h1>
	</div>
)

//Using Router 
ReactDOM.render((
	<BrowserRouter>
		<div>
		  
			<Route path = "/" component = {MyHeader} />
			<Route path = "/home" component = {Home} />
			<Route path = "/about" component = {About} />
			<Route path = "/contact" component = {Contact} />
			<Route path = "/MathOperation" component = {MathOperation} />
			<Route path = "/Hangman" component = {Hangman} />
			<Route path = "/App" component = {App} />
			<Route path = "/Info" component = {Info} />
			<Route path = "/TicTacToe" component = {TicTacToe} />
		 
		</div>
		
	</BrowserRouter>
), document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
