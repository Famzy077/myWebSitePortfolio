let display = document.getElementById('display')

function show(input) {
    display.value += input;
}

let ClearAll = ()=>{
    display.value = ''; 
}
let ClearOne = () =>{
    display.value = display.value.slice(0,-1)
}
let calculate = ()=>{
    display.value = eval(display.value)
}