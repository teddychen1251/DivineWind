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
    let lineSys = BABYLON.MeshBuilder.CreateLineSystem("lines", { lines: lines });
    lineSys.position.x -= 20;
    lineSys.position.y += 20;
    return scene;
};
const scene = createScene();
engine.runRenderLoop(function () {
        scene.render();
});
window.addEventListener("resize", function () {
        engine.resize();
});