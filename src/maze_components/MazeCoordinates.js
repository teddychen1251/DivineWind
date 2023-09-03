function MazeCoordinates(maze, layer, cell) {
    this.maze = maze;
    this.layer = layer;
    this.cell = cell;
    this.isValidCell = function () {
        return 0 < this.layer && this.layer < LAYERS + 1;
    }
    this.hasTwoOuterAdjacent = function () {
        if (this.layer === LAYERS) return false;
        return 2 * this.maze[this.layer].length === this.maze[this.layer + 1].length;
    }
    this.outer0Adjacent = function () {
        return new MazeCoordinates(this.maze, this.layer + 1, this.cell * 2);
    }
    this.outer1Adjacent = function () {
        return new MazeCoordinates(this.maze, this.layer + 1, this.cell * 2 + 1);
    }
    this.outerAdjacent = function () {
        return new MazeCoordinates(this.maze, this.layer + 1, this.cell);
    }
    this.hasDoublyLargeInnerAdjacent = function () {
        return this.layer > 1 && this.maze[this.layer].length === 2 * this.maze[this.layer - 1].length;
    }
    this.innerAdjacent = function () {
        if (this.hasDoublyLargeInnerAdjacent()) {
            return new MazeCoordinates(this.maze, this.layer - 1, Math.floor(this.cell / 2));
        } else {
            return new MazeCoordinates(this.maze, this.layer - 1, this.cell);
        }
    }
    this.clockwiseAdjacent = function () {
        let layerCellCount = this.maze[this.layer].length;
        return new MazeCoordinates(this.maze, this.layer, (this.cell + 1) % layerCellCount);
    }
    this.counterClockwiseAdjacent = function () {
        let layerCellCount = this.maze[this.layer].length;
        return new MazeCoordinates(this.maze, this.layer, (this.cell + layerCellCount - 1) % layerCellCount);
    }
}