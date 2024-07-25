let anchoPantalla = 800;
let altoPantalla = 400;

let pelota;
let jugador;
let computadora;

function setup() {
  createCanvas(anchoPantalla, altoPantalla);
  pelota = new Pelota();
  jugador = new Raqueta(true); // Raqueta del jugador en la izquierda
  computadora = new Raqueta(false); // Raqueta de la computadora en la derecha
}

function draw() {
  background(0);

  pelota.mostrar();
  pelota.mover();
  pelota.rebotar(jugador);
  pelota.rebotar(computadora);
  
  jugador.mostrar();
  jugador.mover();

  computadora.mostrar();
  computadora.moverAutomatica(pelota);
}

// Clase Pelota
class Pelota {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.diametro = 20;
    this.velocidadX = 5;
    this.velocidadY = 3;
  }

  mostrar() {
    fill(255);
    ellipse(this.x, this.y, this.diametro);
  }

  mover() {
    this.x += this.velocidadX;
    this.y += this.velocidadY;

    if (this.y < 0 || this.y > height) {
      this.velocidadY *= -1;
    }

    // Verificar si la pelota sale de la zona de juego
    if (this.x < 0 || this.x > width) {
      this.reiniciar();
    }
  }

  rebotar(raqueta) {
    if (this.x - this.diametro / 2 < raqueta.x + raqueta.ancho && 
        this.x + this.diametro / 2 > raqueta.x && 
        this.y > raqueta.y && 
        this.y < raqueta.y + raqueta.alto) {
      this.velocidadX *= -1;
    }
  }

  reiniciar() {
    this.x = width / 2;
    this.y = height / 2;
    this.velocidadX = 5;
    this.velocidadY = 3;
  }
}

// Clase Raqueta
class Raqueta {
  constructor(esJugador) {
    this.ancho = 10;
    this.alto = 100;
    this.x = esJugador ? 0 : width - this.ancho;
    this.y = height / 2 - this.alto / 2;
    this.velocidad = 5;
    this.esJugador = esJugador;
  }

  mostrar() {
    fill(255);
    rect(this.x, this.y, this.ancho, this.alto);
  }

  mover() {
    if (this.esJugador) {
      this.y = mouseY - this.alto / 2;
      this.y = constrain(this.y, 0, height - this.alto);
    }
  }

  moverAutomatica(pelota) {
    if (pelota.velocidadX > 0) {
      if (pelota.y > this.y + this.alto / 2) {
        this.y += this.velocidad;
      } else if (pelota.y < this.y + this.alto / 2) {
        this.y -= this.velocidad;
      }
      this.y = constrain(this.y, 0, height - this.alto);
    }
  }
}
