import React from 'react';
import PropTypes from 'prop-types';
import { BiStar } from 'react-icons/bi';
import { CgArrowLongRight } from 'react-icons/cg';
import AppModal from '../AppModal';
import styles from './Cart.css';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSize: '',
      selectedQuantity: 0,
      readyToBuy: false,
      sizeClicked: false,
    };
    this.getSize = this.getSize.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      readyToBuy: true,
    });
  }

  getSize(selectedSize) {
    this.setState({
      selectedSize,
      sizeClicked: true,
    });
  }

  closeModal() {
    this.setState({
      readyToBuy: false,
    });
  }

  render() {
    const { skus, styleId } = this.props;
    const {
      selectedSize, selectedQuantity, readyToBuy, sizeClicked,
    } = this.state;
    const skuIds = Object.keys(skus);
    const filteredQuantity = Object.values(skus).filter((sku) => sku.size === selectedSize)
      .map((sku) => sku.quantity);
    const displayQuantity = Array.from(new Array(filteredQuantity[0]), (x, i) => i + 1);

    return (
      <div className={styles.addToCart}>
        <form className={styles.cartWrapper} onSubmit={this.handleSubmit}>
          {/* <select className={styles.size} name="selectedSize" value={selectedSize} onChange={this.handleChange}>
            <option value="">SELECT A SIZE</option>
            {
              skuIds.map((item) => (
                <option key={item} value={skus[item].size}>
                  {skus[item].size}
                </option>
              ))
            }
          </select> */}
          <h5 className={styles.selectSize}>Select size</h5>
          <div className={styles.sizeBox}>
            {
              skuIds.map((item) => (
                <button className={styles.sizeBtn} type="button" name="selectedSize" key={item} value={selectedSize} onClick={() => this.getSize(skus[item].size)}>
                  <span>{skus[item].size}</span>
                </button>
              ))
            }
          </div>
          <select className={styles.quantity} name="selectedQuantity" value={selectedQuantity} onChange={this.handleChange}>
            <option value="">Quantity</option>
            {
              displayQuantity && displayQuantity.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))
            }
          </select>
          <br />
          <button className={styles.submitCart} type="submit" value="ADD TO BAG">
            <span className={styles.addToBagText}>ADD TO BAG</span>
            <CgArrowLongRight className={styles.arrow} />
          </button>
          <BiStar className={styles.star} />
        </form>

        {
          readyToBuy && (
          <AppModal ref={this.registerModal} outsideClickHandler={() => this.closeModal()}>
            <div className={styles.addedToBag}>
              Added to Cart: Style ID
              {styleId}
              , Size
              {selectedSize}
              {' '}
              Quantity
              {selectedQuantity}
            </div>
          </AppModal>
          )
        }

      </div>
    );
  }
}

Cart.propTypes = {
  skus: PropTypes.objectOf(PropTypes.object).isRequired,
  styleId: PropTypes.number.isRequired,
};

export default Cart;
