class MazePather {
    constructor() {
        this.drawnPath = undefined;
    }
    solveAndShow(maze) {
        if (this.drawnPath) this.drawnPath.dispose();
        let solution = solveMaze(BOTTOM_CENTER, TOP_CENTER, maze);
        let solLines = [];
        for (let i = 1; i < solution.length; i++) {
            solLines.push([translateMazeCoordinatesToWorldPos(maze, solution[i - 1]), translateMazeCoordinatesToWorldPos(maze, solution[i])]);
        }
        this.drawnPath = BABYLON.MeshBuilder.CreateLineSystem("solution path", { lines: solLines });
        this.drawnPath.color = new BABYLON.Color3(0, 1, 0);
    }
}