import { Column, Entity } from "typeorm";

@Entity()
export class Pet {
    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    name: string;

    @Column()
    age: number;

    @Column()
    race: string; // Convert to enum

    @Column()
    specie: string; // Convert to enum

}
