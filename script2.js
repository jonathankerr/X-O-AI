var winningPlays = [
	[0,1,2],
	[3,4,5],
	[6,7,8],
	[0,3,6],
	[1,4,7],
	[2,5,8],
	[0,4,8],
	[6,4,2],
	[0,1,2],
]
var board = [
	[-1,-1,-1],
	[-1,-1,-1],
	[-1,-1,-1],
]
var totalMoves = 0;
var winner = false;
var playerScore = 0;
var aiScore = 0;
var blankInTwo = -1;


function reset(){
	document.getElementById("playertotal").innerHTML = playerScore.toString();
	document.getElementById("aitotal").innerHTML = playerScore.toString();
}


function playerGo(box){  
	var row = findRow(box);
	var pos = findPos(box);

	if(!winner){
		if(board[row][pos] == -1){
			board[row][pos] = "X";
			document.getElementById(box).innerText = "X";
			totalMoves = totalMoves + 1;
			checkWin("X");
			if(totalMoves < 9 && !winner){ //stops the AI from trying to make a move after the board is full
				aiGo(board);
			}
		}
	}
}


function aiGo(board){
	var madeMove = false;

	// while(!madeMove){
		// var tryPos = Math.floor(Math.random() * 9);
		// var row = findRow(tryPos);
		// var pos = findPos(tryPos);
		// if(board[row][pos] == -1){
		// 	board[row][pos] = "O";
		// 	document.getElementById(tryPos).innerText = "O"
		// 	totalMoves = totalMoves + 1;
		// 	madeMove = true;
		// 	checkWin("O");
		// }
	// }

	while(!madeMove){
		if(board[1][1] == -1){ //if center is free play center
			board[1][1] = "O";
			document.getElementById(4).innerText = "O";
			totalMoves = totalMoves + 1;
			madeMove = true;
			checkWin("O");
		}
		else if(board[1][1] == "X" && totalMoves == 1){ //if user went center on frist move we take corner
			var pickCorner = Math.floor(Math.random() * 4);
			if(pickCorner == 0){
				board[0][0] = "O";
				document.getElementById(0).innerText = "O";
				totalMoves = totalMoves + 1;
				madeMove = true;
				checkWin("O");
			}
			else if(pickCorner == 1){
				board[0][2] = "O";
				document.getElementById(2).innerText = "O";
				totalMoves = totalMoves + 1;
				madeMove = true;
				checkWin("O");
			}
			else if(pickCorner == 2){
				board[2][0] = "O";
				document.getElementById(6).innerText = "O";
				totalMoves = totalMoves + 1;
				madeMove = true;
				checkWin("O");
			}
			else if(pickCorner == 3){
				board[2][2] = "O";
				document.getElementById(8).innerText = "O";
				totalMoves = totalMoves + 1;
				madeMove = true;
				checkWin("O");
			}
		}
		else if(checkTwoInRow("O")){    //if the ai has two in a row act to this plan
			madeMove = true;
			console.log("ai has 2 in row");
			console.log("The free space is position: " + blankInTwo);
			var row = findRow(blankInTwo);
			var pos = findPos(blankInTwo);
			board[row][pos] = "O";
			document.getElementById(blankInTwo).innerText = "O";
			totalMoves = totalMoves + 1;
			madeMove = true;
			checkWin("O");
		}
		else if(checkTwoInRow("X")){    //if the user has two in a row act to this plan
			madeMove = true;
			console.log("User has 2 in row");
			console.log("The free space is position: " + blankInTwo);
			var row = findRow(blankInTwo);
			var pos = findPos(blankInTwo);
			board[row][pos] = "O";
			document.getElementById(blankInTwo).innerText = "O";
			totalMoves = totalMoves + 1;
			madeMove = true;
			checkWin("O");
		}
		else { //if all else fails then ai will make a random move
			var tryPos = Math.floor(Math.random() * 9);
			var row = findRow(tryPos);
			var pos = findPos(tryPos);
				if(board[row][pos] == -1){
					board[row][pos] = "O";
					document.getElementById(tryPos).innerText = "O"
					totalMoves = totalMoves + 1;
					madeMove = true;
					checkWin("O");
				}
		}

	}
}


function checkTwoInRow(XO){ //return true if the user has 2 "X" in a row (can be seperated by white space)
	var counter = 0;
	var hasTwo = false;
	var hasO = false;
	var blankSpace = -1
	var XorO = "";
	var opposite = "";

	if(XO == "X"){
		XorO = "X";
		opposite = "O";
	}
	else if(XO == "O"){
		XorO = "O";
		opposite = "X";
	}

	for(let p = 0; p <= 8; p++){ //loops through each test
		if(counter == 2){ //there is 2 in a row
			if(hasO == false){
				hasTwo = true;
				blankInTwo = blankSpace;
				counter = 0;
				blankSpace = -1;
			}
		}
		else {
			counter = 0;
			hasO = false;
			blankSpace = -1;
		}
		for(let g = 0; g < 3; g++){ //loops through each element in specific test
			var checkPos = winningPlays[p][g];
			var row = findRow(checkPos);
			var pos = findPos(checkPos);

			if(board[row][pos] == opposite){
				hasO = true;
			}
			else if(board[row][pos] == XorO){
				counter = counter + 1;
			}
			else if(board[row][pos] == -1){ //the blank space
				blankSpace = winningPlays[row][pos];
			}

		}
	}
	if(hasTwo){
		return true;
	}
	else {
		return false;
	}
}


function checkWin(XO){
	var possibleWinner = 0;
	var checkRow = [];
	var winningRow = [];

	for(let i = 0; i <= 8; i++){  //loops through all tests
		if(possibleWinner == 3){
			winner = true;
			winningRow = checkRow;
		}
		else {
			possibleWinner = 0;
			checkRow = [];
		}
		for(let j = 0; j < 3; j++){ //loops through each element in specific test
			var checkPos = winningPlays[i][j];
			var row = findRow(checkPos);
			var pos = findPos(checkPos);
			if(board[row][pos] == XO){
				possibleWinner = possibleWinner + 1;
				checkRow.push(checkPos);
			}
		}
	}
	if(winner){
		for(let n = 0; n < 3; n++){
			if(XO == "X"){
				document.getElementById(winningRow[n]).style.background = "lightgreen";
			}
			else if(XO == "O"){
				document.getElementById(winningRow[n]).style.background = "#ff6161";
			}
		}
		if(XO == "X"){
			playerScore = playerScore + 1;
			updateScore("X");
		}
		else if(XO == "O"){
			aiScore = aiScore + 1;
			updateScore("O");
		}
	}
	else if(totalMoves == 9){
		for(let p = 0; p < 9; p++){
			document.getElementById(p).style.background = "#ff6161";
		}
	}
}

function updateScore(XO){
	if(XO == "X"){
		document.getElementById("playertotal").innerHTML = playerScore.toString();
	}
	else if(XO == "O"){
		document.getElementById("aitotal").innerHTML = aiScore.toString();
	}
}

function newGame(){
	board = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]]
	totalMoves = 0;
	winner = false;

	for(let p = 0; p < 9; p++){
		document.getElementById(p).innerText = "";
		document.getElementById(p).style.background = "white";
	}
}




//////////////////////////////////////
//////Helper functions////////////////
//////////////////////////////////////

function findRow(id){  //given an id return the row 0,1,2
	if(id < 3){
		return 0;
	}
	else if(id >= 3 && id < 6){
		return 1;
	}
	else if(id >= 6 && id < 9){
		return 2;
	}
}

function findPos(id) { //given an id returns the position in that row 0,1,2
	if(id == 0){
		return 0;
	}
	else if(id == 1){
		return 1;
	}
	else if(id == 2){
		return 2;
	}
	else if(id == 3){
		return 0;
	}
	else if(id == 4){
		return 1;
	}
	else if(id == 5){
		return 2;
	}
	else if(id == 6){
		return 0;
	}
	else if(id == 7){
		return 1;
	}
	else if(id == 8){
		return 2;
	}
}

