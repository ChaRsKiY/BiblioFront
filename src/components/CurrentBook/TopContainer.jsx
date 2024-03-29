import LazyImage from "../Books/LazyImage";
import {useTheme} from "../../utils/contexts/ThemeProvider";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import axios from "axios";
import tokenStore from "../../stores/TokenStore";
import userStore from "../../stores/UserStore";

const TopContainer = ({ styles, book }) => {
    const { t } = useTranslation()

    const { token } = tokenStore
    const { user } = userStore

    const downloadFile = async () => {
        try {
            const response = await axios.get('Book/download-content/' + book.id, {
                responseType: 'blob',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', book.title);
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    const handleDownload = () => {
        downloadFile();
    };

  return (
      <div className={styles.topcontainer}>
          <div className={styles.left}>
              <div className={styles.title}>{book.title}</div>
              <div className={styles.description}>{book.description}</div>
              <div className={styles.misc}>
                  <div>{t('Author')}: {book.author}</div>
                  <div>{t('Rating')}: {book.rating || 0}/10</div>
              </div>
              <div className={styles.year}>{t('Year')}: {new Date(book.year).getFullYear()}</div>
              <div className={styles.year}>{t('Published')}: {new Date(book.publicationDate).toLocaleDateString()}</div>
              <div className={styles.year}>{t('Posted by')}: {book.userName}</div>
              <div className={styles.counters}>
                  <div>{t('Downloads')}: {book?.downloadCount || 0}</div>
                  <div>{t('Reads')}: {book?.readCounter || 0}</div>
              </div>
              {user && <div className="flex items-center mt-3">
                  <button className="self-start bg-orange-300 text-white px-2 py-1 rounded hover:bg-orange-400 disabled:bg-orange-100" onClick={handleDownload}>Download Book</button>
              </div>}
          </div>
          <div className={styles.right}>
              <LazyImage src={'https://localhost:7000/Book/bookcover/' + book.coverImage} alt={book.title}/>
          </div>
      </div>
  )
}

export default TopContainer