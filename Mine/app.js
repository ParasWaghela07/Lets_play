let degree;
let bomb;
let clicks;
const container=document.querySelector('#tilecontainer');

let loseModal=document.querySelector('#lose');
let winModal=document.querySelector('#win');
let cancelbtn=document.querySelector('#cancelbtn')
let cancelbtn2=document.querySelector('#cancelbtn2')
let mines=document.querySelector('#mines');
let safetiles=document.querySelector('#safetiles');
const ref=document.querySelector('#refresh');

const deg1=document.querySelector('#deg1');
const deg2=document.querySelector('#deg2');
const deg3=document.querySelector('#deg3');

const custom_btn=document.querySelector('#custom-btn');

const cst_deg=document.querySelector('#cst_deg');
const cst_mine=document.querySelector('#cst_mine');

let alltiles;
let allTilesArray;
let grid=[];

let timer;

function startInterval() {
  intervalId = setInterval(() => {
    timer++;

    if(timer>=3600){
      clearInterval(intervalId);
      finish();
    }
  }, 1000); 
}

function stopInterval() {
  if (intervalId) {
    clearInterval(intervalId);
  }
}



setupgame();

function setupgame(){
    timer=0;
    startInterval();

    degree=localStorage.getItem('degree')===null ? 6 : localStorage.getItem('degree');
    bomb=localStorage.getItem('bomb')===null ? degree : localStorage.getItem('bomb');
    clicks=(degree*degree)-bomb;

    safetiles.innerText="Safe Tiles : " + clicks;
    mines.innerText="Mines : " + bomb;


    container.classList.add(`grid-rows-${degree}`)
    container.classList.add(`grid-cols-${degree}`)

    for(let i=0;i<degree*degree;i++){
        const newTile=document.createElement('div');
        newTile.classList.add('tile');
        container.appendChild(newTile);
    }

    alltiles=document.getElementsByClassName('tile');
    allTilesArray=Array.from(alltiles);

    for(let i=0;i<degree;i++){
        let row=[];
        for(let j=0;j<degree;j++){
            row.push("");
        }
        grid.push(row);
    }

    let count=bomb;
    while(count>0){
        const x=Math.floor(Math.random()*degree);
        const y=Math.floor(Math.random()*degree);

        if(grid[x][y]==="B") continue;

        grid[x][y]="B";
        count--;
    }


for(let i=0;i<degree;i++){
    for(let j=0;j<degree;j++){

        if(grid[i][j]==="B") continue;
        let bombCount=0;
        if(i-1>=0 && grid[i-1][j]==="B") bombCount++;
        if(i-1>=0 && j+1<degree && grid[i-1][j+1]==="B") bombCount++;
        if(j+1 < degree && grid[i][j+1]==="B") bombCount++;
        if(i+1 < degree && j+1 < degree && grid[i+1][j+1]==="B") bombCount++;
        if(i+1<degree && grid[i+1][j]==="B") bombCount++;
        if(i+1<degree && j-1>=0 && grid[i+1][j-1]==="B") bombCount++;
        if(j-1>=0 && grid[i][j-1]==="B") bombCount++;
        if(i-1>=0 && j-1>=0 && grid[i-1][j-1]==="B") bombCount++;

        grid[i][j]=bombCount;
    }
}

}

function displayTime(){
    let mins=Math.floor(timer/60);
    let secs=timer%60;
  
    let s1="Minute",s2="Second";
    if(mins>1)  s1+='s';
    if(secs>1) s2+='s';
    
    document.getElementById("time").innerText="Time taken : \n"+mins+' '+s1+' '+secs+' '+s2;
}

function fillGrid(){
    allTilesArray.forEach(function(e,index){
        const x=Math.floor(index/degree);
        const y=index%degree;

        if(grid[x][y]!=="B") e.innerText=grid[x][y];
        if(grid[x][y]==="B"){
            if(e.querySelector('img')) e.removeChild(e.querySelector('img'))
            let bombimg=document.createElement('img');
            bombimg.src="Bomb.png";
            e.appendChild(bombimg);
        }
    })
}
function gameover(){
    loseModal.classList.remove('hidden')
    fillGrid();

    container.style.pointerEvents="none"

    stopInterval();
}

function checkwin(){
    if(clicks===0) {
        winModal.classList.remove('hidden')
        fillGrid();
        container.style.pointerEvents="none";

        stopInterval();
        displayTime();
    }
}

allTilesArray.forEach((e,index)=>{
    e.addEventListener('click',function(){

        const x=Math.floor(index/degree);
        const y=index%degree;

        if(grid[x][y]==="B"){
            gameover();
            return;
        }

        
        if(e.innerText===""){
            e.innerText=grid[x][y];
            e.style.color="black";
            clicks--;
            safetiles.innerText="Safe Tiles : " + clicks;
        }

        checkwin();
    })
})

allTilesArray.forEach((e)=>{
    e.addEventListener('contextmenu',function(event){
        event.preventDefault();
        if(e.innerText!=="") return;
        let isImg=e.querySelector('img');
        if (!isImg) {
            
                let flagimg = document.createElement('img');
                flagimg.src = "flag.png";
                e.appendChild(flagimg);
            }
        else {
            e.removeChild(isImg);
        }
        
        
        
    })
})

cancelbtn.addEventListener('click',function(e){
    loseModal.classList.add('hidden')
})

cancelbtn2.addEventListener('click',function(e){
    winModal.classList.add('hidden')
})

ref.addEventListener('click',function(e){
    window.location.reload();
})


deg1.addEventListener('click',(e)=>{
    localStorage.setItem('degree','4');
    localStorage.removeItem('bomb');
    location.reload();
})
deg2.addEventListener('click',(e)=>{
    localStorage.setItem('degree','6');
    localStorage.removeItem('bomb');
    location.reload();
    
})

deg3.addEventListener('click',(e)=>{
    localStorage.setItem('degree','8');
    localStorage.removeItem('bomb');
    location.reload();
})

custom_btn.addEventListener('click',(e)=>{

    if(cst_deg.value==="" || cst_deg.value<3 || cst_deg.value >10) {
        alert("Please enter a suitable degree value");
        return;
    }
    if(cst_mine.value==="" || cst_mine.value>=(cst_deg.value*cst_deg.value)){
        alert("Please enter a suitable mine value");
        return;
    }
    localStorage.setItem('degree',cst_deg.value);
    localStorage.setItem('bomb',cst_mine.value);

    location.reload();
})
