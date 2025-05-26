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


<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest
