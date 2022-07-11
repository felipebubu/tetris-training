"use strict";
class player {
    constructor(first_piece) {
        this.x = 0;
        this.y = 0;
        this.hold_count = -1;
        this.x = 4;
        this.y = 1;
        this.curr_piece = new piece(first_piece.states);
        this.held_piece = null;
    }
    new_piece(piece_from_bag) {
        this.x = 4;
        this.y = 1;
        this.curr_piece = new piece(piece_from_bag.states);
        if (this.hold_count == 1) {
            this.hold_count = 0;
        }
    }
    new_hold(piece_from_bag) {
        this.x = 4;
        this.y = 1;
        this.held_piece = new piece(piece_from_bag.states);
        this.hold_count = 0;
    }
    hold_bag(game_bag, curr_piece) {
        if (this.hold_count == -1) {
            this.new_piece(game_bag.take_piece());
            this.new_hold(curr_piece);
            this.hold_count = 1;
        }
        if (this.hold_count == 0) {
            let buffer = this.curr_piece;
            this.new_piece(this.held_piece);
            this.new_hold(buffer);
        }
    }
}
class grid {
    constructor(array) {
        this.array = array;
    }
    hard_drop(piece, x, y, py) {
        //loop through every row and    every colunm of the grid until it meets a piece
        for (let row = py; row < y; row++) {
            let colunm = x;
            for (let p_row = piece.state.length - 1; p_row > -1; p_row--) {
                for (let p_colunm = 0; p_colunm < piece.width; p_colunm++) {
                    if (this.array[row + 1 + p_row][colunm + p_colunm] > 0 && piece.state[p_row][p_colunm] > 0) {
                        //collision happened
                        for (let a_row = 0; a_row < piece.state.length; a_row++) {
                            for (let a_colunm = 0; a_colunm < piece.width; a_colunm++) {
                                if (piece.state[a_row][a_colunm] > 0) {
                                    this.array[row + a_row][colunm + a_colunm] = piece.state[a_row][a_colunm];
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
    drop(piece, x, y) {
        if (this.hard_drop(piece, x, y + 1, y)) {
            return true;
        }
        return false;
    }
}
class piece {
    constructor(states) {
        this.array = 0;
        this.width = 0;
        this.states = states;
        this.state = this.states[this.array];
        this.width = this.state.length;
    }
    spin_piece(direction) {
        if (direction == -1) {
            if (this.array > 0) {
                this.array += direction;
                this.state = this.states[this.array];
                this.width = this.state.length;
                return 1;
            }
            this.array = 3;
            this.state = this.states[this.array];
            this.width = this.state.length;
            return 1;
        }
        if (this.array < 3) {
            this.array += direction;
            this.state = this.states[this.array];
            this.width = this.state.length;
            return 1;
        }
        this.array = 0;
        this.state = this.states[this.array];
        this.width = this.state.length;
        return 1;
    }
}
function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }
    return array;
}
class bag {
    constructor(pieces) {
        this.pieces = shuffle(pieces);
    }
    generate_new_bag(pieces) {
        this.pieces = shuffle(pieces);
    }
    take_piece() {
        if (this.pieces.length == 1) {
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
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9]
]);
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
    ]
];
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
    ]
];
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
    ]
];
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
    ]
];
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
    ]
];
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
    ]
];
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
    ]
];
const I_bag = new piece(I_states);
const J_bag = new piece(J_states);
const L_bag = new piece(L_states);
const O_bag = new piece(O_states);
const S_bag = new piece(S_states);
const T_bag = new piece(T_states);
const Z_bag = new piece(Z_states);
