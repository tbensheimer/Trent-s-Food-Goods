import {useOutletContext} from "react-router-dom";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/store";

export default function ProductDetailsStorage() {
    const product = useOutletContext();
    const dispatch = useDispatch();

    return (
      <>
      <p data-testid="storage">
        <strong>Storage instructions:</strong> {product.storage}
      </p>
      <div className="border-top">
      <Button data-testid="addBtn" onClick={() => dispatch(addProduct(product))} outline>
      ${product.price}
    </Button>
    </div>
    </>
    );
}
