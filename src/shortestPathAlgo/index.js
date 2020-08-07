export default function BFS(grid, start, end, callback) {

    let oddVectors = [[-1,0],[0, 1], [0, -1], [1, -1], [1, 0], [1, 1]];
    let evenVector = [[0,-1], [0,1], [-1, 0], [1, 0], [-1, -1], [-1, 1]];

    function queue() {
        this.items = [];
        this.enqueue = function(value) {
            this.items.push(value);
        }
        this.dequeue = function() {
            if (!this.isEmpty()) {
                return this.items.shift();
            }
        }
        this.front = function() {
            if (!this.isEmpty()) {
                return this.items[0];
            }
        }
        this.isEmpty = function() {
            return this.items.length === 0;
        }
    }

    function exploreNeighbor(q, current) {
        let vectors;
        if (current.y%2 === 0) {
            vectors = evenVector;
        }
        else {
            vectors = oddVectors;
        }
        vectors.forEach((vector) => {
            let next = {x: vector[0] + current.x, y: vector[1] + current.y};
            if (next.x >=0 && next.x <= N-1 && next.y >= 0 && next.y <= M-1) {
                if (visited[next.x][next.y] === false && !grid[next.x][next.y].selected) {
                    q.enqueue(next);
                    prev[next.x.toString() + next.y.toString()] = current;
                    visited[next.x][next.y] = true;
                }
            }
            
        });
    }

    let q = new queue();
    q.enqueue(start);

    let visited =[];
    let visitedHelper = [];

    let N = grid.length;
    let M = grid[0].length;
    console.log(N);
    console.log(M);

    let prev = {}

    for (let i=0; i<M; i++) {
        visitedHelper.push(false);
    }
    for (let j=0; j<N; j++) {
        visited.push(Object.assign([], visitedHelper));
    }
    visited[start.x, start.y] = true;

    while (!q.isEmpty()) {
        let current = q.front();
        q.dequeue();
        
        if (grid[current.x][current.y].isEnd) {
            return callback(prev);
        }   

        exploreNeighbor(q, current);
    }
    return callback(false);
}