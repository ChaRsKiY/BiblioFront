import styles from './BooksBlock.module.scss';
import {colors} from "../../../assets/styles/colors";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import Loader from "../../Misc/Loader";
import {AspectRatio, Card, Skeleton, Typography} from "@mui/joy";
import LazyImage from "../../Books/LazyImage";
import {useState} from "react";

const BooksBlock = ({books, title, category}) => {
    const {t} = useTranslation();

    const components = [1, 2, 3, 4, 5]

    return (
        <div className={styles.container}>
            <div className={styles.title} style={{color: colors.ORANGE}}>{title}</div>
            {books && books.length ? (
                <div className={styles.books}>
                    {books.map(el => (
                        <div key={el.id}>
                            <LazyImage alt={el?.title} src={`https://localhost:7000/Book/bookcover/${el.coverImage}`}/>
                            <div>{el?.title}</div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={styles.books}>
                    {components.map((el) => (
                        <Card variant="outlined" sx={{ display: 'flex', gap: 2, border: 0 }} key={el}>
                            <AspectRatio ratio="21/9" sx={{ height: '230px', zIndex: 0 }}>
                                <Skeleton variant="overlay">
                                    <img
                                        alt=""
                                        src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                                    />
                                </Skeleton>
                            </AspectRatio>
                            <Typography>
                                <Skeleton>
                                    Lorem ipsum is placeholder
                                </Skeleton>
                            </Typography>
                        </Card>
                    ))}
                </div>
            )}
            <Link to={'/' + category} style={{color: colors.GRAY}}>{t('SeeMore')}</Link>
        </div>
    )
}

export default BooksBlock;