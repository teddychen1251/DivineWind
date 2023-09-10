class GraphicalMaze {
    constructor(mazeGrid, scene) {
        this.origin = new BABYLON.TransformNode("maze origin", scene)
        this.rotationLayers = initGraphicalMaze(mazeGrid, scene, this.origin);
    }

}