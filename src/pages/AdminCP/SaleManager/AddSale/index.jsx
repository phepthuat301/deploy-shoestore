//CSS
import { Form, Row, Button, Input, DatePicker, Space, InputNumber, Checkbox, Select } from "antd";
import moment from 'moment'
import swal from "sweetalert";
//REDUX && REACT
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createSaleAction, getSaleAction, getShoeOnShoeTypeAdminAction, getShoeTypeAction, removeSaleAction, removeShoeTypeAction,removeShoeOnShoeTypeAdminAction, updateSaleForShoeAction } from "../../../../redux/actions";
//
export default function AdminAddSale() {
    ///CALL STORE
    const dispatch = useDispatch();
    const getAdminContent = useSelector(state => state.adminReducer);
    const { saleList, isUpdate, shoeTypeList, shoeListOnShoeTypeAdmin, shoeCode } = getAdminContent;
    ////////////////////////////////////////////////////////////////
    useEffect(() => {
        dispatch(getSaleAction());
        dispatch(getShoeTypeAction());
        return () => {
            dispatch(removeSaleAction());
            dispatch(removeShoeTypeAction());
            dispatch(removeShoeOnShoeTypeAdminAction())
        }
    }, [isUpdate]);
    ////////////////////////////////////////////////////////////////
    const { RangePicker } = DatePicker;
    const CheckboxGroup = Checkbox.Group;
    function disabledDate(current) {
        // Can not select days before today and today
        return current && current < moment().startOf('day');
    }
    ///CHECK BOX -- STATE
    const [checkedList, setCheckedList] = useState([]);
    const [indeterminate, setIndeterminate] = useState(false);
    const [checkAll, setCheckAll] = useState(false);

    const [isSelect, setIsSelect] = useState(0);
    const [isSelectType, setIsSelectType] = useState(false);
    ////////////////////////////////////////////////////////////////
    const onChangeCheck = list => {
        setCheckedList(list);
        setIndeterminate(!!list.length && list.length < shoeCode.length);
        setCheckAll(list.length === shoeCode.length);
    };

    const onCheckAllChange = e => {
        setCheckedList(e.target.checked ? shoeCode : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
    };
    ////////////////////////////////////////////////////////////
    /////////HANDLE SELECT OPTION//////////////////////////////
    function handleChangeType(id) {
        setIsSelectType(true);
        dispatch(getShoeOnShoeTypeAdminAction(id))
    }
    function handleChangeSale(value) {
        setIsSelect(value);
    }
    ///////////////////////////////////////////////////////////
    function onFinish(values) {
        if (beginDate === "" || endDate === "") {
            swal("Vui lòng chọn thời gian bắt đầu và kết thúc!", "", "warning")
        } else if (beginDate === endDate) {
            swal("Thời gian bắt đầu và kết thúc phải cách nhau ít nhất 1 ngày", "", "warning")
        }
        else {
            let trangthai = "";
            let beg = new Date(beginDate).getTime();
            let timeNow = new Date(moment().format('YYYY-MM-DD')).getTime()
            if (timeNow >= beg) {
                trangthai = "Đang Bắt Đầu";
            } 
            if (beg > timeNow) {
                trangthai = "Chưa Bắt Đầu";
            }
            const newValue = {
                ...values,
                beginDate,
                endDate,
                trangthai,
            }
            dispatch(createSaleAction(newValue))

        }
    }
    let beginDate = "";
    let endDate = "";
    function onChange(date, dateString) {
        beginDate = dateString[0];
        endDate = dateString[1];
    }
    function applySale(){
        if(checkedList.length === 0){
            swal('Vui lòng chọn tối thiểu 1 mã giày','','error')
        }else {
            //Trả về mảng full thông tin
            const newShoeSaleList = shoeListOnShoeTypeAdmin.filter(item => item.tenmagiay === shoeCode.find(item2=> item2 === item.tenmagiay))
            dispatch(updateSaleForShoeAction(isSelect,newShoeSaleList))
        }
    }
    return (
        <>
            <Row >
                <div style={{ textAlign: 'center', width: '100%', backgroundColor: '#f9f9f9' }}>
                    <h4>Thêm Khuyến Mãi</h4>
                </div>
                <div className="content4">
                    <div className="profile-holder">
                        <Form onFinish={onFinish}>
                            <Form.Item
                                name="tenkhuyenmai"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tiêu đề khuyến mãi!',
                                    }
                                ]}
                            >
                                <Input placeholder="Nhập tiêu đề khuyến mãi" style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item
                                name="makhuyenmai"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập mã khuyến mãi!',
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập mã KM...MuaHe2021, MuaThu2021, Le304152021,..." style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item
                                name="phantramkhuyenmai"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập số phần trăm muốn khuyến mãi!',
                                    },
                                ]}
                            >
                                <InputNumber min={1} max={100} placeholder="Nhập số phần trăm muốn khuyến mãi...(20),(30),(40),..." style={{ width: '100%' }} />
                            </Form.Item>
                            <Space direction="vertical" size={12}>
                                <RangePicker disabledDate={disabledDate} onChange={onChange} />
                            </Space>
                            <Form.Item style={{ marginTop: "20px" }}>
                                <Button type="primary" htmlType="submit">
                                    Tạo Khuyến Mãi
                            </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
                <div style={{ textAlign: 'center', width: '100%', backgroundColor: '#f9f9f9' }}>
                    <h4>Thêm Giày Vào Khuyến Mãi</h4>
                </div>
                <div className="content3">
                    <div className="profile-holder">
                        <>
                            <div>
                                <p>Chọn khuyến mãi muốn áp dụng</p>
                                <Select placeholder="Chọn khuyến mãi..." onChange={handleChangeSale}>
                                    {saleList.map((item, index) => {
                                        return <Select.Option key={index} value={item.id_khuyenmai}>{item.makhuyenmai}</Select.Option>
                                    })}
                                </Select>
                            </div>
                            {isSelect !== 0
                                ? (
                                    <>
                                        <div>
                                            <p>Chọn kiểu giày</p>
                                            <Select placeholder="Chọn kiểu giày..." onChange={handleChangeType}>
                                                {shoeTypeList.map((item, index) => {
                                                    return <Select.Option key={index} value={item.id_kieugiay}>{item.tenkieugiay}</Select.Option>
                                                })}
                                            </Select>
                                        </div>
                                    </>
                                ) : null
                            }
                            {isSelectType === true
                                ? (
                                    <>
                                        <div style={{marginBottom:'20px'}}>
                                            <p>Chọn giày muốn áp khuyến mãi</p>
                                            <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                                                Check all
                                            </Checkbox>
                                            <CheckboxGroup options={shoeCode} value={checkedList} onChange={onChangeCheck} />
                                        </div>
                                        <Button onClick={applySale} type='primary'>Apply</Button>
                                    </>
                                ) : null
                            }

                        </>
                    </div>
                </div>
            </Row>
        </>
    )
}