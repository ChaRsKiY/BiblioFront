import {useTheme} from "../../utils/contexts/ThemeProvider";
import {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Modal} from "@mui/joy";
import SettingModalDialog from "./SettingsModalDialog";
import TabButtons from "./TabButtons";
import PageSwitchButtons from "./PageSwitchButtons";
import axios from "axios";
import tokenStore from "../../stores/TokenStore";
import {IoColorPaletteOutline} from "react-icons/io5";
import userStore from "../../stores/UserStore";

const ReadSection = ({ content, page, setPage, totalPages, setSettings, settings, bookId }) => {
    const colors = [
        "orange",
        "red",
        "green",
        "blue"
    ]

    const { user } = userStore

    const { theme } = useTheme()
    const [numberInput, setNumberInput] = useState(1)
    const [isFullScreen, setIsFullScreen] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [bookmarks, setBookmarks] = useState([])
    const [selectedColorIndex, setSelectedColorIndex] = useState(0);

    const { token } = tokenStore

    const handleInputChanged = (e) => {
        if (e.target.value > totalPages) {
            setNumberInput(totalPages)
        } else if (e.target.value <= 0) {
            setNumberInput(1)
        } else {
            setNumberInput(e.target.value)
        }
    }

    const handleJumpClicked = () => {
        if (numberInput > 0 && numberInput <= totalPages) {
            setPage(numberInput)
        }
    }

    const handleBookMarkClicked = async () => {
        const bookmarkExists = bookmarks.some(bookmark => bookmark.pageNumber === page);
        if (bookmarkExists) {
            const updatedBookmarks = bookmarks.filter(bookmark => bookmark.pageNumber !== page);
            setBookmarks(updatedBookmarks);
            await axios.delete(`Bookmarks?bookId=${bookId}&page=${page}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
        } else {
            const newBookmark = { pageNumber: page, color: selectedColorIndex, bookId: bookId };
            setBookmarks(prev => [...prev, newBookmark]);
            await axios.post('Bookmarks', newBookmark, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
        }
    }

    const handleChangeColorClicked = async () => {
        let newColor = selectedColorIndex;

        if (selectedColorIndex === colors.length - 1) {
            setSelectedColorIndex(0)
            newColor = 0;
        }
        else {
            setSelectedColorIndex(prev => prev + 1);
            newColor++;
        }

        const newBookmark = { pageNumber: page, color: newColor, bookId: bookId }

        await axios.post('Bookmarks', newBookmark, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    }

    const getBookmarks = async () => {
        const response = await axios.get(`Bookmarks/${bookId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        setBookmarks(response.data)
    }

    useEffect(() => {
        if(user)
            getBookmarks()
    }, []);

    useEffect(() => {
        if (user && bookmarks) {
            const bookmark = bookmarks.find(el => el.pageNumber === page);
            if (bookmark) {
                setSelectedColorIndex(bookmark.color);
            }
        }
    }, [page, bookmarks])

    const { t } = useTranslation()

  return (
      <div
          className={!isFullScreen ? "mx-6 my-10 p-5 bg-gray-100 rounded-xl flex flex-col justify-between" : "flex flex-col justify-between p-5 bg-gray-100 h-svh fixed top-0 right-0 left-0 bottom-0 z-40"}
          style={{backgroundColor: theme === 'light' ? '' : '#626262', color: theme === 'light' ? '#000' : '#fff'}}>
          {user && <div className="relative top-0 ml-[20%] flex max-sm:right-0 max-sm:left-0 max-sm:w-full max-sm:m-0 max-sm:mb-4">
              <div
                  onDoubleClick={handleBookMarkClicked}
                  className={`w-6 h-14 rounded-br-2xl rounded-bl-2xl rounded-tr-[5px] rounded-tl-[5px] border-2 mt-[-20px] ease-in-out duration-300 hover:h-16 cursor-pointer max-sm:w-full max-sm:h-9 max-sm:rounded-b-2xl max-sm:hover:h-9 max-sm:hover:bg-opacity-85 ` + (bookmarks.find(el => el.pageNumber === page) ? `bg-${colors[selectedColorIndex]}-300 border-0` : `border-${colors[selectedColorIndex]}-500`)}></div>
              <div
                  onClick={handleChangeColorClicked}
                  className="ml-2 max-sm:mt-[-13px]"
              >
                  <IoColorPaletteOutline size={24} color={colors[selectedColorIndex]}
                                         className="duration-300 hover:rotate-45 hover:scale-110"/>
              </div>
          </div>}
          <div className="flex justify-between">
              <div
                  className={!isFullScreen ? "mb-5 text-[1.25rem] text-orange-400" : "mb-3 text-[1.15rem] text-orange-400"}>
                  {t('Page')}: {page}
              </div>

              <div className="space-x-3">
                  <input onChange={handleInputChanged} placeholder="Page" type="number"
                         className="py-1 px-3 rounded outline-orange-300 w-20 sm:w-28" value={numberInput}/>
                  <button onClick={handleJumpClicked}
                          className="text-white rounded py-1 px-3 bg-orange-300 hover:bg-orange-400">{t('Jump')}</button>
              </div>
          </div>

          <div className="hidden text-[1.5rem]"></div>
          <div className="hidden text-[1.75rem]"></div>
          <div className="hidden text-[2rem]"></div>

          <div
              className={!isFullScreen ? `text-[${1.0 + (settings.textsize - 1) * 0.25}rem] sm:text-[${1.0 + (settings.textsize - 1) * 0.25}rem]` : `text-[${1.0 + (settings.textsize - 1) * 0.25}rem] sm:text-[${1.0 + (settings.textsize - 1) * 0.25}rem] overflow-scroll`}>
              {content && content.map((el, key) => (
                  <p key={key}>{el}</p>
              ))}
          </div>


          <div className="flex items-center justify-center mt-5 h-fit">
              <PageSwitchButtons setPage={setPage} totalPages={totalPages} page={page}/>

              <TabButtons setIsModalOpen={setIsModalOpen} setIsFullScreen={setIsFullScreen}/>

              <Modal
                  aria-labelledby="modal-title"
                  aria-describedby="modal-desc"
                  open={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
              >
                  <SettingModalDialog setSettings={setSettings} settings={settings} setIsModalOpen={setIsModalOpen}/>
              </Modal>
          </div>
      </div>
  )
}

export default ReadSection