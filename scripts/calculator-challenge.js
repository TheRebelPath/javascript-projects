let calculation = localStorage.getItem('calculation') || '';
displayCalculator();
function updateCalculation(value){
calculation += value;
//console.log(calculation);
displayCalculator();
localStorage.setItem('calculation', calculation);
};
function displayCalculator(){
document.querySelector('.js-calculation-display').innerHTML = calculation;
}