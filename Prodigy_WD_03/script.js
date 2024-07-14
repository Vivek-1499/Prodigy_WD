document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('resetButton');
    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const messageElement = document.createElement('p');
    document.body.insertBefore(messageElement, resetButton);

    const handleCellClick = (event) => {
        const cell = event.target;
        const cellIndex = parseInt(cell.getAttribute('data-index'));

        if (gameState[cellIndex] !== '' || !gameActive) {
            return;
        }

        gameState[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(`player${currentPlayer}`);

        checkResult();
        if (gameActive) {
            togglePlayer();
        }
    };

    const togglePlayer = () => {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        setHoverColor();
        messageElement.textContent = `Player ${currentPlayer}'s turn`;
        messageElement.style.backgroundColor = '';
    };

    const checkResult = () => {
        let roundWon = false;

        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            messageElement.textContent = `Player ${currentPlayer} wins the game!`;
            messageElement.style.backgroundColor = currentPlayer === 'X' ? '#ff6347' : '#4169e1';
            messageElement.style.color = '#fff';
            messageElement.style.fontSize = '1.5rem';
            gameActive = false;
            return;
        }

        if (!gameState.includes('')) {
            messageElement.textContent = "It's a draw!";
            messageElement.style.backgroundColor = '#f0f8ff';
            messageElement.style.color = '#333';
            messageElement.style.fontSize = '1.5rem';
            gameActive = false;
            return;
        }
    };

    const setHoverColor = () => {
        cells.forEach(cell => {
            cell.style.backgroundColor = '';
            cell.classList.remove('hoverRed', 'hoverBlue');
            if (currentPlayer === 'X') {
                cell.classList.add('hoverRed');
            } else {
                cell.classList.add('hoverBlue');
            }
        });
    };

    const resetGame = () => {
        currentPlayer = 'X';
        gameActive = true;
        gameState = ['', '', '', '', '', '', '', '', ''];
        messageElement.textContent = `Player ${currentPlayer}'s turn`;
        messageElement.style.backgroundColor = '';
        messageElement.style.color = '#333';
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('playerX', 'playerO');
        });
        setHoverColor();
    };

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    resetButton.addEventListener('click', resetGame);

    setHoverColor();
});
