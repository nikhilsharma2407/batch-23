let balance: number = 100;

let amount: string = "20";

balance += amount;

console.log(balance);

// let name = "Nikhil";

// name = 123;

// const arrNum:number[] = [1,"1",true]
const arrNum: number[] = [1, 2, 3, 45];

let numOrStr: number | string;

numOrStr = 123;

numOrStr = "abcd";


let anytype: any = true;

anytype = 123;
anytype = "123"

// numOrStr = true;


// const fnName = (param1:type1,param2:type2,...):returnType=>{
// body
// }

const sum = (num1: number, num2: number,num3?:number): number => {
    return num1 + num2;
};


sum(1,2);
// function sum(num1:number,num2:number):number{
//     return num1+num2;
// }

// sum(1,"12");


// Interface for User, contract that should always be followed

// optional param

interface IUser {
    readonly id: string
    title: string
    firstName: string
    lastName: string
    picture: string
    optionalProperty?:string
};


const user: IUser = {
    "id": "60d0fe4f5311236168a109ca",
    "title": "ms",
    "firstName": "Sara",
    "lastName": "Andersen",
    "picture": "https://randomuser.me/api/portraits/women/58.jpg"
};


const endpoints = {
    SIGNUP: "/user/signup",
    LOGIN: "/user/login",
    ADD_FRIEND: "/user/addFriend",
    REMOVE_FRIEND: "/user/removeFriend",
    LOGOUT: "/user/logout",
}


// string constants
enum END_POINTS {
    SIGNUP = "/user/signup",
    LOGIN = "/user/login",
    ADD_FRIEND = "/user/addFriend",
    REMOVE_FRIEND = "/user/removeFriend",
    LOGOUT = "/user/logout"
}


endpoints.ADD_FRIEND = "asd";
// END_POINTS.ADD_FRIEND = 'asd';


// create a function which takes either (both should be same type) string or numbers and returns either sum or concatenation

type StrOrNum = string|number;

function Add<T extends StrOrNum> (param1:T, param2:T):T {
    return <any>param1 + param2;
};


Add(1,2);
Add("1","2");
// not valid
Add("1",2);
Add<string>(1,"2");



export { };
