import { rest } from 'msw'

export const handlers = [
    rest.get('/meals', (req, res, ctx) => {
      const user_id = req.url.search.split("?")[1].split("=")[1];
    if (user_id === "499105" ){
      return res(
        ctx.status(200),
        ctx.json([
          {name: "Cow Milk", cal: "167"},
          {name: "Idli", cal: "48"},
          {name: "Dosa", cal: "302"},
          {name: "Weat Chapati", cal: "146"},
          {name: "Boiled Egg", cal: "86"},
          {name: "Aloo Ka Parantha", cal: "182"},
          {name: "Rice", cal: "117"},
          {name: "Tea", cal: "73"},
          {name: "Filter Coffee", cal: "53"},
          {name: "Dhai", cal: "90"},
          {name: "Mixed Vegetable", cal: "82"},
          {name: "Chicken Curry", cal: "359"},
          {name: "Moong Dal", cal: "352"}
        ]),
      )
    }else{
      return res(
        ctx.status(500),
        ctx.json({
          message: "valid user_id required!"
        })
      )
    }

  }),
  rest.post('/tracker', (req, res, ctx) => {
    const user_id = req.url.search.split("?")[1].split("=")[1];
    if (user_id === "499105" ){
      return res(
        ctx.status(200),
        ctx.json({
          message: "success"
        }),
      )
    }else{
      return res(
        ctx.status(500),
        ctx.json({
          message: "valid user_id required!"
        })
      )
    }
  }),
]
