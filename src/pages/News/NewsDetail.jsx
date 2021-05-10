import parse from 'html-react-parser';
//REDUX && REACT
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { getNewsDetailAction, removeNewsDetailAction } from '../../redux/actions';

export default function NewsDetail(props) {
    const { match } = props
    const dispatch = useDispatch();
    const getNews = useSelector(state => state.adminReducer);
    const { newsDetail, loading } = getNews;
    useEffect(() => {
        dispatch(getNewsDetailAction(match.params.id));
        return () => {
            dispatch(removeNewsDetailAction())
        }
    }, []);
    return (
        <article className="news-container">
            <div
                className="news-banner parallax"
                style={{
                    backgroundColor: `${newsDetail.maubia}`,
                    backgroundSize: 'cover',
                    backgroundSize: '100% 600px',
                    backgroundRepeat: 'no-repeat'
                }}>
                <div
                    className="img-banner"
                    style={{
                        backgroundImage: `url("${newsDetail.anhbia}")`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat'
                    }}>
                </div>
            </div> 

            <div className="news-content">
                <div className="content-news">
                    <header className="content-header">
                        <div className="header-date">
                            <span className="date">{newsDetail.ngayviet?.replace("T", " ").substr(0, 19)}</span>
                        </div>
                        <h1 className="header-title">{newsDetail.tieude}</h1>
                    </header>
                    <div className="content-body">
                        {parse(`${newsDetail.noidung}`)}
                    </div>
                    <footer className="content-footer">
                        <span className="author">Đăng bởi {newsDetail.nguoiviet}</span>
                    </footer>
                </div>
            </div>
        </article>
    )
}