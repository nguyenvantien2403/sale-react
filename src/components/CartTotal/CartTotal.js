import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CartTotal = () => {
  const totalCost = useSelector((state) => state.products.totalCost);

  return (
    <>
      <div class="row g-4 justify-content-end">
        <div class="col-8"></div>
        <div class="col-sm-8 col-md-7 col-lg-6 col-xl-4">
          <div class="bg-light rounded">
            <div class="p-4">
              <h1 class="display-6 mb-4">
                Cart <span class="fw-normal">Total</span>
              </h1>
              <div class="d-flex justify-content-between mb-4">
                <h5 class="mb-0 me-4">Subtotal:</h5>
                <p class="mb-0">{totalCost + "$"}</p>
              </div>
              <div class="d-flex justify-content-between">
                <h5 class="mb-0 me-4">Shipping</h5>
                <div class="">
                  <p class="mb-0">Flat rate: $0.00</p>
                </div>
              </div>
              <p class="mb-0 text-end">Shipping to Ukraine.</p>
            </div>
            <div class="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
              <h5 class="mb-0 ps-4 me-4">Total</h5>
              <p class="mb-0 pe-4">{totalCost + "$"}</p>
            </div>
            <Link to="/checkout">
              <button
                class="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4"
                type="button"
              >
                Proceed Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartTotal;
