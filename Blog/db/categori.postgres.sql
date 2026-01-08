create or replace procedure p_new_category(p_name varchar(100),p_slug varchar(120),p_description text,p_parent_id int default null)
as $$
    begin
    if p_parent_id is not null then
        if(select 1+1 from categories where parent_id = p_parent_id)is not null then
            raise exception 'Sub Categoria ya existe';
        end if;
     end if;

    insert into categories(name, slug, description, parent_id)
        values (p_name,p_slug,p_description,p_parent_id);
    end;
$$language plpgsql;

call p_new_category('Pc','Pc','Solo para Pc ');

select * from categories;
