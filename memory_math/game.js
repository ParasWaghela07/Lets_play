let won=new Audio("correct.mp3");
let lose=new Audio("incorrect.mp3");

let a = 0;
let intervalId; // Variable to store the interval ID
let str="";
let arr=["+","-"];
let check=1;

document.addEventListener('DOMContentLoaded', function() {
    
    var selectedDifficulty = localStorage.getItem('selectedDifficulty');

    if (selectedDifficulty === 'easy') {

        intervalId = setInterval(function(){

            if(check==1){

            check=0;
            let x = Math.floor(Math.random() * 10);
            document.getElementById("num").innerText = x;
            str+=x;
            a++;
            if(str.length>1){
                str=eval(str);
            }
            

            }
            else if(check==0){

                let y=Math.floor(Math.random() * 2);
                document.getElementById("num").innerText = arr[y];
                str+=arr[y];
                check=1;
        
            }


            if (a == 5) {
                    clearInterval(intervalId);
                    setTimeout(function(){
                        document.getElementById("num").innerText = "?" ;
                    },1750);
            }

            
        }, 1750);

    }
    
    else if (selectedDifficulty === 'medium') {

        intervalId = setInterval(function(){

            if(check==1){

            check=0;
            let x = Math.floor(Math.random() * 100);
            document.getElementById("num").innerText = x;
            str+=x;
            a++;
            if(str.length>1){
                str=eval(str);
            }
            

            }
            else if(check==0){

                let y=Math.floor(Math.random() * 2);
                document.getElementById("num").innerText = arr[y];
                str+=arr[y];
                check=1;
        
            }


            if (a == 7) {
                    clearInterval(intervalId);
                    setTimeout(function(){
                        document.getElementById("num").innerText = "?" ;
                    },2750);
            }

            
        }, 3125);

    }
    else if (selectedDifficulty === 'insane') {

        intervalId = setInterval(function(){

            if(check==1){

            check=0;
            let x = Math.floor(Math.random() * 200);
            document.getElementById("num").innerText = x;
            str+=x;
            a++;
            if(str.length>1){
                str=eval(str);
            }
            

            }
            else if(check==0){

                let y=Math.floor(Math.random() * 2);
                document.getElementById("num").innerText = arr[y];
                str+=arr[y];
                check=1;
        
            }


            if (a == 7) {
                    clearInterval(intervalId);
                    setTimeout(function(){
                        document.getElementById("num").innerText = "?" ;
                    },2250);
                    
            }

            
        }, 3250);

    }
});


document.getElementById("btn").addEventListener('click',function(){

    let userAns=document.getElementById("ansbox");
    console.log(str)
    if(str==userAns.value){
        won.play();
        document.getElementById("num").innerText = str ;
        document.getElementById("num").style.color="rgb(2, 189, 2)";
        document.getElementById("signal").innerText="CORRECT !"
        document.getElementById("signal").style.color="rgb(2, 189, 2)";
        document.getElementById("signal").style.fontWeight="600";
    }
    else{
        lose.play();
        document.getElementById("num").innerText = str ;
        document.getElementById("num").style.color="red";
        document.getElementById("signal").innerText="INCORRECT !"
        document.getElementById("signal").style.color="red";
        document.getElementById("signal").style.fontWeight="600";
    }
})


