'use Strict'

var gBoard = [];
const LIFE = '🎃';
var gGeneretor;

function init() {
    gBoard = createBoard();
    renderBoard();
    gGeneretor = setInterval(function () {
        renderBoard();
        gBoard = runGeneration();
    }, 500);
    if (isGameOver()) clearInterval(gGeneretor);

}



function renderBoard() {
    var strHtml = ``;
    for (var i = 0; i < gBoard.length; i++) {
        strHtml += `<tr>`;
        for (var j = 0; j < gBoard[0].length; j++) {
            var cell = gBoard[i][j];
            var className = (gBoard[i][j]) ? 'occupied' : '';
            strHtml += `<td class="${className} cell">${cell}</td>`
        }
        strHtml += `</tr>`;
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHtml;
}



function createBoard() {
    board = [];
    for (var i = 0; i < 8; i++) {
        board.push([]);
        for (var j = 0; j < 8; j++) {
            board[i][j] = (Math.random() > 0.7) ? LIFE : '';
        }
    }
    return board;
}




function getNeiborsSum(cellI, cellJ, mat) {
    var neiborsSum = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if ((i < 0) || (i >= mat.length)) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if ((j < 0) || (j >= mat.length)) continue;
            if ((i === cellI) && (j === cellJ)) continue;
            if (mat[i][j] === LIFE) neiborsSum++;
        }
    }
    return neiborsSum;
}


function runGeneration() {
    var neiborsSum = 0;
    var newBoard = copyMat(gBoard);
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            neiborsSum = getNeiborsSum(i, j, gBoard);
            if (neiborsSum < 3 || neiborsSum > 5) newBoard[i][j] = '';
            else newBoard[i][j] = LIFE;
        }
    }

    return newBoard;
}




function copyMat(mat) {
    var matCopy = [];
    for (var i = 0; i < mat.length; i++) {
        matCopy[i] = mat[i].slice();
    }
    return matCopy;
}



function isGameOver() {
    //לראות שכל התאים מתים ולהחזיר אמת
    var cellLife = document.querySelectorAll('.occupied');
    if (cellLife.length > 0) return false;
    return true;
}




