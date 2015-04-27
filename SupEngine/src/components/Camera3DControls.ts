import * as THREE from "three";
import ActorComponent from "../ActorComponent";
import Actor from "../Actor";
import Camera from "./Camera";

let tmpMovement = new THREE.Vector3();
let tmpQuaternion = new THREE.Quaternion();
let forwardVector = new THREE.Vector3(0, 1, 0);

export default class Camera3DControls extends ActorComponent {
  camera: Camera;
  rotation: THREE.Euler;

  constructor(actor: Actor, camera: Camera) {
    super(actor, "Camera3DControls");

    this.camera = camera;
    this.rotation = actor.getLocalEulerAngles();
  }

  update() {
    let movementSpeed = 0.1;

    let keyButtons = this.actor.gameInstance.input.keyboardButtons;
    let keyEvent = (<any>window).KeyEvent; // Workaround for unknown KeyEvent property on window object

    tmpMovement.setX(
      (keyButtons[keyEvent.DOM_VK_A].isDown || keyButtons[keyEvent.DOM_VK_Q].isDown) ? -movementSpeed :
      ((keyButtons[keyEvent.DOM_VK_D].isDown) ? movementSpeed :
      0));

    tmpMovement.setZ(
      (keyButtons[keyEvent.DOM_VK_W].isDown || keyButtons[keyEvent.DOM_VK_Z].isDown) ? -movementSpeed :
      ((keyButtons[keyEvent.DOM_VK_S].isDown) ? movementSpeed :
      0 ));

    tmpMovement.setY(
      (keyButtons[keyEvent.DOM_VK_SPACE].isDown) ? movementSpeed :
      ((keyButtons[keyEvent.DOM_VK_SHIFT].isDown) ? -movementSpeed :
      0 ));

    tmpMovement.applyQuaternion(tmpQuaternion.setFromAxisAngle(forwardVector, this.rotation.y));
    this.actor.moveLocal(tmpMovement);

    // Camera rotation
    if (this.actor.gameInstance.input.mouseButtons[1].isDown ||
    (this.actor.gameInstance.input.mouseButtons[0].isDown && keyButtons[keyEvent.DOM_VK_ALT].isDown)) {
      this.rotation.x -= this.actor.gameInstance.input.mouseDelta.y / 250
      this.rotation.y -= this.actor.gameInstance.input.mouseDelta.x / 250
      this.actor.setLocalEulerAngles(this.rotation);
    }
  }
}