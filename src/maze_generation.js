/**
 * Generates 2D array of MazeCells. Represents a maze.
 * 
 * @param {number} rows number of rows in maze
 * @param {number} cols number of columns in maze
 * @returns 2D array of MazeCells
 */
function generate_maze(rows, cols, seed, start, end) {
    // represent maze as grid of MazeCells in 2D array
    const maze = [];
    // add extra row and col to have a solid wall on the left and bottom of maze
    for (let i = 0; i < rows + 1; i++) {
        let row = [];
        for (let j = 0; j < cols + 1; j++) {
            const cell = new MazeCell();
            row.push(cell);
            if (i === rows) cell.knockEastWall();
            if (j === 0) cell.knockNorthWall();
        }
        maze.push(row);
    }

    // knock walls of cells to generate maze
    const walls = [];
    // add deletable east walls
    for (let i = 0; i < rows; i++) {
        for (let j = 1; j < cols; j++) {
            walls.push({row: i, col: j, wall: EAST});
        }
    }
    // add deletable north walls
    for (let i = 1; i < rows; i++) {
        for (let j = 1; j < cols + 1; j++) {
            walls.push({row: i, col: j, wall: NORTH});
        }
    }
    shuffle(walls);
    // delete walls that separate regions of the maze
    for (let i = 0, j = rows * cols - 1; i < walls.length && j > 0; i++) {
        let wall = walls[i];
        let cell = maze[wall.row][wall.col];
        if (wall.wall === NORTH) {
            let upper = maze[wall.row - 1][wall.col];
            if (cell.updateRootsAndMatch(upper)) {
                continue;
            } else {
                cell.knockNorthWall();
                cell.copyRoot(upper);
                j--;
            }
        } else {
            let right = maze[wall.row][wall.col + 1];
            if (cell.updateRootsAndMatch(right)) {
                continue;
            } else {
                cell.knockEastWall();
                cell.copyRoot(right);
                j--;
            }
        }
    }

    knockBorderWall(maze, ROWS, COLS, start);
    knockBorderWall(maze, ROWS, COLS, end);

    return maze;
}

/**
 * Randomly shuffle given array
 * 
 * @param {Array} arr 
 */
function shuffle(arr) {
    for (let i = arr.length - 1; i >= 1; i--) {
        let index = randIntFromZero(i);
        let tmp = arr[index];
        arr[index] = arr[i];
        arr[i] = tmp;
    }
}

/**
 * Generate random number between 0 (inclusive)
 * and max (exclusive)
 * 
 * @param {number} max 
 */
function randIntFromZero(max) {
    return Math.floor(Math.random() * max);
}

function knockBorderWall(maze, rows, cols, location) {
    // in case of even number of cells,
    // 'center' means the smaller index of the two middle cells 
    switch (location) {
        case BOTTOM_CENTER:
            maze[rows][Math.floor((cols + 1) / 2)].knockNorthWall();
            break;
        case LEFT_CENTER:
            maze[Math.floor(rows / 2 - 0.2)][0].knockEastWall();
            break;
        case RIGHT_CENTER:
            maze[Math.floor(rows / 2 - 0.2)][cols].knockEastWall();
            break;
        case TOP_CENTER:
            maze[0][Math.floor((cols + 1) / 2)].knockNorthWall();
            break;
        case BOTTOM_LEFT:
            maze[rows][1].knockNorthWall();
            break;
        case BOTTOM_RIGHT:
            maze[rows][cols].knockNorthWall();
            break;
        case TOP_LEFT:
            maze[0][1].knockNorthWall();
            break;
        case TOP_RIGHT:
            maze[0][cols].knockNorthWall();
            break;
        case LEFT_BOTTOM:
            maze[rows - 1][0].knockEastWall();
            break;
        case LEFT_TOP:
            maze[0][0].knockEastWall();
            break;
        case RIGHT_BOTTOM:
            maze[rows - 1][cols].knockEastWall();
            break;
        case RIGHT_TOP:
            maze[0][cols].knockEastWall()
            break;
        default:
            break;
    }
}