import { Especialty } from "src/common/enums/vet-especialty.enum";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity()
export class Vet {
    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    phoneNumber: string;

    @Column()
    institution: string;

    @Column({ type: 'enum', enum: Especialty })
    especialty: Especialty;

    @Column({ unique: true })
    licensNumber: string;

    @OneToOne(() => User, (user) => user.vet)
    @JoinColumn()
    user: User;
}
