SELECT name, collation_name FROM sys.databases;
GO
ALTER DATABASE db_a9fb68_anjaandonovski SET SINGLE_USER WITH
ROLLBACK IMMEDIATE;
GO
ALTER DATABASE db_a9fb68_anjaandonovski COLLATE Croatian_CI_AS;
GO
ALTER DATABASE db_a9fb68_anjaandonovski SET MULTI_USER;
GO
SELECT name, collation_name FROM sys.databases;
GO

create table INSTRUCTOR(
	ID int not null primary key identity (1,1),
	FIRST_NAME varchar (50),
	LAST_NAME varchar (50),
	DRIVER_LICENSE_NUMBER varchar (50),
	EMAIL varchar (50),
	CONTACT_NUMBER varchar (20)
	);

create table VEHICLE(
	ID int not null primary key identity (1,1),
	TYPE varchar (25) not null,
	BRAND varchar (25),
	MODEL varchar (25),
	PURCHASE_DATE datetime,
	DATE_OF_REGISTRATION datetime 
	);

create table COURSE(
	ID int not null primary key identity (1,1),
	ID_INSTRUCTOR int not null,
	ID_VEHICLE int not null,
	ID_CATEGORY int not null,
	START_DATE datetime not null
	);

create table STUDENT(
	ID int not null primary key identity (1,1),
	FIRST_NAME varchar (15) not null,
	LAST_NAME varchar (15) not null,
	ADDRESS varchar (50),
	OIB char (11) not null,
	CONTACT_NUMBER varchar (25) not null,
	DATE_OF_ENROLLMENT datetime not null,
);


create table CATEGORY(
	ID int not null primary key identity (1,1),
	NAME varchar (50) not null,
	PRICE decimal not null,
	NUMBER_OF_TR_LECTURES varchar (50) not null,
	NUMBER_OF_DRIVING_LECTURES varchar (50) not null
	);

	alter table COURSE add foreign key (ID_INSTRUCTOR) references INSTRUCTOR(ID);
	
	alter table COURSE add foreign key (ID_VEHICLE) references VEHICLE(ID);
	alter table COURSE add foreign key (ID_CATEGORY) references CATEGORY(ID);
	

	create table STUDENT_COURSE(
		ID int not null primary key identity (1,1),
		ID_student int not null,
		ID_course int not null);

	alter table STUDENT_COURSE add foreign key (ID_student) references STUDENT(ID);
	alter table STUDENT_COURSE add foreign key (ID_course) references COURSE(ID);


insert into INSTRUCTOR(FIRST_NAME,LAST_NAME,DRIVER_LICENSE_NUMBER,EMAIL,CONTACT_NUMBER)
	values 
	('MARKO','MILANOVIC','54961388','milanovicm@gmail.com','0914691225'),
	('IVAN','MARIC','14236945','maricm@gmail.com','0914631231'),
	('MAGDALENA','DEVIC','69664382','devicm@gmail.com','0974545097'),
	('KRISTIJAN','BENO','32363478','benok@gmail.com','0953316383');

insert into VEHICLE(TYPE,BRAND,MODEL,PURCHASE_DATE,DATE_OF_REGISTRATION)
	values
	('CAR','VOLKSWAGEN','POLO 1,6 TDI','2020-06-05 00:00:00','2023-02-05 00:00:00'),
	('MOTORCYCLE','YAMAHA','MT_07','2020-01-05 00:00:00','2023-01-02 00:00:00'),
	('CAR','PEUGEOT','308 1.6 HDI','2019-11-09 00:00:00','2023-06-01 00:00:00'),
	('MOTORCYCLE','KAWASAKI', 'Z400','2020-10-15 00:00:00','2023-03-26 00:00:00');
	
insert into CATEGORY(NAME,PRICE,NUMBER_OF_TR_LECTURES,NUMBER_OF_DRIVING_LECTURES)
values 
	('A','866.67','30','35'),
	('A2','866.67','30','35'),
	('B','813.75','30','25');

insert into STUDENT(FIRST_NAME,LAST_NAME,ADDRESS,OIB,CONTACT_NUMBER,DATE_OF_ENROLLMENT)
values
	('IVAN','STOLIC','ANDRIJE HEBRANGA 52','46957944261','0914648269','2023-06-06 00:00:00'),
	('MATIJA','LUMPI','JOSIPA KOZARCA 112','32649851391','0953979461','2023-06-07 00:00:00'),
	('MARINA','PALIC','BRACE RADIC 1','55469647812','0974567139','2022-03-05 00:00:00'),
	('KATARINA','CERCIN','MATIJE GUPCA 35','64913215217','0919896921','2023-06-01 00:00:00'),
	('MARKO','KRPIC','J.J.STROSSMAYERA 77','64997316145','0951297646','2023-02-02 00:00:00'),
	('MARKO','MARKOVIC','S.S.KRANJCEVICA 7','94613871649','0916496923','2023-03-05 00:00:00'),
	('LUCIJA','KARLOVIC','A.E.MIROLJUBA 71','46167923164','0957476261','2022-12-05 00:00:00'),
	('LEDA','IVIC','ISTARSKA 96','23461611798','0973164959','2022-12-01 00:00:00'),
	('SILVIO','BARIC','IVANA GUNDULICA 55','12324269791','0973236163','2023-03-03 00:00:00'),
	('MONIKA','KEK','MATIJE GUPCA 1A','31697631912','0912346659','2022-12-12 00:00:00'),
	('HRVOJE','MARIC','SAVSKA 22','46132621567','0953366779','2023-01-21 00:00:00'),
	('MAJA','MAJER','SUNCANA 6','31697991697','0913314798','2023-01-31 00:00:00'),
	('ENA','KRESTA','DRINSKA 9','21369461321','0971924696','2023-03-08 00:00:00'),
	('KARLO','LIPIC','KRALJA ZVONIMIRA 41','64321212821','0955456954','2023-04-09 00:00:00'),
	('ANDREA','MIRINOVIC','NOVA 83','86498945987','0919946496','2023-04-21 00:00:00');
	

insert into COURSE(ID_INSTRUCTOR,ID_VEHICLE,ID_CATEGORY,START_DATE)
	values
		('1','1','1','2023-02-05 17:00:00'),
		('2','2','2','2023-01-12 17:00:00'),
		('3','3','3','2023-01-01 17:00:00');

