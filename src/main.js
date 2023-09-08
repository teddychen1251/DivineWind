const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const maze = new Maze(LAYERS, 0, BOTTOM_CENTER, TOP_CENTER);

const createScene = function () {
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.UniversalCamera("camera1", 
        new BABYLON.Vector3(0, 0, -100), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", 
        new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    let mazeLines = [];
    let broken = [];
    let rotationLayers = initGraphicalMaze(maze.maze, scene);
    let offsets = [];
    for (let i = 0; i < rotationLayers.length; i++) {
        offsets.push(0);
    }

    let solution = solveMaze(BOTTOM_CENTER, TOP_CENTER, maze);
    let solLines = [];
    for (let i = 1; i < solution.length; i++) {
        solLines.push([translateMazeCoordinatesToWorldPos(maze, solution[i - 1]), translateMazeCoordinatesToWorldPos(maze, solution[i])]);
    }
    let solLineSys = BABYLON.MeshBuilder.CreateLineSystem("solution path", { lines: solLines });
    solLineSys.color = new BABYLON.Color3(0, 1, 0);


    function updateOffsets() {
        for (let i = 0; i < rotationLayers.length; i++) {
            maze.offsets[i] = rotationLayers[i].offset;
        }
    }
    window.addEventListener("click", function() {
        let layer = 2;
        let angle = 2 * Math.PI / maze.maze[layer].length;
        rotationLayers[layer].origin.rotate(BABYLON.Vector3.Backward(), angle);
        rotationLayers[layer].updateOffset(1);
        updateOffsets();
        solution = solveMaze(BOTTOM_CENTER, TOP_CENTER, maze);
        solLines = [];
        for (let i = 1; i < solution.length; i++) {
            solLines.push([translateMazeCoordinatesToWorldPos(maze, solution[i - 1]), translateMazeCoordinatesToWorldPos(maze, solution[i])]);
        }
        solLineSys.dispose();
        solLineSys = BABYLON.MeshBuilder.CreateLineSystem("solution path", { lines: solLines });
        solLineSys.color = new BABYLON.Color3(0, 1, 0);
    });
    return scene;
};
const scene = createScene();
engine.runRenderLoop(function () {
        scene.render();
});
window.addEventListener("resize", function () {
        engine.resize();
});