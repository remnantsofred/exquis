
# Create React App Template

A no-frills template from which to create React applications with
[Create React App](https://github.com/facebook/create-react-app).

```sh
npx create-react-app my-app --template @appacademy/simple --use-npm
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)



## Feature 2 - Edit Skeleton from Profile Page

A second feature to highlight is the ability to edit skeletons you own from the user profile page. From the Skeleton show page, it was fairly simple to write out the logic for the edit modal form to have all the existing information about the skeleton pre-populated. 

The user profile page, on the other hand, includes all the skeletons the user is an owner of (meaning a user is able to edit) and collaborator on (collaborators are not given edit access). The user profile page also has three tabs for different collections of skeletons - Current Skeletons (skeletons the user is owner or collaborator on that still have bones remaining and therefore have not been completed), Owned Skeletons (skeletons the user is the owner of, regardless of complete or incomplete status), and Previous Skeletons (skeletons the user is owner or collaborator that have reached max bones and have been completed). 

When we initially ported over the edit modal form functionality from the Skeleton show page, the edit modal did not know which skeleton was being passed in. To correct this issue and to ensure the correct skeleton's information was pre-populating the correct skeleton's information into the edit form modal, we updated refactored the code such that each skeleton of each tab had an assciated modal that would open if the modalStatus was set to the tab name + skeleton id. We then had an onClick function that would set the modal status to the tab and skeleton id. 


### Code snippet below:
```javascript
var s = "JavaScript syntax highlighting";
alert(s);





```