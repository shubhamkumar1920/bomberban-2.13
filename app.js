let row = 10;
let col = 10;
let flag = 10;
let noOfBomb = 10;
window.random = [];
let points = 0;

function create(){
    for (let i = 0; i < row; i++) {
        let newRow = document.createElement('div');
        newRow.setAttribute('id', 'grid-row');
        for (let j = 0; j < col; j++) {
            let id = (10 * i) + j;      
            let newCell = document.createElement('div');
            newCell.id=id;
            newCell.classList.add("valid");
            // adding event listenser on it
            newCell.addEventListener("click", leftClick);
            newCell.addEventListener("contextmenu", rightClick);
            newRow.appendChild(newCell);
        }
        document.getElementById('grid').appendChild(newRow);
    }   
    // create random bomb
    for (let i = 0; i < noOfBomb; i++) {
        let temp = Math.floor(Math.random() * 99) + 0;
        while (random.includes(temp)) {
            temp = Math.floor(Math.random() * 99) + 0;
        }
        document.getElementById(temp).classList.add("bomb");
        document.getElementById(temp).classList.remove("valid");
        window.random.push(temp);
    } 
    // adding neigh functionality
    for(let i = 0 ; i <= 99 ; i++){
        let datas = neighbourhood(i);
        document.getElementById(i).setAttribute("data", datas);
    }
    document.getElementById("flagsLeft").innerHTML = flag;
}
create();

// remove event listener 
function removeEL() {
    for (let i = 0; i < (row * col); i++) {
        let cell = document.getElementById(i);
        cell.removeEventListener('click', leftClick);
        cell.removeEventListener('contextmenu',rightClick);
    }
}

// bomb will show
function showBomb() {
    for (let i = 0; i < noOfBomb; i++) {
        let cell = document.getElementById(random[i]);
        cell.style.backgroundImage = 'url(https://img.icons8.com/emoji/48/000000/bomb-emoji.png)';
        cell.classList.add('checked');
        cell.style.backgroundColor = 'red';
        cell.style.backgroundSize = 'cover';
    }
}
// showing result
function result(msg) {
    removeEL();
    showBomb();
    if (msg == 'YOU WIN!') {
        document.getElementById('result').style.color='green';
        document.getElementById('result').innerHTML = 'YOU WIN!';
    }
    else {
        document.getElementById('result').innerHTML =  'YOU LOSE!';
    }
    
}
// this is for checking the element is clicked is bomb or not
function isBombClicked(x) {
    if (window.random.includes(x)) {
        return true;
    }
    return false;
}
// reset function
function reset() {
    window.location.reload();
}
function neighbourhood(cellId) {
    let bombs = 0;
    // check the top left corner
    if (cellId % col !== 0 && random.includes(cellId - col - 1) && cellId > col) {
      bombs++;
    }
    // check the top middle cell
    if (cellId >= col && random.includes(cellId - col) ) {
      bombs++;
    }
    // check the top right corner
    if (cellId % col !== 9 && random.includes(cellId - col + 1) && cellId >= col) { 
      bombs++;
    }
    // check the left side of cell
    if (cellId % col !== 0 && random.includes(cellId - 1)) {
      bombs++;
    }
    // check the right side of the cell
    if (cellId % col !== 9 && random.includes(cellId + 1)) {
      bombs++;
    }
    // check the bottom left corner
    if (cellId % col !== 0 && random.includes(cellId + col - 1) && cellId <(col * (row-1))) {
      bombs++;
    }
    // check the bottom middle cell
    if (cellId <(col * (row-1)) && random.includes(cellId + col)) {
      bombs++;
    }
    // check the bottom right corner
    if (cellId % col !== 9 && random.includes(cellId + col + 1) && cellId <(col * (row-1))) {
      bombs++;
    }
    return bombs;
  }
// function neighbourhood() {
//     let cellId=10;
//     let bombs = 0;
//     // check the top left corner
//     if (cellId % col !== 0 && cellId > col) {
//         console.log('tl',bombs);
//       bombs++;
//     }
//     // check the top middle cell
//     if (cellId >= col) {
//         console.log('tm',bombs);
//       bombs++;
//     }
//     // check the top right corner
//     if (cellId % col !== 9 && cellId >= col) {
//         console.log('tr',bombs);
//       bombs++;
//     }
//     // check the left side of cell
//     if (cellId % col !== 0 ) {
//         console.log('ls',bombs);
//       bombs++;
//     }
//     // check the right side of the cell
//     if (cellId % col !== 9) {
//         console.log('rs',bombs);
//       bombs++;
//     }
//     // check the bottom left corner
//     if (cellId % col !== 0 && cellId <(col * (row-1))) {
//         console.log('bl',bombs);
//       bombs++;
     
//     }
//     // check the bottom middle cell
//     if (cellId < (col * (row-1))) {
//         console.log('bm',bombs);
//       bombs++;
//     }
//     // check the bottom right corner
//     if (cellId % col !== 9&& cellId <(col * (row-1))) {
//         console.log('br',bombs);
//       bombs++;
//     }
//     // return bombs;
//   }
//   neighbourhood();
function leftClick(e) {
    let cell=e.target;
    console.log(cell);
    let currCell = Number(e.target.getAttribute('id'));
    let bombClicked = isBombClicked(currCell);
    cell.classList.add("checked");
    // ye flag ko remove karne ke liye
    if(cell.classList.contains("flag")){
        cell.classList.remove("flag");
        // cell.removeAttribute("style");
        cell.innerHTML = '';
        flag++;
        cell.removeEventListener('contextmenu',rightClick);
        document.getElementById("flagsLeft").innerHTML = flag;
    }
    // it call the result function
    if (bombClicked) {
        result('YOU LOSE!');  
    }
    else{
        // if it is not bomb then score increased and color change
        points++;
        document.getElementById('gameScore').innerHTML = points;
        cell.innerHTML = cell.getAttribute('data');
        cell.style.color = "black";
        cell.removeEventListener('click',leftClick);
        cell.removeEventListener('contextmenu',rightClick);    
    }
    // if point is equal to 90 then win
    if (points == 90) {
        result('YOU WIN!');
    }
}
function rightClick(e){
    e.preventDefault();
    let rightClickedCell =e.target;
    if(rightClickedCell.classList.contains("flag")){
        rightClickedCell.classList.remove("flag");
        rightClickedCell.removeAttribute("style");
        // rightClickedCell.innerHTML = '';
        flag++;
        document.getElementById("flagsLeft").innerHTML = flag;
    }
    else if(flag > 0){
        rightClickedCell.innerHTML = '!';
        rightClickedCell.style.backgroundColor = "green";
        // rightClickedCell.style.backgroundImage = 'url(https://thumbs.dreamstime.com/z/waving-red-golf-flag-wind-pole-isolated-white-background-35659216.jpg)';
        rightClickedCell.style.backgroundRepeat = "no-repeat";
        rightClickedCell.style.backgroundSize = "cover";
        flag--;
        document.getElementById("flagsLeft").innerHTML = flag;
        rightClickedCell.classList.add("flag"); 
        // this is for if all flag are bomb or not
        if(flag == 0){
            let tempFlag = true;
            document.querySelectorAll(".flag").forEach((cell)=>{
                let temp = Number(cell.getAttribute("id"));
                if(random.includes(temp) == false)
                    tempFlag = false;
            })
            if(tempFlag){
                console.log(tempFlag)
                document.querySelectorAll(".flag").forEach((cell)=>{
                    cell.innerHTML='';
                });
                result('YOU WIN!');        
            }
        }
    }   
}