import React from 'react';
import { Link } from 'react-router-dom';

export default function Product(props) {
  return (
    <div className="list_row">
      <div className="product_head">
        <h2>
          {props.product.name}
          <Link to="/productDetails">
            <img src="images/pink_arrow.png" />
          </Link>
        </h2>
      </div>
      <div className="product_price">
        <div className="product_img">
          <img src="images/jwellary.jpg" />
        </div>
        <div className="product_detail">
          <div className="selling_col">
            <div className="selling_grop">
              <span>Selling Price</span>
              <span className="fnt_26">Rs {props.product.sellingPrice}</span>
            </div>
            <div className="selling_grop mg_lft53">
              <h3>Group Buy Price</h3>
              <h1>Rs {props.product.gpPrice}</h1>
              <span>
                <i>(On Min 5 Purchase)</i>
              </span>
            </div>
          </div>
          <p>
            <i>150 people bought this deal</i>
          </p>
        </div>
      </div>
    </div>
  );
}
