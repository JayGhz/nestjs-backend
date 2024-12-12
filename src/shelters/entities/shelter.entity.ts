import { User } from "src/users/entities/user.entity";
import { Entity, OneToOne } from "typeorm";
import { Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Shelter {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    location: string;

    @Column()
    capacity: number;

    @OneToOne(() => User, (user) => user.shelter)
    user: User;
}
