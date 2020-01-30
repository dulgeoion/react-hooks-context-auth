
# Boilerplate React app with context and auth hook + multilang

This is training project to getting started with React and React context. Covered most important features of react context and hooks for those, who are the same as I was, who read documentation of react.js but suffering with putting it all together :)

In this readme file I will write down all the key features of the app.



  
## Getting started
1. Install packages `yarn install`.
2. Start development server `yarn start`.
3. Happy coding!

## React basis

In the project we define two types of components:
* Component
* Container

Maybe you want to ask me what is the difference? `Components` are reusable, `Container` – not. For example all pages we have are Containers because they contain Components. Components are Custom Input Fields, Buttons, any other reusable display staff. So basically, if you use the same component more than once and it has some goal of existing (some action it produces) – in that case it is 99% component.

## Context folder structure

So, in the app I decided to make hooks based on all Context resources. Basically that means that we have `User` context and we have `useUser()` hook.

Optimal folder structure is:
* ContextFolder
	* actions.js
	* reducer.js
	* types.js

Any hook includes current state and actions based on that state. All interactions with back end we are doing in our `actions.js` file. This is the only necessary file for hooks to work. For example right now there are defined two hooks -`useAuth()` and `useUser()`, but first one doesn't have interactions with global state, that's why it has only actions file. Quite flexible, ha? 

### 1. So what actually we are doing in actions file? 
1. First we create context. Kinda global state.
```
const newContext = createContext();
```
2. After that we define  ```actions for that context. 

```
const  useProviderForNewContext = () => {
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE); // reducer from 'reducer.js' file
	
	const setState = (field, value) => {
		return dispatch({ // if you don't know what it is, google redux
			type: SET_FIELD, // SET_FIELD should be imported from ./types.js
			payload: {[field]: value}
		})
	};
	return {
		ourState: state,
		setState
	}
}
```
3.  After that we should create context provider component to wrap our application in order to make it possible to interact with our global state from any part of application.
```
export  function  UserProvider({ children }) {
	const state = useProviderForNewContext();
	return <newContext.Provider value={state}>{children}</newContext.Provider>;
}
```
4. To inject state inside our containers we should create Hook!
```
export const useOurState = () => {
	return useContext(newContext);
};
```
5. That's basically it!

### 2. Reducer file?? Oh common, that is quite easy. 

I hope that everyone understand what are reducers? (Read [this](https://reactjs.org/docs/hooks-reference.html#usereducer) and [this](https://redux.js.org/basics/reducers/) to understand) 

In order to actions example let's create reducer!

```
import { SET_FIELD } from  "./types";

export  default (state, action) => {
	switch (action.type) {
		case  SET_FIELD:
			return {
			...state,
			...action.payload
		};

		default:
			return  state;
		}
};
```

### 3. Types

Just listing of action types. We need this file  in order to manage title strings, so if want to change one of them, we don't need to search for it in multiple files.

```
export  const  SET_FIELD = 'SET_FIELD';
```
#
After that we combine all these things inside `index.js`  in context folder. 


## Context usage

In order to use context, first we need to wrap whole app in `ContextProviders`. In this project we combine those Providers inside `index.js` in context folder and exporting `AppProviders` component from it.

Also we import inside root context file all hooks we defined and exporting them, so we don't need to search different folders and files in order to get any hook. We search it only in this file.

## Hooks usage

Let's do it quick. We have container
```
const MyContainer = (props) => {
	return (
		<div>
			This is so cool!
		</div>
	)
}
```

We import hook into it. And doing some staff with it

```
**import { useOurState } from  "../../context";**

const MyContainer = () => {
	const { setState, ourState } = useOurState(); // getting actions and state from hooks
	const handleClick = () => {
		setState('test', 'Hello world!'); // setting new values to our global state
	}
	
	return (
		<div onClick={handleClick} >
			{ ourState.test || '' }
		</div>
	)
}
```

That's actually it.