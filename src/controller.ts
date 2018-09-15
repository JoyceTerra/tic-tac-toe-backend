import { JsonController, Get, Param } from 'routing-controllers'
import Game from './entity'
// import defaultBoard from './lib'


@JsonController()
export default class GameContoller {

    @Get('/game/:id')
    getGame(
        @Param('id') id: number
    ) {
        return Game.findOne(id)
    }
    // @Get('/games')
    // async getAllGames(){
    //     const games = await Game.find()
    //     return { games }
    // }
    // @Put('/users/:id')
    // async updateUser(
    //     @Param('id')id: number,
    //     @Body() update: Partial<User>
    // ) {
    //     const user = await User.findOne(id)
    //     if(!user) throw new NotFoundError('Cannot find user')
    //     return User.merge(user, update).save()
    // }
    // @Post('/users')
    // async createUser(
    //   @Body() user: User
    // ) {
    //   const {password, ...rest} = user
    //   const entity = User.create(rest)
    //   await entity.setPassword(password)
    //   return entity.save()
    // }
    
}