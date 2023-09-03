function solveMaze(start, end, maze) {
    const startCoords = translateLocationToCoords(maze, start);
    const endCoords = translateLocationToCoords(maze, end);
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
        if (!cell.outer0) {
            let solved = rSolveMaze(maze, cellCoords.outer0Adjacent(), path.slice(), visited, end);
            if (solved.length > 0) return solved;
        }
        if (!cell.outer1) {
            let solved = rSolveMaze(maze, cellCoords.outer1Adjacent(), path.slice(), visited, end);
            if (solved.length > 0) return solved;
        }
    } else {
        if (!cell.outer0) {
            let solved = rSolveMaze(maze, cellCoords.outerAdjacent(), path.slice(), visited, end);
            if (solved.length > 0) return solved;
        }
    }
    if (!cell.clockwise) {
        let solved = rSolveMaze(maze, cellCoords.clockwiseAdjacent(), path.slice(), visited, end);
        if (solved.length > 0) return solved;
    }
    let inner = cellCoords.innerAdjacent();
    if (cellCoords.hasDoublyLargeInnerAdjacent()) {
        let isFirstCell = cellCoords.cell % 2 === 0;
        if (isFirstCell && !maze[inner.layer][inner.cell].outer0) {
            let solved = rSolveMaze(maze, inner, path.slice(), visited, end);
            if (solved.length > 0) return solved;
        } else if (!isFirstCell && !maze[inner.layer][inner.cell].outer1) {
            let solved = rSolveMaze(maze, inner, path.slice(), visited, end);
            if (solved.length > 0) return solved;
        }
    } else {
        if (inner.isValidCell() && !maze[inner.layer][inner.cell].outer0) {
            let solved = rSolveMaze(maze, inner, path.slice(), visited, end);
            if (solved.length > 0) return solved;
        }
    }
    let counterClockwise = cellCoords.counterClockwiseAdjacent();
    if (counterClockwise.isValidCell() && !maze[counterClockwise.layer][counterClockwise.cell].clockwise) {
        let solved = rSolveMaze(maze, counterClockwise, path.slice(), visited, end);
        if (solved.length > 0) return solved;
    }
    return [];
}