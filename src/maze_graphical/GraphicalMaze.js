class GraphicalMaze {
    constructor(mazeGrid, scene) {
        this.origin = new BABYLON.TransformNode("maze origin", scene);
        this.pickingPlane = BABYLON.MeshBuilder.CreateDisc("picking disc plane", { radius: INNER_RADIUS + LAYERS * CELL_HEIGHT }, scene);
        const pickingPlaneMat = new BABYLON.StandardMaterial("picking plane mat", scene);
        pickingPlaneMat.alpha = .2;
        this.pickingPlane.material = pickingPlaneMat;
        this.pickingPlane.setParent(this.origin);
        this.rotationLayers = initGraphicalMaze(mazeGrid, scene, this.origin);
    }

    highlightLayer() {
        this.rotationLayers[0].setWallColor(BABYLON.Color3.Red());
    }
}