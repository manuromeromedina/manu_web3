(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
   
    if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
   
    if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
  }());
  
  (function() {
    var SCREEN_WIDTH = 900;
    var SCREEN_HEIGHT = 500;
  
    var RADIUS = 110;
  
    var RADIUS_SCALE = 1;
    var RADIUS_SCALE_MIN = 1;
    var RADIUS_SCALE_MAX = 5;
  
    var QUANTITY = 28;
  
    var canvas;
    var context;
    var particles;
  
    var mouseX = (window.innerWidth - SCREEN_WIDTH);
    var mouseY = (window.innerHeight - SCREEN_HEIGHT);
  
    var targetX = 0;
    var targetY = 0;
  
    var PARTICLE_SIZE = 2;
    
    var textParticles = ["¿Cómo tenés lo que querés tener con el tiempo que tenés?", 
                         "La cura está lejos", 
                         "Las ausencias se hacen más presentes que nunca", 
                         "Era como alimentar la agonía", 
                         "Que difícil es que el tiempo no pese", 
                         "El mundo seguía girando pero no para mí", 
                         "Cuando te das más miedo vos que el propio cementerio", 
                         "Y me quemé mirando el fuego y el humo que no me dejaban ver", 
                         "Si pudiera decir que ya te olvidé, lo diría", "Si pudiera ser la mala del cuento, juro que lo sería", 
                         "Estoy muriendo, y tú lo sabes", 
                         "A veces pienso que hay errores que son para hacerte mejores pero este no es el caso", 
                         "Si te mentí, te pido perdón", "Te juro que lo intenté pero no me salio", 
                         "2025: Vuelvo de nuevo", "2022: Me rompió", "2018: Me destruyó",
                         "2023: Me cambió", "2024: Me abrió los ojos", 
                         "Duermo con las luces encendidas por si vas a volver, como duele apagarlas al amanecer", 
                         "Yo solo quería correr y por correr descalzo tengo heridas en los pies", 
                         "La verdad nunca la esuchó nadie", "Me voy antes de que me dañen",
                         "Te miras al espejo y no sos vos, no te ves igual", "Empezas a decir SI en vez de NO SE",
                         "¿Hasta dónde tuviste que llegar para darte cuenta que tenías que parar?",
                         "¿Y si sí?¿Por qué no?",
                         "Bendita la crisis que me hizo crecer, la caída que me hizo mirar al cielo y el problema que me hizo buscar a Dios",
                         ];

    // Función para generar colores aleatorios en formato RGB
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
  
      for (var i = 0; i < QUANTITY; i++) {
        var posX = Math.random() * (window.innerWidth);
        var posY = Math.random() * (window.innerHeight);
  
        var speed = 0.2;
        var directionX = -speed + (Math.random() * speed * 2);
        var directionY = -speed + (Math.random() * speed * 2);
  
        var text = textParticles[Math.floor(Math.random() * textParticles.length)];
  
        // Asignar un color aleatorio para cada partícula
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
  
      var z = 0;
      var xdist = 0;
      var ydist = 0;
      var dist = 0;
  
      for (var i = 0; i < particles.length; i++) {
        var particle = particles[i];
  
        var lp = { x: particle.position.x, y: particle.position.y };
  
        if (particle.position.x <= particle.size / 2 || particle.position.x >= SCREEN_WIDTH - PARTICLE_SIZE / 2) {
          particle.directionX *= -1;
        }
  
        if (particle.position.y <= particle.size / 2 || particle.position.y >= SCREEN_HEIGHT - PARTICLE_SIZE / 2) {
          particle.directionY *= -1;
        }
  
        for (var s = 0; s < particles.length; s++) {
          var bounceParticle = particles[s];
          if (bounceParticle.index != particle.index) {
            z = PARTICLE_SIZE;
            xdist = Math.abs(bounceParticle.position.x - particle.position.x);
            ydist = Math.abs(bounceParticle.position.y - particle.position.y);
            dist = Math.sqrt(Math.pow(xdist, 2) + Math.pow(ydist, 2));
            if (dist < z) {
              randomiseDirection(particle);
              randomiseDirection(bounceParticle);
            }
          }
        }
  
        particle.position.x -= particle.directionX;
        particle.position.y -= particle.directionY;
  
        context.font = "16px sans-serif";
        context.fillStyle = particle.fillColor;  // Usar el color aleatorio asignado
        context.fillText(particle.text, particle.position.x, particle.position.y);
      }
      
      requestAnimationFrame(loop);
    }
  
    function randomiseDirection(particle) {
      var d = 0;
      while ((d == 0) || (d == 90) || (d == 180) || (d == 360)) {
        d = Math.floor(Math.random() * 360);
      }
  
      var r = (d * 180) / Math.PI;
      particle.directionX = Math.sin(r) * particle.speed;
      particle.directionY = Math.cos(r) * particle.speed;
    }
  
    function windowResizeHandler() {
      SCREEN_WIDTH = window.innerWidth;
      SCREEN_HEIGHT = window.innerHeight;
      canvas.width = SCREEN_WIDTH;
      canvas.height = SCREEN_HEIGHT;
    }
  
    init();
  }())
