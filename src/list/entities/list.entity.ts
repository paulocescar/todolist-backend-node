import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('lists')
export class ListEntity {
    @PrimaryGeneratedColumn()
    id: BigInt;

    @Column()
    description: string;

    @Column()
    status: boolean;

    @DeleteDateColumn({ nullable: true, type: "timestamp", default: null, select: false })
    public deleted_at: Date;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", select: false })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)", select: false })
    public updated_at: Date;
}

