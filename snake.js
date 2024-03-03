//####################
//###### CLASSES #####
//####################
class Grid {
    constructor(game, positionX, positionY, width, height, unitsAmountX, unitsAmounty) {
        //Game reference
        this.game = game
        //Grid position relative to Game position in context
        this.positionX = positionX + this.game.x
        this.positionY = positionY + this.game.y
        this.width = width
        this.height = height
        //Grid boxes
        this.elements = []
        //Grid boxes contruction
        this.unitsAmountX = unitsAmountX
        this.unitsAmountY = unitsAmounty
        this.unitSizeX = this.width / this.unitsAmountX
        this.unitSizeY = this.height / this.unitsAmountY
        //Box data
        for (let i = 0; i < this.unitsAmountX; i++) {
            this.elements[i] = []
            for (let j = 0; j < this.unitsAmountY; j++) {
                this.elements[i][j] = {
                    x: i * this.unitSizeX + this.positionX,
                    y: j * this.unitSizeY + this.positionY,
                    width: this.unitSizeX,
                    height: this.unitSizeY,
                    color: "white"
                }
            }
        }
    }
    draw(context) {
        //Elements (Boxes) draw
        this.elements.forEach(i => {
            i.forEach(j => {
                context.save()

                context.strokeRect(j.x, j.y, j.width, j.height)
                context.fillStyle = j.color
                context.fillRect(j.x, j.y, j.width, j.height)

                context.restore()
            })
        })
    }
    toIsometric(context) {
        context.translate(this.game.x + this.width / 2, this.game.y)
        context.scale(0.75, 0.5);
        context.rotate(45 * Math.PI /180)
    }
}
class Player {
    constructor(game, grid, x, y) {
        this.game = game
        this.grid = grid

        this.head = this.grid.elements[x][y]
        this.head["color"] = "black"
    }
}
class Game {
    constructor(x, y, width, height) {
        //Game position in canvas
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        //Game Keys to interact(Player)
        this.keys = []
        window.addEventListener('keydown', (e) => {
            if(e.key == 'ArrowUp' || e.key == 'ArrowRight' || e.key == 'ArrowDown' || e.key == 'ArrowLeft') {
                if (this.keys.indexOf(e.key) == -1)
                    this.keys.push(e.key)
            }   
        })
        
        window.addEventListener('keyup', (e) => {
            console.log("keyup", e.key)
            if(e.key == 'ArrowUp' || e.key == 'ArrowRight' || e.key == 'ArrowDown' || e.key == 'ArrowLeft') {
                if (this.keys.indexOf(e.key) != -1)
                    this.keys.splice(this.keys.indexOf(e.key), 1)
            }
        })
        //Game Components
        this.grid = new Grid(this, this.x, this.y, this.width, this.height, 11, 11)
        this.player = new Player(this, this.grid, 5, 5)
    }
    draw(context) {
        //this.grid.toIsometric(context)
        this.grid.draw(context)
    }
}
//####################
//##### VAR HTML #####
//####################
const canvas = document.querySelector("#game")
const ctx = canvas.getContext("2d")
canvas.width = 854
canvas.height = 480
//####################
//## GAME INSTANCES ##
//####################
const game = new Game(0, 0, canvas.width / 3, canvas.width / 3)
//Game Time
let lastTime = 0
//Game Loop
const animate = (timeStamp) => {
    const deltaTime = timeStamp - lastTime
    lastTime = timeStamp

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    requestAnimationFrame(animate)

    game.draw(ctx);
    console.log(game.keys)
}
//####################
//######## RUN #######
//####################
animate(0)