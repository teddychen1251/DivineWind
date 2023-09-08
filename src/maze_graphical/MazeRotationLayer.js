function MazeRotationLayer(origin, cellCount) {
    this.origin = origin;
    this.offset = 0;
    this.cellCount = cellCount;
    this.updateOffset = num => {
        this.offset += num;
        this.offset %= cellCount;
        if (this.offset < 0) {
            this.offset += cellCount;
        }
    }
}