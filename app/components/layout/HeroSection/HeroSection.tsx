import cs from './HeroSection.module.scss'
import {useTranslations} from "next-intl";
import {SliderHero} from "@/app/components/ui/SliderHero/SliderHero";
export const HeroSection = () => {
    const t = useTranslations()
    return (
        <div>
            <div className={cs.container_title}>
                <div className={cs.container_padding_hero}>
                    <h1 className={cs.h1}>{t('hero-section.title')}</h1>
                </div>
                <div className="container-slider">
                    <SliderHero/>
                </div>
            </div>
        </div>
    )
}