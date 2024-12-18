import { Post } from 'src/post/post.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 26, nullable: true })
  firstName: string;

  @Column('varchar', { length: 26, nullable: true })
  lastName: string;

  @Column('varchar', { unique: true, nullable: false })
  email: string;

  @Column('varchar', { length: 26, nullable: true })
  password: string;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  // @Column({ default: false })
  // isActive: boolean;
}