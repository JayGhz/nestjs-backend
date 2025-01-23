import { User } from "../../users/entities/user.entity";
import { Race } from "../../common/enums/pet-race.enum";
import { Specie } from "../../common/enums/pet-specie.enum";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class Pet {
    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    name: string;

    @Column()
    age: number;

    @Column({ type: 'enum', enum: Race })
    race: Race

    @Column({ type: 'enum', enum: Specie })
    specie: Specie

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User;

}
