document.addEventListener("DOMContentLoaded", () => {
    const gridElement = document.getElementById("sudoku-grid");
    const grid = Array.from({ length: 9 }, () => Array(9).fill(0));

    // Create the grid cells
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = document.createElement("input");
            cell.type = "number";
            cell.min = 1;
            cell.max = 9;
            cell.className = "cell";
            cell.id = `cell-${row}-${col}`;
            cell.addEventListener("input", () => {
                const value = parseInt(cell.value);
                if (value >= 1 && value <= 9) {
                    grid[row][col] = value;
                } else {
                    grid[row][col] = 0;
                }
            });
            gridElement.appendChild(cell);
        }
    }

    window.solveSudoku = function() {
        if (solve(grid)) {
            for (let row = 0; row < 9; row++) {
                for (let col = 0; col < 9; col++) {
                    document.getElementById(`cell-${row}-${col}`).value = grid[row][col];
                }
            }
        } else {
            alert("No solution exists.");
        }
    };

    function isValid(grid, row, col, num) {
        for (let i = 0; i < 9; i++) {
            if (grid[row][i] === num || grid[i][col] === num) {
                return false;
            }
        }

        const startRow = row - (row % 3);
        const startCol = col - (col % 3);
        for (let i = startRow; i < startRow + 3; i++) {
            for (let j = startCol; j < startCol + 3; j++) {
                if (grid[i][j] === num) {
                    return false;
                }
            }
        }

        return true;
    }

    function solve(grid) {
        const emptyCell = findEmpty(grid);
        if (!emptyCell) {
            return true;
        }

        const [row, col] = emptyCell;
        for (let num = 1; num <= 9; num++) {
            if (isValid(grid, row, col, num)) {
                grid[row][col] = num;
                if (solve(grid)) {
                    return true;
                }
                grid[row][col] = 0;
            }
        }

        return false;
    }

    function findEmpty(grid) {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (grid[row][col] === 0) {
                    return [row, col];
                }
            }
        }
        return null;
    }
});
