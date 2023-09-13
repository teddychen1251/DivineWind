class MongolShip {
    constructor(scene, spawn, isFlagShip) {
        this.origin = new BABYLON.TransformNode("shippy", scene);
        this.traveling = false;
        const hull = BABYLON.MeshBuilder.CreateCylinder("hull", {
            height: 0.5,
            diameterTop: 0,
            diameterBottom: 0.2
        }, scene);
        hull.rotation.x = -Math.PI / 2;
        const mast0 = BABYLON.MeshBuilder.CreateCylinder("mast0", {
            height: 0.3,
            diameter: 0.02
        }, scene);
        mast0.position.y += 0.15;
        mast0.position.z += 0.12;
        const sail0 = BABYLON.MeshBuilder.CreatePlane("sail0", {
            size: 0.25
        }, scene);
        sail0.position.y += 0.3;
        sail0.position.z += 0.1;
        const shipMat = new BABYLON.StandardMaterial("shipMat");
        shipMat.diffuseColor = new BABYLON.Color3(153 / 256, 102 / 256, 51 / 256);
        const sailMat = new BABYLON.StandardMaterial("sailMat");
        sailMat.emissiveColor = isFlagShip
            ? BABYLON.Color3.Red()
            : new BABYLON.Color3(255 / 256, 255 / 256, 200 / 256);
        hull.material = shipMat;
        mast0.material = shipMat;
        sail0.material = sailMat;
        const ship = BABYLON.Mesh.MergeMeshes([hull, mast0, sail0], true, false, null, false, true);
        ship.setParent(this.origin);
        this.origin.position = spawn;
        this.timestamp = new Date();
        scene.registerBeforeRender(() => {
            if (this.traveling) {
                let prev = this.timestamp;
                this.timestamp = new Date();
                let deltaTimeSeconds = (this.timestamp - prev) / 1000;
                this.origin.position.z -= deltaTimeSeconds * SHIP_SPEED;
                if (this.origin.position.z < 0) {
                    this.traveling = false;
                }
            }
        });
    }

    setPosition(x, y, z) {
        this.origin.position.x = x;
        this.origin.position.y = y;
        this.origin.position.z = z;
    }

}