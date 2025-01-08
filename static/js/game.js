let currentImage = null;
let currentPos  = null;
let temp_x, temp_y, change_x, change_y = 0;

// determines when you've solved the puzzle
function checkProgress () {
    let next  = 0;
    let index = -1;
    let isComplete = 0;
    
    for (let i=0; i<25; i++) {
       if ((i%5)+1 == 5) {
           next = 0;
       }
       if(i%5==0){
            index += 1;
        }
        if (sprites_grid[index][i%5] < sprites_grid[index][next]) {
            isComplete += 1;
        }
    }
    if (isComplete == 25) {
        return true;
    } else {
        return false;
    }
}

//handle mousedown event
function mouseDown(e) {
    let rect = canvas.getBoundingClientRect();
    let x    = e.clientX-rect.left;
    let y    = e.clientY-rect.top;
    // convert coordinates to grid coordinates
    temp_x = Math.floor(x/(90+2));
    temp_y = Math.floor(y/(90+2));
    getImage(temp_y, temp_x); //sets current image
    //console.log(`grid_x: ${temp_x}, grid_y: ${temp_y}`);
    currentPos = sprites_grid[temp_y][temp_x];
    //console.log(`current [temp_x][temp_y]: ${currentPos}`);
    //console.log(`x: ${x}, y: ${y}`);
}

function getImage(x, y) {
    if (currentImage === null) {
        currentImage = sprites[x][y];
    }
}

// handle mouse up event
function mouseUp(e) {
    let rect = canvas.getBoundingClientRect();
    let x    = e.clientX-rect.left;
    let y    = e.clientY-rect.top;
    change_x = Math.floor(x/(90+2));
    change_y = Math.floor(y/(90+2));
    //console.log(`change_x: ${change_x}, change_y: ${change_y}`);    
    //console.log(`current [change_x][change_y]: ${sprites_grid[change_x][change_y]}`);
    let error = null;
    //console.log(`x: ${x}, y: ${y}`);
    return new Promise((resolve, reject) => {
        swapImage(temp_x, temp_y, change_x, change_y);
        console.log(`current [temp_x][temp_y]: ${sprites_grid[temp_x][temp_y]}`);
        console.log(`current [change_x][change_y]: ${sprites_grid[change_x][change_y]}`);
        console.log(`x: ${x}, y: ${y}`);
    
        currentImage = null; //reset currentImage
        temp_x, temp_y, change_x, change_y = 0; //reset all changes
        if (checkProgress()) {
            image_index += 1;
            image_index %= image_path.length;
            showAlert();
            window.location.reload();
        }
        resolve(); // Resolve the promise when done
        error = reject;
    })
}

function swapImage(x, y, dx, dy) {
    if (x > 0 && dx == x-1 && dy == y) {
       //swap image  left
       sprites_grid[y][x] = sprites_grid[dy][dx];
       sprites_grid[dy][dx] = currentPos;
       //console.log(`[x][y] :${sprites_grid[x][y]} [dx][dy]: ${sprites_grid[dx][dy]}`);
       sprites[y][x] = sprites[dy][dx];
       sprites[dy][dx] = currentImage;
    } else if (x >= 0 && dx == x+1 && dy == y) {
       // swap grid position
       sprites_grid[y][x] = sprites_grid[dy][dx];
       sprites_grid[dy][dx] = currentPos;
    
        //swap image right
       sprites[y][x] = sprites[dy][dx];
       sprites[dy][dx] = currentImage;
    } else if (y > 0 && dy == y-1 && dx == x) {
       sprites_grid[y][x] = sprites_grid[dy][dx];
       sprites_grid[dy][dx] = currentPos;
    
        //swap image upwards
        sprites[y][x] = sprites[dy][dx];
        sprites[dy][dx] = currentImage;
    } else if(y >= 0 && dy == y+1 && dx == x) {
       sprites_grid[y][x] = sprites_grid[dy][dx];
       sprites_grid[dy][dx] = currentPos;
    
        //swap image downwards
       sprites[y][x] = sprites[dy][dx];
       sprites[dy][dx] = currentImage;
    }
    // here comes the update
    if (y == dy && dx > x || x > dx) {
        // horizontal update
       updatePortionOfScreen(x, y, 'h');        
    } else {
        // vertical update
       updatePortionOfScreen(x, y, 'v');
    }
}

//handles and update portions of the screen
function updatePortionOfScreen(grid_x, grid_y, direction) {
    let x = 0, y = 0, dx = 0, dy = 0;
    //horizontal update
    if (direction === 'h') {
        y = grid_y*90;
        dy = (grid_y*2);
        for (let i=0; i<5; i++) {
            ctx.putImageData(sprites[grid_y][i], x+dx, y+dy);         
            x += width; // already defined width in the html script
            dx += 2;
        }
    } else {
        // vertical update
        //console.log("Vertical update logs");
        x  = grid_x*90;
        dx = (grid_x*2);
        for (let i=0; i<5; i++) {
            ctx.putImageData(sprites[i][grid_x], x+dx, y+dy);
            //console.log(`grid_x: ${i}, blitted: ${grid_x}`);
            //console.log(`blitted: ${sprites_grid[i][grid_x]}`);            
            y += height;
            dy += 2;
        }
    }
}

function showAlert () {
    console.log('Finished');
}
canvas.addEventListener('mousedown', mouseDown, false);
canvas.addEventListener('mouseup', mouseUp);
