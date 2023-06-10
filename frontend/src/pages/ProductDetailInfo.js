import {useOutletContext} from "react-router-dom";
import Button from "./Button.js";
import {useDispatch} from "react-redux";
import {addProduct} from "./store.js";

export default function ProductDetailInfo() {
  const product = useOutletContext();
  const dispatch = useDispatch();

  const onProductAdd = () => {
  dispatch(addProduct(product))
  };

  return (
    <>
      <p>
        {product.description} sold at <strong>${product.price}</strong> per
        piece.
      </p>
      <Button onClick={() => onProductAdd()}>${product.price}</Button>
    </>
  );
}