function translateLocationToCoords(mazeLocation) {
    // in case of even number of cells,
    // 'center' means the smaller index of the two middle cells 
    const coords = new MazeCoordinates(0, 0);
    switch (mazeLocation) {
        case BOTTOM_CENTER:
            coords.row = ROWS - 1;
            coords.col = Math.floor((COLS + 1) / 2);
            break;
        case LEFT_CENTER:
            coords.row = Math.floor(ROWS / 2 - 0.2);
            coords.col = 1;
            break;
        case RIGHT_CENTER:
            coords.row = Math.floor(ROWS / 2 - 0.2);
            coords.col = COLS;
            break;
        case TOP_CENTER:
            coords.row = 0;
            coords.col = Math.floor((COLS + 1) / 2);
            break;
        case BOTTOM_LEFT:
            coords.row = ROWS - 1;
            coords.col = 1;
            break;
        case BOTTOM_RIGHT:
            coords.row = ROWS - 1;
            coords.col = COLS;
            break;
        case TOP_LEFT:
            coords.row = 0;
            coords.col = 1;
            break;
        case TOP_RIGHT:
            coords.row = 0;
            coords.col = COLS;
            break;
        case LEFT_BOTTOM:
            coords.row = ROWS - 1;
            coords.col = 1;
            break;
        case LEFT_TOP:
            coords.row = 0;
            coords.col = 1;
            break;
        case RIGHT_BOTTOM:
            coords.row = ROWS - 1;
            coords.col = COLS;
            break;
        case RIGHT_TOP:
            coords.row = 0;
            coords.col = COLS;
            break;
        default:
            console.error("Invalid maze location given: " + mazeLocation);
            break;
    }
    return coords;
}

function translateLocationToCoordsForWallBreaking(mazeLocation) {
    // in case of even number of cells,
    // 'center' means the smaller index of the two middle cells 
    const coords = new MazeCoordinates(0, 0);
    switch (mazeLocation) {
        case BOTTOM_CENTER:
            coords.row = ROWS;
            coords.col = Math.floor((COLS + 1) / 2);
            break;
        case LEFT_CENTER:
            coords.row = Math.floor(ROWS / 2 - 0.2);
            coords.col = 0;
            break;
        case RIGHT_CENTER:
            coords.row = Math.floor(ROWS / 2 - 0.2);
            coords.col = COLS;
            break;
        case TOP_CENTER:
            coords.row = 0;
            coords.col = Math.floor((COLS + 1) / 2);
            break;
        case BOTTOM_LEFT:
            coords.row = ROWS;
            coords.col = 1;
            break;
        case BOTTOM_RIGHT:
            coords.row = ROWS;
            coords.col = COLS;
            break;
        case TOP_LEFT:
            coords.row = 0;
            coords.col = 1;
            break;
        case TOP_RIGHT:
            coords.row = 0;
            coords.col = COLS;
            break;
        case LEFT_BOTTOM:
            coords.row = ROWS - 1;
            coords.col = 0;
            break;
        case LEFT_TOP:
            coords.row = 0;
            coords.col = 0;
            break;
        case RIGHT_BOTTOM:
            coords.row = ROWS - 1;
            coords.col = COLS;
            break;
        case RIGHT_TOP:
            coords.row = 0;
            coords.col = COLS;
            break;
        default:
            console.error("Invalid maze location given: " + mazeLocation);
            break;
    }
    return coords;
}

function translateMazeCoordinatesToWorldPos(mazeCoords, cellLocation) {
    switch (cellLocation) {
        case UPPER_RIGHT:
            return new BABYLON.Vector3((mazeCoords.col + 1) * CELL_WIDTH, -(mazeCoords.row) * CELL_HEIGHT, 0);
        case CENTER:
            return new BABYLON.Vector3((mazeCoords.col + 0.5) * CELL_WIDTH, -(mazeCoords.row + 0.5) * CELL_HEIGHT, 0);
        default:
            break;
    }
}

function MazeCoordinates(row, col) {
    this.row = row;
    this.col = col;
    this.isValidCell = function () {
        return (0 <= this.row && this.row < ROWS) &&
            (0 < this.col && this.col <= COLS);
    }
    this.northAdjacent = function () {
        return new MazeCoordinates(this.row - 1, this.col);
    }
    this.southAdjacent = function () {
        return new MazeCoordinates(this.row + 1, this.col);
    }
    this.eastAdjacent = function () {
        return new MazeCoordinates(this.row, this.col + 1);
    }
    this.westAdjacent = function () {
        return new MazeCoordinates(this.row, this.col - 1);
    }
}