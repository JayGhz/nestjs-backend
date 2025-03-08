import { Pet } from '../../pets/entities/pet.entity';
import { Specie } from '../../shared/enums/specie.enum';
import { Entity, Column, OneToMany } from 'typeorm';

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

    @OneToMany(() => Pet, pet => pet.breed)
    pets: Pet[];
}
