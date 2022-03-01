const gameBoard = (function() {
    let gb =  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    let gbContainer = document.querySelector('.gameboard');
    let _createLayout = function() {
        gb.forEach((item, i) => {
            let gbItem = document.createElement('div');
            gbItem.classList.add('gb-item');
            gbItem.dataset.index = i;
            gbItem.textContent = item;
            gbContainer.appendChild(gbItem);
        })
    }
    let _resetLayout = function() {
        gameBoard.gbList = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
        let gbItems = document.querySelectorAll('.gb-item');
        let h1 = document.querySelector('h1');
        h1.textContent = 'TIC_TAC_TOE';
        gbItems.forEach(item => {
            item.textContent = ' ';
            item.classList.remove('played')
        });
    }
    return {
        gbList: gb,
        createLayout: _createLayout,
        resetLayout: _resetLayout,
    }
})();

const Player = function(symbol, active=true) {
    let winPatterns = [[0, 4, 8], [0, 1, 2], [0, 3, 6], [1, 4, 7], [2, 4, 6], [2, 5, 8], [3, 4, 5], [6, 7, 8]];
    let chosenDivs = [];
    let _checkIfWon = (choices) => {
        for(let pattern of winPatterns) {
            if(pattern.every(v => choices.includes(v))) {
                return true;
            }
        }
    };
    return {
        chosenDivs,
        symbol,
        active,
        checkIfWon: _checkIfWon,
    }
}

const main = (function() {
    gameBoard.createLayout();
    let allgbItems = document.querySelectorAll('.gb-item');
    let h1 = document.querySelector('h1');
    let resetBtn = document.querySelector('.reset-button');
    let player1 = Player('X');
    let player2 = Player('O', false);
    allgbItems.forEach((item, i) => {
        item.addEventListener('click', () => {
            if(player1.active && !item.classList.contains('played')) {
                gameBoard.gbList[i] = player1.symbol;
                item.classList.add('played');
                player1.chosenDivs.push(i);
                item.textContent = player1.symbol;
                if(player1.checkIfWon(player1.chosenDivs)) {
                    player1.active = false;
                    player2.active = false;
                    h1.textContent = 'Player 1 Won!! Congratulations!'
                } else {
                    player1.active = false;
                    player2.active = true;
                }
            } else if(player2.active && !item.classList.contains('played')) {
                gameBoard.gbList[i] = player2.symbol;
                item.classList.add('played');
                player2.chosenDivs.push(i);
                item.textContent = player2.symbol;
                if(player2.checkIfWon(player2.chosenDivs)) {
                    player1.active = false;
                    player2.active = false;
                    h1.textContent = 'Player 2 Won!! Congratulations!'
                } else {
                    player1.active = true;
                    player2.active = false;
                }
            }
        })
    })
    resetBtn.addEventListener('click', () => {
        gameBoard.resetLayout();
        player1.active = true;
        player1.chosenDivs = [];
        player2.active = false;
        player2.chosenDivs = [];
    });
})();


const Computer = function() {
    
}










