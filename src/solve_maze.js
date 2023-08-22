function solveMaze(start, end, maze) {
    const startCoords = translateLocationToCoords(start);
    const endCoords = translateLocationToCoords(end);
    // put MazeCells here to check the reference
    let visited = new Set();
    return rSolveMaze(maze, startCoords, [], visited, endCoords);
}
// tbh we should use BFS to show the whole connected maze
function rSolveMaze(maze, cellCoords, path, visited, end) {
    if (!cellCoords.isValidCell()) {
        return [];
    }
    let cell = maze[cellCoords.row][cellCoords.col];
    if (visited.has(cell)) {
        return [];
    }
    visited.add(cell);
    path.push(cellCoords);
    if (cellCoords.row === end.row && cellCoords.col === end.col) {
        return path;
    }
    if (!cell.north) {
        let solved = rSolveMaze(maze, cellCoords.northAdjacent(), path.slice(), visited, end);
        if (solved.length > 0) return solved;
    }
    if (!cell.east) {
        let solved = rSolveMaze(maze, cellCoords.eastAdjacent(), path.slice(), visited, end);
        if (solved.length > 0) return solved;
    }
    let south = cellCoords.southAdjacent();
    if (south.isValidCell() && !maze[south.row][south.col].north) {
        let solved = rSolveMaze(maze, south, path.slice(), visited, end);
        if (solved.length > 0) return solved;
    }
    let west = cellCoords.westAdjacent();
    if (west.isValidCell() && !maze[west.row][west.col].east) {
        let solved = rSolveMaze(maze, west, path.slice(), visited, end);
        if (solved.length > 0) return solved;
    }
    return [];
}