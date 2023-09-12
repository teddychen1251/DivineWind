class GraphicalMaze {
    constructor(mazeGrid, scene) {
        this.origin = new BABYLON.TransformNode("maze origin", scene);
        this.pickingPlane = BABYLON.MeshBuilder.CreateDisc("picking disc plane", { radius: INNER_RADIUS + LAYERS * CELL_HEIGHT }, scene);
        const pickingPlaneMat = new BABYLON.StandardMaterial("picking plane mat", scene);
        pickingPlaneMat.alpha = .2;
        this.pickingPlane.material = pickingPlaneMat;
        this.pickingPlane.setParent(this.origin);
        this.pickingPlaneNormal = BABYLON.Vector3.Forward();
        this.rotationLayers = initGraphicalMaze(mazeGrid, scene, this.origin);
        this.rotating = false;
        this.rotatingLayer = -1;
        this.initialRotatingVector = new BABYLON.Vector3();
        this.currPickVector = new BABYLON.Vector3();
    }
    setRotationX(angle) {
        this.origin.rotation.x = angle;
        this.pickingPlaneNormal.y = Math.sin(angle);
        this.pickingPlaneNormal.z = Math.cos(angle);
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
    initRotateLayer(radius, pickPoint) {
        let chosen = Math.floor((radius - INNER_RADIUS) / CELL_HEIGHT) + 1;
        if (0 < chosen && chosen < LAYERS) {
            this.rotating = true;
            this.rotatingLayer = chosen;
            pickPoint.subtractToRef(this.origin.position, this.initialRotatingVector);

        }
    }
    rotateLayer(pickPoint) {
        pickPoint.subtractToRef(this.origin.position, this.currPickVector);
        const angle = -BABYLON.Vector3.GetAngleBetweenVectorsOnPlane(this.initialRotatingVector, this.currPickVector, this.pickingPlaneNormal);
        this.rotationLayers[this.rotatingLayer].snap(angle);
    }
    endRotateLayer() {
        this.rotating = false;
        this.rotationLayers[this.rotatingLayer].endRotate();
    }
    offsets() {
        let offsets = [];
        for (let layer of this.rotationLayers) {
            offsets.push(layer.offset);
        }
        return offsets;
    }
}