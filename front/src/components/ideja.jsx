import { useContext, useState, useEffect } from "react";
import { StateContext } from "../utils/StateContext";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
import '../styles/excursionInfo.css';

function ExcursionInfo() {
  const [allExcursions, setAllExcursions] = useState([]);
  const { excursions, error } = useContext(StateContext);
  const { id } = useParams();
  const fexcursions = allExcursions.find((excursion) => excursion._id === id);

  useEffect(() => {
    setAllExcursions(excursions);
  }, [excursions]);
  console.log(fexcursions);
  return (
    <>
    {fexcursions && 
    <div>
      <div className="cardBckgr">
      <h4>{fexcursions.name}</h4>
      <p> <b>Duration </b>(hours): {fexcursions.duration}</p>

      <p><b>Price</b> (EUR):  {fexcursions.price}</p>
      <p><b>Start Date:</b> {fexcursions.dates}</p>
      <p><b>Start Time:</b> {fexcursions.time}</p>  
      <p>
        <b>Description:</b> {fexcursions.description}
      </p>
      <p><b>Category:</b> {fexcursions.category}</p>

      </div>
    </div>
    }

            {/* <Link to={`/${excursion._id}`}> 
            <Button className="loginBtnForm">More information</Button>
            </ Link> */}

    </>
  );
}

export default ExcursionInfo;