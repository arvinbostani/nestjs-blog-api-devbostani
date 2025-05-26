HEAD

<div dir="rtl" align="right">

## API Blog

### نمای کلی پروژه

این یک API RESTful قوی و مقیاس‌پذیر برای یک برنامه وبلاگ ساده است که با فناوری‌های مدرن بک‌اند ساخته شده است. این API به کاربران اجازه می‌دهد تا ثبت‌نام کرده، وارد سیستم شوند و پست‌های وبلاگ خود را مدیریت کنند (ایجاد، خواندن، به‌روزرسانی، حذف). این API با در نظر گرفتن بهترین شیوه‌ها، با تمرکز بر معماری تمیز، امنیت و قابلیت نگهداری طراحی شده است.

### ویژگی‌ها

- **احراز هویت و مجوز کاربر:** ثبت‌نام و ورود امن کاربر با استفاده از JWT (JSON Web Tokens) و هش کردن رمز عبور با Bcrypt. مسیرهای محافظت‌شده تضمین می‌کنند که فقط کاربران احراز هویت شده و مجاز می‌توانند عملیات را انجام دهند.
- **مدیریت کاربر:** نقاط پایانی برای بازیابی پروفایل‌های کاربر احراز هویت شده.
- **مدیریت پست وبلاگ (CRUD):** قابلیت کامل ایجاد، خواندن، به‌روزآوری و حذف برای پست‌های وبلاگ. پست‌ها به نویسندگان مربوطه خود مرتبط هستند.
- **مستندات API:** مستندات تعاملی API که به‌طور خودکار با Swagger (OpenAPI) تولید می‌شود، که درک و ادغام API را برای توسعه‌دهندگان فرانت‌اند یا سایر مصرف‌کنندگان آسان می‌کند.
- **ادغام پایگاه داده:** ادغام بی‌درز با PostgreSQL با استفاده از Prisma ORM برای تعاملات پایگاه داده ایمن از نظر نوع و کارآمد.
- **اعتبارسنجی داده‌ها:** اعتبارسنجی ورودی قوی با استفاده از `class-validator` و `class-transformer` برای اطمینان از یکپارچگی داده‌ها.

### فناوری‌های مورد استفاده

- **NestJS:** یک فریم‌ورک پیشرفته Node.js برای ساخت برنامه‌های سمت سرور کارآمد، قابل اعتماد و مقیاس‌پذیر.
- **Prisma:** یک ORM (Object-Relational Mapper) نسل بعدی که دسترسی به پایگاه داده را آسان و ایمن از نظر نوع می‌کند.
- **PostgreSQL:** یک سیستم پایگاه داده رابطه‌ای قدرتمند و متن‌باز.
- **Swagger (OpenAPI):** برای تولید خودکار مستندات تعاملی API.
- **JWT (JSON Web Tokens):** برای احراز هویت امن کاربر.
- **Bcrypt:** برای هش کردن رمزهای عبور.
- **TypeScript:** یک ابرمجموعه از JavaScript که انواع ایستا را اضافه می‌کند.
- **Docker:** برای کانتینر‌سازی پایگاه داده PostgreSQL استفاده می‌شود.

### شروع به کار

#### پیش‌نیازها

قبل از اجرای این پروژه، مطمئن شوید موارد زیر را نصب کرده‌اید:

- Node.js (نسخه 18 یا بالاتر)
- pnpm (توصیه می‌شود، یا npm/yarn)
- Docker (برای اجرای PostgreSQL)

#### دستورالعمل‌های راه‌اندازی

1.  **مخزن را کلون کنید:**

    ```bash
    git clone [https://github.com/your-username/nestjs-blog-api.git](https://github.com/your-username/nestjs-blog-api.git)
    cd nestjs-blog-api
    ```

    (آدرس `https://github.com/your-username/nestjs-blog-api.git` را با آدرس واقعی مخزن خود جایگزین کنید)

2.  **وابستگی‌ها را نصب کنید:**

    ```bash
    pnpm install
    ```

3.  **PostgreSQL را با Docker راه‌اندازی کنید:**

    ```bash
    docker run --name nest-blog-postgres -e POSTGRES_USER=myuser -e POSTGRES_PASSWORD=mypassword -e POSTGRES_DB=nestblogdb -p 5432:5432 -d postgres
    ```

    - **توجه:** اگر پورت 5432 قبلاً در حال استفاده است، ممکن است لازم باشد فرآیند متناقض را متوقف کنید یا از یک نگاشت پورت متفاوت (مثلاً `-p 5433:5432`) استفاده کرده و فایل `.env` خود را بر این اساس به‌روزرسانی کنید.

4.  **متغیرهای محیطی را پیکربندی کنید:**
    یک فایل `.env` در ریشه پروژه ایجاد کرده و موارد زیر را اضافه کنید:

    ```dotenv
    DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/nestblogdb?schema=public"
    JWT_SECRET="YOUR_SUPER_SECRET_KEY_HERE" # از یک رشته قوی و تصادفی استفاده کنید
    ```

    - مطمئن شوید `myuser` و `mypassword` با تنظیمات Docker شما مطابقت دارند.
    - `YOUR_SUPER_SECRET_KEY_HERE` را با یک رشته امن و تصادفی جایگزین کنید.

5.  **مهاجرت‌های Prisma را اجرا کنید:**
    این کار جداول لازم را در پایگاه داده PostgreSQL شما ایجاد می‌کند.
    ```bash
    pnpm prisma migrate dev --name init
    ```

### نحوه اجرا

1.  **مطمئن شوید کانتینر Docker PostgreSQL شما در حال اجرا است:**

    ```bash
    docker start nest-blog-postgres
    ```

2.  **برنامه NestJS را اجرا کنید:**
    ```bash
    pnpm start:dev
    ```

برنامه روی `http://localhost:3000` اجرا خواهد شد.

### مستندات API

به مستندات تعاملی Swagger UI در آدرس زیر دسترسی پیدا کنید:
[http://localhost:3000/api](http://localhost:3000/api)

این رابط به شما امکان می‌دهد تمام نقاط پایانی موجود، شمای درخواست/پاسخ آن‌ها را بررسی کرده و حتی آن‌ها را مستقیماً آزمایش کنید.

### تماس

- **نام:** محمد بستانی
- **ایمیل:** [rvinjson@proton.me](rvinjson@proton.me)
- **نمونه کار/لینکدین:** [https://devbostani.online](https://devbostani.online)

</div>

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy youra NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

> > > > > > > ff90646 (Initial commit: Set up NestJS Blog API with core features and Persian localization)
