class player {
    x = 0;
    y = 0;
    curr_piece: piece;
    constructor (first_piece: piece){
        this.x = 4;
        this.y = 1;
        this.curr_piece = new piece(first_piece.states);
    }

    new_piece (piece_from_bag: piece){
        this.x = 4;
        this.y = 1;
        this.curr_piece = new piece(piece_from_bag.states);
    }

    
}

class grid {
    array : number[][];
    constructor (array: number[][]){
        this.array = array;
    }
    hard_drop(piece: piece, x: number, y: number, py: number){
        //loop through every row and    every colunm of the grid until it meets a piece
        for (let row = py; row < y; row++){
            let colunm = x;
            for (let p_row = piece.state.length-1; p_row > -1; p_row--){
                for (let p_colunm = 0; p_colunm < piece.width; p_colunm++){
                    
                    if (this.array[row+1][colunm+p_colunm] > 0 && piece.state[p_row][p_colunm] > 0){
                        //collision happened
                        for (let a_row = 0; a_row < piece.state.length; a_row++){
                            for (let a_colunm = 0; a_colunm < piece.width; a_colunm++){
                                if (piece.state[a_row][a_colunm] > 0){
                                    this.array[row+a_row-p_row][colunm+a_colunm] = piece.state[a_row][a_colunm];
                                }
                            }
                        }
                        return true;
                    }

                }
            }
        }
        return false;
    }

    drop(piece: piece, x: number, y: number){
        if (this.hard_drop(piece, x, y+1, y)){
            return true;
        }
        return false;
    }

}

class piece {
    array = 0;
    states : number[][][];
    state : number[][];
    width = 0;
    constructor (states: number[][][]){
        this.states = states;
        this.state = this.states[this.array]
        this.width = this.state.length;
    }

    spin_piece(direction: number){
        if (direction == -1){
            if (this.array > 0){
                this.array += direction;
                this.state = this.states[this.array];
                this.width = this.state.length;
                return 1;
            }
            this.array = 3
            this.state = this.states[this.array];
            this.width = this.state.length;
            return 1;
        }

        if (this.array < 3){
            this.array += direction;
            this.state = this.states[this.array];
            this.width = this.state.length;
            return 1;
        }
        this.array = 0
        this.state = this.states[this.array];
        this.width = this.state.length;
        return 1;
    }

}

function shuffle(array: piece[]) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
}

class bag {
    pieces : piece[];
    constructor (pieces: piece[]){
        this.pieces = shuffle(pieces); 
    }

    generate_new_bag(pieces: piece[]){
        this.pieces = shuffle(pieces);
    }
    take_piece(){
        if (this.pieces.length == 1){
            let buffer = this.pieces[0];
            this.generate_new_bag([I_bag, J_bag, L_bag, O_bag, S_bag, T_bag, Z_bag]);
            return buffer;
        }
        let buffer = this.pieces[0];
        this.pieces = this.pieces.slice(1);
        return buffer;
    }
}

const main_grid = new grid([
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9]]);

const I_states = [
    [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    [        
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0]
    ], 
    [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0]
    ], 
    [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0]
    ]];

const J_states = [
    [
        [2, 0, 0],
        [2, 2, 2],
        [0, 0, 0],
    ],
    [        
        [0, 2, 2],
        [0, 2, 0],
        [0, 2, 0],
    ], 
    [
        [0, 0, 0],
        [2, 2, 2],
        [0, 0, 2],
    ], 
    [
        [0, 2, 0],
        [0, 2, 0],
        [2, 2, 0],
    ]];

const L_states = [
    [
        [0, 0, 3],
        [3, 3, 3],
        [0, 0, 0],
    ],
    [        
        [0, 3, 0],
        [0, 3, 0],
        [0, 3, 3],
    ], 
    [
        [0, 0, 0],
        [3, 3, 3],
        [3, 0, 0],
    ], 
    [
        [3, 3, 0],
        [0, 3, 0],
        [0, 3, 0],
    ]];

const O_states = [
    [
        [0, 4, 4, 0],
        [0, 4, 4, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    [        
        [0, 4, 4, 0],
        [0, 4, 4, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ], 
    [
        [0, 4, 4, 0],
        [0, 4, 4, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ], 
    [
        [0, 4, 4, 0],
        [0, 4, 4, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]];

const S_states = [
    [
        [0, 5, 5],
        [5, 5, 0],
        [0, 0, 0],
    ],
    [        
        [0, 5, 0],
        [0, 5, 5],
        [0, 0, 5],
    ], 
    [
        [0, 0, 0],
        [0, 5, 5],
        [5, 5, 0],
    ], 
    [
        [5, 0, 0],
        [5, 5, 0],
        [0, 5, 0],
    ]];

const T_states = [
    [
        [0, 6, 0],
        [6, 6, 6],
        [0, 0, 0],
    ],
    [        
        [0, 6, 0],
        [0, 6, 6],
        [0, 6, 0],
    ], 
    [
        [0, 0, 0],
        [6, 6, 6],
        [0, 6, 0],
    ], 
    [
        [0, 6, 0],
        [6, 6, 0],
        [0, 6, 0],
    ]];

const Z_states = [
    [
        [7, 7, 0],
        [0, 7, 7],
        [0, 0, 0],
    ],
    [        
        [0, 0, 7],
        [0, 7, 7],
        [0, 7, 0],
    ], 
    [
        [0, 0, 0],
        [7, 7, 0],
        [0, 7, 7],
    ], 
    [
        [0, 7, 0],
        [7, 7, 0],
        [7, 0, 0],
    ]];

const I_bag = new piece(I_states);
const J_bag = new piece(J_states);
const L_bag = new piece(L_states);
const O_bag = new piece(O_states);
const S_bag = new piece(S_states);
const T_bag = new piece(T_states);
const Z_bag = new piece(Z_states);