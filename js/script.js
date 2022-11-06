// ES6
// let/ const

// var is function scoped

// let is block


{
    // block in js
}

function myFunc(){
    if(true){

        var flag = true; //function scoped
        let localFlag = "localFlag";  //block scoped
        console.log("inside block");
        console.log(flag);
        console.log(localFlag);
    }
    console.log("outside block");
    console.log(flag);
    // console.log(localFlag);
}

myFunc();
// console.log(flag);


let variable;

variable = 1123;
const PI =3.14;  


// PI = 3;


// DataTypes in JS


/**
 * String
 * Number
 * boolean
 * objects
 * null->object
 * undefined ->type
 * NaN
 */

let s = "Hello World!"
s.length
console.log(s.toUpperCase());
console.log(s.substring(6,11));

let numStr = "abc1abc32abc";
console.log(parseInt(numStr));
console.log(+numStr);
let num = 10000000;

console.log(num.toLocaleString("en-in"));
console.log(num.toLocaleString());


// boolean

true
false


// non-truthy - treated as boolean false
    0
    ''
    ""
    NaN
    undefined
    null

const emp = {
    empId:101,
    dept:"Engg"
}

console.log(emp.dept,emp.empId);

let emp2 = null;

// function func(arg1,arg2){

// }
let func = (arg1,arg2)=>{

}

func = ()=>{console.log("abc")};
func = num=>num*2;
// func = ()=>{
//     return   "abc"
// };

func()


