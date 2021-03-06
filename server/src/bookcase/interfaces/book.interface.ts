import { Meta } from "./meta.interface";
import { Comment } from "./comment.interface";

export class Book {
  public _id?: string;
  public isbn10: string;
  public isbn13?: string;
  public title: string;
  public authors: string[];
  public bookcases: string[];
  public description: string;
  public coverImageUrl: string;
  public categories: string[];
  public releaseAt?: Date;
  public comments?: Comment[];
  public meta?: Meta;
  public hidden?: Boolean;
}
