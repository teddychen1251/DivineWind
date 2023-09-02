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
    let cell = maze[cellCoords.layer][cellCoords.cell];
    if (visited.has(cell)) {
        return [];
    }
    visited.add(cell);
    path.push(cellCoords);
    if (cellCoords.layer === end.layer && cellCoords.cell === end.cell) {
        return path;
    }
    if (cellCoords.hasTwoOuterAdjacent()) {
        if (!cell.north0) {
            let solved = rSolveMaze(maze, cellCoords.outer0Adjacent(), path.slice(), visited, end);
            if (solved.length > 0) return solved;
        }
        if (!cell.north1) {
            let solved = rSolveMaze(maze, cellCoords.outer0Adjacent(), path.slice(), visited, end);
            if (solved.length > 0) return solved;
        }
    } else {
        if (!cell.north0) {
            let solved = rSolveMaze(maze, cellCoords.outerAdjacent(), path.slice(), visited, end);
            if (solved.length > 0) return solved;
        }
    }
    if (!cell.east) {
        let solved = rSolveMaze(maze, cellCoords.clockwiseAdjacent(), path.slice(), visited, end);
        if (solved.length > 0) return solved;
    }
    let inner = cellCoords.innerAdjacent();
    if (cellCoords.hasDoublyLargeInnerAdjacent()) {
        if (cellCoords.cell % 2 === 0 && !maze[inner.layer][inner.cell].north0) {
            let solved = rSolveMaze(maze, inner, path.slice(), visited, end);
            if (solved.length > 0) return solved;
        } else if (!maze[inner.layer][inner.cell].north1) {
            let solved = rSolveMaze(maze, inner, path.slice(), visited, end);
            if (solved.length > 0) return solved;
        }
    } else {
        if (inner.isValidCell() && !maze[inner.layer][inner.cell].north0) {
            let solved = rSolveMaze(maze, inner, path.slice(), visited, end);
            if (solved.length > 0) return solved;
        }
    }
    let counterClockwise = cellCoords.counterClockwiseAdjacent();
    if (counterClockwise.isValidCell() && !maze[counterClockwise.layer][counterClockwise.cell].east) {
        let solved = rSolveMaze(maze, counterClockwise, path.slice(), visited, end);
        if (solved.length > 0) return solved;
    }
    return [];
}