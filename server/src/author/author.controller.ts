import {
  Controller,
  Get,
  HttpStatus,
  Response,
  Post,
  Body,
  Param,
  Query,
  Put,
} from "@nestjs/common";
import { AuthorService } from "./author.service";
import { Author } from "./interfaces/author.interface";

@Controller("authors")
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  async createAuthor(@Response() res, @Body() body) {
    if (body) {
      const author: Author = {
        name: body.name,
        biography: body.biography,
        profileImageUrl: body.profileImageUrl,
      };
      await this.authorService.createAuthor(author);
      res.status(HttpStatus.CREATED).json(author);
    } else {
      res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        message: "Please renseign the body!",
      });
    }
  }

  @Get()
  async getAllAuthors(@Response() res, @Query() query): Promise<any> {
    const authors = await this.authorService.findAll(query);
    res.status(HttpStatus.OK).json(authors);
  }

  @Get(":id")
  async getAuthorById(@Response() res, @Param() param): Promise<any> {
    const author = await this.authorService.findById(param.id);
    res.status(HttpStatus.OK).json(author);
  }

  @Put(":id")
  async editAuthor(@Response() res, @Param() param, @Body() body) {
    if (body) {
      const POSSIBLE_KEYS = ["name", "biography", "profileImageUrl"];
      let queryArgs = {};

      Object.keys(body).forEach(key => {
        if (~POSSIBLE_KEYS.indexOf(key)) {
          queryArgs[key] = body[key];
        }
      });

      if (!queryArgs) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          status: HttpStatus.BAD_REQUEST,
          message: "Please renseign valid parameters!",
        });
      }

      await this.authorService.editAuthor(param.id, queryArgs);
      res
        .status(HttpStatus.OK)
        .json({ status: HttpStatus.OK, message: "Author edited!" });
    } else {
      res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        message: "Please renseign the body!",
      });
    }
  }
}
