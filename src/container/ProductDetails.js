import React from 'react';
import { Link } from 'react-router-dom';
import HomeLogo from '../images/home_logo.png';

export default function Home(props) {
  return (
    <div className="page_wrapper">
      <div className="container cstm_continer">
        <div className="inner_header">
          <span className="bar">
            <img
              onClick={() => props.history.goBack()}
              src="images/back_arrow.png"
            />
          </span>
          <h2>Group Buy</h2>
        </div>

        <div className="middle_container bg_white">
          <div className="deal_completed viewrs">
            <img src="images/eye.png" />
            <h3>30k Viewers currently </h3>
          </div>
          <div className="list_row product_slider">
            <div className="swiper-container">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <img src="images/jwellary.jpg" />
                </div>

                <div className="swiper-slide">
                  <img src="images/jwellary.jpg" />
                </div>

                <div className="swiper-slide">
                  <img src="images/jwellary.jpg" />
                </div>

                <div className="swiper-slide">
                  <img src="images/jwellary.jpg" />
                </div>

                <div className="swiper-slide">
                  <img src="images/jwellary.jpg" />
                </div>

                <div className="swiper-slide">
                  <img src="images/jwellary.jpg" />
                </div>
              </div>
            </div>
          </div>
          <div className="cstm_pagintion">
            <div className="swiper-pagination"></div>
          </div>
          <div className="product_content">
            <h3>Studed Necklace Set</h3>
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here.
            </p>
          </div>
          <div className="product_content price_grp">
            <div className="price_col">
              <span>Selling Price</span>
              <h3>Rs 2000</h3>
            </div>
            <div className="price_col bg_violet">
              <span>GROUP BY PRICE</span>
              <h3>Rs 500</h3>
              <span>On Min 5 Purchase</span>
            </div>
          </div>
          <div className="product_head padd30">
            <h2>
              30 People Bought <img src="images/pink_arrow.png" />
            </h2>
          </div>

          <div className="share_url">
            <h3>Share your unique URL</h3>
            <div className="txt_wrap">
              <input type="text" name="" value="https://bnc.it/m/edXnSE5iem3" />
              <button type="button">
                <img src="images/share_icn.png" />
              </button>
            </div>
          </div>
          <div className="lg_btn">
            <button className="default_btn continue_btn" type="button">
              BUY NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
