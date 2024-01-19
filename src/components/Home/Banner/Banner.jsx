import styles from './Banner.module.scss';
import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect, useState } from 'react';
import LibraryImage from '../../../assets/images/library.png';
import HomeLibrary from '../../../assets/images/homelibrary.jpg';
import BooksImage from '../../../assets/images/books_background.png';

const Banner = () => {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 6000,
    };

    const { t } = useTranslation();

    const [slides, setSlides] = useState([]);

    useEffect(() => {
        setSlides([
            { image: LibraryImage, title: t('BannerTitle'), description: t('BannerText') },
            { image: HomeLibrary, title: t('BannerTitle1'), description: t('BannerText1') },
            { image: BooksImage, title: t('BannerTitle2'), description: t('BannerText2') },
        ]);
    }, [LibraryImage, t]);

    useEffect(() => {
        // Check if slides is not empty before accessing its elements
        if (slides.length > 0) {
            console.log(`url(${(`../../../assets/images/${slides[0].image}`)})`);
        }
    }, [slides]);

    return (
        <Slider {...settings}>
            {slides.map((slide, index) => (
                <div key={index} className={styles.container}>
                    <div className={styles.image} style={{ backgroundImage: `url(${slide.image})` }} />
                    <div className={styles.item}>
                        <div className={styles.title}>{slide.title}</div>
                        <div className={styles.desc}>{slide.description}</div>
                    </div>
                </div>
            ))}
        </Slider>
    );
};

export default Banner;

