/**
 * Generates 2D array of MazeCells. Represents a maze.
 * 
 * @param {number} rows number of rows in maze
 * @param {number} cols number of columns in maze
 * @returns 2D array of MazeCells
 */
function generate_maze(rows, cols, seed) {
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
            walls.push({row: i, col: j, wall: "east"});
        }
    }
    // add deletable north walls
    for (let i = 1; i < rows; i++) {
        for (let j = 1; j < cols + 1; j++) {
            walls.push({row: i, col: j, wall: "north"});
        }
    }
    shuffle(walls);

    // let cell1 = new MazeCell();
    // let cell2 = new MazeCell();
    // let cell3 = new MazeCell();
    // let cell4 = new MazeCell();
    // if (!cell1.rootsMatch(cell2)) {
    //     cell1.copyRoot(cell2);
    // } else {
    //     console.log('oop1');
    // }
    // if (!cell1.rootsMatch(cell3)) {
    //     cell1.copyRoot(cell2);
    // } else {
    //     console.log('oop1');
    // }



    for (let i = 0, j = rows * cols - 1; i < walls.length && j > 0; i++) {
        let wall = walls[i];
        let cell = maze[wall.row][wall.col];
        if (wall.wall === "north") {
            let upper = maze[wall.row - 1][wall.col];
            if (cell.rootsMatch(upper)) {
                continue;
            } else {
                cell.knockNorthWall();
                cell.copyRoot(upper);
                j--;
            }
        } else {
            let right = maze[wall.row][wall.col + 1];
            if (cell.rootsMatch(right)) {
                continue;
            } else {
                cell.knockEastWall();
                cell.copyRoot(right);
                j--;
            }
        }
    }

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