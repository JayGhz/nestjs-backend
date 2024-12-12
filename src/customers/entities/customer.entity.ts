import { User } from "src/users/entities/user.entity";
import { Column, Entity, OneToOne } from "typeorm";

@Entity()
export class Customer {
    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    phoneNumber: string;

    @OneToOne(() => User, (user) => user.customer)
    user: User;
}
