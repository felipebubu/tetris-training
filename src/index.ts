const canvas = <HTMLCanvasElement> document.getElementById('tetris');
const ctx = canvas.getContext('2d')!;
ctx.strokeStyle = ('black');
const surface = <HTMLCanvasElement> document.getElementById('tetris')!;

//generates bag and player
let pieces = [I_bag, J_bag, L_bag, O_bag, S_bag, T_bag, Z_bag];
let game_bag = new bag(pieces);
let P1 = new player(game_bag.take_piece());
let input_grid = new grid(structuredClone(main_grid.array));
let ghost_grid = new grid(structuredClone(main_grid.array));
let drop_grid = new grid(structuredClone(main_grid.array))


let old_time = Date.now();
let curr_time = Date.now();

let old_time_input = Date.now();
let curr_time_input = Date.now();

let drop_constraint = 1;

//input handling
document.addEventListener('keydown', function(event) {
    switch(event.key){
        case 'ArrowLeft':
            event.preventDefault();
            if (P1.curr_piece.mov_check(P1, main_grid, 1)){
                P1.x -= 1;
            }
            old_time_input = Date.now();
            break;
        case 'ArrowRight':
            event.preventDefault();
            if (P1.curr_piece.mov_check(P1, main_grid, 0)){
                P1.x += 1;
            }
            old_time_input = Date.now();
            break;
        case 'ArrowDown':
            event.preventDefault();
            drop_constraint = 0.1;
            old_time_input = Date.now();
            break;
        case ' ':
            event.preventDefault();

            let tspin_bool = P1.curr_piece.tspin_check(P1, main_grid);
            main_grid.hard_drop(P1.curr_piece, P1.x, 28, P1.y);
            main_grid.line_clear(tspin_bool);
            main_grid.game_over();

            drop_grid.array = structuredClone(main_grid.array);
            input_grid.array = structuredClone(main_grid.array);
            P1.new_piece(game_bag.take_piece());
            old_time_input = Date.now();
            break;
        case 'z' || 'Z':
            P1.curr_piece.spin_piece(-1, main_grid, P1);
            old_time_input = Date.now();
            break;
        case 'x' || 'X':
            P1.curr_piece.spin_piece(1, main_grid, P1);
            old_time_input = Date.now();
            break;
        case 'c' || 'C':
            P1.hold_bag(game_bag, P1.curr_piece);
            break;
    }
});

document.body.addEventListener('keyup', (event) => {
    switch(event.key){
        case 'ArrowDown':
            event.preventDefault();
            drop_constraint = 1;
            break;
    }
  });
function loop() {
    input_grid.array = structuredClone(main_grid.array);
    ghost_grid.array = structuredClone(main_grid.array);
    
    ghost_grid.hard_drop(P1.curr_piece, P1.x, 28, P1.y);

    curr_time = (Date.now() - old_time)/1000;
    curr_time_input = (Date.now() - old_time_input)/1000;

    if (drop_constraint == 0.1){
        old_time_input = Date.now();
    }
    if (curr_time > drop_constraint){
        if ((input_grid.drop(P1.curr_piece, P1.x, P1.y)) && (curr_time_input < 1)){
            draw();
            window.requestAnimationFrame(loop);
            return false;
        }
        if(drop_grid.drop(P1.curr_piece, P1.x, P1.y)){

            let tspin_bool = P1.curr_piece.tspin_check(P1, main_grid);
            main_grid.hard_drop(P1.curr_piece, P1.x, 28, P1.y);
            main_grid.line_clear(tspin_bool);
            main_grid.game_over();

            P1.new_piece(game_bag.take_piece());
            draw();
            window.requestAnimationFrame(loop);
            old_time = Date.now();
            return;
        }
        P1.y++;
        old_time = Date.now();
    }
    draw();
    window.requestAnimationFrame(loop);
   };
loop();