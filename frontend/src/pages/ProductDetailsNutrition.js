import { useOutletContext } from "react-router";
import Button from "../components/Button";

export default function ProductDetailNutrition() {
    const product = useOutletContext();

    return (
        <>
        <table className="table table-nutrition">
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
     <Button onClick={() => {}} outline>
     ${product.price}
   </Button>
   </>
    );
}
