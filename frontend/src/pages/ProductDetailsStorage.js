import {useOutletContext} from "react-router-dom";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/store";

export default function ProductDetailsStorage() {
    const product = useOutletContext();
    const dispatch = useDispatch();

    return (
      <>
      <p>
        <strong>Storage instructions:</strong> {product.storage}
      </p>
      <Button onClick={() => dispatch(addProduct(product))} outline>
      ${product.price}
    </Button>
    </>
    );
}
