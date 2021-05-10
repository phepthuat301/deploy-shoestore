//CSS
import { Button, Form, Row, Input, Spin } from "antd";
import { Editor } from '@tinymce/tinymce-react';
import { ChromePicker } from 'react-color';
//REDUX && REACT
import { useSelector, useDispatch } from "react-redux";
import { useState } from 'react';
import swal from "sweetalert";
import { uploadAnhBia } from "../../../redux/actions/admin.action";
//
export default function AdminAddNews() {
    const { TextArea } = Input;
    const dispatch = useDispatch();
    const getUser = useSelector(state => state.userReducer);
    const { userInfo } = getUser;
    const getNews = useSelector(state => state.adminReducer);
    const { loading } = getNews;
    const [selectedFile, setSelectedFile] = useState(null);
    const [content, setContent] = useState("");
    //COLOR
    const [colorValue, setColorValue] = useState('#ddd');
    function setFile(e) {
        setSelectedFile(e.target.files)
    }
    function handleEditorChange(content, editor) {
        setContent(content)
    }
    function onFinish(values) {
        let newValues = {
            ...values,
            content,
            maubia: colorValue,
        }
        if (content === '' || selectedFile === null) {
            swal("Vui lòng chọn ảnh hoặc điền nội dung", "", "error")
        } else {
            const formData = new FormData();
            formData.append("file", selectedFile[0]);
            formData.append("upload_preset", "tccvzctk");
            dispatch(uploadAnhBia(formData, newValues))
        }
    }
    return (
        <Row>
            <div style={{ textAlign: 'center', width: '100%', backgroundColor: '#f9f9f9' }}>
                <h4 style={{ marginTop: '30px' }}>Thêm Tin Tức</h4>
            </div>
            <div className="content3">
                <div className="profile-holder">
                    <div class="form-group files">
                        <label>Ảnh Bìa</label>
                        <input type="file" className="form-control" onChange={setFile} accept="image/*" />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label>Chọn màu bìa</label>
                        <ChromePicker
                            color={colorValue}
                            onChange={(color)=>setColorValue(color.hex)}
                        />
                    </div>
                    <Form
                        onFinish={onFinish}
                        initialValues={
                            {
                                nguoiviet: userInfo[0]?.hoten,
                            }
                        }
                    >
                        <Form.Item
                            name="tieude"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tiêu đề!',
                                },
                            ]}
                        >
                            <TextArea showCount maxLength={100} placeholder="Nhập tiêu đề..." />
                        </Form.Item>
                        <Form.Item
                            name="nguoiviet"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tên!',
                                },
                            ]}
                        >
                            <Input style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                            name="loaitintuc"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập loại tin!',
                                },
                            ]}
                        >
                            <Input style={{ width: '100%' }} placeholder="Loại Tin Tức..." />
                        </Form.Item>
                        <Form.Item
                            name="tomtat"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tóm tắt!',
                                },
                            ]}
                        >
                            <TextArea showCount maxLength={150} placeholder="Nhập tóm tắt..." />
                        </Form.Item>
                        <Editor
                            apiKey='vay56zrvh9veuhcbway7pupzaoycpwvx06k3t4xzzsv3lfgv'
                            initialValue="<p>Đây là nội dung mặc định</p>"
                            init={{
                                height: 500,
                                menubar: true,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount'
                                ],
                                toolbar:
                                    'undo redo | formatselect | bold italic backcolor | \
                                                alignleft aligncenter alignright alignjustify | \
                                                bullist numlist outdent indent | removeformat | help'
                            }}
                            onEditorChange={handleEditorChange}
                        />
                        <Form.Item style={{ marginTop: '20px' }}>
                            <Button type="primary" htmlType="submit">
                                Thêm Bài Viết
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                {loading && <Spin size="large" />}
            </div>
        </Row>
    )
}