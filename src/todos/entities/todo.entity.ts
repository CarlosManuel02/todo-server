import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({
  name: "ToDos"
})
export class Todo {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid", {
    nullable: false
  })
  user_id: string;

  @Column("varchar", {
    nullable: false
  })
  title: string;

  @Column("text", {
    nullable: true
  })
  description: string;

  @Column("boolean", {
    nullable: false
  })
  done: boolean;

  @Column("timestamp", {
    nullable: true
  })
  createdAt: Date;

  @Column("timestamp", {
    nullable: true
  })
  updatedAt?: Date;

  @Column("timestamp", {
    nullable: true
  })
  deletedAt?: Date;

}
