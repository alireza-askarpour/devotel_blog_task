import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  post_id: string

  @Column()
  title: string

  @Column()
  content: string

  @Column({ nullable: true })
  image: string
}
