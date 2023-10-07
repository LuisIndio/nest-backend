import { Event } from "src/events/entities/event.entity";
import { Role } from "../../Common/enums/rol.enum";
import { Column, DeleteDateColumn, Entity, JoinTable, ManyToMany } from "typeorm";

@Entity()
export class User {

    @Column({ primary: true, generated: true})
    id: number;

    @Column()
    name?: string;

    @Column({ unique: true,nullable: false})
    email: string;

    @Column({ nullable: false, select: false})
    password?: string;

    @Column({ type:'enum',default: Role.USER,enum: Role})
    role?: Role;

    @ManyToMany(() => Event,(event) => event.users,{ cascade: true, eager: true, nullable: true, onUpdate: 'CASCADE', onDelete: 'CASCADE'})
    @JoinTable({
        name: 'user_events',
        joinColumn: { name: 'userId',referencedColumnName: 'id'},
        inverseJoinColumn: { name: 'eventId',referencedColumnName: 'id'}
    })
    events?: Event[];

    @DeleteDateColumn()
    deletedAt?: Date;
}
