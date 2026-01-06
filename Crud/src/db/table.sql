create type state as ENUM ('active','inactive', 'delete');


create table  tasks(
    id serial primary key,
    title varchar(500),
    description varchar(500),
    create_at timestamp,
    status state
);


create or replace procedure p_new_tasks(p_title varchar(500),p_description varchar(500))

as $$
    begin
        insert into tasks(title, description, create_at, status) values (p_title,p_description,now(),'active');
    end;
    $$ language plpgsql;


CALL p_new_tasks('Prueba', 'Probando esta tarea');
CALL p_new_tasks('Prueba #2', 'Prueba 2');


create or replace procedure p_update_task(p_id int, p_title varchar(500) default null,p_description varchar(500) default null, p_status state default null)
as $$
    begin
        if (select 1+1 from tasks where id=p_id) is null then
            raise exception 'No existe esta tarea';
        end if;

        update tasks
        set title=coalesce(p_title, tasks.title),
            description = coalesce(p_description, tasks.description),
            status = coalesce(p_status, tasks.status)
        where id= p_id;
    end;
    $$language plpgsql;

call p_update_task(10, 'update prueba',null,'inactive');

create or replace function fn_get_task(p_id int default null)
    returns json
as  $$
    declare
        result json;
        begin
            if p_id is null  then
                select jsonb_agg(to_jsonb(tasks)) from tasks into result;
                return  result;
            end if;

            if (select 1+1 from tasks where id=p_id) is not null then
                select to_jsonb(tasks) from tasks where id =p_id into result;
                return  result;
            end if;

            raise exception 'No se encontro registro que coincidan';
        end;
    $$ language plpgsql;

select fn_get_task();

select * from tasks