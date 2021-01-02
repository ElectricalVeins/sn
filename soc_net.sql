CREATE TYPE role_enum AS ENUM ('user', 'admin');

CREATE TABLE "users" (
  "id" serial NOT NULL,
  "first_name" VARCHAR(128) NOT NULL,
  "last_name" VARCHAR(128) NOT NULL,
  "gender" BOOLEAN NOT NULL,
  "birthday" DATE NOT NULL,
  "image_src" TEXT,
  "email" VARCHAR(256) NOT NULL UNIQUE,
  "phone" VARCHAR(13) NOT NULL UNIQUE,
  "password" VARCHAR(32) NOT NULL,
  "user_role" integer NOT NULL,
  -- "access_token (???)" TEXT NOT NULL,
  CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

CREATE TABLE "posts" (
  "id" serial NOT NULL,
  "user_id" integer NOT NULL,
  "body" TEXT NOT NULL,
  "image_src" TEXT,
  CONSTRAINT "posts_pk" PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

CREATE TABLE "messages" (
  "id" serial NOT NULL,
  "user_id" integer NOT NULL,
  "dialog_id" integer NOT NULL,
  "body" TEXT NOT NULL,
  "created_at" TIMESTAMP NOT NULL,
  CONSTRAINT "messages_pk" PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

CREATE TABLE "dialogs" (
  "id" serial NOT NULL,
  "user_id" integer NOT NULL,
  "interlocutor_id" integer NOT NULL,
  CONSTRAINT "dialogs_pk" PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

CREATE TABLE "roles" (
  "id" serial NOT NULL,
  "role" role_enum NOT NULL,
  CONSTRAINT "roles_pk" PRIMARY KEY ("id")
) WITH (OIDS = FALSE);
/* тут */
CREATE TABLE "comments" (
  "id" serial NOT NULL,
  "user_id" integer NOT NULL,
  "post_id" integer NOT NULL,
  "body" TEXT NOT NULL,
  CONSTRAINT "comments_pk" PRIMARY KEY ("id")
) WITH (OIDS = FALSE);

CREATE TABLE "refresh_token" (
  "user_id" integer NOT NULL,
  "value" TEXT NOT NULL UNIQUE
) WITH (OIDS = FALSE);

ALTER TABLE
  "users"
ADD
  CONSTRAINT "users_fk0" FOREIGN KEY ("user_role") REFERENCES "roles"("id");

ALTER TABLE
  "posts"
ADD
  CONSTRAINT "posts_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE
  "messages"
ADD
  CONSTRAINT "messages_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE
  "messages"
ADD
  CONSTRAINT "messages_fk1" FOREIGN KEY ("dialog_id") REFERENCES "dialogs"("id");

ALTER TABLE
  "dialogs"
ADD
  CONSTRAINT "dialogs_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE
  "dialogs"
ADD
  CONSTRAINT "dialogs_fk1" FOREIGN KEY ("interlocutor_id") REFERENCES "users"("id");

ALTER TABLE
  "comments"
ADD
  CONSTRAINT "comments_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE
  "comments"
ADD
  CONSTRAINT "comments_fk1" FOREIGN KEY ("post_id") REFERENCES "posts"("id");

ALTER TABLE
  "refresh_token"
ADD
  CONSTRAINT "refresh_token_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

INSERT INTO
  roles (role)
VALUES
  ('user'),
  ('admin');

INSERT INTO
  "users"(
    first_name,
    last_name,
    gender,
    birthday,
    email,
    phone,
    image_src,
    password,
    user_role
  )
VALUES
  (
    'Vlad',
    'Surname',
    true,
    CURRENT_TIMESTAMP,
    'test2@mail.com',
    '+380992797777',
    'null',
    'hash',
    1
  ),
  (
    'Vlad',
    'Surname',
    true,
    CURRENT_TIMESTAMP,
    'test3@mail.com',
    '+380397777787',
    'null',
    'hash',
    1
  ),
  (
    'Vlad',
    'Surname',
    true,
    CURRENT_TIMESTAMP,
    'test4@mail.com',
    '+380597777677',
    'null',
    'hash',
    1
  ),
  (
    'Vlad',
    'Surname',
    true,
    CURRENT_TIMESTAMP,
    'test5@mail.com',
    '+380597777577',
    'null',
    'hash',
    1
  ),
  (
    'Vlad',
    'Surname',
    true,
    CURRENT_TIMESTAMP,
    'test6@mail.com',
    '+380967774777',
    'null',
    'hash',
    1
  ),
  (
    'Vlad',
    'Surname',
    true,
    CURRENT_TIMESTAMP,
    'test7@mail.com',
    '+380977777577',
    'null',
    'hash',
    1
  ),
  (
    'Vlad',
    'Surname',
    true,
    CURRENT_TIMESTAMP,
    'test8@mail.com',
    '+380998777577',
    'null',
    'hash',
    1
  ),
  (
    'Vlad',
    'Surname',
    true,
    CURRENT_TIMESTAMP,
    'test9@mail.com',
    '+380907779877',
    'null',
    'hash',
    1
  ),
  (
    'Vlad',
    'Surname',
    true,
    CURRENT_TIMESTAMP,
    'test10@mail.com',
    '+380307777127',
    'null',
    'hash',
    1
  );

INSERT INTO
  "dialogs" (user_id, interlocutor_id)
VALUES
  (1, 8),
  (1, 9),
  (2, 8),
  (2, 9),
  (4, 7),
  (6, 5);

INSERT INTO
  "messages" (user_id, dialog_id, body, created_at)
VALUES
  (1, 1, 'hi, how are you?', CURRENT_TIMESTAMP),
  (8, 1, 'hi,nice. and you?', CURRENT_TIMESTAMP),
  (
    2,
    1,
    'okay, that is all for today',
    CURRENT_TIMESTAMP
  ),
  (1, 2, 'and what about you', CURRENT_TIMESTAMP),
  (9, 2, 'what?', CURRENT_TIMESTAMP),
  (1, 2, 'nothing. mistake.', CURRENT_TIMESTAMP),
  (2, 3, 'hey!', CURRENT_TIMESTAMP),
  (8, 3, 'what?', CURRENT_TIMESTAMP),
  (2, 4, 'unique', CURRENT_TIMESTAMP),
  (9, 4, 'yeah', CURRENT_TIMESTAMP),
  (4, 5, 'another one', CURRENT_TIMESTAMP),
  (7, 5, 'i am tired', CURRENT_TIMESTAMP),
  (5, 6, 'heh', CURRENT_TIMESTAMP),
  (6, 6, 'what?', CURRENT_TIMESTAMP);

/* Диалоги конкретного пользователя c инфой про юзера и последним сообщением (1) */
Select
  *
FROM
  "dialogs"
  inner join users on dialogs.interlocutor_id = users.id
  inner join (
    SELECT
      distinct on (messages.dialog_id) *
    from
      messages
    order BY
      dialog_id,
      created_at desc
  ) as Z on dialogs.id = Z.dialog_id
WHERE
  dialogs.user_id = 2;

/* Диалоги конкретного пользователя c инфой про юзера и последним сообщением (2. Better)  */
Select
  *
FROM
  "dialogs"
  inner join users on dialogs.interlocutor_id = users.id
  inner join (
    SELECT
      *
    from
      messages
    where
      id in (
        select
          max(m.id)
        from
          messages m
        group by
          dialog_id
      )
  ) as Z on dialogs.id = Z.dialog_id
WHERE
  dialogs.user_id = 2
limit
  12
  /* Конкрентый диалог */
SELECT
  *
FROM
  "dialogs"
  inner JOIN "messages" ON "dialogs"."id" = "messages"."dialog_id"
WHERE
  dialogs.id = 4
limit
  30;