import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, Length, IsJSON } from 'class-validator';

@Entity()
export default class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Length(5, 25)
  @Column('text', {nullable:false})
  name: string

  @IsString()
  @Column('text', {nullable:true})
  color: string

@IsJSON()
@Column('json', {nullable:true})
board: { }
}