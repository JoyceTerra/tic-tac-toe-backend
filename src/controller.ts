import { JsonController, Get, Param, Post, HttpCode, BodyParam } from 'routing-controllers'
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
      @BodyParam('name') name: string
    ) {
        const newGame = new Game()
        newGame.name = name
        newGame.color = getRandomColor()
        newGame.board = defaultBoard
       
      return newGame.save()
    }
       // @Put('/users/:id')
    // async updateUser(
    //     @Param('id')id: number,
    //     @Body() update: Partial<User>
    // ) {
    //     const user = await User.findOne(id)
    //     if(!user) throw new NotFoundError('Cannot find user')
    //     return User.merge(user, update).save()
    // }
    
}