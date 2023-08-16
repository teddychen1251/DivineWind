const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

const CELL_HEIGHT = 4;
const CELL_WIDTH = 4;
const ROWS = 4;
const COLS = 4;

const maze = [];
for (let i = 0; i < ROWS + 1; i++) {
    let row = [];
    for (let j = 0; j < COLS + 1; j++) {
        const cell = new MazeCell(i * (ROWS + 1) + j);
        row.push(cell);
        // if (i == ROWS) cell.knockEastWall();
        // if (j == 0) cell.knockNorthWall();
    }
    maze.push(row);
}

const createScene = function () {
    // Creates a basic Babylon Scene object
    const scene = new BABYLON.Scene(engine);
    // Creates and positions a free camera
    const camera = new BABYLON.UniversalCamera("camera1", 
        new BABYLON.Vector3(0, 0, -20), scene);
    // Targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);
    // Creates a light, aiming 0,1,0 - to the sky
    const light = new BABYLON.HemisphericLight("light", 
        new BABYLON.Vector3(0, 1, 0), scene);
    // Dim the light a small amount - 0 to 1
    light.intensity = 0.7;

    let lines = [];

    for (let i = 0; i < ROWS + 1; i++) {
        for (let j = 0; j < COLS + 1; j++) {
            if (maze[i][j].north) {
                lines.push(
                    [
                        new BABYLON.Vector3(
                            j * CELL_WIDTH,
                            -i * CELL_HEIGHT,
                            0
                        ),
                        new BABYLON.Vector3(
                            (j + 1) * CELL_WIDTH,
                            -i * CELL_HEIGHT,
                            0
                        )
                    ]
                );
            }
            if (maze[i][j].east) {
                lines.push(
                    [
                        new BABYLON.Vector3(
                            (j + 1) * CELL_WIDTH,
                            -i * CELL_HEIGHT,
                            0
                        ),
                        new BABYLON.Vector3(
                            (j + 1) * CELL_WIDTH,
                            -(i + 1) * CELL_HEIGHT,
                            0
                        )
                    ]
                );
            }
        }
    } 
    let lineSys = BABYLON.MeshBuilder.CreateLineSystem("lines", { lines: lines }); //scene is optional and defaults to the current scene

    return scene;
};
const scene = createScene(); //Call the createScene function
// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
        scene.render();
});
// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
        engine.resize();
});