import { NestFactory } from "@nestjs/core";
import { Transport } from "@nestjs/microservices";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ApplicationModule } from "./app.module";
import * as dotenv from "dotenv";

dotenv.config();

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.enableCors();
  app.connectMicroservice({
    transport: Transport.TCP,
    options: { retryAttempts: 5, retryDelay: 3000 },
  });

  const options = new DocumentBuilder()
    .setTitle("Hondana API")
    .setDescription("The Hondana API")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api/v1/docs", app, document);

  await app.startAllMicroservicesAsync();
  await app.listen(Number(process.env.PORT) || 3001);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
