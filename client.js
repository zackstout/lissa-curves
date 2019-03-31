
let w, h;
let numCells = 5;
let cellWidth;
let cells = [];
let angle = 0;

function setup() {
    w = 800;
    h = 800;
    cellWidth = w / numCells;
    createCanvas(w, h);
    background(200);

    for (let i = 0; i < numCells; i++) {
        for (let j = 0; j < numCells; j++) {
            const c = new Cell(i, j);
            cells.push(c);
        }
        // cells.push(col);
    }

    console.log(cells);
    cells.forEach(c => c.show());

    for (let i = 1; i < numCells; i++) {
        const c = getCell(0, i);
        const r = getCell(i, 0);
        c.circ();
        r.circ();
    }
}

function draw() {
    background(200);
    cells.forEach(c => c.show());

    for (let i = 1; i < numCells; i++) {
        const c = getCell(0, i);
        const r = getCell(i, 0);
        c.circ();
        r.circ();
    }

    angle += 0.01;
}

function getCell(x, y) {
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].x === x && cells[i].y === y) return cells[i];
    }
}

class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    show() {
        fill('coral');
        rect(this.x * cellWidth, this.y * cellWidth, cellWidth, cellWidth);

    }

    circ() {
        noFill();
        push();
        translate(this.x * cellWidth, this.y * cellWidth);
        const cx = cellWidth / 2;
        const cy = cellWidth / 2;
        const r = cellWidth * 0.8;
        ellipse(cx, cy, r);
        fill('green');
        const speed = this.x === 0 ? 2 * this.y : 2  * this.x;
        ellipse(cx + r * cos(angle * speed - PI / 2) / 2, cy + r * sin(angle * speed - PI / 2) / 2, cellWidth / 12);
        pop();
    }
}