/**
 * Return a MazeCell representing a cell in a maze. A maze cell has a north wall,
 * an east wall, and region used for maze generation.
 * 
 */
function MazeCell() {
    // first half of north wall, clockwise
    this.north0 = true;
    // second half, clockwise
    this.north1 = true;
    this.east = true;
    this.root = this;
    this.findBaseRoot = function () {
        let curr = this.root;
        while (curr !== curr.root) {
            curr = curr.root;
        }
        return curr;
    }
    this.updateRoot = function () {
        this.root = this.findBaseRoot();
    }
    this.copyRoot = function (other) {
        this.root.root = other.root;
    }
    this.updateRootsAndMatch = function (other) {
        this.updateRoot();
        other.updateRoot();
        return this.root === other.root;
    }
    this.knockNorthWall = function () { this.north0 = false; this.north1 = false; }
    this.knockNorth0Wall = function () { this.north0 = false; }
    this.knockNorth1Wall = function () { this.north1 = false; }
    this.knockEastWall = function () { this.east = false }
}