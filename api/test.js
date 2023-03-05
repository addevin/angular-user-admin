var a = 20;
(function (){
    var a = 40
    (function test(){
        a++;
        console.log(a);
    })()
})()