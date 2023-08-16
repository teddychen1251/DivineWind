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