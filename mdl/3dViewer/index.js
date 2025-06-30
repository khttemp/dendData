import * as THREE from 'three';
import { GLTFLoader } from "GLTFLoader";
import { OrbitControls } from "OrbitControls";

document.addEventListener('DOMContentLoaded', load)

function load() {
    let params = new URLSearchParams(window.location.search);
    let model = params.get("model");
    let modelPath = "./model/" + model + ".glb";
    // Canvas
    const canvas = document.getElementById("canvas");

    // 画面サイズの取得
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(windowWidth, windowHeight)

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#cccccc');

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(60, windowWidth / windowHeight, 0.1, 10000);
    camera.position.set(-1.5, 1.5, -5)

    // ライトの作成
    const light = new THREE.DirectionalLight(0xffffff, 5)
    light.position.set(-5, 5, 5)
    scene.add(light)

    const light2 = new THREE.DirectionalLight(0xffffff, 5)
    light2.position.set(5, -5, -5)
    scene.add(light2)

    // 3Dモデルの読み込み
    const loader = new GLTFLoader();
    loader.load(modelPath, function (gltf) {
        const model = gltf.scene;
        model.scale.set(0.15, 0.15, 0.15);
        model.traverse((object) => { //モデルの構成要素をforEach的に走査
            if(object.isMesh) { //その構成要素がメッシュだったら
                object.material.transparent = true;
            }
        });
        scene.add(model);
    });

    // OrbitControlsの読み込み
    const controls = new OrbitControls(camera, renderer.domElement)

    const tick = () => {
        controls.update()
        renderer.render(scene, camera)
        requestAnimationFrame(tick)
    }
    tick()
}