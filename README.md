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