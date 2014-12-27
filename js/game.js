var camera, scene, renderer;
var minigame;
var cube;
var game;


var canvasWidth;
var canvasHeight;
var viewSize;

var buildings;

var objects = [];
var control;
var clock = new THREE.Clock();

function randomSort2(a,b) {
    // Get a random number between 0 and 10
    var temp = parseInt( Math.random()*10 );

    // Get 1 or 0, whether temp is odd or even
    var isOddOrEven = temp%2;

    // Get +1 or -1, whether temp greater or smaller than 5
    var isPosOrNeg = temp>5 ? 1 : -1;

    // Return -1, 0, or +1
    return( isOddOrEven*isPosOrNeg );
}

function drawcanvas() {


  canvasWidth = game.width();
	canvasHeight = game.height();

  // RENDERER
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize( canvasWidth, canvasHeight );

	// CAMERA
	viewSize = 900;

  // aspect ratio of width of window divided by height of window
	var aspectRatio = canvasWidth/canvasHeight;

	// OrthographicCamera( left, right, top, bottom, near, far )
	camera = new THREE.OrthographicCamera(
		-aspectRatio*viewSize / 2, aspectRatio*viewSize / 2,
		viewSize / 2, -viewSize / 2,
		-1000, 10000 );

  camera.position.set( 0, 0, 10 );
  control = new THREE.OrbitControls(camera, renderer.domElement);
}


function init() {

  game = $("#game");
  minigame = game.get(0);

  drawcanvas();



}

function createBuildings() {

  buildings = [
    {
      name: 'gomez',
      image: 'edificio_gomez.png',
      size: 350,
      drawbox: [0, 0.7, 1, 0.3],  // top, right, bottom, left: 0-1
      boundingbox: [0, 0.7, 1, 0.3],  // top, right, bottom, left: 0-1
    },

    {
      name: 'galeria_sm',
      image: 'galeria_comercial_san_martin.png',
      size: 200,
      drawbox: [0, 0.9, 1, 0.1],  // top, right, bottom, left: 0-1
      boundingbox: [0, 0.9, 1, 0.1],  // top, right, bottom, left: 0-1
    },

  ]

  buildings = buildings.sort(randomSort2)

}

function fillScene() {
	scene = new THREE.Scene();


  createBuildings();

  var count = buildings.length;

  var prev_pos = -1000;

  for (var i = 0; i < count; i++) {

    var buildingImage = THREE.ImageUtils.loadTexture( "img/scene/" + buildings[i].image );

    var buildingSize = buildings[i].size;

    var buildingMaterial = new THREE.SpriteMaterial( { map: buildingImage, useScreenCoordinates: false } );
    var buildingSprite = new THREE.Sprite( buildingMaterial );

    // posicionamos
    var building_width = buildings[i].size * (buildings[i].drawbox[1] - buildings[i].drawbox[3]);
    var posicionX = prev_pos + 150 + parseInt( Math.random()*building_width );


    var posicionY = (canvasHeight * -1) + (buildingSize / 2) - 30; // No tengo idea de por qué hay que correrlo 30
    buildingSprite.position.set( posicionX, posicionY, 0 );
    buildingSprite.scale.set( buildingSize, buildingSize, 1.0 ); // imageWidth, imageHeight

    prev_pos = posicionX;
    buildingSprite.callback = function() { console.log("encontrado"); }

    scene.add( buildingSprite );
    objects.push( buildingSprite );


  }


}


function drawHelpers() {
  /*Coordinates.drawGround({size:10000});
	Coordinates.drawGrid({size:10000,scale:0.01});*/
}


function addToDOM() {
    var container = minigame;
    var canvas = container.getElementsByTagName('canvas');
    if (canvas.length>0) {
        container.removeChild(canvas[0]);
    }
    container.appendChild( renderer.domElement );
}


function animate() {
	window.requestAnimationFrame(animate);

  render();
}

function render() {
	var dt = clock.getDelta();
  control.update(dt);
	renderer.render(scene, camera);
}


$(document).ready(function() {



  try {
    init();
    fillScene();
    drawHelpers();
    addToDOM();
    animate();
  } catch(e) {
    var errorReport = "Your program encountered an unrecoverable error, can not draw on canvas. Error was:<br/><br/>";
    $('#game').append(errorReport+e);
  }

  document.addEventListener( 'mousedown', onDocumentMouseDown, false)


});


// keyboard handler
function onDocumentMouseDown( event ) {

    event.preventDefault();

    var mouseVector = new THREE.Vector3();

    //mouseVector.x = 2 * (event.clientX / canvasWidth) - 1;
    //mouseVector.y = 1 - 2 * ( event.clientY / canvasHeight );
    mouseVector.x = canvasWidth * (2 * (event.clientX / canvasWidth) - 1);
    mouseVector.y = canvasHeight * (1 - 2 * ( event.clientY / canvasHeight ));

    mouseVector.z = 0;


    //mouseVector.unproject(camera);

    //var mouseVectorNormalized = mouseVector.sub( camera.position ).normalize();


    var ray = new THREE.Raycaster( camera.position, mouseVector );

    var intersects = ray.intersectObjects( objects );


    if ( intersects.length > 0 ) {

        intersects[0].object.callback();

    }

    var material = new THREE.LineBasicMaterial({ color: 0x0000ff });

    var geometry = new THREE.Geometry();
    geometry.vertices.push(
      mouseVector,
      camera.position

    );
    var line = new THREE.Line( geometry, material );
    scene.add( line );

}

$(window).on('resize', function(){

    canvasWidth = game.width();
    canvasHeight = game.height();

    camera.aspect = canvasWidth / canvasHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( canvasWidth, canvasHeight );
});
