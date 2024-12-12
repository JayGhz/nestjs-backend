import { Customer } from "src/customers/entities/customer.entity";
import { Shelter } from "src/shelters/entities/shelter.entity";
import { Vet } from "src/vets/entities/vet.entity";
import { Column, Entity, OneToOne } from "typeorm";

@Entity()
export class User {
    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    userName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToOne(() => Customer, (customer) => customer.user, { cascade: true })
    customer: Customer;

    @OneToOne(() => Vet, (Vet) => Vet.user, { cascade: true })
    vet: Vet;

    @OneToOne(() => Shelter, (Shelter) => Shelter.user, { cascade: true })
    shelter: Shelter;
}
