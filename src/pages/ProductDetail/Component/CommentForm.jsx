//CSS
import { Form, Input, Button } from 'antd';
import StarRatings from 'react-star-ratings';
import swal from 'sweetalert';
//REACT && REDUX
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createCommentAction, createReplyAction } from '../../../redux/actions/comment.action';
//COMPONENTS
import ReplyForm from './ReplyForm';



function CommentForm(props) {

  const { TextArea } = Input;
  //REDUX
  const dispatch = useDispatch();
  const getUser = useSelector(state => state.userReducer);
  const { userInfo } = getUser;
  //STATE
  const [selectStar, setSelectStar] = useState("");
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [showCommentButton, setShowCommentButton] = useState(true)
  //PROPS
  const { id_giay, commentList } = props
  //USE EFFECT
  const changeRating = (newRating) => {
    setSelectStar({
      rating: newRating
    });
  }


  const onFinish = (values) => {
    if (selectStar === "") {
      swal("Vui lòng chọn số sao", "", "warning")
    } else {
      const newValues = {
        ...values,
        sosao: selectStar.rating,
        id_giay,
        id_user: userInfo[0]?.id_user,
        ngayviet: new Date().toISOString(),
      }
      dispatch(createCommentAction(newValues))
      setShowCommentButton(true);
      setShowCommentForm(false);
    }
  };

  const onShowCommentButton = (value) => {
    setShowCommentButton(value);
  }

  const onHandleChange = (value) => {
    setShowCommentForm(value);
  }
  return (
    <>
      {commentList.map((item,index) => {
        let ngay = item.ngayviet.substr(8, 2)
        let thang = item.ngayviet.substr(5, 2)
        let nam = item.ngayviet.substr(0, 4)
        let ngayviet = ngay + " Tháng " + thang + ", " + nam
        return (
          <>
            <div className="comment-list" key={index}>
              <div className="comment-header">
                <StarRatings
                  name='rating'
                  rating={item.sosao}
                  starRatedColor='#fadb14'
                  starDimension="15px"
                  starSpacing="2px"
                />
                <h6 className="comment-title">{item.tieude.toUpperCase()}</h6>
              </div>
              <div className="comment-content">
                <p>{item.noidung}</p>
              </div>
              {item.phanhoi && (
                <div className="comment-reply">
                  <p>{item.phanhoi}</p>
                  <p>- {item.tenqtv}</p>
                </div>
              )}
              <span className="write-date">{item.hoten} vào {ngayviet}</span><br />
              {userInfo[0]?.role === 'admin' && (
                <ReplyForm key={index} userInfo={userInfo} id_binhluan={item.id_binhluan}/>
              )}
            </div>
          </>
        )
      })}

      <button
        className="show-hide-button"
        onClick={() => { onHandleChange(true); onShowCommentButton(false) }}
        style={{ display: showCommentButton ? "block" : "none" }}
      >
        <span className="review-show-button">Viết Đánh Giá</span>
      </button>

      <div
        className="comment-form"
        style={{ display: showCommentForm ? "block" : "none" }}
      >
        <StarRatings
          name='rating'
          rating={selectStar.rating}
          changeRating={changeRating}
          starRatedColor='#fadb14'
          starHoverColor='#fadb14'
          starDimension="20px"
          starSpacing="2px"
        />
        <Form
          onFinish={(onFinish)}
          initialValues={
            {
              hoten: userInfo[0]?.hoten,
            }
          }
        >
          <Form.Item
            name="hoten"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên!',
              },
            ]}
          >
            <Input placeholder="Nhập Tên..." style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="tieude"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tiêu đề!',
              },
            ]}
          >
            <Input placeholder="Nhập Tiêu Đề..." maxLength={200} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="noidung"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập bình luận!',
              },
            ]}
          >
            <TextArea showCount maxLength={200} placeholder="Nhập bình luận..." />
          </Form.Item>
          <Form.Item>
            <div className="comment-button">
              <button type="primary" htmlType="submit" className="send-review-btn">
                <span className="review-show-button">Gửi Bình Luận</span>
              </button>
              <button type="danger" onClick={() => { onHandleChange(false); onShowCommentButton(true)}} className="send-review-btn cancel-button">
                Hủy
              </button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </>

  )
}

export default CommentForm
