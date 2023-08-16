/**
 * Generates 2D array of MazeCells. Represents a maze.
 * 
 * @param {number} rows number of rows in maze
 * @param {number} cols number of columns in maze
 * @returns 2D array of MazeCells
 */
function generate_maze(rows, cols) {
    // represent maze as grid of MazeCells in 2D array
    const maze = [];
    // add extra row and col to have a solid wall on the left and bottom of maze
    for (let i = 0; i < rows + 1; i++) {
        let row = [];
        for (let j = 0; j < cols + 1; j++) {
            const cell = new MazeCell(i * (rows + 1) + j);
            row.push(cell);
            if (i == rows) cell.knockEastWall();
            if (j == 0) cell.knockNorthWall();
        }
        maze.push(row);
    }
    return maze;
}