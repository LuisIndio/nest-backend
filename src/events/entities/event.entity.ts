import { User } from "src/users/entities/user.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToMany } from "typeorm";

@Entity()
export class Event {
    @Column({ primary: true, generated: true})
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    date: Date;

    @Column()
    filename: string;

    @DeleteDateColumn()
    deletedAt?: Date;

    @ManyToMany(() => User,(user) => user.events)
    users: User[];

    @Column()
    userId: number;
}
