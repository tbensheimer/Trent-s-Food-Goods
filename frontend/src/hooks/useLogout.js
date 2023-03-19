import { useDispatch } from "react-redux";
import {logout} from "../redux/store";

export default function useLogout() {

    const dispatch = useDispatch();

    const Logout = () => {
        localStorage.removeItem("user");
        dispatch(logout());
        }

        return {Logout};
}
