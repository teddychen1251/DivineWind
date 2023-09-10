function translateLocationToCoords(maze, mazeLocation) {
    switch (mazeLocation) {
        case BOTTOM_CENTER:
            return new MazeCoordinates(LAYERS, maze.grid[LAYERS].length / 2);
        case LEFT_CENTER:
            return new MazeCoordinates(LAYERS, 3 * maze.grid[LAYERS].length / 4);
        case RIGHT_CENTER:
            return new MazeCoordinates(LAYERS, maze.grid[LAYERS].length / 4);
        case TOP_CENTER:
            return new MazeCoordinates(LAYERS, 0);
        default:
            console.error("Invalid maze location given: " + mazeLocation);
            break;
    }
}

function translateMazeCoordinatesToWorldPos(maze, mazeCoords) {
    let radius = (mazeCoords.layer - 0.5) * CELL_HEIGHT + INNER_RADIUS;
    let layerCellCount = maze.grid[mazeCoords.layer].length;
    let angleIncr = 2 * Math.PI / layerCellCount;
    let effectiveCell = (mazeCoords.cell + maze.offsets[mazeCoords.layer]) % layerCellCount;
    let angle = (effectiveCell + 0.5) * angleIncr;
    return new BABYLON.Vector3(Math.sin(angle) * radius, Math.cos(angle) * radius, 0);
}