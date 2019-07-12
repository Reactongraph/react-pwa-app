import React from 'react';
import { Link } from 'react-router-dom';
import HomeLogo from '../images/home_logo.png';

export default function Home() {
  return (
    <div className="page_wrapper">
      <div className="bg_warpper">
        <div className="container cstm_container">
          <div className="logo_row">
            <div className="logo">
              <img src={HomeLogo} />
            </div>
            <h2>buy in group and take huge discount on amazing products</h2>
            {/* <button className="default_btn" type="button"> */}
            <Link to="/productList">EXPLORE DEALS</Link>
            <Link to="/camera">Camera</Link>
            <Link to="/post">Background Sync</Link>
            {/* </button> */}
            <button id="enable-notification" className="notify-btn">
              Enable notification
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
