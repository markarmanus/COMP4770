import ComponentTypes from "../../../ComponentTypes";
import Component from "../../../Component";
export default class MovableC extends Component {
  constructor({
    velocity,
    maxVelocity,
    friction,
    accerlationSpeed,
    jumpForce,
    maxJumps,
    jumpCooldown,
    gravityForceScaler,
    doubleJumpForceScale,
    dashSpeed,
    dashCooldown
  }) {
    super(ComponentTypes.MOVABLE);
    this.velocity = velocity;
    this.maxVelocity = maxVelocity;
    this.friction = friction;
    this.currentVelocity = 0;
    this.accerlationSpeed = accerlationSpeed;
    this.jumpForce = jumpForce;
    this.maxJumps = maxJumps;
    this.jumpCooldown = jumpCooldown;
    this.timeSinceJump = 0;
    this.currentjumpForce = 0;
    this.isJumping = false;
    this.jumpsCounter = 0;
    this.gravityForceScaler = gravityForceScaler;
    this.doubleJumpForceScale = 1 - doubleJumpForceScale;
    this.dashCooldown = dashCooldown;
    this.dashSpeed = dashSpeed;
    this.timeSinceDash = 0;
    // Split the dashing over multiple frames where each frame we will move 10 units.
    this.totalDashFrames = this.dashSpeed / 10;
    this.currentDashFrame = 0;
    this.isDashingTo = null;
  }
}
