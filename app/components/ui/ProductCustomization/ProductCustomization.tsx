import classes from './ProductCustomization.module.scss';
import { AddButton } from '../Button/AddButton/AddButton';
import { CapacityButton } from '../Button/CapacityButton/CapacityButton';
import { ColorChangButton } from '../Button/ColorChangButton/ColorChangButton';
import { LikeButton } from '../Button/LikeButton/LikeButton';

export function ProductCustomization() {
  return (
    <div className={classes.castomization}>
      <div>
        <div className={classes.head__text}>
          <p className={classes.color__text}>Available colors</p>
          <p className={classes.id__text}>ID: 1234</p>
          {/*  Display product ID instead of hardcoded value  */}
        </div>

        <div className={classes.available__color}>
          <ColorChangButton />
          <ColorChangButton />
          <ColorChangButton />
          <ColorChangButton />
        </div>
      </div>

      <p className={classes.capacity__text}>Select capacity</p>
      <div className={classes.capacity}>
        <CapacityButton />
        <CapacityButton />
        <CapacityButton />
      </div>

      <div className={classes.price}>
        <p className={classes.price__current}>$799</p>
        <p className={classes.wrong__price}>$1594</p>
      </div>

      <div className={classes.buttons}>
        {/* <AddButton product={product} /> */}
        {/* when data is there */}
        <LikeButton filled={false} />
      </div>

      <div className={classes.blok}>
        <div className={classes.info__blok}>
          <p className={classes.parameter}>Screen</p>
          <p className={classes.info}>8.5' IPS</p>
        </div>

        <div className={classes.info__blok}>
          <p className={classes.parameter}>Resolution</p>
          <p className={classes.info}>N/A</p>
        </div>

        <div className={classes.info__blok}>
          <p className={classes.parameter}>Processor</p>
          <p className={classes.info}>N/A</p>
        </div>

        <div className={classes.info__blok}>
          <p className={classes.parameter}>RAM</p>
          <p className={classes.info}>6 GB</p>
        </div>
      </div>
    </div>
  );
}
