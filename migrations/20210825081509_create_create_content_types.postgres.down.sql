do
$$
    DECLARE
        type TEXT;
    BEGIN
        FOR type IN SELECT name FROM contentType
            LOOP
                EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(type);
            END LOOP;
    end;
$$
language plpgsql;

DROP TABLE contentType