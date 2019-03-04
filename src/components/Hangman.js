import React, { Component } from 'react';
import './Hangman.css';

class Hangman extends React.Component {
	constructor(props) {
		//var allWords = ["over","take","only","label","steps","away","animal","house","point","spot","desk","mask","task","tusk","disk","events","able","equal","pair","multiply","letter","mother","ball","rich","study","much","such","patch","search","march","starch","repeat","subtract","divide","group","still","learn","should","America","world","hush","slush","dash","wash","wish","dish","money"];
    var allWords = ["over","take","only","park","hard","barn","card","shark","dark","eyes","timeline","hold","little","work","know","place","years","rain","mail","wait","paint","chant","paid","sail","goods","services","pitch","volume","live","cool","give","most","straw","draw","country","ocean","title","motion","change","very","after","things","just","girl","dirt","shirt","third","thirst","birth","yellow","life","cycle","pole","wire","fight","seen","right","might","sight","tight","flight","bright","lost","push","pull","strength","great","four","help","through","gold","cold","fold","mold","sold","told","limited","resource","baby","parent","stages","late","before","line","side","loud","sound","found","shout","count","gave","urban","suburban","rural","magnet","touch","means","same","corn","blue","true","clue","glue","argue","hero","song","cause","kind","soon","came","want","eggs","nurse","curve","turn","burn","curl","purse","growth","affect","fish","stress","fruit","also","beat","seat","three","small","mean","clean","peak","dream","beach","team","length","weight","height","meat","distance","wear","does","another","head","bread","dead","sweat","deaf","spread","deal","room","break","weather","soil","well","large","cook","sent","even","grew","stew","drew","chew","brew","evet","unit","metric","color","shape","step","because","body","here","fall","germ","herd","clerk","nerve","serve","fern","food","fuel","build","flat","plan","went","warm","read","short","core","sport","report","port","done","solid","liquid","rise","size","door","farm","fire","home","move","bump","stump","clump","stamp","clamp","camp","question","test","predict","observe","guess","rest","hand","seven","again","fast","past","last","cost","blast","cast","oral","data","record","full","feet","spell","bend","send","mind","offend","sand","land","wind","week","label","steps","away","animal","house","point","spot","desk","mask","task","tusk","disk","events","able","equal","pair","multiply","letter","mother","ball","rich","study","much","such","patch","search","march","starch","repeat","subtract","divide","group","still","learn","should","America","world","hush","slush","dash","wash","wish","dish","money","coin","bill","cents","dollars","boxes","foxes","messes","dishes","couches","brushes","bushes","rushes","wishes","washes","dashes","find","whole","fear","fair","share","thing","string","sing","bring","spring","ring","king","sting","wings","cling","sling","chart","wall","greater","smaller","road","graph","laugh","tough","rough","enough","triumph","dough","though","cough","glyph","classify","wide","store","answer","model","bath","math","moth","sloth","breath","mouth","path","cloth","tooth","death","months","hour","minute","second","year","mile","stack","pack","dock","lock","quack","rope","snack","quick","neck","check","circle","square","triangle","plane","drink","think","sink","stink","wink","thank","bank","drank","honk","blank","shrink","gone","cube","pyramid","root","meet","soft","lift","shift","drift","gift","left","raft","craft","loft","swift","sift","apart","form","ride","arrange","geometry","bolt","jolt","colt","felt","belt","welt","built","stilt","wilt","melt","salt","face","edge","arms","tally","whale","when","where","what","which","whistle","whip","white","while","whirl","woman","display","knew","himself","badly","madly","quickly","weekly","daily","sadly","gladly","proudly","softly","loudly","bravely","care","hill","case","simple","lake","painter","washer","dryer","flyer","server","workers","singer","teacher","speaker","thinker","dreamer","tall","lead","problem","apple","fastest","slowest","biggest","shortest","loudest","softest","smartest","silliest","funniest","bravest","context","poem","select","tone","thankful","ears","hopeful","grateful","useful","painful","joyful","careful","helpful","connect","self","text","love","meaning","darkness","likeness","kindness","sickness","goodness","seeds","bones","cows","listen","speak","power","write","apply","likable","adorable","chewable","bearable","usable","lovable","sizable","valuable","prefix","suffix","eights","contents","addition","fiction","division","vacation","location","glass","sensible","support"];
  	super(props);
		var randomNum=Math.floor((Math.random() * allWords.length))
		var random = allWords[randomNum].toUpperCase();
		var _letters=random.split("");
		allWords.splice(randomNum, 1);
		this.state = {
			value: null,
			clickedLetters:[],
			matchedLetters: [],
			words:allWords,
      lives:(_letters.length===4?7:6),
			misses:0,
			initialLives:(_letters.length===4?7:6),
			alphabet: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
			myLetters : _letters,
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

	renderHangman(){
		return (
			<div className="noosecanvas">
			  <svg version="1.1" className="noose" x="0px" y="0px" viewBox="0 0 236 333" id="gamenoose">
				<g>
          <g className={this.state.initialLives===7?"":"opOff"}>
  				  <line className={this.state.misses>6 &&(this.state.matchedLetters.length!==this.state.myLetters.length&&this.state.initialLives===7)?"step active":"step inactive"} x1="91.4" y1="133.9" x2="91.6" y2="212.4"></line>
  				  <line className={this.state.misses>5&&(this.state.matchedLetters.length!==this.state.myLetters.length&&this.state.initialLives===7)?"step active":"step inactive"} x1="184.4" y1="134.3" x2="184.2" y2="212.8"></line>
  				  <line className={this.state.misses>4&&(this.state.matchedLetters.length!==this.state.myLetters.length&&this.state.initialLives===7)?"step active":"step inactive"} x1="139.4" y1="218.7" x2="114.2" y2="319.3"></line>
  				  <line className={this.state.misses>3&&(this.state.matchedLetters.length!==this.state.myLetters.length&&this.state.initialLives===7)?"step active":"step inactive"} x1="139.4" y1="218.7" x2="167.5" y2="319.4"></line>
  				  <line className={this.state.misses>2&&(this.state.matchedLetters.length!==this.state.myLetters.length&&this.state.initialLives===7)?"step active":"step inactive"} x1="139.4" y1="124.7" x2="139.4" y2="218.7"></line>
            <line className={this.state.misses>1 &&(this.state.matchedLetters.length!==this.state.myLetters.length&&this.state.initialLives===7)?"step active":"step inactive"} x1="91.4" y1="133.9" x2="188.2" y2="133.4"></line>
          </g>
          <g className={this.state.initialLives===6?"":"opOff"}>
            <line className={this.state.misses>5 &&(this.state.matchedLetters.length!==this.state.myLetters.length&&this.state.initialLives===6)?"step active":"step inactive"} x1="139.4" y1="133.9" x2="91.6" y2="212.4"></line>
  				  <line className={this.state.misses>3&&(this.state.matchedLetters.length!==this.state.myLetters.length&&this.state.initialLives===6)?"step active":"step inactive"} x1="139.4" y1="218.7" x2="114.2" y2="319.3"></line>
            <line className={this.state.misses>4&&(this.state.matchedLetters.length!==this.state.myLetters.length&&this.state.initialLives===6)?"step active":"step inactive"} x1="139.4" y1="134.3" x2="184.2" y2="212.8"></line>
  				  <line className={this.state.misses>2&&(this.state.matchedLetters.length!==this.state.myLetters.length&&this.state.initialLives===6)?"step active":"step inactive"} x1="139.4" y1="218.7" x2="167.5" y2="319.4"></line>
  				  <line className={this.state.misses>1&&(this.state.matchedLetters.length!==this.state.myLetters.length&&this.state.initialLives===6)?"step active":"step inactive"} x1="139.4" y1="124.7" x2="139.4" y2="218.7"></line>
          </g>
				  <circle className={this.state.misses>0&&(this.state.matchedLetters.length!==this.state.myLetters.length)?"step active":"step inactive"} cx="139.4" cy="89.1" r="35.6"></circle>
				  <g className={this.state.misses>this.state.initialLives-1?"active lose":"inactive lose"}>
					<g>
					  <line x1="122.9" y1="83.4" x2="131.1" y2="91.6"></line>
					  <line x1="122.6" y1="91.9" x2="131.6" y2="82.9"></line>
					</g>
					<g>
					  <line x1="147" y1="83.5" x2="155.3" y2="91.8"></line>
					  <line x1="146.8" y1="92" x2="155.8" y2="83"></line>
					</g>
					<g>
					  <path d="M126.4,106.5c0-1.8,5.6-3.2,12.4-3.2"></path>
					  <path d="M150.9,106.5c0-1.8-5.6-3.2-12.4-3.2"></path>
					</g>
				  </g>
				</g>
				<g className={this.state.matchedLetters.length===this.state.myLetters.length?"active win":"inactive win"}>
				  <circle cx="167" cy="119.9" r="35.6"></circle>
				  <line x1="167" y1="169" x2="231.8" y2="96.7"></line>
				  <line x1="167" y1="155.5" x2="167" y2="249.4"></line>
				  <line x1="167" y1="249.4" x2="180.4" y2="330.5"></line>
				  <line x1="167" y1="249.4" x2="142.4" y2="330.5"></line>
				  <line x1="167" y1="169" x2="92.8" y2="106.4"></line>
				  <g>
					<path d="M151.8,133.7c0,4.2,6.9,7.7,15.4,7.7"></path>
					<path d="M182.2,133.7c0,4.2-6.9,7.7-15.4,7.7"></path>
				  </g>
				  <line x1="151" y1="118.1" x2="161.1" y2="118.1"></line>
				  <line x1="173.1" y1="118.1" x2="183.2" y2="118.1"></line>
				</g>
				<g>
				  <line x1="0" y1="330.5" x2="236" y2="330.5"></line>
				  <line x1="59" y1="0" x2="59" y2="330.5"></line>
				  <line x1="139.4" y1="53.5" x2="139.4" y2="0"></line>
				  <line x1="58" y1="2.5" x2="139.4" y2="2.5"></line>
				</g>
			  </svg>
        <div className="lives">
          <h4>You have</h4>
          <span className={this.state.lives>2?"lives-left":"few-lives"}>{this.state.lives}</span>
          <h4>{this.state.lives>1?"lives":"life"} left</h4>
        </div>
			  <div className={this.state.lives&&(this.state.matchedLetters.length!==this.state.myLetters.length)?"new-word":"show-new-word"} onClick={this.myUpdate.bind(this)}>New Word</div>
			</div>
		)
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
	//getMyRandom();
	render() {
		return (
			<div className="hangmanContainer">
				{this.renderHangman()}
				<div id="word">
					<span>
						{this.state.myLetters.map(
							function(item, i){
								return (
									<span className={ this.state.matchedLetters.includes(item) ? "foundLetter":(this.state.lives >0?"letter":"missedLetter")} key={i}>{item}</span>
								)
							},this)
						}
					</span>
				</div>
				<ul id="alpha_btns">
					{this.state.alphabet.map(
						function(item){
							return (
								<li key={item} className={this.state.clickedLetters.includes(item) ?this.state.matchedLetters.includes(item) ?"matchedLetter":"clickedLetter" : "alphabetLetters"} onClick={this.checkLetter.bind(this)}>{item}</li>
							)
						},this)
					}
				</ul>
			</div>
		)
	}
}

export default Hangman;
