import ComponentTypes from "../../../ComponentTypes";
import RenderableC from "../../Components/RenderableC";
import AnimatedC from "../../Components/AnimatedC";
import CollidableC from "../Components/CollidableC";
import CheckPointC from "../Components/CheckPointC";
import ControllableC from "../../Components/ControllableC";
import MovableC from "../Components/MovableC";
import MultiSpritesC from "../Components/MultiSpritesC";
import PhysicalC from "../Components/PhysicalC";
import HealthC from "../Components/HealthC";
import FocusC from "../Components/FocusC";
import CurrencyC from "../Components/CurrencyC";
import FollowC from "../Components/FollowC";
import LifeTimeC from "../Components/LifeTimeC";
import SeekC from "../Components/SeekC";
import ChargeC from "../Components/ChargeC";
import WeaponsC from "../Components/WeaponsC.js";
import AiC from "../Components/AiC.js";
import DamageC from "../Components/DamageC.js";

const ComponentClasses = {
  [ComponentTypes.RENDERABLE]: RenderableC,
  [ComponentTypes.ANIMATED]: AnimatedC,
  [ComponentTypes.CONTROLABLE]: ControllableC,
  [ComponentTypes.MOVABLE]: MovableC,
  [ComponentTypes.MULTI_SPRITES]: MultiSpritesC,
  [ComponentTypes.COLLIDABLE]: CollidableC,
  [ComponentTypes.PHYSICAL]: PhysicalC,
  [ComponentTypes.HEALTH]: HealthC,
  [ComponentTypes.FOCUS]: FocusC,
  [ComponentTypes.CURRENCY]: CurrencyC,
  [ComponentTypes.FOLLOW]: FollowC,
  [ComponentTypes.LIFE_TIME]: LifeTimeC,
  [ComponentTypes.SEEK]: SeekC,
  [ComponentTypes.CHARGE]: ChargeC,
  [ComponentTypes.WEAPONS]: WeaponsC,
  [ComponentTypes.AI]: AiC,
  [ComponentTypes.DAMAGE]: DamageC,
  [ComponentTypes.CHECKPOINT]: CheckPointC,
};
export default ComponentClasses;
