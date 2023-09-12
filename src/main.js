const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const pather = new MazePather();

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
    let currentLevel = 0;
    const mazes = [];
    for (let i = 3; i < 11; i++) {
        const maze = new Maze(i, 0, BOTTOM_CENTER, TOP_CENTER);
        do {
            maze.scrambleOffsets();
        } while (pather.solve(maze).length > 0);
        mazes.push(maze);
    }

    let graphicalMaze = [new GraphicalMaze(mazes[currentLevel], scene)];
    graphicalMaze[0].setRotationX(Math.PI / 2);


    const xr = await scene.createDefaultXRExperienceAsync({
        pointerSelectionOptions: {
            preferredHandedness: "right",
            disableSwitchOnClick: true
        },
    });
    const pointerRay = new BABYLON.Ray(new BABYLON.Vector3(), new BABYLON.Vector3());
    xr.input.onControllerAddedObservable.add((input) => {
        if (input.inputSource.handedness === "left") return;
        scene.onPointerObservable.add((pointerInfo) => {
            input.getWorldPointerRayToRef(pointerRay);
            const result = scene.pickWithRay(pointerRay, (mesh) => mesh === graphicalMaze[0].pickingPlane);
            switch (pointerInfo.type) {
                case BABYLON.PointerEventTypes.POINTERDOWN:
                    if (result.hit) {
                        const radius = BABYLON.Vector3.Distance(result.pickedPoint, graphicalMaze[0].origin.position);
                        graphicalMaze[0].initRotateLayer(radius, result.pickedPoint)
                    }
                    break;
                case BABYLON.PointerEventTypes.POINTERMOVE:
                    if (result.hit) {
                        if (graphicalMaze[0].rotating) {
                            graphicalMaze[0].rotateLayer(result.pickedPoint);
                        } else {
                            const radius = BABYLON.Vector3.Distance(result.pickedPoint, graphicalMaze[0].origin.position);
                            graphicalMaze[0].highlightLayer(radius);
                        }
                    } else {
                        graphicalMaze[0].unhightlightLayers();
                        graphicalMaze[0].endRotateLayer();
                    }
                    break;
                case BABYLON.PointerEventTypes.POINTERUP:
                    graphicalMaze[0].endRotateLayer();
                    graphicalMaze[0].unhightlightLayers();
                    mazes[currentLevel].setOffsets(graphicalMaze[0].offsets());
                    pather.solveAndShow(mazes[currentLevel]);
                    if (pather.solution.length > 0) {
                        currentLevel++;
                        graphicalMaze[0].destroy();
                        graphicalMaze[0] = new GraphicalMaze(mazes[currentLevel], scene);
                        graphicalMaze[0].setRotationX(Math.PI / 2);
                        pather.drawnPath.dispose();
                    }
                    break;
            }
        });
        input.onMotionControllerInitObservable.add((motionController) => {
            
 
        });
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