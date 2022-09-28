function App() {
  let code='';
  return (
    <div className="App">
      <div className="myapp">
        <div className="outputPanel p-0 m-0">

        </div>
        <textarea className="w-100 codePanel p-2 m-0" onKeyDown={change2} onChange={change}></textarea>
      </div>
    </div>
  );

  function change(event){
    code = event.target.value;
    code.split("\n").forEach(element => {
      console.log("asd:"+element)
    });
  }
  
  function change2(event){
    if(event.key == "Escape"){
      console.log("true");
    }
  }
}

export default App;
