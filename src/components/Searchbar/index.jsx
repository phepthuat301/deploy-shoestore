import React from 'react'
import { SearchOutlined } from "@ant-design/icons";
import './style.css'

function Searchbar(props) {
    const {setSearchKey} = props
    return (
        <>
            <div className="searchbar" >
                <SearchOutlined className="searchbar-icon" />
                <input
                    className="search-input searchbar-input"
                    placeholder="Tìm sản phẩm"
                    type="text"
                    onChange={(e) => setSearchKey(e.target.value)}
                />
            </div>
        </>
    )
}

export default Searchbar
