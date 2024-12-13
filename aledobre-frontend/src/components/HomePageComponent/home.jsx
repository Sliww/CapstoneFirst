import './home.css';
import { HeroSection } from './HeroSectionComponent/HeroSection';
import { ThreeCards } from './ThreeCardsComponent/ThreeCards';
import { TextBannerComponent } from './TextBannerComponent/Text';
import { BigButton } from './BigButtonComponent/BigButton';

export const Home = () => {
    return (
        <>
            <HeroSection/>
            <ThreeCards/>
            <TextBannerComponent/>
            <BigButton/>
        </>
    )
}