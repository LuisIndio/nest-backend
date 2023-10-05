import { Column, Entity } from "typeorm";

@Entity()
export class Image {
    
    @Column({ primary: true, generated: true})
    id: number;

    @Column()
    filename: string;
}
