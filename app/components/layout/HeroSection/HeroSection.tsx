import cs from './HeroSection.module.scss';
import { SliderHero } from '@/app/components/ui/SliderHero/SliderHero';
type Props = {
  title: string;
};
export const HeroSection = ({ title }: Props) => {
  return (
    <div>
      <div className={cs.container_title}>
        <div className={cs.container_padding_hero}>
          <h1 className={cs.h1}>{title}</h1>
        </div>
        <div className="container-slider">
          <SliderHero />
        </div>
      </div>
    </div>
  );
};
