

create table tb_usuario (
    id_usuario         int primary key not null auto_increment,
    nm_usuario         varchar(100)
);


create table tb_sala (
    id_sala         int primary key not null auto_increment,
    nm_sala         varchar(100),
    bt_ativa        boolean
);

create table tb_chat (
    id_chat         int primary key not null auto_increment,
    id_sala         int,
    id_usuario      int,
    ds_mensagem     varchar(100),
    dt_mensagem     datetime,
    foreign key (id_sala) references tb_sala(id_sala),
    foreign key (id_usuario) references tb_usuario(id_usuario)
);

select * from tb_sala;
select * from tb_usuario;
select * from tb_chat;

/*
insert into tb_sala (nm_sala, bt_ativa)
values ('Ninjas', true);

insert into tb_usuario (nm_usuario)
values ('prof. Bruno');

insert into tb_chat (id_usuario, id_sala, ds_mensagem, dt_mensagem)
values (1,1,'Bora ficar ninjaaaa!', '2021-08-11 10:10:00');

*/










select * from tb_chat where id_sala = 1;


insert into tb_chat (id_usuario, id_sala, ds_mensagem, dt_mensagem)
values (1,1,'Funcionouuu manoo! Com a InfoC!', '2021-08-12 16:07:00');







