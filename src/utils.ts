const piece_size = 25;

const get_wall_offset = () => {
    let bigger_x = -1;
    let minor_x = 99;
    for (let row = 0; row < P1.curr_piece.state.length; row++){
        for (let colunm = 0; colunm < P1.curr_piece.state[0].length; colunm++){
            if (P1.curr_piece.state[row][colunm] > 0) {
                if (colunm > bigger_x){
                    bigger_x = colunm;
                }
                if (colunm < minor_x){
                    minor_x = colunm;
                }
            }
        }
    }
    return [minor_x, bigger_x];
}

const colors = (piece_color: number) => {
            switch (piece_color){
                case 1:
                    ctx.fillStyle = ('#f7b57e');
                    ctx.strokeStyle = ('black');
                    break;
                case 2:
                    ctx.fillStyle = ('#e38f9c');
                    ctx.strokeStyle = ('black');
                    break;
                case 3:
                    ctx.fillStyle = ('#5d7591');
                    ctx.strokeStyle = ('black');
                    break;
                case 4:
                    ctx.fillStyle = ('#3b7557');
                    ctx.strokeStyle = ('black');
                    break;
                case 5:
                    ctx.fillStyle = ('#2e2e2d');
                    ctx.strokeStyle = ('black');
                    break;
                case 6:
                    ctx.fillStyle = ('#521341');
                    ctx.strokeStyle = ('black');
                    break;
                case 6:
                    ctx.fillStyle = ('#19734f');
                    ctx.strokeStyle = ('black');
                    break;
                case 7:
                    ctx.fillStyle = ('#2e361b');
                    ctx.strokeStyle = ('black');
                    break;
                case 9:
                    ctx.fillStyle = ('#1a1817');
                    ctx.strokeStyle = ('black');
                    break;
            }
}
const draw = () => {
    ctx.clearRect(0, 0, surface.width, surface.height);
    //render grid
    for (let i = 0; i < 22; i++){
        for (let j = 0; j < 12; j++){
            if (main_grid.array[i][j] > 0){
                colors(main_grid.array[i][j]);
                ctx.fillRect(j * (piece_size+1), i * (piece_size+1), piece_size, piece_size);
                ctx.strokeRect(j * (piece_size+1), i * (piece_size+1), piece_size, piece_size);
            }
            if (ghost_grid.array[i][j] > 0){
                colors(ghost_grid.array[i][j]);
                ctx.fillRect(j * (piece_size+1), i * (piece_size+1), piece_size, piece_size);
                ctx.strokeRect(j * (piece_size+1), i * (piece_size+1), piece_size, piece_size);
            }
        }
    }

    //render current piece
    for (let i = 0; i < P1.curr_piece.state.length; i++){
        for (let j = 0; j < P1.curr_piece.state[0].length; j++){
            if (P1.curr_piece.state[i][j] > 0){
                colors(P1.curr_piece.state[i][j]);
                ctx.fillRect((P1.x * (piece_size+1)-(piece_size+1)) + j * (piece_size+1)+(piece_size+1), ((P1.y) * (piece_size + 1) + i * (piece_size+1))-piece_size, piece_size, piece_size);
                ctx.strokeRect((P1.x * (piece_size+1)-(piece_size+1)) + j * (piece_size+1)+(piece_size+1), ((P1.y) * (piece_size + 1) + i * (piece_size+1))-piece_size, piece_size, piece_size);
            }
        }
    }

    //render bag
    for (let p = 0; p < game_bag.pieces.length; p++){
        for (let i = 0; i < game_bag.pieces[p].state.length; i++){
            for (let j = 0; j < game_bag.pieces[p].state[0].length; j++){
                if (game_bag.pieces[p].state[i][j] > 0){
                    colors(game_bag.pieces[p].state[i][j]);
                    ctx.fillRect(360 + j * (piece_size+1), p * 90 + i * (piece_size+1)+(piece_size+1), piece_size, piece_size);
                    ctx.strokeRect(360 + j * (piece_size+1), p * 90 + i * (piece_size+1)+(piece_size+1), piece_size, piece_size);
                }
            }
        }
    }
    ctx.font = "30px Arial";
    ctx.fillText(((input_grid.drop(P1.curr_piece, P1.x, P1.y)) && (curr_time_input < 1)) +"\n " + curr_time_input, 50, 50); 
}