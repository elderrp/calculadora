const previousOperationText = document.querySelector("#previous-operation");
const courrentOperationText = document.querySelector("#courrent-operation");
const buttons = document.querySelectorAll("#buttons-container button");

console.log(buttons);

class Calculator{
constructor(previousOperationText, courrentOperationText){
    this.previousOperationText = previousOperationText
    this.courrentOperationText = courrentOperationText
    this.courrentOperation = "";

}
//add digit to calculator screen
addDigit(digit){
    //check if courrent operation already has a dot
    if(digit=== "." && this.courrentOperation.innerText.includes(".")){
     return;   
    }
   this.courrentOperation = digit
   this.updateScreen()
}
//process all calculator operations
processOperation(operation){
//check if o is empty
if(this.courrentOperationText.innerText === "" && operation !== "C"){
if(this.previousOperationText.innerText !== ""){
this.changeOperation(operation);
}
return
}
    //get courrent and previous value
    let operationValue;
       const previous = + this.previousOperationText.innerText.split(" ")[0];
       const courrent = + this.courrentOperationText.innerText;

    switch(operation) {
        case "+":
operationValue = previous + courrent
this.updateScreen(operationValue, operation, courrent, previous);
            break;
        case "-":
operationValue = previous - courrent
this.updateScreen(operationValue, operation, courrent, previous);
            break;
        case "/":
operationValue = previous / courrent
this.updateScreen(operationValue, operation, courrent, previous);
            break;
        case "*":
operationValue = previous * courrent
this.updateScreen(operationValue, operation, courrent, previous);
            break;
        case "DEL":
this.processDelOperator();
            break;
        case "ce":
this. processClearCourrentOperation();
            break;
        case "c":
this.processClearAllOperation();
            break;
        case "=":
this.processEqualOperator();
            break;
            default:
                return;
    }
}

// change values of the calculatorscreen
updateScreen(
    operationValue = null,
     operation = null,
      courrent = null,
       previous = null 
        ){

console.log(operationValue, operation, courrent, previous);

if(operationValue === null){
    this.courrentOperationText.innerText += this.courrentOperation;
}else{
if(previous === 0){
    operationValue = courrent
}
//add courrent value to previous
this.previousOperationText.innerText =`${operationValue} ${operation}`
this.courrentOperationText.innerText = "";
}
}
//change math operation
changeOperation(operation){
    const mathOperation = ["*", "/", "+", "-"]
    if(!mathOperation.includes(operation)){
        return
    }
    this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
}
//delete the last digit
processDelOperator() {
    this.courrentOperationText.innerText = this.courrentOperationText.innerText.slice(0, -1);

  }
  processClearCourrentOperation(){
    this.courrentOperationText.innerText = "";
  }

  processClearAllOperation(){
    this.courrentOperationText.innerText = "";
    this.previousOperationText.innerText = "";
  }

  processEqualOperator(){
    const operation = previousOperationText.innerText.split(" ")[1]

    this.processOperation(operation);
  }
}
const calc = new Calculator(previousOperationText, courrentOperationText);

buttons.forEach((btn)=> {
 btn.addEventListener("click", (e)=> {
   const value = e.target.innerText;
   
   if(+value >= 0 || value === ".") {
 calc.addDigit(value);
   } else {
    calc.processOperation(value);

   }
 }) ; 
});