import React, { useState, useEffect, useMemo } from 'react';
import './App.css';

const generateTestId = (mealType, item, cal) => `meal_${mealType}_${item.replace(' ', '').toLowerCase()}_${cal}`;

const MealList = ({ type, meals, title, calConsumed, limit, onClick }) => {
  return (
    <div className="meal-type">
      <h1>{`${title} (${calConsumed}/${limit})`}</h1>
      <ul>
        {meals.map((item) => (
          <li
            key={item.name}
            onClick={() => onClick(type, item)}
            testid={generateTestId(type, item.name, item.cal)}
          >
            {`${item.name} [${item.cal} Cal]`}
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {

  const breakfast_cal_limit = 498;
  const morning_snack_cal_limit = 187;
  const lunch_cal_limit = 498;
  const evening_snack_cal_limit = 187;
  const dinner_cal_limit = 498;

  const [mealTracker, setMealTracker] = useState({
    breakfast: {
      title: 'Breakfast',
      limit: breakfast_cal_limit,
      meals: [],
      calConsumed: 0
    },
    morning_snack: {
      title: 'Morning Snack',
      limit: morning_snack_cal_limit,
      meals: [],
      calConsumed: 0
    },
    lunch: {
      title: 'Lunch',
      limit: lunch_cal_limit,
      meals: [],
      calConsumed: 0
    },
    evening_snack: {
      title: 'Evening Snacks',
      limit: evening_snack_cal_limit,
      meals: [],
      calConsumed: 0
    },
    dinner: {
      title: 'Dinner',
      limit: dinner_cal_limit,
      meals: [],
      calConsumed: 0
    },
  });

  const getMeals = async () => {
    try {
      const response = await fetch('/meals?user_id=499105');
      const responseJson = await response.json();
      setMealTracker((prev) => {
        const updated = { ...prev };
        for (let i in updated) {
          updated[i].meals = responseJson;
        }
        return updated;
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getMeals();
  }, []);

  const saveMeal = async (mealType, meal) => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          meal,
          mealType
        }
      }
      const response = await fetch('/tracker?user_id=499105', options);
      const responseJson = await response.json();
      console.log('[Meal Saved]:', responseJson);
    } catch (e) {
      console.log(e);
    }
  };

  const filterMeals = (data) => data.meals.filter((item) => (Number(item.cal) + data.calConsumed < data.limit));

  const handleClick = (type, item) => {
    const currentMeal = mealTracker[type];
    currentMeal.calConsumed += Number(item.cal);
    currentMeal.meals = filterMeals(currentMeal);
    saveMeal(type, item);
    setMealTracker((prev) => {
      return {
        ...prev,
        [type]: currentMeal
      }
    });
  };

  const totalCalories = useMemo(() => {
    return Object.values(mealTracker).reduce((total, item) => {
      total += item.calConsumed;
      return total;
    }, 0);
  }, [mealTracker]);

  return (
    <div>
      <div className="header">
        <h1>My Daily Calorie Tracker</h1>
        <h1 testid="final_calorie_consumed_message">I, consumed {totalCalories}/1868 Cal Today</h1>
      </div>
      <div className="meal-container">
        {Object.entries(mealTracker).map(([type, value]) => (
          <MealList key={type} {...value} type={type} onClick={handleClick} />
        ))}
      </div>
    </div>
  );
}

export default App;
