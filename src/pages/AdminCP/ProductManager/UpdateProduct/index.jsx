//CSS
import { Form, Input, Button, InputNumber, Select, Row, Col, Breadcrumb, Image } from 'antd';
import { Link } from 'react-router-dom';
import { ROUTERS } from '../../../../constants/router';
//REDUX && REACT
import { useSelector, useDispatch } from "react-redux";
import { getShoeAction, getShoeTypeAction, removeShoeAction, removeShoeTypeAction, upLoadFile, updateShoeAction } from "../../../../redux/actions";
import { useEffect, useState } from 'react';
//COMPONENTS

export default function AdminUpdateProduct(props) {
    const { match } = props
    const dispatch = useDispatch();
    const getShoe = useSelector(state => state.productReducer);
    const getShoeType = useSelector(state => state.adminReducer);
    const { shoeList } = getShoe;
    const { shoeTypeList, loading, error } = getShoeType
    //lọc giày theo id , lọc kiểu giày theo id 
    const shoeOnUpdate = shoeList.filter(item => item.id_giay === parseInt(match.params.id))
    const shoeTypeOnUpdate = shoeTypeList.filter(item => item.id_kieugiay === shoeOnUpdate[0].id_kieugiay)
    useEffect(() => {
        dispatch(getShoeAction())
        dispatch(getShoeTypeAction());
        return () => {
            dispatch(removeShoeAction());
            dispatch(removeShoeTypeAction());
        }
    }, []);
    const [selectedFile, setSelectedFile] = useState(null);
    function onFinish(values) {
        let hinhanh = '';
        selectedFile ? hinhanh = selectedFile[0].name : hinhanh = shoeOnUpdate[0]?.hinhanh
        let id_giay = match.params.id;
        const newUpdate = {
            ...values,
            id_giay,
            hinhanh,
        }
        if (selectedFile) {
            dispatch(updateShoeAction(newUpdate));
            dispatch(upLoadFile(selectedFile));
        } else {
            dispatch(updateShoeAction(newUpdate));
        }
    }
    function updateImage(e) {
        setSelectedFile(e.target.files)
    }
    const [updateForm] = Form.useForm();
    return (
        <>
            <div style={{ textAlign: 'center', width: '100%', backgroundColor: '#f9f9f9' }}>
                <h4>Cập Nhật Giày</h4>
            </div>
            <Breadcrumb style={{ marginTop: '20px', marginLeft: '20px' }}>
                <Breadcrumb.Item><Link to={ROUTERS.READ_PRODUCT}>Xem Giày</Link></Breadcrumb.Item>
                <Breadcrumb.Item>Cập Nhật Giày</Breadcrumb.Item>
            </Breadcrumb>
            <Row style={{ marginTop: '30px' }}>
                <Col span={12} offset={6}>
                    <Form
                        form={updateForm}
                        initialValues={{
                            tengiay: shoeOnUpdate[0]?.tengiay,
                            tenmagiay: shoeOnUpdate[0]?.tenmagiay,
                            giaban: shoeOnUpdate[0]?.giaban,
                            giakm: shoeOnUpdate[0]?.giakm,
                            noidung: shoeOnUpdate[0]?.noidung,
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

                        <Form.Item
                            name="noidung"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập nội dung...',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập nội dung..." />
                        </Form.Item>

                        <Form.Item
                            name="id_kieugiay"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn kiểu giày...',
                                },
                            ]}
                        >
                            <Select placeholder={shoeTypeOnUpdate[0]?.tenkieugiay}>
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
                            <Select placeholder={shoeTypeOnUpdate[0]?.tinhtrang === 0 ? 'Không Kích Hoạt' : 'Kích Hoạt'}>
                                <Select.Option value="1">Kích Hoạt</Select.Option>
                                <Select.Option value="0">Không Kích Hoạt</Select.Option>
                            </Select>
                        </Form.Item>

                        <div class="form-group files">
                            <label>Hình Ảnh Đại Diện</label>
                            <input type="file" class="form-control" onChange={updateImage} />
                        </div>
                        {loading
                            ? <div>Uploading...</div>
                            : error
                                ? <div>{error}</div>
                                : <div>Please Choose Image</div>}
                        <Image
                            height={300}
                            width={450}
                            src={`/gallery/${shoeOnUpdate[0]?.hinhanh}`}
                        />
                        <Form.Item >
                            <Button type="primary" htmlType="submit">
                                LƯU
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </>
    )
}