import {genres} from '../../data/genres'
import {useState} from "react";

const Rating = ({ styles, setSelectedStars }) => {
    const rating = ["9-10", "7-8", "5-6", "3-4", "1-2"]

    const handleRatingChanged = (e) => {
        setSelectedStars(prev => {
            if (prev.includes(e.target.name.toString().split('-')[0])) {
                return prev.filter(stars => stars !== e.target.name.toString().split('-')[0] && stars !== e.target.name.toString().split('-')[1]);
            } else {
                return [...prev, e.target.name.toString().split('-')[0], e.target.name.toString().split('-')[1]]
            }
        });
    }

    return (
        <div className={styles.addcontainer}>
            <div className={styles.title}>Rating</div>

            {rating.map((el, key) => (
                <div className={styles.content} key={key}>
                    <label className={styles.checkBox}>
                        <input id="ch1" type="checkbox" name={el} onChange={handleRatingChanged}/>
                        <div className={styles.transition}></div>
                    </label>
                    <div className={styles.text}>{el}</div>
                </div>
            ))}
        </div>
    )
}

export default Rating