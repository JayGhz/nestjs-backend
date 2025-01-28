import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Pet {
    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => User, user => user.pets)
    user: User;
}
