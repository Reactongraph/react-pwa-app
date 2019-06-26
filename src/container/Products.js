import React from 'react';
import Product from '../components/Product';
import { Link } from 'react-router-dom';
import { productList } from '../utils/constants';
import HomeLogo from '../images/home_logo.png';

export default function Products(props) {
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
        <div className="middle_container">
          {productList.map(product => (
            <Product product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
