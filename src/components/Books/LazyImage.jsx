import React, { useRef, useEffect, useState } from 'react';
import {AspectRatio, Card, Skeleton} from "@mui/joy";
import {useTheme} from "../../utils/contexts/ThemeProvider";

const LazyImage = ({ src, alt, height, width }) => {
    const imageRef = useRef();
    const [isVisible, setIsVisible] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { root: null, rootMargin: '0px', threshold: 0.1 }
        );

        observer.observe(imageRef.current);

        return () => {
            if (imageRef.current) {
                observer.unobserve(imageRef.current);
            }
        };
    }, []);

    const handleImageLoad = () => {
        setIsLoaded(true);
    };

    const { theme } = useTheme()

    return (
        <div>
            {!isLoaded && (
                <Card variant="outlined" sx={{ zIndex: 1 }}>
                    <AspectRatio ratio="21/9">
                        <Skeleton variant="overlay">
                            <img
                                alt=""
                                height={height}
                                width={width}
                                src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                            />
                        </Skeleton>
                    </AspectRatio>
                </Card>
            )}
            <img
                ref={imageRef}
                src={isVisible ? src : ""}
                alt={alt}
                height={height}
                width={width}
                loading="lazy"
                style={{ opacity: isLoaded ? 1 : 0, padding: isLoaded ? 'auto' : 0, height: isLoaded ? 'auto' : 0, transition: 'opacity 0.5s ease-in-out' }}
                onLoad={handleImageLoad}
            />
        </div>
    );
};

export default LazyImage;
