import React from 'react';
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
            <button className="default_btn" type="button">
              EXPLORE DEALS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
