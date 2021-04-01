# shopping-cart

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

## Description
This repo contains a POC for an example shopping cart using a Firestore realtime database with a Vue 3 front end.


### Key features:

#### - Realtime data
Product and user data is updated in realtime using the Firestore watch api. This means that data updates automatically without requiring a page refresh, for example; completing a purchase from the cart will update the stock levels of the products.

#### - Authentication
Users are authenticated anonymously with Firebase. As a result, user cart data can be stored indefinitely between sessions.

#### - Offline data
Firestore allows for persistent data even when offline by creating a local db copy using indexeddb. Couple with service wroker, this means that the site, along with product data, can be accessed whilst offline. As a future enhancement, it would be useful to inform the user when cached data has been updated from the server

#### - CI
Github actions enable automatic deployment to a hosting solution. When a PR is raised, github will automatically deploy a preview build and when a PR is merged to main, a deployment will be made to the live url

#### Composition API
By using Vue3, the front end code can make use of the Composition API. This allows for more logical reusability of code, whilst retaining the key features of the Vue framework


### Future considerations
Currently, database operations are pretty simple and the most efficient route to success is to handle api requests directly from the client. However, should the complexity of operations increase (ie extensive data transformation is required or middleware needs to be applied) it may be useful to create a serverless API layer. With this particular stack, the obvious choice would be Google Cloud Functions, as the service level authentication with Firestore would make integrations simpler.
