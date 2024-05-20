function player1()
{
    return{
        name: 'playerOne',
        marker: 'X',

    }
}

function player2()
{
    return{
        name: 'playerTwo',
        marker: 'O',

    }
}


function board(player1, player2)
{
    
    return {
        boardArray: [['', '', ''],
                    ['', '', ''],
                    ['', '', '']],

        currentPlayer: player1,
        addMarker: function(row, col){
            this.boardArray[row][col] = this.currentPlayer.marker;
            
            
        },
        switchPlayer: function(){
            if(this.currentPlayer === player1)
            {
                this.currentPlayer = player2;
            }
            else{
                this.currentPlayer = player1;
            }
            
        }
       
       
    }
}


function ticTacToe(array) {
    return {
        checkRow: function() {
            for (let i = 0; i < array.length; i++) {
                let flag = true;
                for (let j = 0; j < array.length - 1; j++) {
                    if (array[i][0] === '' || array[i][0] !== array[i][j + 1]) {
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    return true;
                }
            }
            return false;
        },

        checkCol: function() {
            for (let i = 0; i < array.length; i++) {
                let flag = true;
                for (let j = 0; j < array.length - 1; j++) {
                    if (array[0][i] === '' || array[0][i] !== array[j + 1][i]) {
                        flag = false;
                        break;
                    }
                }
                if (flag) {
                    return true;
                }
            }
            return false;
        },

        checkDiagonal: function() {
            if (array[0][0] !== '' && array[0][0] === array[1][1] && array[1][1] === array[2][2]) {
                return true;
            } else if (array[0][2] !== '' && array[0][2] === array[1][1] && array[1][1] === array[2][0]) {
                return true;
            }
            return false;
        },
        checkFortie: function(){
            for (let i = 0; i < array.length; i++)
            {
                for (let j = 0; j < array.length; j++)
                {
                    if(array[i][j] ==='')
                    {
                        
                        return false;
                    }
             
                }
            }
            return true;         
          
        }
    };
}
function showResult(){
    
    let modal = document.getElementById('modal')
    modal.showModal();
    let restart = document.getElementById('restart');
        restart.addEventListener('click', ()=>{
            
            modal.close();
            displayGrid();
        })
    

}

function displayGrid(){
    const playerX = player1();
    const player0 = player2();

    let container = document.querySelector('.container');
    container.innerHTML = '';
    let myBoard = board(playerX, player0);

    for(let i = 0; i < 3; i++)
    {
        
        for(let j = 0; j < 3; j++)
        {
            let cells = document.createElement('div');
            cells.className = 'cells';
            container.appendChild(cells);
            cells.dataset.row = i;
            cells.dataset.column = j;
           
            cells.addEventListener('click', function clickhandler(event){
                event.target.textContent = myBoard.currentPlayer.marker;
                let row = parseInt(event.target.dataset.row);
                let col = parseInt(event.target.dataset.column);
                myBoard.addMarker(row, col);

                event.target.removeEventListener('click', clickhandler);
                
                
                let gameBoard = ticTacToe(myBoard.boardArray);
                
                console.log(gameBoard.checkFortie())
    
                if(gameBoard.checkRow() || gameBoard.checkCol() || gameBoard.checkDiagonal())
                {
                    let result = document.getElementById('result');
                    result.textContent = `${myBoard.currentPlayer.name} Wins!`;
                    showResult();
                    
                }
                else if(gameBoard.checkFortie())
                {
                   
                    let result = document.getElementById('result');
                    result.textContent = "It's a tie!"
                    showResult()
                }
                myBoard.switchPlayer();
                


            })
            

        }
    }           
}
displayGrid()
