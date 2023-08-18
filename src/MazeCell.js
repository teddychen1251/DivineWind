/**
 * Return a MazeCell representing a cell in a maze. A maze cell has a north wall,
 * an east wall, and region used for maze generation.
 * 
 */
function MazeCell() {
    this.north = true;
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
    this.knockNorthWall = function () { this.north = false }
    this.knockEastWall = function () { this.east = false }
}