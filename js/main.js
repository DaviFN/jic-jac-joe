createClickCallbacks();

var currentPlayer = 1;

var player1Score = 0;
var player2Score = 0;

function createClickCallbacks()
{
    for(i = 1 ; i <= 3 ; ++i) {
        for(j = 1 ; j <= 3 ; ++j) {
            let closuredI = i;
            let closuredJ = j;
            getElement(i, j).addEventListener('click', function() {
                clickCallback(closuredI, closuredJ);
            });
        }
    }
}

function isEmpty(i, j)
{
    return getPieceType(i, j) == "empty";
}

function isCross(i, j)
{
    return getPieceType(i, j) == "cross";
}

function isCircle(i, j)
{
    return getPieceType(i, j) == "circle";
}

function clickCallback(i, j)
{
    if(!isEmpty(i, j)) return;
    if(currentPlayer == 1) {
        setPieceType(i, j, "cross");
        currentPlayer = 2;
    }
    else //if(currentPlayer == 2)
    {
        setPieceType(i, j, "circle");
        currentPlayer = 1;
    }
    handleWinConditions();
}

function isInWinCondition(pieceType)
{
    // rows
    for(var i = 1 ; i <= 3 ; ++i)
    {
        if(getPieceType(i, 1) == pieceType && getPieceType(i, 2) == pieceType && getPieceType(i, 3) == pieceType) {
            return true;
        }
    }
    // columns
    for(var i = 1 ; i <= 3 ; ++i)
    {
        if(getPieceType(1, i) == pieceType && getPieceType(2, i) == pieceType && getPieceType(3, i) == pieceType) {
            return true;
        }
    }
    // main diagonal
    if(getPieceType(1, 1) == pieceType && getPieceType(2, 2) == pieceType  && getPieceType(3, 3) == pieceType) {
        return true;
    }
    // secondary diagonal
    if(getPieceType(3, 1) == pieceType && getPieceType(2, 2) == pieceType  && getPieceType(1, 3) == pieceType) {
        return true;
    }
    return false;
}

function getScoreboard()
{
    return document.getElementById("scoreboard");
}

function updateScoreboard()
{
    getScoreboard().innerText = player1Score + "x" + player2Score;
}

function clearBoard()
{
    for(var i = 1 ; i <= 3 ; ++i) {
        for(var j = 1 ; j <= 3 ; ++j) {
            setPieceType(i, j, "empty");
        }
    }
}

function handleWinConditions()
{
    if(isInWinCondition("cross")) {
        ++player1Score;
        clearBoard();
        updateScoreboard();
        currentPlayer = 1;
    }
    if(isInWinCondition("circle")) {
        ++player2Score;
        clearBoard();
        updateScoreboard();
        currentPlayer = 1;
    }
}

function getElement(i, j)
{
    return document.getElementById("cell-" + i + "-" + j);
}

function getResourcePathByPieceType(pieceType)
{
    if(pieceType == "empty")
    {
        return "resources/empty.png";
    }
    if(pieceType == "cross")
    {
        return "resources/cross.png";
    }
    if(pieceType == "circle")
    {
        return "resources/circle.png";
    }
}

function getPieceTypeByResourcePath(resourcePath)
{
    if(resourcePath.endsWith("resources/empty.png"))
    {
        return "empty";
    }
    if(resourcePath.endsWith("resources/cross.png"))
    {
        return "cross";
    }
    if(resourcePath.endsWith("resources/circle.png"))
    {
        return "circle";
    }
}

function setPieceType(i, j, pieceType)
{
    getElement(i, j).src = getResourcePathByPieceType(pieceType);
}

function getPieceType(i, j)
{
    return getPieceTypeByResourcePath(getElement(i, j).src);
}