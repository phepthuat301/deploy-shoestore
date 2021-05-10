import { Row, Image, Col, Table, Space } from "antd";
import { DeleteTwoTone } from '@ant-design/icons';
//REDUX && REACT
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { getBannerAction, removeBannerAction, deleteBannerAction } from "../../../redux/actions";
//

const { Column } = Table;
export default function AdminDisplayBanner() {
    const dispatch = useDispatch();
    const getBannerContent = useSelector(state => state.adminReducer);
    const { bannerList } = getBannerContent;
    useEffect(() => {
        dispatch(getBannerAction());
        return () => {
            dispatch(removeBannerAction())
        }
    }, []);
    return (
        <Row style={{ marginTop: '30px' }}>
            <div style={{ textAlign: 'center', width: '100%' }}>
                <h4>Quản Lý Banner</h4>
            </div>
            <Col span={18} offset={3}>
                <Table dataSource={bannerList} pagination={{ position: ['bottomCenter'] }}>
                    <Column
                        title="Hình Ảnh"
                        key="image"
                        render={(text, record) => (
                            <Image
                                width={200}
                                src={record.url_banner}
                            />
                        )}
                    />
                    <Column
                        title="Action"
                        key="action"
                        render={(text, record) => (
                            <Space size="middle">
                                <DeleteTwoTone onClick={() => dispatch(deleteBannerAction(record.id_banner))} twoToneColor='red' style={{ fontSize: '30px' }} />
                            </Space>
                        )}
                    />
                </Table>
            </Col>
        </Row>
    )
}