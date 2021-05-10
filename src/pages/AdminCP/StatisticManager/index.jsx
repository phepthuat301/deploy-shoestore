import { useEffect } from 'react';
import { Row, Select, Col } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './styles.css';
//REDUX && REACT
import { useSelector, useDispatch } from "react-redux";
import { getRevenueAction, getShoeTotalAction, getDayRevenueAction, getDayShoeTotalAction } from "../../../redux/actions";
export default function AdminStatistic() {
    const dispatch = useDispatch();
    const getAdminContent = useSelector(state => state.adminReducer);
    const { revenueData, shoeTotalData, dayRevenueData, dayShoeTotalData } = getAdminContent;

    useEffect(() => {
        let d = new Date();
        dispatch(getRevenueAction(d.getFullYear()));
        dispatch(getShoeTotalAction(d.getFullYear()));
        dispatch(getDayRevenueAction((d.getMonth() + 1)))
        dispatch(getDayShoeTotalAction((d.getMonth() + 1)))
        return () => {
        }
    }, [dispatch]);
    let newRevenueData = [];
    let newShoeTotalData = [];
    let newDayRevenueData = [];
    let newDayShoeTotalData = [];
    revenueData.map((item, index) => {
        let newData = {
            name: `Tháng ${item.thang}`,
            Revenue: item.DoanhThu,
        }
        newRevenueData.push(newData)
    })
    shoeTotalData.map((item, index) => {
        let newData = {
            name: `Tháng ${item.thang}`,
            ShoeTotal: item.tongsoluong,
        }
        newShoeTotalData.push(newData)
    })
    dayRevenueData.map((item, index) => {
        let newData = {
            name: `Ngày ${item.Ngay}`,
            RevenueDay: item.DoanhThuNgay,
        }
        newDayRevenueData.push(newData)
    })
    dayShoeTotalData.map((item, index) => {
        let newData = {
            name: `Ngày ${item.Ngay}`,
            ShoeTotalDay: item.TongSoLuong,
        }
        newDayShoeTotalData.push(newData)
    })
    function revenueYearChange(value) {
        dispatch(getRevenueAction(value));
    }
    function shoeYearChange(value) {
        dispatch(getShoeTotalAction(value));
    }
    function revenueMonthChange(value) {
        dispatch(getDayRevenueAction(value));
    }
    function shoeMonthChange(value) {
        dispatch(getDayShoeTotalAction(value));
    }
    return (
        <>
            <div className="row-chart">
                <div className="row">
                    {/* <Col span={12}> */}
                    <div className="chart">
                        <div style={{ textAlign: 'center', paddingBottom: '20px' }}>
                            <h3>Doanh Thu Theo Tháng Trong Năm</h3>
                            <Select placeholder="Chọn năm" onChange={revenueYearChange}>
                                <Select.Option value="2021">Năm 2021</Select.Option>
                                <Select.Option value="2020">Năm 2020</Select.Option>
                            </Select>
                        </div>
                        <div className="chart-info">
                            <BarChart
                                width={800}
                                height={400}
                                data={newRevenueData}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 80,
                                    bottom: 5,
                                }}
                                barSize={20}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="Revenue" fill="#8884d8" />
                            </BarChart>
                        </div>
                    </div>
                    {/* </Col> */}
                    {/* <Col span={12}> */}
                    <div className="chart">
                        <div style={{ textAlign: 'center', paddingBottom: '20px' }}>
                            <h3>Tổng Số Lượng Theo Tháng Trong Năm</h3>
                            <Select placeholder="Chọn năm" onChange={shoeYearChange}>
                                <Select.Option value="2021">Năm 2021</Select.Option>
                                <Select.Option value="2020">Năm 2020</Select.Option>
                            </Select>
                        </div>
                        <div className="chart-info">
                            <BarChart
                                width={800}
                                height={400}
                                data={newShoeTotalData}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 80,
                                    bottom: 5,
                                }}
                                barSize={20}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="ShoeTotal" fill="#FF3333" />
                            </BarChart>
                        </div>
                        {/* </Col> */}
                    </div>
                    {/* </div> */}
                </div>
                <div className="row-chart">
                    <div className="row">
                        {/* <Col span={12}> */}
                        <div className="chart">
                            <div style={{ textAlign: 'center', paddingBottom: '20px' }}>
                                <h3>Doanh Thu Theo Ngày Trong Tháng</h3>
                                <Select placeholder="Chọn tháng" onChange={revenueMonthChange}>
                                    {revenueData.map((item, index) => {
                                        return <Select.Option key={index} value={item.thang}>Tháng {item.thang}</Select.Option>
                                    })}
                                </Select>
                            </div>
                            <div className="chart-info">
                                <BarChart
                                    width={800}
                                    height={400}
                                    data={newDayRevenueData}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 80,
                                        bottom: 5,
                                    }}
                                    barSize={20}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="RevenueDay" fill="#009900" />
                                </BarChart>
                            </div>
                        </div>
                        {/* </Col> */}
                        {/* <Col span={12}> */}
                        <div className="chart">
                            <div style={{ textAlign: 'center', paddingBottom: '20px' }}>
                                <h3>Tổng Số Lượng Theo Ngày Trong Tháng</h3>
                                <Select placeholder="Chọn tháng năm" onChange={shoeMonthChange}>
                                    {shoeTotalData.map((item, index) => {
                                        return <Select.Option key={index} value={item.thang}>Tháng {item.thang}</Select.Option>
                                    })}
                                </Select>
                            </div>
                            <div className="chart-info">
                                <BarChart
                                    width={800}
                                    height={400}
                                    data={newDayShoeTotalData}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 80,
                                        bottom: 5,
                                    }}
                                    barSize={20}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="ShoeTotalDay" fill="#00CCFF" />
                                </BarChart>
                            </div>
                            {/* </Col> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
