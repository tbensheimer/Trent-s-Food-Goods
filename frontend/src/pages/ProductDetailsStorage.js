import {useOutletContext} from "react-router-dom";
import Button from "../components/Button";

export default function ProductDetailStorage() {
    const product = useOutletContext();

    return (
      <>
      <p>
        <strong>Storage instructions:</strong> {product.storage}
      </p>
      <Button onClick={() => } outline>
      ${product.price}
    </Button>
    </>
    );
}
