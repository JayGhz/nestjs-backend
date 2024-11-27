import { Column, Entity } from "typeorm";

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
}
