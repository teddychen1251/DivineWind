function translateLocationToCoords(maze, mazeLocation) {
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