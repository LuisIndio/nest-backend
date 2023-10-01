import { User } from "src/users/entities/user.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToMany } from "typeorm";

@Entity()
export class Event {
    @Column({ primary: true, generated: true})
    id: number;

    @Column()
    name: string;

    @DeleteDateColumn()
    deletedAt?: Date;

    @ManyToMany(() => User)
    @JoinColumn({ name: 'userId',referencedColumnName: 'id'})
    user: User;

    @Column()
    userId: number;
}