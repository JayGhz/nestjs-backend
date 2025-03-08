import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Breed } from '../../breeds/entities/breed.entity';

@Entity()
export class Pet {
    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    name: string;

    @Column()
    age: number;

    @Column()
    weight: number;

    @ManyToOne(() => User, user => user.pets)
    user: User;

    @ManyToOne(() => Breed, breed => breed.pets)
    breed: Breed;
}
