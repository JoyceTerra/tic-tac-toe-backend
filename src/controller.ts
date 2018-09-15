import { JsonController, Get, Param, Post, HttpCode, BodyParam, NotFoundError, Put, BadRequestError, Body } from 'routing-controllers'
import Game from './entity'
import { getRandomColor, defaultBoard, moves, colors } from "./lib"

@JsonController()
export default class GameController {

    @Get('/games')
    async getAllGames(){
        const games = await Game.find()
        return { games }
    }

    //For later: how to request one game by name and not by id?
    // @Get('/game/:name')
    // getGame(
    //     @Param('name') name: string
    // ) {
    //     return Game.findOne(name)
    // }

    @Get('/game/:id') 
    getGame(
        @Param('id') id: number
    ) {
        return Game.findOne(id)
    }
 
    @Post('/games')
    @HttpCode(201)
    async createGame(
      @BodyParam('name') name: string //to make a new whole game, the only thing the user gives is the name
    ) {
        const newGame = new Game() //creates a new game
        newGame.name = name //name goes in the name field
        newGame.color = getRandomColor() //the new game receives a random color
        newGame.board = defaultBoard //also receives the default board(located in lib)
       
      return newGame.save() 
    }

    @Put('/game/:id')
    @HttpCode(200)
    async updateGame(
        @Param('id') id: number,
        @BodyParam('name') name: string,
        @BodyParam('color') color: string,
        @BodyParam('board') board: object,
        @Body() update: Partial<Game>

    ) {
        const game = await Game.findOne(id)

        if(!game) throw new NotFoundError('The game you requested doesn\'t exist :(')

        if(board){
            if (moves(game.board, board) > 1){ //if there is more than one move:
                throw new BadRequestError('You can only make one move per time ;)')
            }else{
                game.board = board //board is new board
            }
        }
            
        if(color){
            if(!colors.includes(color)){
                throw new BadRequestError('We don\'t have this color. You can choose magenta, green, blue, yellow or red :P')
            }
        }

        return Game.merge(game, update).save()
    }    
}

//PUT = replace the ENTIRE RESOURCE with the new representation provided
//and
// PATCH = replace parts of the source resource with the values provided 
// AND|OR other parts of the resource are updated that you havent provided (timestamps) 
// AND|OR updating the resource effects other resources (relationships)

