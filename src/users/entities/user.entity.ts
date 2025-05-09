import { Customer } from "@/customers/entities/customer.entity";
import { Pet } from "@/pets/entities/pet.entity";
import { Role } from "@/shared/enums/role.enum";
import { Shelter } from "@/shelters/entities/shelter.entity";
import { Vet } from "@/vets/entities/vet.entity";
import { Column, CreateDateColumn, Entity, OneToOne, UpdateDateColumn, OneToMany } from "typeorm";


@Entity()
export class User {
    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    userName: string;

    @Column({ unique: true })
    email: string;

    @Column({ type: 'enum', enum: Role })
    role: Role;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(() => Customer, (customer) => customer.user, { cascade: true, onDelete: 'CASCADE' })
    customer?: Customer;

    @OneToOne(() => Vet, (Vet) => Vet.user, { cascade: true, onDelete: 'CASCADE' })
    vet?: Vet;

    @OneToOne(() => Shelter, (Shelter) => Shelter.user, { cascade: true, onDelete: 'CASCADE' })
    shelter?: Shelter;

    @OneToMany(() => Pet, pet => pet.user, { cascade: true, onDelete: 'CASCADE' })
    pets: Pet[];
}
