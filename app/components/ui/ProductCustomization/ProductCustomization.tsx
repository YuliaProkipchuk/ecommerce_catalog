import classes from './ProductCustomization.module.scss';
import { AddButton } from '../Button/AddButton/AddButton';
import { CapacityButton } from '../Button/CapacityButton/CapacityButton';
import { ColorChangButton } from '../Button/ColorChangButton/ColorChangButton';
import { LikeButton } from '../Button/LikeButton/LikeButton';
import { FullProduct } from '@/app/types/fullProduct';

interface ProductProps {
  products: FullProduct
}

export function ProductCustomization({ products }: ProductProps) {

  return (
    <>

      <div className={classes.castomization}>
        <div>
          <div className={classes.head__text}>
            <p className={classes.color__text}>Available colors</p>
            {/* <p className={classes.id__text}>ID: {products.namespaceId}</p> */}
          </div>

          <div className={classes.available__color}>
            <ColorChangButton
              colors={products.colorsAvailable}
              activeColor={products.color}
              activeCapacity={products.capacity}
              itemId={products.namespaceId}
            />

          </div>
        </div>

        <p className={classes.capacity__text}>Select capacity</p>
        <div className={classes.capacity}>
          <CapacityButton
            capacity={products.capacityAvailable}
            activeCapacity={products.capacity}
            itemId={products.namespaceId}
            activeColor={products.color}
          />
        </div>

        <div className={classes.price}>
          <p className={classes.price__current}>${products.priceDiscount}</p>
          <p className={classes.wrong__price}>${products.priceRegular}</p>
        </div>

        <div className={classes.buttons}>
          <AddButton />
          <LikeButton />
        </div>

        <div className={classes.blok}>
          <div className={classes.info__blok}>
            <p className={classes.parameter}>Screen</p>
            <p className={classes.info}>{products.screen}</p>
          </div>

          <div className={classes.info__blok}>
            <p className={classes.parameter}>Resolution</p>
            <p className={classes.info}>{products.resolution}</p>
          </div>

          <div className={classes.info__blok}>
            <p className={classes.parameter}>Processor</p>
            <p className={classes.info}>{products.processor}</p>
          </div>

          <div className={classes.info__blok}>
            <p className={classes.parameter}>RAM</p>
            <p className={classes.info}>{products.ram}</p>
          </div>
        </div>
      </div>

    </>
  );
}
