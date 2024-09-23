import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { User } from "../user/user.model";

@Entity()
export class Link {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255 })
  originalUrl: string;

  @Column({ type: "varchar", length: 8 })
  shortenedUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  // Relacionamento muitos-para-um
  @ManyToOne(() => User, (user) => user.links, { onDelete: "CASCADE" })
  user: User;
}
