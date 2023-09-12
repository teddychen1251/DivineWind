const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const pather = new MazePather();
const maze = new Maze(LAYERS, 0, BOTTOM_CENTER, TOP_CENTER);
do {
    maze.scrambleOffsets();
} while (pather.solve(maze) > 0);
let timestamp = new Date();

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

    const graphicalMaze = new GraphicalMaze(maze, scene);
    graphicalMaze.setRotationX(Math.PI / 2);
    scene.registerBeforeRender(() => {
        let prev = timestamp;
        timestamp = new Date();
        let deltaTimeSeconds = (timestamp - prev) / 1000;
        graphicalMaze.update(deltaTimeSeconds);
    });

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
                    maze.setOffsets(graphicalMaze.offsets());
                    pather.solveAndShow(maze);
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