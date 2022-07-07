import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { FinancialLedgerInterceptor } from './financial-ledger/interceptor/financial-ledger.interceptor';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(3000);
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: true }));
  app.useGlobalInterceptors(new FinancialLedgerInterceptor());

  const config = new DocumentBuilder()
    .setTitle('PayHere Task')
    .setDescription('by 3rd-wanted-pre-onboarding-team-D')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
