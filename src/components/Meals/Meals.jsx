import { Fragment } from "react";
import { MealSummary } from "./MealSummary";
import { AvailableMeals } from "./AvailableMeals";

export const Meals = () => {
  return (
    <Fragment>
      <MealSummary />
      <AvailableMeals />
    </Fragment>
  );
};
