import { Fragment } from "react";
import mealImage from "../../assets/meal-2.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

export const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>DailyMeals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealImage} alt="A steak Meal" />
      </div>
    </Fragment>
  );
};
