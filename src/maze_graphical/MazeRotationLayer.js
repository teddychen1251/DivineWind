class MazeRotationLayer {
    constructor(origin, cellCount, scene) {
        this.origin = origin;
        this.wallMeshes = [];
        this.wallMaterial = new BABYLON.StandardMaterial("wall mat", scene);
        this.offset = 0;
        this.tempOffset = 0;
        this.cellCount = cellCount;
        this.snapAngles = [];
        this.targetAngle = 0;
        this.currentAngle = 0;
        let angleIncr = 2 * Math.PI / cellCount;
        for (let angle = 0, i = 0; i < cellCount; i++, angle += angleIncr) {
            this.snapAngles.push(angle);
        }
    }
    updateOffset() {
        this.offset += num;
        this.offset %= cellCount;
        if (this.offset < 0) {
            this.offset += cellCount;
        }
    }
    addWallMesh(mesh) {
        this.wallMeshes.push(mesh);
        mesh.material = this.wallMaterial;
    }
    setWallColor(color) {
        this.wallMaterial.diffuseColor = color;
    }
    snap(angle) {
        angle %= 2 * Math.PI;
        if (angle < 0) {
            angle += 2 * Math.PI;
        }
        this.tempOffset = this.binarySearch(angle);
        let snapAngle = this.snapAngles[this.tempOffset];
        this.origin.rotation.z = this.currentAngle - snapAngle;
    }
    endRotate() {
        this.currentAngle = this.origin.rotation.z;
        this.offset += this.tempOffset;
        this.offset %= this.cellCount;
    }
    binarySearch(angle) {
        let start = 0;
        let end = this.snapAngles.length - 1;
        let curr = Math.floor((start + end) / 2);
        while (start < end) {
            if (this.snapAngles[curr] === angle) {
                return curr;
            } else if (angle < this.snapAngles[curr]) {
                end = curr - 1;
            } else if (angle > this.snapAngles[curr]) {
                start = curr + 1;
            }
            curr = Math.floor((start + end) / 2);
        }
        if (this.snapAngles[curr] === angle) {
            return curr;
        } else if (angle < this.snapAngles[curr]) {
            if (curr === 0) {
                return curr;
            } else {
                return Math.abs(angle - this.snapAngles[curr]) < Math.abs(angle - this.snapAngles[curr - 1])
                    ? curr
                    : curr - 1;
            }
        } else if (angle > this.snapAngles[curr]) {
            if (curr === this.snapAngles.length - 1) {
                return Math.abs(angle - this.snapAngles[curr]) < Math.abs(angle - 2 * Math.PI)
                    ? curr
                    : 0;
            } else {
                return Math.abs(angle - this.snapAngles[curr]) < Math.abs(angle - this.snapAngles[curr + 1])
                    ? curr
                    : curr + 1;
            }
        }
    }
}