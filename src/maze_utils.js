function translateLocationToCoords(mazeLocation) {
    switch (mazeLocation) {
        case BOTTOM_CENTER:
            return new MazeCoordinates(maze, LAYERS, maze[LAYERS].length / 2);
        case LEFT_CENTER:
            return new MazeCoordinates(maze, LAYERS, 3 * maze[LAYERS].length / 4);
        case RIGHT_CENTER:
            return new MazeCoordinates(maze, LAYERS, maze[LAYERS].length / 4);
        case TOP_CENTER:
            return new MazeCoordinates(maze, LAYERS, 0);
        default:
            console.error("Invalid maze location given: " + mazeLocation);
            break;
    }
}

function translateLocationToCoordsForWallBreaking(maze, mazeLocation) {
    // in case of even number of cells,
    // 'center' means the smaller index of the two middle cells 
    switch (mazeLocation) {
        case BOTTOM_CENTER:
            return new MazeCoordinates(maze, LAYERS, maze[LAYERS].length / 2);
        case LEFT_CENTER:
            return new MazeCoordinates(maze, LAYERS, 3 * maze[LAYERS].length / 4);
        case RIGHT_CENTER:
            return new MazeCoordinates(maze, LAYERS, maze[LAYERS].length / 4);
        case TOP_CENTER:
            return new MazeCoordinates(maze, LAYERS, 0);
        default:
            console.error("Invalid maze location given: " + mazeLocation);
            break;
    }
}

function translateMazeCoordinatesToWorldPos(mazeCoords) {
    let radius = (mazeCoords.layer - 0.5) * CELL_HEIGHT + INNER_RADIUS;
    let angleIncr = 2 * Math.PI / mazeCoords.maze[mazeCoords.layer].length;
    let angle = (mazeCoords.cell + 0.5) * angleIncr;
    return new BABYLON.Vector3(Math.sin(angle) * radius, Math.cos(angle) * radius, 0);
}

function MazeCoordinates(maze, layer, cell) {
    this.maze = maze;
    this.layer = layer;
    this.cell = cell;
    this.isValidCell = function () {
        return 0 < this.layer && this.layer < LAYERS + 1;
    }
    this.hasTwoOuterAdjacent = function () {
        if (this.layer === LAYERS) return false;
        return 2 * this.maze[this.layer].length === this.maze[this.layer + 1].length;
    }
    this.outer0Adjacent = function () {
        return new MazeCoordinates(this.maze, this.layer + 1, this.cell * 2);
    }
    this.outer1Adjacent = function () {
        return new MazeCoordinates(this.maze, this.layer + 1, this.cell * 2 + 1);
    }
    this.outerAdjacent = function () {
        return new MazeCoordinates(this.maze, this.layer + 1, this.cell);
    }
    this.hasDoublyLargeInnerAdjacent = function () {
        return this.layer > 1 && this.maze[this.layer].length === 2 * this.maze[this.layer - 1].length;
    }
    this.innerAdjacent = function () {
        if (this.hasDoublyLargeInnerAdjacent()) {
            return new MazeCoordinates(this.maze, this.layer - 1, Math.floor(this.cell / 2));
        } else {
            return new MazeCoordinates(this.maze, this.layer - 1, this.cell);
        }
    }
    this.clockwiseAdjacent = function () {
        let layerCellCount = this.maze[this.layer].length;
        return new MazeCoordinates(this.maze, this.layer, (this.cell + 1) % layerCellCount);
    }
    this.counterClockwiseAdjacent = function () {
        let layerCellCount = this.maze[this.layer].length;
        return new MazeCoordinates(this.maze, this.layer, (this.cell + layerCellCount - 1) % layerCellCount);
    }
}