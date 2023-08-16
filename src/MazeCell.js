/**
 * Return a MazeCell representing a cell in a maze. A maze cell has a north wall,
 * an east wall, and region used for maze generation.
 * 
 */
function MazeCell() {
    this.north = true;
    this.east = true;
    this.root = this;
    this.simplifyRootPath = function () {
        let curr = this.root;
        while (curr !== curr.root) {
            curr = curr.root;
        }
        this.root = curr;
    }
    this.copyRoot = function (other) {
        this.root.root = other.root;
    }
    this.rootsMatch = function (other) {
        this.simplifyRootPath();
        other.simplifyRootPath();
        return this.root === other.root;
    }
    this.knockNorthWall = function () { this.north = false }
    this.knockEastWall = function () { this.east = false }
}