import { rest } from "msw";

const token =
  "ahuBHejkJJiMDhmODZhZi0zaeLTQ4ZfeaseOGZgesai1jZWYgrTA07i73Gebhu98";

let colors = [
  {
    color: "aliceblue",
    code: {
      hex: "#f0f8ff",
    },
    id: 1,
  },
  {
    color: "limegreen",
    code: {
      hex: "#99ddbc",
    },
    id: 2,
  },
  {
    color: "aqua",
    code: {
      hex: "#00ffff",
    },
    id: 3,
  },
  {
    color: "aquamarine",
    code: {
      hex: "#7fffd4",
    },
    id: 4,
  },
  {
    color: "lilac",
    code: {
      hex: "#9a99dd",
    },
    id: 5,
  },
  {
    color: "softpink",
    code: {
      hex: "#dd99ba",
    },
    id: 6,
  },
  {
    color: "bisque",
    code: {
      hex: "#dd9a99",
    },
    id: 7,
  },
  {
    color: "softyellow",
    code: {
      hex: "#dcdd99",
    },
    id: 8,
  },
  {
    color: "blanchedalmond",
    code: {
      hex: "#ffebcd",
    },
    id: 9,
  },
  {
    color: "blue",
    code: {
      hex: "#6093ca",
    },
    id: 10,
  },
  {
    color: "blueviolet",
    code: {
      hex: "#8a2be2",
    },
    id: 11,
  },
];

let nextId = 12;

function authenticator(req, res, next) {
  const { authorization } = req.headers;
  if (authorization === token) {
    next();
  } else {
    res.status(403).json({ error: "User must be logged in to do that." });
  }
}

export const handlers = [
  // Handles a POST /login request
  rest.post("/login", (req, res, ctx) => {
    const { username, password } = req.body;
    if (username === "Lambda School" && password === "i<3Lambd4") {
      req.loggedIn = true;
      setTimeout(() => {
        return res(
          ctx.status(200),
          ctx.json({
            payload: token,
          })
        );
      }, 1000);
    } else {
      return res(
        ctx.status(403),
        ctx.json({ error: "Username or Password incorrect. Please see Readme" })
      );
    }
  }),
  // Handles a GET /user request
  rest.get("/api/colors", authenticator, (req, res, ctx) => {
    return res(ctx.status(200), ctx.send(colors));
  }),

  rest.post("/api/colors", authenticator, (req, res, ctx) => {
    if (req.body.color !== undefined && req.body.code !== undefined) {
      const newColor = req.body;
      newColor.id = nextId;
      colors.push(newColor);
    }
    nextId = nextId + 1;
    return res(ctx.status(201), ctx.json(colors));
  }),

  rest.put("/api/colors/:id", authenticator, (req, res, ctx) => {
    if (!req.params.id)
      return res(
        ctx.status(400),
        ctx.send("Your request is missing the color id")
      );
    if (req.body.id === undefined || !req.body.color || !req.body.code) {
      return res(
        ctx.status(422),
        ctx.send("Make sure your request body has all the fields it needs")
      );
    }
    colors = colors.map((color) => {
      if (`${color.id}` === req.params.id) {
        return req.body;
      }
      return color;
    });
    return res(ctx.status(200), ctx.json(req.body));
  }),

  rest.delete("/api/colors/:id", authenticator, (req, res, ctx) => {
    if (!req.params.id)
      return res(
        ctx.status(400),
        ctx.send("Your request is missing the color id")
      );
    colors = colors.filter((color) => `${color.id}` !== req.params.id);
    return res(ctx.status(202), ctx.send(req.params.id));
  }),

  rest.get("/", function (req, res, ctx) {
    return res(ctx.send("App is working 👍"));
  }),
];
