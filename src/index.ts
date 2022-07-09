const canvas = <HTMLCanvasElement> document.getElementById('tetris');
const ctx = canvas.getContext('2d')!;
ctx.strokeStyle = ('black');
const surface = <HTMLCanvasElement> document.getElementById('tetris')!;
//generates bag and player
const pieces = [I_bag, J_bag, L_bag, O_bag, S_bag, T_bag, Z_bag];
const game_bag = new bag(pieces);
const P1 = new player(game_bag.take_piece());
let input_grid = new grid(structuredClone(main_grid.array));
let ghost_grid = new grid(structuredClone(main_grid.array));
let offsets = get_wall_offset();

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
            if (1 < P1.x + offsets[0])
            {
                P1.x -= 1;
            }
            old_time_input = Date.now();
            break;
        case 'ArrowRight':
            event.preventDefault();
            if (P1.x + offsets[1] < 10)
            {
                P1.x += 1;
            }
            old_time_input = Date.now();
            break;
        case 'ArrowDown':
            event.preventDefault();
            drop_constraint = 0.1;
            break;
        case ' ':
            event.preventDefault();
            main_grid.hard_drop(P1.curr_piece, P1.x, 22, P1.y);
            input_grid.array = structuredClone(main_grid.array);
            P1.new_piece(game_bag.take_piece());
            offsets = get_wall_offset();
            old_time_input = Date.now();
            break;
        case 'z':
            P1.curr_piece.spin_piece(-1);
            offsets = get_wall_offset();
            old_time_input = Date.now();
            break;
        case 'x':
            P1.curr_piece.spin_piece(1);
            offsets = get_wall_offset();
            old_time_input = Date.now();
            break;
        case 'C':
            //hold
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
    ghost_grid.hard_drop(P1.curr_piece, P1.x, 22, P1.y);
    curr_time = (Date.now() - old_time)/1000;
    curr_time_input = (Date.now() - old_time_input)/1000;
    if (curr_time > drop_constraint){
        if ((input_grid.drop(P1.curr_piece, P1.x, P1.y)) && (curr_time_input < 1)){
            draw();
            window.requestAnimationFrame(loop);
            return false;
        }
        console.log(1)
        if(main_grid.drop(P1.curr_piece, P1.x, P1.y)){
            P1.new_piece(game_bag.take_piece());
            draw();
            window.requestAnimationFrame(loop);
            offsets = get_wall_offset();
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