const display = document.getElementById("display");
const buttons = document.querySelectorAll("button")

for(const button of buttons)
{
    if(!button.hasAttribute("onclick")){
        button.addEventListener("click",appendToDisplay)
    }
}

function appendToDisplay(evt){
    display.value += evt.target.innerText;
}

function clearDisplay(){
    display.value = "";
}

function calculate(){
    try{
        display.value = eval(display.value);
    }
    catch(error){
        display.value = "Error";
    }
}
