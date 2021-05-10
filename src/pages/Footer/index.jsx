import React from 'react'
import { Layout } from 'antd';
import '../../pages/Footer/styles.css'
import { CgPhone, CgFacebook, CgInstagram } from "react-icons/cg";
import { AiOutlineMail, AiOutlineHome } from "react-icons/ai";
import Map from './Map';

function Footer() {
    return (
        <div>
            <footer className="footer">
                <div className="footer-contact">
                    <h2 className="footer-contact-header">Liên hệ</h2>
                    <p>
                        <AiOutlineHome />
                        <strong>74 Nguyễn Thái Học, TP.Hội An, T.Quảng Nam</strong>
                    </p>
                    <p>
                        <AiOutlineMail />
                        <a href="mailto:giaynhuy@gmail.com">hieugiaynhuy@gmail.com</a>
                    </p>
                    <p>
                        <CgPhone />
                        <a href="tel:0123456789">0905 132 086 - 079 396 6349</a>
                    </p>
                    <p>
                        <CgFacebook />
                        <a href="https://www.facebook.com/GiayTay.HoiAn">https://www.facebook.com/GiayTay.HoiAn</a>
                    </p>
                    <p>
                        <CgInstagram />
                        <a href="https://www.instagram.com/pubgshop.danang/">https://www.instagram.com/giaytay.hoian/</a>
                    </p>
                </div>
                <div className="footer-map">
                    <h2>Bản đồ</h2>
                    <div className="map">
                        <Map />
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer