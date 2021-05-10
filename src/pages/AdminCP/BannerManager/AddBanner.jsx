import { Button, Image, Row, Select } from "antd";
import swal from "sweetalert";

//REDUX && REACT
import { useSelector, useDispatch } from "react-redux";
import { useState } from 'react';
import { uploadBanner, getNewsAction } from "../../../redux/actions";
//
export default function AdminAddBanner() {
    const dispatch = useDispatch();
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedNews, setSelectedNews] = useState(null);
    const getImage = useSelector(state => state.adminReducer);
    const { loading, banner, newsList } = getImage
    function setFile(e) {
        setSelectedFile(e.target.files)
    }
    function uploadImage() {
        if (selectedNews === null || selectedFile === null) {
            swal("Vui lòng nhập đầy đủ thông tin", "", "error")
        } else {
            const formData = new FormData();
            formData.append("file", selectedFile[0]);
            formData.append("upload_preset", "tccvzctk");
            dispatch(uploadBanner(formData, selectedNews));
        }
    }
    return (
        <>
            <Row>
                <div style={{ textAlign: 'center', width: '100%', backgroundColor: '#f9f9f9' }}>
                    <h4 style={{ marginTop: '30px' }}>Thêm Banner</h4>
                </div>
                <div className="content3">
                    <div className="profile-holder">
                        <div class="form-group files">
                            <label>Ảnh Bìa</label>
                            <input type="file" className="form-control" onChange={setFile} accept="image/*" />
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <Select placeholder="Chọn tin tức..." onClick={() => { dispatch(getNewsAction()) }} onChange={(id) => { setSelectedNews(id) }}>
                                {newsList.map((item, index) => {
                                    return <Select.Option key={index} value={item.id_tintuc}>{item.tieude}</Select.Option>
                                })}
                            </Select>
                        </div>
                        <Button style={{ marginBottom: '20px' }} onClick={() => uploadImage()} type='primary'>Upload</Button>
                        {loading ? 'Uploading...' : null}
                        <div>
                            <Image src={banner} width={200} />
                        </div>
                    </div>
                </div>
            </Row>
        </>
    )
}