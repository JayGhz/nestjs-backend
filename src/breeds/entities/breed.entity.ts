import { Specie } from 'src/shared/enums/specie.enum';
import { Entity, Column } from 'typeorm';

@Entity()
export class Breed {
    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ type: 'enum', enum: Specie })
    species: Specie;
}
