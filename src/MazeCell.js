/**
 * Return a MazeCell representing a cell in a maze. A maze cell has a north wall,
 * an east wall, and region used for maze generation.
 * 
 * @param {number} region used for maze generation algorithm
 */
function MazeCell(region) {
    this.north = true;
    this.east = true;
    this.region = region;
    this.copyRegion = function (other) {
        this.region = other.region;
    }
    this.regionsMatch = function (other) {
        return this.region === other.region;
    }
    this.knockNorthWall = function () { this.north = false }
    this.knockEastWall = function () { this.east = false }
}