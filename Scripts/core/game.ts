/// <reference path="_reference.ts"/>

// MAIN GAME FILE

// THREEJS Aliases
import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import BoxGeometry = THREE.BoxGeometry;
import CubeGeometry = THREE.CubeGeometry;
import PlaneGeometry = THREE.PlaneGeometry;
import SphereGeometry = THREE.SphereGeometry;
import Geometry = THREE.Geometry;
import AxisHelper = THREE.AxisHelper;
import LambertMaterial = THREE.MeshLambertMaterial;
import MeshBasicMaterial = THREE.MeshBasicMaterial;
import Material = THREE.Material;
import Mesh = THREE.Mesh;
import Object3D = THREE.Object3D;
import SpotLight = THREE.SpotLight;
import PointLight = THREE.PointLight;
import AmbientLight = THREE.AmbientLight;
import Control = objects.Control;
import GUI = dat.GUI;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;
import Face3 = THREE.Face3;
import Point = objects.Point;
import CScreen = config.Screen;
import Clock = THREE.Clock;
import FirstPersonControls = THREE.FirstPersonControls;

//Custom Game Objects
import gameObject = objects.gameObject;

// setup an IIFE structure (Immediately Invoked Function Expression)
var game = (() => {

    var scene: Scene = new Scene();
    var renderer: Renderer;
    var camera: PerspectiveCamera;
    var axes: AxisHelper;
    var plane: Mesh;
    var sphere: Mesh;
    var sphereGeometry: SphereGeometry;
    var sphereMaterial: LambertMaterial;
    var towerGeometry: CubeGeometry;
    var towerMaterial: LambertMaterial;
    var tower: Mesh;
    
    var groundGeometry: PlaneGeometry;
    var groundMaterial: LambertMaterial;
    var ground: Mesh;
    
    var pointLight: PointLight;
    var ambientLight: AmbientLight;
    var spotLight: SpotLight;
    var control: Control;
    var gui: GUI;
    var stats: Stats;
    var step: number = 0;
    var clock: Clock;
    var firstPersonControls

    function init() {
        // Instantiate a new Scene object
        //scene = new Scene();

        // setup a THREE.JS Clock object
        clock = new Clock();

        setupRenderer(); // setup the default renderer
	
        setupCamera(); // setup the camera

        //Add a Plane to the Scene
        plane = new gameObject(
            new PlaneGeometry(20, 20, 1, 1),
            new LambertMaterial({ color: 0xf4a460 }),
            0, 0, 0);
        plane.rotation.x = -0.5 * Math.PI;
        plane.name = "ground";
        scene.add(plane);
        console.log("Added Plane Primitive to scene...");
    
        // Add a Sphere to the Scene
        sphereGeometry = new SphereGeometry(2.5, 32, 32);
        sphereMaterial = new LambertMaterial({ color: 0xff0000 });
        sphere = new gameObject(sphereGeometry, sphereMaterial, 0, 2.5, 0);
        sphere.name = "The Red Planet";
       // scene.add(sphere);
        console.log("Added Sphere Primitive to the scene");
    
       // Point Light
        pointLight = new PointLight(0xffffff);
        pointLight.position.set(-4, 6, -4);
        scene.add(pointLight);
        console.log("Added pointLight to scene");
    
        // Tower Object
        towerGeometry = new CubeGeometry(2, 10, 2);
        towerMaterial = new LambertMaterial({color:0xc9c9c9});
        tower = new Mesh(towerGeometry, towerMaterial);
        tower.position.setY(5);
        scene.add(tower);
        console.log("Added Tower Object to scene");
        
        // Burnt Ground
        groundGeometry = new PlaneGeometry(16, 16);
        groundMaterial = new LambertMaterial({color: 0xe75d14});
        ground = new Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -0.5 * Math.PI;
        scene.add(ground);
        console.log("Added Burnt Ground to scene");
    
        // Add Helper Axis
        axes = new AxisHelper(30);
        ground.add(axes);
        console.log("Added Axis Helper Object to the ground");
    
    
         //add controls
        gui = new GUI();
        control = new Control(0.05, false);
        addControl(control);
    
        // Add framerate stats
        addStatsObject();
        console.log("Added Stats to scene...");

        document.body.appendChild(renderer.domElement);
        gameLoop(); // render the scene	

    }

    function addControl(controlObject: Control): void {
        gui.add(controlObject, 'rotationSpeed', -0.5, 0.5);
        gui.add(controlObject, "switchButton")
    }

    function addStatsObject() {
        stats = new Stats();
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        document.body.appendChild(stats.domElement);
    }

    // Setup main game loop
    function gameLoop(): void {
        stats.update();


        //sphere.rotation.y += control.rotationSpeed;


    
        // render using requestAnimationFrame
        requestAnimationFrame(gameLoop);
	
        // render the scene
        renderer.render(scene, camera);
                if(control.goDown) { 
              tower.position.y -= 0.1; 
         } 

    }

    // Setup default renderer
    function setupRenderer(): void {
        renderer = new Renderer();
        renderer.setClearColor(0xEEEEEE, 1.0);
        renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
        //renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        console.log("Finished setting up Renderer...");
    }

    // Setup main camera for the scene
    function setupCamera(): void {
        camera = new PerspectiveCamera(45, config.Screen.RATIO, 0.1, 1000);
        //camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.x = 0.6;
        camera.position.y = 16;
        camera.position.z = -20.5;
        camera.lookAt(new Vector3(0, 0, 0));
        console.log("Finished setting up Camera...");
    }

    window.onload = init;

    return {
        scene: scene
    }

})();

