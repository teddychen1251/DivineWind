const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const maze = generate_maze(LAYERS, 0, BOTTOM_CENTER, TOP_CENTER);

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
    // temporary show maze
    for (let layer = 0; layer < maze.length; layer++) {
        const angleIncr = 2 * Math.PI / maze[layer].length;
        const radius = INNER_RADIUS + CELL_HEIGHT * layer;
        for (let cell = 0, angle = 0; cell < maze[layer].length; cell++, angle += angleIncr) {
            if (maze[layer][cell].outer0) {
                mazeLines.push(
                    [
                        new BABYLON.Vector3(
                            radius * Math.sin(angle), 
                            radius * Math.cos(angle), 
                            0
                        ),
                        new BABYLON.Vector3(
                            radius * Math.sin(angle + angleIncr / 2), 
                            radius * Math.cos(angle + angleIncr / 2),
                            0
                        )
                    ]
                );
            } else {
                broken.push(
                    [
                        new BABYLON.Vector3(
                            radius * Math.sin(angle), 
                            radius * Math.cos(angle), 
                            0
                        ),
                        new BABYLON.Vector3(
                            radius * Math.sin(angle + angleIncr / 2), 
                            radius * Math.cos(angle + angleIncr / 2),
                            0
                        )
                    ]
                );
            }
            if (maze[layer][cell].outer1) {
                mazeLines.push(
                    [
                        new BABYLON.Vector3(
                            radius * Math.sin(angle + angleIncr / 2), 
                            radius * Math.cos(angle + angleIncr / 2),
                            0
                        ),
                        new BABYLON.Vector3(
                            radius * Math.sin(angle + angleIncr), 
                            radius * Math.cos(angle + angleIncr),
                            0
                        )
                    ]
                );
            } else {
                broken.push(
                    [
                        new BABYLON.Vector3(
                            radius * Math.sin(angle + angleIncr / 2), 
                            radius * Math.cos(angle + angleIncr / 2),
                            0
                        ),
                        new BABYLON.Vector3(
                            radius * Math.sin(angle + angleIncr), 
                            radius * Math.cos(angle + angleIncr),
                            0
                        )
                    ]
                );
            }
            if (maze[layer][cell].clockwise) {
                mazeLines.push(
                    [
                        new BABYLON.Vector3(
                            radius * Math.sin(angle + angleIncr), 
                            radius * Math.cos(angle + angleIncr),
                            0
                        ),
                        new BABYLON.Vector3(
                            (radius - CELL_HEIGHT) * Math.sin(angle + angleIncr), 
                            (radius - CELL_HEIGHT) * Math.cos(angle + angleIncr),
                            0
                        )
                    ]
                );
            } else {
                broken.push(
                    [
                        new BABYLON.Vector3(
                            radius * Math.sin(angle + angleIncr), 
                            radius * Math.cos(angle + angleIncr),
                            0
                        ),
                        new BABYLON.Vector3(
                            (radius - CELL_HEIGHT) * Math.sin(angle + angleIncr), 
                            (radius - CELL_HEIGHT) * Math.cos(angle + angleIncr),
                            0
                        )
                    ]
                );
            }
        }
    }
    let mazeLineSys = BABYLON.MeshBuilder.CreateLineSystem("maze", {lines: mazeLines}, scene);
    // let brokenSys = BABYLON.MeshBuilder.CreateLineSystem("broken", {lines: broken}, scene);
    // brokenSys.color = new BABYLON.Color3(1, 0, 0);
    
    // let solution = solveMaze(BOTTOM_CENTER, TOP_CENTER, maze);
    // let solLines = [];
    // for (let i = 1; i < solution.length; i++) {
    //     console.log(translateMazeCoordinatesToWorldPos(solution[i - 1]));
    //     solLines.push([translateMazeCoordinatesToWorldPos(solution[i - 1]), translateMazeCoordinatesToWorldPos(solution[i])]);
    // }
    // let solLineSys = BABYLON.MeshBuilder.CreateLineSystem("solution path", { lines: solLines });
    // solLineSys.parent = mazeLineSys;
    // solLineSys.color = new BABYLON.Color3(0, 1, 0);
    return scene;
};
const scene = createScene();
engine.runRenderLoop(function () {
        scene.render();
});
window.addEventListener("resize", function () {
        engine.resize();
});