import { Controller, Get, Response, HttpStatus } from "@nestjs/common";
import { ClientProxy, Client, Transport } from "@nestjs/microservices";

@Controller()
export class HomeController {
  @Client({ transport: Transport.TCP })
  client: ClientProxy;

  @Get()
  call(@Response() res) {
    const apiUrl = `http://localhost:${process.env.PORT}/api/v1/docs`;
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "Hello welcome on the Hondana API!",
      docs: apiUrl,
    });
  }
  /*
  @Get("/dev")
  async initializeDatabase(@Response() res, @Query() query) {
    if (query.init && process.env.NODE_ENV === "development") {
      await this.userService.initializeUsers();
      await this.authorService.initializeAuthors();

      const users = await this.userService.findAll();
      const authors = await this.authorService.findAll();
      // init books
      const books: Book[] = booksMockup.map((book, i) => {
        if (i <= 1) {
          book.authors.push(authors[0]._id);
        } else {
          book.authors.push(authors[1]._id);
        }
        return book;
      });
      await this.bookService.initializeBooks(books);
      // init bookcase
      users.forEach(async user => {
        const bookcase: Bookcase = {
          owner: user._id,
          books:
            user.pseudo === "test"
              ? [{ bookId: books[0]._id, isAvailable: true }]
              : [{ bookId: books[2]._id, isAvailable: true }],
        };

        await this.bookcaseService.initializeBookcases(bookcase);
      });

      res.status(HttpStatus.CREATED).json({
        status: HttpStatus.CREATED,
        message: "Database successfully initialized!",
      });
    } else if (query.clean && process.env.NODE_ENV === "development") {
      await this.userService.cleanUsers();
      await this.authorService.cleanAuthors();
      await this.bookService.cleanBooks();
      await this.bookcaseService.cleanBookcase();

      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: "Database successfully cleaned!",
      });
    } else {
      res.status(HttpStatus.NOT_ACCEPTABLE).json({
        status: HttpStatus.NOT_ACCEPTABLE,
        message: "Database not initialized!",
      });
    }
  }*/
}
