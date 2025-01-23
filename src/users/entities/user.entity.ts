import { Customer } from "../../customers/entities/customer.entity";
import { Role } from "../../common/enums/user-role.enum";
import { Shelter } from "../../shelters/entities/shelter.entity";
import { Vet } from "../../vets/entities/vet.entity";
import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, UpdateDateColumn } from "typeorm";
import { Pet } from "../../pets/entities/pet.entity";

@Entity()
export class User {
    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    userName: string;

    @Column({unique: true})
    email: string;
    
    @Column({type: 'enum', enum: Role})
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

    @OneToMany(() => Pet, pet => pet.user)
    pets: Pet[];
}
