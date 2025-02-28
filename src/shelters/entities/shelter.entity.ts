import { User } from "../../users/entities/user.entity";
import { Entity, JoinColumn, OneToOne } from "typeorm";
import { Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Shelter {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    shelterName: string;

    @Column()
    location: string;

    @Column()
    capacityAnimals: number;

    @Column({ unique: true })
    ruc: string;

    @OneToOne(() => User, (user) => user.shelter)
    @JoinColumn()
    user: User;
}
