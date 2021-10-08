
import * as THREE from "https://cdn.skypack.dev/three";

import { OrbitControls } from "https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js";
// Texture Loader
//
const loader = new THREE.TextureLoader()
const height = loader.load('./assets/png/height.png')
const texture = loader.load('./assets/jpeg/earth.jpeg')
// const alpha = loader.load('/alpha.jpg')


// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects

// const geometry = new THREE.PlaneBufferGeometry(2, 2, 64, 64)

const geometry = new THREE.SphereGeometry(2, 32, 16)

// Materials

const material = new THREE.MeshStandardMaterial(
  { color: 'gray',
    map: texture,
    // displacementMap: texture,
    // displacementScale: 0.1
  }
)

// Mesh

const plane = new THREE.Mesh(geometry, material)

// gui.add(plane.rotation, 'x').min(0).max(600)

scene.add(plane)

// Lights

const pointLight = new THREE.PointLight('#00b3ff', 2)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

// gui.add(pointLight.position, 'x')
// gui.add(pointLight.position, 'y')
// gui.add(pointLight.position, 'z')


const col = {color: '#483929'}

// gui.add(col, 'color').onChange(() => {
//   pointLight.color.set(col.color)
// })

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(95, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 1
camera.position.z = 8
scene.add(camera)

// Controls
 const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

document.addEventListener('mousemove', animateTerrain)

let mouseY = 0

function animateTerrain(event) {
  mouseY = event.clientY * 0.001
  console.log(mouseY)
}

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // sphere.rotation.y = .5 * elapsedTime
    plane.rotation.y = -.5 * elapsedTime
    plane.material.displacementScale = mouseY
    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
