import { Column, CreateDateColumn, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

class Rental {
    @PrimaryColumn()
    id: string;

    @Column()
    car_id: string;

    @Column()
    user_id: string;

    @CreateDateColumn()
    start_date: Date;

    @CreateDateColumn()
    end_date: Date;

    @CreateDateColumn()
    expected_return_date: Date;

    @Column()
    total: number;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { Rental };
