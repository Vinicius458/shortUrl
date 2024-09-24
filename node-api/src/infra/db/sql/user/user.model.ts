import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Link } from "../link/link.model";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255 })
  email: string;

  @Column({ type: "varchar", length: 255 })
  password: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  token: string;

  // Relacionamento One-to-Many com a entidade Link
  @OneToMany(() => Link, (link) => link.user)
  links: Link[];
}
