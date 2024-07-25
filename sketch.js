let anchoPantalla = 800;
let altoPantalla = 400;

let pelota;
let jugador;
let computadora;
let puntajeJugador = 0;
let puntajeComputadora = 0;

function setup() {
  createCanvas(anchoPantalla, altoPantalla);
  pelota = new Pelota();
  jugador = new Raqueta(true); // Raqueta del jugador en la izquierda
  computadora = new Raqueta(false); // Raqueta de la computadora en la derecha
}

function draw() {
  background(0);

  // Dibujar bordes superiores e inferiores
  fill(255);
  rect(0, 0, width, 10); // borde superior
  rect(0, height - 10, width, 10); // borde inferior

  // Mostrar y mover pelota y raquetas
  pelota.mostrar();
  pelota.mover();
  pelota.rebotar(jugador);
  pelota.rebotar(computadora);
  
  jugador.mostrar();
  jugador.mover();

  computadora.mostrar();
  computadora.moverAutomatica(pelota);

  // Mostrar marcador
  textSize(32);
  fill(255);
  text(puntajeJugador, width / 4, 40);
  text(puntajeComputadora, 3 * width / 4, 40);
}

// Clase Pelota
class Pelota {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.diametro = 20;
    this.velocidadX = 5;
    this.velocidadY = 3;
    this.color = [255, 255, 255];
  }

  mostrar() {
    fill(this.color);
    ellipse(this.x, this.y, this.diametro);
  }

  mover() {
    this.x += this.velocidadX;
    this.y += this.velocidadY;

    if (this.y < 10 || this.y > height - 10) {
      this.velocidadY *= -1;
      this.cambiarColor();
    }

    // Verificar si la pelota sale de la zona de juego
    if (this.x < 0) {
      puntajeComputadora++;
      this.reiniciar();
    } else if (this.x > width) {
      puntajeJugador++;
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
    this.color = [255, 255, 255];
  }

  cambiarColor() {
    this.color = [random(255), random(255), random(255)];
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
      this.y = constrain(this.y, 10, height - this.alto - 10); // Limitar posición de la raqueta
    }
  }

  moverAutomatica(pelota) {
    if (pelota.velocidadX > 0) {
      if (pelota.y > this.y + this.alto / 2) {
        this.y += this.velocidad;
      } else if (pelota.y < this.y + this.alto / 2) {
        this.y -= this.velocidad;
      }
      this.y = constrain(this.y, 10, height - this.alto - 10); // Limitar posición de la raqueta
    }
  }
}
