const celles = document.querySelectorAll('.cell')
const titres = document.querySelector('#titre')
const xPlay = document.querySelectorAll('#xPlayDisplay')
const oPlay = document.querySelector('#oPlayDisplay')
const restartBtn = document.querySelector('#restartbtn')
const info = document.querySelector('#info')

//initialisation de variable du jeux
let player = 'x'
let isPauseGame = false
let isGameStart = false
//tableau pour la condition de gagner
const inputCells = ['','','',
                    '','','',
                    '','','',]
//tableau pour la condition de gagner

const winConditions = [
    [0,1,2],[3,4,5],[6,7,8],//ligne
    [0,3,6],[1,4,7],[2,5,8],//colonne
    [0,4,8],[2,4,6]//diagonale
    
]
//ajouter un ecouter d"evenement de clic a chaque cellule
celles.forEach((cell, index) => {
 cell.addEventListener('click', ()=> tapCell(cell, index))
})
function tapCell(cell, index){
    //ensure cell is empty and game isn't pause
    if (cell.textContent == '' && !isPauseGame

    ){
        isGameStart = true 
        updateCell(cell, index)
        //faire un choix aleatoir si le theme est la 
        if (!checkWinner()){
         changePlayer()          
        }
        
    }
}
function updateCell(cell, index){
    cell.textContent = player
    inputCells[index]= player
    cell.style.color = (player == "x") ? '#1892ea' : '#a737ff'
}
function changePlayer(){
    player = (player == 'x') ? 'o' : 'x'
}
function checkWinner(){
    for (const[a,b,c] of winConditions){
        //check each winning condition 
        if(inputCells[a] == player && 
            inputCells[b] == player &&
            inputCells[c] == player
        ){
            declareWinner([a,b,c])
            return true
        }
    }

    if(inputCells.every(cell => cell != '')){
        declareDraw()
        return true
    }
}
function choosplayer(selectedplayer){
    if(!isGameStart){
        player = selectedplayer
        if(player == 'x'){
            xPlay.classList.add('player-active')
            oPlay.classList.remove('player-active')

        }else{
            xPlay.classList.remove('player-active')
            oPlay.classList.add('player-active')

        }
    }
    info.style.display = 'none'

}

function declareDraw(){
    titres.textContent = 'NULL'
    isPauseGame = true
    restartBtn.style.visibility = 'visible'
}

function declareWinner(winnerIndices){
    titres.textContent = player + ' gagne'
    isGameStart = true
    //hight light winning cells
    winnerIndices.forEach((index) =>
        celles[index].style.background = '#2a2343' 
    )
    restartBtn.style.visibility = 'visible'

}
restartBtn.addEventListener('click', ()=> {
    restartBtn.style.visibility = 'hidden'
    inputCells.fill('')
    celles.forEach(cell => {
        cell.textContent = ''
        cell.style.background = ''
    })
    isGameStart = false
    isPauseGame = false
    titres.textContent = 'choisir'
})