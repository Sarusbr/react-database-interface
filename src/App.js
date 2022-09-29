import {useState} from "react";
import axios from "axios";

function App() {
  let [code,setcode] = useState(0);
  const data=[];
  return (
    <div className="App">
      <div className="myapp">
        <div className="outputPanel p-0 m-0">
          {
            code
          }
        </div>
        <textarea className="w-100 codePanel p-2 m-0" onKeyDown={change2}></textarea>
      </div>
    </div>
  );
  

  var count = 0;
  var commands=[];

  
  function next(){
    if((commands[count].match(/=/g) || []).length === 1){ // create variable
      createVariable(commands[count]);
    }
    else if((commands[count].match(/=/g) || []).length === 0){
      runCode(commands[count]);
    }
    count++;
  }

  function change2(event){
    if(event.key === "Escape"){
      commands = event.target.value.split("\n");
      count=0;
      next();
    }
  }
  
  function runCode(element){
    const getField = element.split(".");
    data.forEach(el => {
      if(el.variable === getField[0]){
        console.log(el.json[getField[1]]);
      }
    })
  }

  function createVariable(element){
    const query = element.toString().split("=");
    if(query[1].includes("db.get")){
      const myjson = query[1].split(/["']+/)[1];
       axios.get("https://test-e1ab8.firebaseio.com/"+myjson+".json")
      .then(res => {
        data.push({
          variable : query[0].toString().trim(),
          json: Object.values(res.data)[0]
        })
        next();
      })
    }
  }

  /* function addData(){
    axios.post("https://test-e1ab8.firebaseio.com/data.json",{
      username:"batuhan",
      lastname:"asd"
    })
  } */
}

export default App;
