import './styles.css'
//REDUX && REACT
import { getNewsAction, removeNewsAction } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
//HISTORY
import history from '../../utils/history';
export default function News() {
    const dispatch = useDispatch();
    const getNewsContent = useSelector(state => state.adminReducer);
    const { newsList } = getNewsContent;
    useEffect(() => {
        dispatch(getNewsAction());
        return () => {
            dispatch(removeNewsAction())
        }
    }, []);
    newsList.forEach(item => {
        item.ngayviet = item.ngayviet.replace("T", " ").substr(0, 19)
    })
    return (
        <>
            <h1 className='newstitle'>Tất Cả Bài Viết</h1>
            <div className="news">
                {newsList.map((item, index) => {
                    return (
                        <article key={index} className="news-item">
                            <p onClick={()=>{history.push(`/news/${item.id_tintuc}`)}} className="article-thumbnail img-container img-hover">
                                <img className="img-article" src={item.anhbia} alt="IMG news" />
                            </p>
                            <header>
                                <p className="article-title" onClick={()=>{history.push(`/news/${item.id_tintuc}`)}}>{item.tieude}</p>
                                <p className="article-meta">
                                    <span className="news-time">{item.ngayviet}</span>
                                    <span className="news-category">{item.loaitintuc}</span>
                                </p>
                                <p className="article-summary">{item.tomtat}</p>
                            </header>
                        </article>
                    )
                })}
            </div>

        </>
    )
}