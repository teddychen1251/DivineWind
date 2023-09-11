function MazeRotationLayer(origin, cellCount, scene) {
    this.origin = origin;
    this.wallMeshes = [];
    this.wallMaterial = new BABYLON.StandardMaterial("wall mat", scene);
    this.offset = 0;
    this.cellCount = cellCount;
    this.updateOffset = num => {
        this.offset += num;
        this.offset %= cellCount;
        if (this.offset < 0) {
            this.offset += cellCount;
        }
    }
    this.addWallMesh = (mesh) => {
        this.wallMeshes.push(mesh);
        mesh.material = this.wallMaterial;
    }
    this.setWallColor = (color) => {
        this.wallMaterial.diffuseColor = color;
    }
}