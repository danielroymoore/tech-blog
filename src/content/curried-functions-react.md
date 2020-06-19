---
title: Clean State Management with Curried Functions
date: 2020-06-19
path: /blog/clean-state-management-with-curried-functions
summary: In this post I cover the basics of curried functions and give a practical example of how they can be used to allow for cleaner state management in React Components.
---

## Clean State Management with Curried Functions

### What Are Curried Functions?

All around the internet we see simple examples such as this code snippet to illustrate what a curried function looks like:

```
const sum = x => y => x + y;
console.log(sum(1)(2)) // Result: 3
```

This is fine but the simplicity of it doesn’t quite highlight the benefits of using them, for something this trivial why wouldn’t you just define the function as:

```
const sum = (x, y) => x + y;
```

My mental model to define a curried function is: “A function that takes argument sequentially returning a functions one at a time that has scope all proceeding arguments, resolving the value once the last argument has been passed.”

Due to how closures work, all previously passed arguments are available to the returned functions, this allows us to create partial returns of curried functions, such as the `addTwo()` function below:

```
const addTwo = sum(2); // y => 2 + y;
console.log(addTwo(2)) // Result: 4
```

This to me goes a long way to highlight the benefit of curried functions, we can create a number of partial applications such as the example above and pass them around our codebase without having to keep track on multiple args being updated for each function call due to a refactor.

### Using Curried Function with useReducer

`useReducer` is a hook that is used to manage more complex state logic. My preference is to use this hook over `useState` whenever I find myself working with more than a couple of state values in a component. I feel that useReducer is more declarative with its initial state and allows for greater visibility as to what the component is responsible for managing.

A gripe I had with useReducer was that I often felt that I was writing similar code across multiple components, here’s a basic implementation:

```
import React, { useReducer } from "react";

const INITIAL_STATE = {
  first_name: "",
  last_name: "",
  email: ""
};

const reducer = (state, action) => {
  switch (action.type) {
    case "first_name":
      return { ...state, first_name: action.value };
    case "last_name":
      return { ...state, last_name: action.value };
    case "email":
      return { ...state, email: action.value };
    default:
      break;
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <div className="App">
      <input
        type="text"
        value={state.first_name}
        onChange={e =>
          dispatch({
            type: "first_name",
            value: e.target.value
          })
        }
      />
    </div>
  );
}
```

Another issue that I have is that things start feeling coupled together when you need to pass the dispatch a couple of levels, suddenly you child components now needs to be able to call the dispatch, to update the state, but it also needs to know what part of the state it should update, it all can get very prop heavy:

```
const Input = ({value, dispatch, type}) => (
  <input type="text" value={value} onChange={e => dispatch({type: type, value: e.target.value})} />
)

export default function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <div className="App">
      <Input value={state.last_name} dispatch={dispatch} type="last_name" />
    </div>
  );
}
```

Admittedly the code example is messy on purpose but its not uncommon to find code that looks somewhat like this, where props and args are drilled down multiple levels. This is sort of thing is a prime candidate for curried functions, have a look at the same component refactored to use a curried function:

```
import React, { useReducer } from "react";
import "./styles.css";

const INITIAL_STATE = {
  first_name: "",
  last_name: "",
  email: ""
};

const reducer = (state, action) => {
  switch (action.type) {
    case "updatedField":
      return { ...state, [action.field]: action.value };
    default:
      return INITIAL_STATE;
  }
};

const Input = ({ value, onChange }) => (
  <input type="text" value={value} onChange={e => onChange(e.target.value)} />
);

export default function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const updateState = field => value => {
    dispatch({
      type: "updatedField",
      field,
      value
    });
  };

  return (
    <div className="App">
      <Input value={state.first_name} onChange={updateState("first_name")} />
    </div>
  );
}
```

Now we can see that the child component doesn’t need to know about any of the internals that are coming from above, as far as it is concerned it just needs to pass a single value into an `onChange` function and the parent will take care of the rest.
