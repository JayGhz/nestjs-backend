import { Race } from "src/common/enums/pet-race.enum";
import { Specie } from "src/common/enums/pet-specie.enum";
import { Column, Entity } from "typeorm";

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

}
