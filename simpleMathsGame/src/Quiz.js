import React,{Component} from 'react';
import QuizOptions from './QuizOptions';
import classNames from 'classnames';
class Quiz extends Component{

  constructor(props){
    super(props);

    let riddle = this.playGame();
    let correct = false;
    let gameover = false;

    this.state = {riddle, correct, gameover};
    this.renderOptions = this.renderOptions.bind(this);
    this.checkResults = this.checkResults.bind(this);
    this.play = this.play.bind(this);
  }
  checkResults(option){
  //  console.log('DAB On EM' + option + ' ' +this.state.riddle.answer);
    if(this.state.riddle.answer === option){
      console.log("You Genius");
      this.setState({
        correct: true,
        gameover: true,
      });
    }else{
      console.log("You failure");
      this.setState({
        correct: false,
        gameover: true,
      });
    }
  }
  randomNumber(min, max){
      return Math.floor(Math.random() * (max-min+1)) + min;
  }
  generateRandomOptions(answer){
      let resultsArray =[];
      let randomNumberArray = [];

      while(randomNumberArray.length <= 3){
          let randomNumber = this.randomNumber(1,19);
          if(randomNumberArray.indexOf(randomNumber) > -1)continue;
          randomNumberArray.push(randomNumber);
      }

      for(let i = 0; i < 3; i++){
        let addSubtract = this.randomNumber(0,1);
        let result = answer;
        if(addSubtract === 1){
            result+= randomNumberArray[i];
            resultsArray.push(result);
          }
        else{
          result -= randomNumberArray[i];
          resultsArray.push(result);
        }
      }
      return resultsArray;
  }
  playGame(){
    let field1 = this.randomNumber(20,50);
    let field2 = this.randomNumber(20,50)
    let answer = field1 + field2;
    let resultsArray = this.generateRandomOptions(answer);
    console.log(resultsArray);
    resultsArray.push(answer);
    resultsArray.sort(function(a,b){return 0.5 - Math.random()})
    let riddle = {
      resultsArray: resultsArray,
      field1: field1,
      field2: field2,
      answer: answer,
    };

    console.log(riddle);
    if(this.state){
      this.setState({riddle: riddle});
    }else{
      return riddle;
    }
  }
  renderOptions(){
    return(
      <div className="options">
      {this.state.riddle.resultsArray.map((option, i) =>
            <QuizOptions value={option} key={i}  checkResults={(option)=>this.checkResults(option)}/>
        )
      }
      </div>
    );
  }
  renderMessage(){
    if(this.state.correct){
      return <h3>Well Done! <br/> Hit the button below to play again</h3>;

    }else{
      return <h3>Wrong Answer You Pleb! <br/> Hit the button below to play again</h3>;
    }
  }
  play(){
    this.setState({
      correct: false,
      gameover: false
    });
    this.playGame();
  }
  render(){
    return(
      <div className="quiz">
          <div className="quiz-content">
            <p className="question">  What is the sum of
            <span className="text-info"> {this.state.riddle.field1} </span>
            and <span className="text-info"> {this.state.riddle.field2} </span> ?</p>
            {this.renderOptions()}
            </div>

            <div>
            Correct: {this.state.correct ? "True" : "False"}
            <br/>
            Game Over: {this.state.gameover ? "True" : "False"}
            </div>

            <div className={classNames('after', {'hide': !this.state.gameover}, {'wrong animated zoomInDown': !this.state.correct}, {'correct animated zoomInDown': this.state.correct})}>
                {this.renderMessage()}
            </div>

            <div>
              <div className="play-again">
                    <a className="button" onClick={this.play}>Play Again</a>
              </div>
          </div>
      </div>
    );
  }
}

export default Quiz;
