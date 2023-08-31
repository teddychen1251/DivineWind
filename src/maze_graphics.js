// const mazeOrigin = new BABYLON.TransformNode("maze origin");
const walls = [];
for (let i = 0; i < ROWS + 1; i++) {
    walls.push([]);
    for (let j = 0; j < COLS + 1; j++) {
        walls[walls.length - 1].push({NORTH: null, EAST: null});
    }
}

function drawMaze(maze, scene) {
    for (let i = 0; i < ROWS + 1; i++) {
        for (let j = 0; j < COLS + 1; j++) {
            walls[i][j].NORTH = new BABYLON.MeshBuilder.CreateBox(
                "north wall", 
                {
                    size: 0.2,
                    width: CELL_WIDTH
                },
                scene
            );
            walls[i][j].NORTH.position = new BABYLON.Vector3((j + 0.5) * CELL_WIDTH, -i * CELL_HEIGHT, 0);
            walls[i][j].NORTH.isVisible = maze[i][j].north;
            walls[i][j].EAST = new BABYLON.MeshBuilder.CreateBox(
                "east wall", 
                {
                    size: 0.2,
                    height: CELL_HEIGHT
                },
                scene
            );
            walls[i][j].EAST.position = new BABYLON.Vector3((j + 1) * CELL_WIDTH, -(i + 0.5) * CELL_HEIGHT, 0)
            walls[i][j].EAST.isVisible = maze[i][j].east;
        }
    } 
}

function rotateJunction(prevRow, prevCol, scene) {
    let top = walls[prevRow][prevCol].EAST;
    let bottom = walls[prevRow + 1][prevCol].EAST;
    let left = walls[prevRow + 1][prevCol].NORTH;
    let right = walls[prevRow + 1][prevCol + 1].NORTH;

    let blue = new BABYLON.StandardMaterial("blue", scene);
    blue.emissiveColor = BABYLON.Color3.Blue();
    let red = new BABYLON.StandardMaterial("red", scene);
    red.emissiveColor = BABYLON.Color3.Red();
    let green = new BABYLON.StandardMaterial("green", scene);
    green.emissiveColor = BABYLON.Color3.Green();
    let yellow = new BABYLON.StandardMaterial("yellow", scene);
    yellow.emissiveColor = BABYLON.Color3.Yellow();
    top.material = blue;
    left.material = red;
    bottom.material = green;
    right.material = yellow;
    // find axis of rotation
    let axisPos = translateMazeCoordinatesToWorldPos(new MazeCoordinates(prevRow + 1, prevCol), UPPER_RIGHT);
    let pivot = BABYLON.MeshBuilder.CreateBox("", {}, scene);// new BABYLON.TransformNode("axis");
    pivot.position = axisPos;
    top.setParent(pivot);
    bottom.setParent(pivot);
    left.setParent(pivot);
    right.setParent(pivot);


    window.addEventListener("click", () => {
        pivot.rotate(BABYLON.Vector3.Backward(), Math.PI / 4)
    });
    window.addEventListener("keydown", () => {
        // top.setParent(null);
        // bottom.setParent(null);
        // left.setParent(null);
        // right.setParent(null);
    });
}