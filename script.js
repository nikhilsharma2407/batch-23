const btn = document.getElementById('btn');
const ip = document.getElementById('name');
console.log(btn);
console.dir(ip);
btn.onclick = ()=>{
    ip.value = "some value from js"
    // alert(`Hello ${ip.value}`)
}