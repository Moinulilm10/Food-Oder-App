import { Fragment } from "react";
import classes from "./Header.module.css";
import mealImage from "../../assets/meal-2.jpg";
import { HeaderCardButton } from "./HeaderCardButton";

export const Header = () => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>DailyMeals</h1>
        <HeaderCardButton />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealImage} alt="A steak Meal" />
      </div>
    </Fragment>
  );
};
