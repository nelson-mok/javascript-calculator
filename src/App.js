import React from 'react';
import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import {evaluate} from 'mathjs';
import './App.css';

function App() {
  const [screen,setScreen]=useState({input:'0',output:'0',operation:false});


function clear(){
  setScreen({
    input: '0',
    output: '0',
    operation: false
  })
}

function screenUpdate(value){
  if (screen.operation===false){
    if (/=/.test(screen.output) && /[\+\-\*\/]/.test(value)){
      setScreen({
        input: value,
        output: screen.input+value,
        operation: false
      })
    }else if (/=/.test(screen.output) && /[\d]/.test(value)){
      setScreen({
        input: value,
        output: value,
        operation: false
      })
    }else if (value=="." && /\./.test(screen.input)){
      setScreen({
        input: screen.input,
        output: screen.output,
        operation: false
      })
    }else if (screen.input == "0" && /[\d^0]/.test(value)){
      setScreen({
        input: value,
        output: value,
        operation: false
      })
    }else if (/[\+\-\*\/]/.test(value)){
      setScreen({
        input: value,
        output: screen.output+value,
        operation: true
      })
    }else {
      setScreen({
        input: screen.input+value,
        output: screen.output+value,
        operation: false
      })
    }
  } else if (screen.operation){
    console.log("length = "+screen.output.match(/([\+\-\*\/])/g).length)
    if (/[\+\*\/]/.test(value)){
      setScreen({
        input: value,
        output: screen.output.replace(/[\+\-\*\/]+/g,value),
        operation: true
    })
   } else if(/-/.test(value) && screen.output.match(/([\+\-\*\/])/g).length<2){
      setScreen({
        input: value,
        output: screen.output+value,
        operation: true
      })
    } else if (/\d/.test(value)) {
      setScreen({
        input: value,
        output: screen.output+value,
        operation: false
      })
    }
  }
}

function result(){
  if (/=/.test(screen.output)==false){
    let answer = evaluate(screen.output)
    setScreen({
      input: answer,
      output: screen.output+' = ',
      operation: false
    })
  } 
}

  return (
    <div>
      <br></br>
      <h1>JavaScript Calculator</h1>
      <div className="container">
        <div className="screen">
          <h2 id="secondaryDisplay">{screen.output}</h2>
          <h1 id="display">{screen.input}</h1>
        </div>
        <div className="row">
          <div className ="col">
            <Button className="button" id="seven" onClick={()=>screenUpdate('7')}>7</Button>
            <Button className="button" id="eight" onClick={()=>screenUpdate('8')}>8</Button>
            <Button className="button" id="nine" onClick={()=>screenUpdate('9')}>9</Button>
          </div>
        </div>
        <div className="row">
          <div className ="col">
            <Button className="button" id="four" onClick={()=>screenUpdate('4')}>4</Button>
            <Button className="button" id="five" onClick={()=>screenUpdate('5')}>5</Button>
            <Button className="button" id="six" onClick={()=>screenUpdate('6')}>6</Button>
          </div>
        </div>
        <div className="row">
          <div className ="col">
            <Button className="button" id="one" onClick={()=>screenUpdate('1')}>1</Button>
            <Button className="button" id="two" onClick={()=>screenUpdate('2')}>2</Button>
            <Button className="button" id="three" onClick={()=>screenUpdate('3')}>3</Button>
          </div>
        </div>
        <div className="row">
          <div className ="col">
            <Button className="button" id="zero" onClick={()=>screenUpdate('0')}>0</Button>
            <Button className="button" id="decimal" onClick={()=>screenUpdate('.')}>.</Button>
            <Button className="button" id="equals" variant="warning" onClick={()=>result('=')}>=</Button>
            <Button className="button" id="clear" variant="danger" onClick={clear}>C</Button>
          </div>
        </div>
        <div className="row">
          <div className ="col">
            <Button className="button" id="add" variant="secondary" onClick={()=>screenUpdate('+')}>+</Button>
            <Button className="button" id="subtract" variant="secondary" onClick={()=>screenUpdate('-')}>-</Button>
            <Button className="button" id="multiply" variant="secondary" onClick={()=>screenUpdate('*')}>x</Button>
            <Button className="button" id="divide" variant="secondary" onClick={()=>screenUpdate('/')}>/</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
