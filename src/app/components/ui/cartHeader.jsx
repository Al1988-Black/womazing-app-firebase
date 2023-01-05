import React from "react";

const CartHeader = () => {
    return (
        <div className="row">
					<div className="col-3 col-lg-5">
						<p className="cart-table-title">Товар</p>
					</div>
					<div className="col-3 col-lg-2">
						<p className="cart-table-title">Цена</p>
					</div>
					<div className="col-3 col-lg-2">
						<p className="cart-table-title"><span className="d-block d-md-none">Кол-во</span><span className="d-none d-md-block">Количество</span></p>
					</div>
					<div className="col-3 offset-0 offset-lg-1 col-lg-1">
						<p className="cart-table-title">Всего</p>
					</div>
				</div>
    )
}
export default CartHeader;