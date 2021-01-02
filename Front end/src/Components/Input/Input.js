import React,{Component} from 'react';
import '../Input/Input.css'
class Input extends Component{
  render(){
    const {search,onclick}=this.props
    return (
      <div className="tc">
        <p className="f3">Input Your Image URL To Detect Your Face</p>
          <div id="box"className="center shadow-4">
            <input  type="text" className="f4 pa2 w-70" onChange={search}></input>
            <button onClick={onclick} className="w-30 grow f4 link ph3 pv2 bg-light-purple dib white ">Submit</button>
          </div>
        </div>
    );
  }
}
export default Input;