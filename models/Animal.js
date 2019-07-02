function Animal(id,nome,peso,raca,adoptado){
    this.id = id;
    this.nome = nome;
    this.peso = peso;
    this.raca = raca;
    this.adoptado = adoptado;
}

Animal.prototype.setPeso = function (peso){
    this.peso = peso;
}
Animal.prototype.setNome = function (nome){
    this.nome = nome;
}
Animal.prototype.setRaca = function (raca){
    this.raca = raca;
}
Animal.prototype.setAdoptado = function (adoptado){
    this.adoptado = adoptado;
}
