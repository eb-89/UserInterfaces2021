# UserInterfaces2021
Project repo for User Interfaces course at UU 2021


# Installation

1. Install Node.js https://nodejs.org/en/
2. Go to the main-directory /UserInterfaces2021
3. Run in terminal/cmd/powershell
```
npx serve -s src
```
# How to follow programming-structure
To create a new page:
1. Create a new .js-file in /views, name it appropriate
2. Create a class in the new .js-file, named appropriately. See example:
    ```
		export default class NewPage{
			constructor() {
			}

			init = () => {
			}

			render = () => {
			}
		}
    ```
3. Go to app.js and import the new .js-file and create a route inside the constructor. See the routes to know how it should look.
4. Create a new folder in /Components, name it appropriately. Create a content.js-file inside that folder and create the class (See the example in step 2).
5. (If you want to add a button to the header): Go to header.js and create a button like the ones that are there, and fill out the switch-case.

# How to add internationalized strings

1. When inserting a string, insert a span tag with a data-textid attribute, like so:

		<span data-textid="yourID">
	Do not insert any text into the span tag.
2. Locate the language files in the `/lang` folder. Add your strings keyed by `yourID` for each respective language.
3. Before rendering HTML, call the function `window.lang.generateStrings(elem)` where `elem` is a **JQuery object**. If your component has no dynamically updating content, it's enough to run this in your components `render()` function. If you are generating HTML dynamically, you should run the function before inserting/appending the HTML. 
