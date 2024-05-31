import { useContext } from "react";
import { StateContext } from "../utils/StateContext";
import Cards from "./GroupCards";

function CardsList() {
    const { tours } = useContext(StateContext);

    return (
        <>
            {tours.map(tour => (
                <Cards tour={tour} key={tour._id} />
            ))}
        </>
    );
}

export default CardsList;
