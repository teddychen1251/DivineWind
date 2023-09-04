// draw maze and init rotation layers
function initGraphicalMaze(maze, scene) {
    const rotationLayers = [];
    for (let layer = 0; layer < maze.length; layer++) {      
        let rotationLayer = new MazeRotationLayer(new BABYLON.TransformNode("layer " + layer, scene));
        rotationLayers.push(rotationLayer);
        const angleIncr = 2 * Math.PI / maze[layer].length;
        const radius = INNER_RADIUS + CELL_HEIGHT * layer;
        let outerWallPaths = [[]];
        for (let cell = 0, angle = 0; cell < maze[layer].length; cell++, angle += angleIncr) {
            let currOuterWallPath = outerWallPaths[outerWallPaths.length - 1];
            if (maze[layer][cell].outer0) {
                if (currOuterWallPath.length === 0) {
                    currOuterWallPath.push(
                        new BABYLON.Vector3(radius * Math.sin(angle), radius * Math.cos(angle), 0)
                    );
                }
                currOuterWallPath.push(
                    new BABYLON.Vector3(
                        radius * Math.sin(angle + angleIncr / 2), 
                        radius * Math.cos(angle + angleIncr / 2),
                        0
                    )
                );
            } else if (currOuterWallPath.length > 0) {
                outerWallPaths.push([]);
                currOuterWallPath = outerWallPaths[outerWallPaths.length - 1];
            }
            if (maze[layer][cell].outer1) {
                if (currOuterWallPath.length === 0) {
                    currOuterWallPath.push(
                        new BABYLON.Vector3(
                            radius * Math.sin(angle + angleIncr / 2), 
                            radius * Math.cos(angle + angleIncr / 2),
                            0
                        )
                    );
                }
                currOuterWallPath.push(
                    new BABYLON.Vector3(
                        radius * Math.sin(angle + angleIncr), 
                        radius * Math.cos(angle + angleIncr),
                        0
                    )
                );
            } else if (currOuterWallPath.length > 0) {
                outerWallPaths.push([]);
                currOuterWallPath = outerWallPaths[outerWallPaths.length - 1];
            }
            if (maze[layer][cell].clockwise) {
                let options = {
                    path: [
                        new BABYLON.Vector3(
                            radius * Math.sin(angle + angleIncr), 
                            radius * Math.cos(angle + angleIncr),
                            0
                        ),
                        new BABYLON.Vector3(
                            (radius - CELL_HEIGHT) * Math.sin(angle + angleIncr), 
                            (radius - CELL_HEIGHT) * Math.cos(angle + angleIncr),
                            0
                        )
                    ],
                    radius: WALL_WIDTH,
                    cap: BABYLON.Mesh.CAP_ALL
                };
                let wall = BABYLON.MeshBuilder.CreateTube("clockwise wall", options, scene);
                wall.setParent(rotationLayer.origin);
            }
        }
        for (let path of outerWallPaths) {
            if (path.length === 0) continue;
            let options = {
                path: path,
                radius: WALL_WIDTH,
                cap: BABYLON.Mesh.CAP_ALL
            };
            let wall = BABYLON.MeshBuilder.CreateTube("outer wall", options, scene);
            wall.setParent(rotationLayer.origin);
        }
    }
}