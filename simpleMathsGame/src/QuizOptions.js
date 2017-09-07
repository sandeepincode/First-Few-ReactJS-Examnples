import React,{Component} from 'react';

class QuizOptions extends Component{

  constructor(props){
    super(props);
    this.callParentCheckOptions = this.callParentCheckOptions.bind(this);
  }
    callParentCheckOptions(){
      this.props.checkResults(this.props.value);
      //Only use brackets when you want to call the function
    }
    render(){
      return(
        <div className="fields animated zoomIn" onClick={this.callParentCheckOptions}>
            <div className="field-block">
            {this.props.value}
            </div>
        </div>

      );
    }
}
export default QuizOptions;
