
let w, h;
let numCells = 5;
let cellWidth;
let cells = [];
let angle = 0;
let counter = 0;

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

    for (let i = 0; i < cells.length; i++) {
        if (cells[i].x !== 0 && cells[i].y !== 0) {
            cells[i].shape();
            cells[i].showPath();
        }
    }

    if (angle < 2 * PI) {
        angle += 0.01;

    } else {
        angle = 0;
    }
    counter ++;
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
        this.xPos = 0;
        this.yPos = 0;
        this.path = [];
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
        const speed = this.x === 0 ? 2 * this.y : 2 * this.x;
        this.xPos = cx + r * cos(angle * speed - PI / 2) / 2;
        this.yPos = cy + r * sin(angle * speed - PI / 2) / 2;
        ellipse(this.xPos, this.yPos, cellWidth / 12);
        pop();
    }

    shape() {
        const xPos = getCell(this.x, 0).xPos;
        const yPos = getCell(0, this.y).yPos;

        push();
        translate(this.x * cellWidth, this.y * cellWidth);
        fill('plum');
        ellipse(xPos, yPos, cellWidth / 12);

        if (counter % 5 === 0) {
            this.path.push({x: xPos, y: yPos});

        }

        pop();
    }

    showPath() {
        push();
        translate(this.x * cellWidth, this.y * cellWidth);
        fill('black');
        this.path.forEach(p => {
            ellipse(p.x, p.y, 1);
        });

        pop();
    }
}