import { useEffect, useState } from "react";

import Card from "../../UI/Card/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

import { FOOD_APP_URL } from "../../../constants/constants";
import useHttp from "../../../hooks/use-http";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  const { isLoading, error, sendRequest: fetchMeals } = useHttp();

  useEffect(() => {
    const transformData = (mealsData) => {
      const loadedMeals = [];

      for (const mealKey in mealsData) {
        loadedMeals.push({
          id: mealKey,
          name: mealsData[mealKey].name,
          description: mealsData[mealKey].description,
          price: mealsData[mealKey].price,
        });
      }

      setMeals(loadedMeals);
    };
    fetchMeals({ url: FOOD_APP_URL + 'meals.json' }, transformData);
  }, [fetchMeals]);

  const mealsList = meals.map((meal) => {
    return (
      <MealItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  });

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
