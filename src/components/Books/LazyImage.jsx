import React, { useRef, useEffect, useState } from 'react';
import Loader from "../Misc/Loader";
import {AspectRatio, Card, Skeleton, Typography} from "@mui/joy";

const LazyImage = ({ src, alt }) => {
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

    return (
        <div>
            {!isLoaded && (
                <Card variant="outlined" sx={{ display: 'flex', gap: 2, border: 0 }}>
                    <AspectRatio ratio="21/9" sx={{ height: '230px', zIndex: 0, display: 'block' }}>
                        <Skeleton variant="overlay">
                            <img
                                alt=""
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
                loading="lazy"
                style={{ opacity: isLoaded ? 1 : 0, padding: isLoaded ? 'auto' : 0, height: isLoaded ? 'auto' : 0, transition: 'opacity 0.5s ease-in-out' }}
                onLoad={handleImageLoad}
            />
        </div>
    );
};

export default LazyImage;
