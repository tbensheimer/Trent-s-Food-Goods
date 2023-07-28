import { useOutletContext } from "react-router";
import Button from "../components/Button";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/store";

export default function ProductDetailsNutrition() {
    const product = useOutletContext();
    const dispatch = useDispatch();

    return (
        <>
        <table className="store-table table-nutrition">
            <thead>
                <tr>
                <th>Nutrient</th>
                <th>Value</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>Protein</td>
                <td>{product.protein}g</td>
            </tr>
            <tr>
                <td>Carbohydrates</td>
                <td>{product.carbs}g</td>
            </tr>
                <tr>
                <td>Fat</td>
                <td>{product.fat}g</td>
            </tr>
            <tr>
                <td>Salt</td>
                <td>{product.salt}g</td>
            </tr>
        </tbody>
    </table>
    <div className="border-top">
     <Button onClick={() => dispatch(addProduct(product))} outline>
     ${product.price}
   </Button>
   </div>
   </>
    );
}
