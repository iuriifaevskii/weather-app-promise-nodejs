//in stack
console.log('Starting app');

//1)in stack => 2)(remove with stack) in node Apis
setTimeout(()=>{
    console.log('Inside of callback'); //4)in stack console.log('Inside of callback');
}, 2000);//3)when Finishing then setTimeout callback in callback queue 
        
setTimeout(()=>{
    console.log('second settimeout ');
}, 0);

console.log('Finishing up');

// Starting app
// Finishing up
// second settimeout
// Inside of callback

//sync code (call stack)
var add = (a,b) => {
    var total = a + b;
    return total;
};
var res = add(3,8);
console.log(res);

