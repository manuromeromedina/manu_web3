(function() {
  var SCREEN_WIDTH = 2000; // Área ampliada
  var SCREEN_HEIGHT = 2000; // Área ampliada

  var RADIUS = 110;
  var RADIUS_SCALE = 1;
  var RADIUS_SCALE_MIN = 1;
  var RADIUS_SCALE_MAX = 5;

  var QUANTITY = 35;

  var canvas;
  var context;
  var particles;

  var PARTICLE_SIZE = 5;
  
  var textParticles = ["¿Cómo tenés lo que querés tener con el tiempo que tenés?", 
                       "La cura está lejos", 
                       "Las ausencias se hacen más presentes que nunca", 
                       "Era como alimentar la agonía", 
                       "Que difícil es que el tiempo no pese", 
                       "El mundo seguía girando pero no para mí", 
                       "Cuando te das más miedo vos que el propio cementerio", 
                       "Y me quemé mirando el fuego y el humo que no me dejaba ver", 
                       "Si pudiera decir que ya te olvidé, lo diría", "Si pudiera ser el malo del cuento, juro que lo sería", 
                       "Estoy muriendo, y tú lo sabes", 
                       "A veces pienso que hay errores que son para hacerte mejores pero este no es el caso", 
                       "Si te mentí, te pido perdón", "Te juro que lo intenté pero no me salio", 
                       "2025: Vuelvo de nuevo", "2022: Me rompió", "2018: Me destruyó",
                       "2023: Me cambió", "2024: Me abrió los ojos", 
                       "Duermo con las luces encendidas por si vas a volver, como duele apagarlas al amanecer", 
                       "Yo solo quería correr y por correr descalzo tengo heridas en los pies", 
                       "La verdad nunca la escuchó nadie", "Me voy antes de que me dañen",
                       "Te miras al espejo y no sos vos, no te ves igual", "Empezas a decir SI en vez de NO SE",
                       "¿Hasta dónde tuviste que llegar para darte cuenta que tenías que parar?",
                       "¿Y si sí?¿Por qué no?", 
                       "Bendita la crisis que me hizo crecer, la caída que me hizo mirar al cielo y el problema que me hizo buscar a Dios", 
                       "Los monstruos de mi cabeza van ganando",
                       "Ir por la vida sin alma", "Por miedo al '¿qué dirán?'",
                       "Hoy decido dejarte ir","'Él actúa así por atención'",
                       "Creo que la soledad no se sentirá tan abrumadora con ventanas que me protejan del mundo pero que aún me permitan verlo",
                       "Aún sigo encontrando piedras atadas a mis pies" ];

  function randomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
  }

  function init() {
    canvas = document.getElementById('world');

    if (canvas && canvas.getContext) {
      context = canvas.getContext('2d');
      context.globalCompositeOperation = 'destination-over';
      window.addEventListener('resize', windowResizeHandler, false);
      windowResizeHandler();
      createParticles();
      loop();
    }
  }

  function createParticles() {
    particles = [];
    var usedTextParticles = [...textParticles]; // Copiar el array de frases

    for (var i = 0; i < QUANTITY; i++) {
      var posX = Math.random() * SCREEN_WIDTH; // Usar SCREEN_WIDTH
      var posY = Math.random() * SCREEN_HEIGHT; // Usar SCREEN_HEIGHT

      var speed = 0.8;
      var directionX = -speed + (Math.random() * speed * 2);
      var directionY = -speed + (Math.random() * speed * 2);

      var text = usedTextParticles.pop(); // Tomar una frase del array
      var randomFillColor = randomColor();

      var particle = {
        position: { x: posX, y: posY },
        text: text,
        directionX: directionX,
        directionY: directionY,
        speed: speed,
        fillColor: randomFillColor
      };

      particles.push(particle);
    }
  }

  function loop() {
    context.fillStyle = 'rgba(0,0,0,0.2)';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    for (var i = 0; i < particles.length; i++) {
      var particle = particles[i];

      if (particle.position.x <= 0 || particle.position.x >= SCREEN_WIDTH) {
        particle.directionX *= -1;
      }

      if (particle.position.y <= 0 || particle.position.y >= SCREEN_HEIGHT) {
        particle.directionY *= -1;
      }

      particle.position.x -= particle.directionX;
      particle.position.y -= particle.directionY;

      context.font = "16px sans-serif";
      context.fillStyle = particle.fillColor;
      context.fillText(particle.text, particle.position.x, particle.position.y);
    }
    
    requestAnimationFrame(loop);
  }

  function windowResizeHandler() {
    canvas.width = SCREEN_WIDTH;
    canvas.height = SCREEN_HEIGHT;
  }

  init();
}());
