
import { useContext } from "react";
import { StateContext } from "../utils/StateContext";
 
import styles from "../styles/Excursions.module.css";
import MyExcursionsCard from "./MyExcursionsCard";
 
function MyExcursionsList() {
    const { error, users } = useContext(StateContext);
 
    const { excursionsList} = styles;
 
    return (
        <>
        <div className={excursionsList}>
        {users.map((user) =>
                    user.excursions.map((excursion) => (
            <MyExcursionsCard key={excursion._id} excursion={excursion} />
          ))
        )}
        </div>
    </>
    );
}
 
export default MyExcursionsList;



import { useContext } from "react";
import { StateContext } from "../utils/StateContext";
import UserExcursionCard from "./ExcursionCard";
 
function UserExcursionList() {
  const { excursions, error } = useContext(StateContext);
 
   return (
      <div className="background">
        <div className="slogan">
          <h1>My excursions</h1>
          {users.map((user) =>
                    user.excursions.map((excursion) => (
            <MyExcursionsCard key={excursion._id} excursion={excursion} />
          ))
        )}
          {excursions.map((excursion) => (
          <UserExcursionCard excursion={excursion} key={excursion._id} />
        ))}
         
        </div>
      </div>
    );
  }
  
export default UserExcursionList;
 
