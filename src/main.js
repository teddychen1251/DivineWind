const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const maze = generate_maze(ROWS, COLS, 0, MAZE_START, MAZE_END);

const createScene = function () {
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.UniversalCamera("camera1", 
        new BABYLON.Vector3(0, 0, -70), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", 
        new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    drawMaze(maze, scene);
    // draw maze solution
    // let solution = solveMaze(MAZE_START, MAZE_END, maze);
    // let solLines = [];
    // for (let i = 1; i < solution.length; i++) {
    //     solLines.push([translateMazeCoordinatesToWorldPos(solution[i - 1]), translateMazeCoordinatesToWorldPos(solution[i])]);
    // }
    // let solLineSys = BABYLON.MeshBuilder.CreateLineSystem("solution path", { lines: solLines });
    // solLineSys.parent = mazeLineSys;
    // solLineSys.color = new BABYLON.Color3(0, 1, 0);
    rotateJunction(1, 2, scene);

    return scene;
};
const scene = createScene();
engine.runRenderLoop(function () {
        scene.render();
});
window.addEventListener("resize", function () {
        engine.resize();
});