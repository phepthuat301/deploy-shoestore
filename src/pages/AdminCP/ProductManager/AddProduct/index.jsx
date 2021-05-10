//CSS
import { Tabs, Form, Input, Button, InputNumber, Select, Row } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
import './styles.css'
//REDUX && REACT
import { useSelector, useDispatch } from "react-redux";
import {
    getShoeTypeAction,
    createGalleryAction,
    upLoadFile,
    getShoeAction,
    getShoeColorAction,
    getShoeSizeAction,
    createShoeAction,
    createShoeDetailAction,
    removeShoeDetailAction,
    getDistinctColorAction,
    removeShoeAction,
    removeShoeTypeAction,
    removeShoeColorAction,
    removeShoeSizeAction,
    removeShoeColorActionDistinct,
}
    from "../../../../redux/actions";
import { useEffect, useState } from 'react';
function AddProduct() {
    const dispatch = useDispatch();
    const getShoeType = useSelector(state => state.adminReducer);
    const getShoe = useSelector(state => state.productReducer);
    const { shoeTypeList, shoeColorList, shoeSizeList, distinctColor, loading, error } = getShoeType;
    const { shoeList } = getShoe;
    const [selectedFile, setSelectedFile] = useState(null);
    useEffect(() => {
        dispatch(getShoeTypeAction());
        dispatch(getShoeAction());
        dispatch(getShoeColorAction());
        dispatch(getShoeSizeAction());
        return () => {
            dispatch(removeShoeDetailAction());
            dispatch(removeShoeAction());
            dispatch(removeShoeTypeAction());
            dispatch(removeShoeColorAction());
            dispatch(removeShoeSizeAction());
            dispatch(removeShoeColorActionDistinct());
        }
    }, []);
    const { TabPane } = Tabs;
    let noidung = "Không có chi tiết";
    function handleEditorChange(content, editor) {
        noidung = content
    }
    const onFinish = (values) => {
        if (!selectedFile) {
            alert('Vui lòng chọn ảnh')
        } else {
            let hinhanh = selectedFile[0].name
            const newValues = {
                ...values,
                hinhanh,
                noidung,
            }
            dispatch(createShoeAction(newValues))
            dispatch(upLoadFile(selectedFile))
        }
    };
    const onFinishDetail = (values) => {
        dispatch(createShoeDetailAction(values))

    };
    const onFinishGallery = (values) => {
        let image = [];
        for (let i = 0; i < selectedFile.length; i++) {
            image.push(selectedFile[i].name)
        }
        const newValues = {
            ...values,
            image,
        };
        dispatch(createGalleryAction(newValues))
        dispatch(upLoadFile(selectedFile))
    };

    function handleChange(values) {
        dispatch(getDistinctColorAction(values));
    }

    function setFile(e) {
        setSelectedFile(e.target.files)
    }

    return (
        <>
            <Row>
                <div style={{ textAlign: 'center', width: '100%', backgroundColor: '#f9f9f9' }}>
                    <h4>Thêm Giày</h4>
                </div>
                    <div className="content3">
                        <div className="profile-holder">

                            <Tabs defaultActiveKey="1">
                                <TabPane tab="Thêm Giày" key="1">
                                    <Form
                                        name="createshoe"
                                        initialValues={{
                                            remember: true,
                                        }}
                                        onFinish={onFinish}
                                    >
                                        <Form.Item
                                            name="tengiay"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập tên giày...',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Nhập tên giày..." />
                                        </Form.Item>

                                        <Form.Item

                                            name="tenmagiay"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập tên mã giày...',
                                                },
                                            ]}
                                        >
                                            <Input placeholder="Nhập tên mã giày..." />
                                        </Form.Item>

                                        <Form.Item
                                            label="Giá Bán: "
                                            name="giaban"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập giá bán...',
                                                },
                                                
                                            ]}
                                        >
                                            <InputNumber
                                                style={{ width: 500 }}
                                                min={1}
                                                max={10000000}
                                                formatter={value => `VNĐ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                parser={value => value.replace(/\VNĐ\s?|(,*)/g, '')}
                                            // onChange={onChange}
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            name="giakm"
                                            label="Giá KM: "
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập giá khuyến mãi...',
                                                },
                                            ]}
                                        >
                                            <InputNumber
                                                style={{ width: 500 }}
                                                min={1}
                                                max={10000000}
                                                formatter={value => `VNĐ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                parser={value => value.replace(/\VNĐ\s?|(,*)/g, '')}
                                            // onChange={onChange}
                                            />
                                        </Form.Item>

                                        <Editor
                                            apiKey='vay56zrvh9veuhcbway7pupzaoycpwvx06k3t4xzzsv3lfgv'
                                            initialValue="<p>Đây là nội dung mặc định</p>"
                                            init={{
                                                height: 500,
                                                menubar: true,
                                                // ariaHidden: true,
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

                                        <Form.Item
                                            name="id_kieugiay"
                                            style={{ marginTop: '20px' }}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng chọn kiểu giày...',
                                                },
                                            ]}
                                        >
                                            <Select placeholder="Chọn kiểu giày...">
                                                {shoeTypeList.map((item, index) => {
                                                    return <Select.Option key={index} value={item.id_kieugiay}>{item.tenkieugiay}</Select.Option>
                                                })}
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            name="tinhtrang"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng chọn tình trạng...',
                                                },
                                            ]}
                                        >
                                            <Select placeholder="Chọn tình trạng...">
                                                <Select.Option value="1">Kích Hoạt</Select.Option>
                                                <Select.Option value="0">Không Kích Hoạt</Select.Option>
                                            </Select>
                                        </Form.Item>

                                        <div class="form-group files">
                                            <label>Hình Ảnh Đại Diện</label>
                                            <input type="file" class="form-control" onChange={setFile} accept="image/*"/>
                                        </div>
                                        {loading
                                            ? <div>Uploading...</div>
                                            : error
                                                ? <div>{error}</div>
                                                : <div style={{ color: 'red' }}>Vui Lòng Chọn Ảnh</div>}
                                        <Form.Item >
                                            <Button type="primary" htmlType="submit">
                                                Thêm
                                    </Button>
                                        </Form.Item>
                                    </Form>
                                </TabPane>
                                <TabPane tab="Thêm Chi Tiết Giày" key="2">
                                    <Form
                                        name="createshoedetail"
                                        initialValues={{
                                            remember: true,
                                        }}
                                        onFinish={onFinishDetail}
                                    >

                                        <Form.Item

                                            name="id_giay"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập tên mã giày!',
                                                },
                                            ]}
                                        >
                                            <Select placeholder="Nhập tên mã giày...">
                                                {shoeList.map((item, index) => {
                                                    return <Select.Option key={index} value={item.id_giay}>{item.tenmagiay}</Select.Option>
                                                })}
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            name="id_color"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập màu giày!',
                                                },
                                            ]}
                                        >
                                            <Select placeholder="Nhập màu giày...">
                                                {shoeColorList.map((item, index) => {
                                                    return <Select.Option key={index} value={item.id_color}>{item.color}</Select.Option>
                                                })}
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            name="id_size"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập size giày!',
                                                },
                                            ]}
                                        >
                                            <Select placeholder="Nhập size giày...">
                                                {shoeSizeList.map((item, index) => {
                                                    return <Select.Option key={index} value={item.id_size}>{item.sosize}</Select.Option>
                                                })}
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            name="soluong"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập số lượng...',
                                                },
                                            ]}
                                        >
                                            <InputNumber placeholder="Nhập số lượng..." style={{ width: 'auto' }} />
                                        </Form.Item>

                                        <Form.Item>
                                            <Button type="primary" htmlType="submit">
                                                Submit
                            </Button>
                                        </Form.Item>
                                    </Form>
                                </TabPane>
                                <TabPane tab="Thêm Ảnh Giày" key="3">
                                    <Form
                                        name="galleryProduct"
                                        initialValues={{
                                            remember: true,
                                        }}
                                        onFinish={onFinishGallery}
                                    >
                                        <Form.Item
                                            name="id_giay"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập tên mã giày!',
                                                },
                                            ]}
                                        >
                                            <Select placeholder="Nhập tên mã giày..." onChange={handleChange}>
                                                {shoeList.map((item, index) => {
                                                    return <Select.Option key={index} value={item.id_giay}>{item.tenmagiay}</Select.Option>
                                                })}
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            name="id_color"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng nhập màu giày!',
                                                },
                                            ]}
                                        >
                                            <Select placeholder="Nhập màu giày...">
                                                {distinctColor.map((item, index) => {
                                                    return <Select.Option key={index} value={item.id_color}>{item.color}</Select.Option>
                                                })}
                                            </Select>
                                        </Form.Item>

                                        <div class="form-group files">
                                            <label>Thêm Thư Viện Ảnh</label>
                                            <input type="file" class="form-control" multiple onChange={setFile} accept="image/*" />
                                        </div>
                                        {loading
                                            ? <div>Uploading...</div>
                                            : error
                                                ? <div>{error}</div>
                                                : <div>Please Choose Image</div>}

                                        <Form.Item>
                                            <Button type="primary" htmlType="submit">
                                                Submit
                                    </Button>
                                        </Form.Item>
                                    </Form>
                                </TabPane>
                            </Tabs>
                        </div>
                    </div>

            </Row>
        </>
    )
}
export default AddProduct