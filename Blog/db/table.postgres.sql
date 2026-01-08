create type status as enum ('draft', 'published', 'archived');

create table posts(
    id serial primary key,
    title varchar(200) not null ,
    content text,
    author_id int,
    status status,
    published_at timestamp,
    create_at timestamp default now(),
    update_at timestamp default now()
);


create table categories(
    id serial primary key ,
    name varchar(100) unique ,
    slug varchar(120) unique ,
    description text,
    parent_id int,
    created_at timestamp default now()
);

create table tags (
    id serial primary key ,
    name varchar(50) unique ,
    slug varchar(60) unique ,
    create_at timestamp default now()
);

create type comments_status as enum('pending', 'approved', 'rejected');

create table comments (
    id serial primary key ,
    post_id int,
    author_id int,
    content text,
    parant_id int default null,
    status comments_status,
    created_at timestamp default  now()
);

create table post_categories(
    post_id int,
    category_id int,
    primary key (post_id,category_id)
);

create table post_tags(
    post_id int,
    tag_id int,
    primary key (post_id,tag_id)
);

alter table posts
alter column author_id type varchar(200);

alter table categories
add constraint  fk_categories_itself foreign key (parent_id) references categories(id);

alter table comments
alter column author_id type  varchar(200);

alter table comments
add constraint fk_comments_itself foreign key (parant_id) references  comments(id);

alter table post_categories
add constraint fk_post_category foreign key (post_id) references posts(id);


alter table post_categories
add constraint fk_category_post foreign key (category_id) references categories(id);

alter table post_tags
add constraint fk_post_tags foreign key (post_id) references posts(id);

alter table post_tags
add constraint fk_tags_post foreign key (tag_id) references tags(id);
