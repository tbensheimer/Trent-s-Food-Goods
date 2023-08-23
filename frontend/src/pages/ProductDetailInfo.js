import {useOutletContext} from "react-router-dom";
import Button from "../components/Button.js";
import {useDispatch} from "react-redux";
import { addProduct } from "../redux/store.js";

export default function ProductDetailInfo() {
  const product = useOutletContext();
  const dispatch = useDispatch();

  const onProductAdd = () => {
  dispatch(addProduct(product))
  };

  return (
    <>
      <p data-testid="description">
        {product.description} sold at <strong>${product.price}</strong> per
        piece.
      </p>
      <div className="border-top">
      <Button outline onClick={() => onProductAdd()} data-testid="addBtn">${product.price}</Button>
      </div>
    </>
  );
}