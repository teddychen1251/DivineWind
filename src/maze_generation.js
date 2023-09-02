/**
 * Generates 2D array of MazeCells. Represents a circular maze.
 * 
 * @param {number} layers number of concentric layers in maze
 * @returns 2D array of MazeCells
 */
function generate_maze(layers, seed, start, end) {
    // represent maze as grid of MazeCells in 2D array
    const maze = [];
    // add extra inner layer to have a solid wall on inner circle of maze
    for (let i = 0; i < layers + 1; i++) {
        let layer = [];
        let radius = INNER_RADIUS + i * CELL_HEIGHT;
        let circumference = 2 * Math.PI * radius;
        let cellCount = 0;
        if (i === 0) {
            cellCount = Math.ceil(circumference / CELL_OUTER_ARC_THRESHOLD);
        } else {
            let prev = maze[i - 1].length;
            cellCount = circumference / prev > CELL_OUTER_ARC_THRESHOLD
                ? prev * 2
                : prev;
        }
        for (let j = 0; j < cellCount; j++) {
            const cell = new MazeCell();
            layer.push(cell);
            if (i === 0) cell.knockEastWall();
        }
        maze.push(layer);
    }

    // knock walls of cells to generate maze
    const walls = [];
    // add deletable east walls
    for (let layer = 1; layer < maze.length; layer++) {
        for (let cell = 0; cell < maze[layer].length; cell++) {
            walls.push({layer: layer, cell: cell, wall: CLOCKWISE});
        }
    }
    // add deletable north walls
    for (let layer = 1; layer < maze.length - 1; layer++) {
        if (maze[layer].length === maze[layer + 1].length / 2) {
            for (let cell = 0; cell < maze[layer].length; cell++) {
                walls.push({layer: layer, cell: cell, wall: OUTER_0});
                walls.push({layer: layer, cell: cell, wall: OUTER_1});
            }
        } else {
            for (let cell = 0; cell < maze[layer].length; cell++) {
                walls.push({layer: layer, cell: cell, wall: OUTER});
            }
        }
    }
    shuffle(walls);
    let totalCells = 0;
    for (let layer = 1; layer < maze.length; layer++) {
        totalCells += maze[layer].length;
    }
    // delete walls that separate regions of the maze
    for (let i = 0, j = totalCells - 1; i < walls.length && j > 0; i++) {
        let wall = walls[i];
        let cell = maze[wall.layer][wall.cell];
        switch (wall.wall) {
            case OUTER:
                let outer = maze[wall.layer + 1][wall.cell];
                if (cell.updateRootsAndMatch(outer)) {
                    continue;
                } else {
                    cell.knockNorthWall();
                    cell.copyRoot(outer);
                    j--;
                }
                break;
            case OUTER_0:
                let outer_0 = maze[wall.layer + 1][wall.cell * 2];
                if (cell.updateRootsAndMatch(outer_0)) {
                    continue;
                } else {
                    cell.knockNorth0Wall();
                    cell.copyRoot(outer_0);
                    j--;
                }
                break;
            case OUTER_1:
                let outer_1 = maze[wall.layer + 1][wall.cell * 2 + 1];
                if (cell.updateRootsAndMatch(outer_1)) {
                    continue;
                } else {
                    cell.knockNorth1Wall();
                    cell.copyRoot(outer_1);
                    j--;
                }
                break;
            case CLOCKWISE:
                let layerCellCount = maze[wall.layer].length;
                let clockwise = maze[wall.layer][(wall.cell + 1) % layerCellCount];
                if (cell.updateRootsAndMatch(clockwise)) {
                    continue;
                } else {
                    cell.knockEastWall();
                    cell.copyRoot(clockwise);
                    j--;
                }
                break;
            default:
                break;
        }
    }

    knockBorderWall(maze, start);
    knockBorderWall(maze, end);

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

function knockBorderWall(maze, location) {
    const coords = translateLocationToCoordsForWallBreaking(maze, location);
    const cell = maze[coords.layer][coords.cell];
    cell.knockNorthWall();
}