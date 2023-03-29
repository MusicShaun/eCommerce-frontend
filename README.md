<img name='logo' href='https://res.cloudinary.com/dyneqi48f/image/upload/v1676016779/nsz9k9ogjf64gszkbb02.png' width='100' alt='' />
<h1 align='center'> Shaun's eCommerce Project </h1>
<h2 align='center'> Currently a Work In Progress.</h2>


<h3>Tooling / features </h3>

  * React Toolkit Query 
  * NextJS
  * Typescript
  * NodeJs server

This eCommerce site allows a user to buy clothes and manage a user account. The aim is to create a site with as fast as possible server interactions and as few requests as possible. 

The design style is a knock-off of the ASOS website using styled-components.
The CRUD activity is all handled by RTK query in an attempt to cache as much state as possible and minimise api calls. 
Anyone can login or register an account and if you choose to remain unknown, the moment you click a heart or cart an item the site will generate a guest account for 7 days . 

The front-end is written in NextJS/Typescript and deployed on Netlify.
The back-end is wrriten in NodeJs and deployed on Heroku. 

```
store.dispatch(extendedClothesSlice.endpoints.getAllClothes.initiate())

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [
    { params: { productType: 'shirts' } },
    { params: { productType: 'shorts' } },
    { params: { productType: 'shoes' } }
  ]
  return {
    paths,
    fallback: false
  }
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`https://shauns-ecommerce.herokuapp.com/api/asos/get${params!.productType}`)
  const productType = await res.json()
  console.log('static props rendered')
  return { 
    props:  productType ,
  }
}

interface IProps {
  data: ClotheType[]
}
```

The main tools worth mentioning are  
  - RTK query
  - Typescript 
  - NextJS 

Minor tools such as Mongoose, Bcrypt or express don't seem worth the mention. 

Mobile responsiveness will not be setup. At this point it seems like an inneffective use of time. 

UPCOMING FEATURES 
  - Error handling in nodeJs. There is none currently. 
  - A Larger data pool to better test the speed of server requests. 
  - A security feature for removing localStorage data when 'expiresAt' elapses. 
- 