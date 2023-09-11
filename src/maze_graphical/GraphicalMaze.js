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

    unhightlightLayers() {
        for (let layer of this.rotationLayers) {
            layer.setWallColor(BABYLON.Color3.Black());
        }
    }
    highlightLayer(radius) {
        this.unhightlightLayers();
        let chosen = Math.floor((radius - INNER_RADIUS) / CELL_HEIGHT) + 1;
        if (0 < chosen && chosen < LAYERS) {
            this.rotationLayers[chosen].setWallColor(BABYLON.Color3.Red());
        }
    }
}