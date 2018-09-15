import { JsonController, Get, Param, Post, HttpCode, BodyParam, Put, BadRequestError, Body } from 'routing-controllers'
import Game from './entity'
import { getRandomColor, defaultBoard } from "./lib"


@JsonController()
export default class GameContoller {

   
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
    async updateGame(
        @Param('id')id: number,
        @Body() update: Partial<Game>
    ) {
        const game = await Game.findOne(id)
        if(!game) throw new BadRequestError('You can only make one move per time!')
        return Game.merge(game, update).save()
    }
    




    // @Patch('/game/:id')
    // async updateGame(
    //     @Param('id') id: number,

    // )

    // @Put('/game/:id')
    // async updateGame(
    //     @Param('id')id: number,
    //     @Body() update: Partial<User>
    // ) {
    //     const user = await User.findOne(id)
    //     if(!user) throw new NotFoundError('Cannot find user')
    //     return User.merge(user, update).save()
    // }
    
}

//PUT = replace the ENTIRE RESOURCE with the new representation provided
//and
// PATCH = replace parts of the source resource with the values provided 
// AND|OR other parts of the resource are updated that you havent provided (timestamps) 
// AND|OR updating the resource effects other resources (relationships)

