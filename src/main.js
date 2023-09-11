const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const maze = new Maze(LAYERS, 0, BOTTOM_CENTER, TOP_CENTER);

const createScene = async function () {
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.UniversalCamera("camera1", 
        new BABYLON.Vector3(0, 0, -3), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", 
        new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 0.7;

    // const env = scene.createDefaultEnvironment();

    const graphicalMaze = new GraphicalMaze(maze.grid, scene);
    // graphicalMaze.origin.rotation.x = Math.PI / 2;
    const xr = await scene.createDefaultXRExperienceAsync({
        pointerSelectionOptions: {
            // preferredHandedness: "right"
        },
    });
    const pointerRay = new BABYLON.Ray(new BABYLON.Vector3(), new BABYLON.Vector3());
    xr.input.onControllerAddedObservable.add((input) => {
        if (input.inputSource.handedness === "left") return;
        scene.onPointerObservable.add((pointerInfo) => {
            input.getWorldPointerRayToRef(pointerRay);
            const result = scene.pickWithRay(pointerRay, (mesh) => mesh === graphicalMaze.pickingPlane);
            switch (pointerInfo.type) {
                case BABYLON.PointerEventTypes.POINTERDOWN:
                    if (result.hit) {
                        const radius = BABYLON.Vector3.Distance(result.pickedPoint, graphicalMaze.origin.position);
                        graphicalMaze.initRotateLayer(radius, result.pickedPoint)
                    }
                    break;
                case BABYLON.PointerEventTypes.POINTERMOVE:
                    if (result.hit) {
                        if (graphicalMaze.rotating) {
                            graphicalMaze.rotateLayer(result.pickedPoint);
                        } else {
                            const radius = BABYLON.Vector3.Distance(result.pickedPoint, graphicalMaze.origin.position);
                            graphicalMaze.highlightLayer(radius);
                        }
                    } else {
                        graphicalMaze.unhightlightLayers();
                        graphicalMaze.endRotateLayer();
                    }
                    break;
                case BABYLON.PointerEventTypes.POINTERUP:
                    graphicalMaze.endRotateLayer();
                    graphicalMaze.unhightlightLayers();
                    break;
            }
        });
        input.onMotionControllerInitObservable.add((motionController) => {
            
 
        });
    });


    let solution = solveMaze(BOTTOM_CENTER, TOP_CENTER, maze);
    let solLines = [];
    for (let i = 1; i < solution.length; i++) {
        solLines.push([translateMazeCoordinatesToWorldPos(maze, solution[i - 1]), translateMazeCoordinatesToWorldPos(maze, solution[i])]);
    }
    let solLineSys = BABYLON.MeshBuilder.CreateLineSystem("solution path", { lines: solLines });
    solLineSys.color = new BABYLON.Color3(0, 1, 0);


    function updateOffsets() {
        for (let i = 0; i < graphicalMaze.rotationLayers.length; i++) {
            maze.offsets[i] = graphicalMaze.rotationLayers[i].offset;
        }
    }

    window.addEventListener("keydown", function(event) {
        let layer = 3;
        switch (event.key) {
            case "1":
                layer = 1;
                break;
            case "2":
                layer = 2;
                break;
            case "3":
                layer = 3;
                break;
            case "4":
                layer = 4;
                break;
            case "5":
                layer = 5;
                break;
            case "6":
                layer = 6;
                break;
            default:
                return;
        }
        let angle = 2 * Math.PI / maze.grid[layer].length;
        graphicalMaze.rotationLayers[layer].origin.rotate(BABYLON.Vector3.Backward(), angle);
        graphicalMaze.rotationLayers[layer].updateOffset(1);
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
engine.runRenderLoop(async function () {
        (await scene).render();
});
window.addEventListener("resize", function () {
        engine.resize();
});