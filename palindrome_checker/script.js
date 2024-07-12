const textInput = document.getElementById("text-input");
const checkButton = document.getElementById("check-btn");
const result = document.getElementById("result");

function isPalindrome(str){
const reg = /[^a-z0-9]/g;
let cleanStr=str.toLowerCase().replace(reg,"");
return cleanStr===cleanStr.split("").reverse().join("");
}

checkButton.addEventListener("click",()=>{
if(!textInput.value){
  alert("Please input a value");
}else if (isPalindrome(textInput.value)){
  result.innerText=`${textInput.value} is a palindrome`;
  result.classList.remove("hidden");
} else{
  result.innerText=`${textInput.value} is not a palindrome`;
  result.classList.remove("hidden");
}
})

textInput.addEventListener("focus",()=>{
  if (!result.classList.contains("hidden")){
    result.classList.add("hidden");
  }
  textInput.value="";
})