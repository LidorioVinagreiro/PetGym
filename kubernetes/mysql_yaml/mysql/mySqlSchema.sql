CREATE DATABASE QuintaMiao;

USE QuintaMiao

CREATE Table IF NOT EXISTS Animais (
animal_id int(11) NOT NULL AUTO_INCREMENT,
animal_nome varchar(100) NOT NULL,
animal_peso decimal(4,2) NULL DEFAULT 0.00,
animal_raca varchar(100) NOT NULL DEFAULT 'Rafeiro',
animal_adoptado BOOLEAN null,
PRIMARY KEY (animal_id)
);

CREATE Table IF NOT EXISTS AvaliarAnimais (
avaliar_id int(11) NOT NULl AUTO_INCREMENT,
avaliar_animal_id int(11) NOT NULL,
avaliar_animal_peso decimal(4,2) NOT NULL,
avaliar_data DATE NOT NULL,
PRIMARY KEY (avaliar_id),
FOREIGN KEY (avaliar_animal_id) REFERENCES Animais(animal_id)
);