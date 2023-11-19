export const GlobalComponent = {
    // Api Calling
   // API_URL : 'https://api-node.themesbrand.website/',

    API_URL : 'http://localhost:8000/',
    // API_URL : 'http://127.0.0.1:3000/',
    headerToken : {'Authorization': `Bearer ${localStorage.getItem('token')}`},

    // Auth Api
    AUTH_API:"http://localhost:8000/auth/",
    // AUTH_API:"http://127.0.0.1:3000/auth/",


    // Products Api
    product:'apps/product',
    productDelete:'apps/product/',

    // Orders Api
    order:'apps/order',
    orderId:'apps/order/',

    // type societe Api
    type_societe:'company-type/',

  // Domaine activite Api
    domaine_activite:'categories/',

  // region Api
    region:'region/',


  //prerecture Api
    prefecture:'prefectures/',

  // commune Api
    commune:'communes/',

  // Role Api
    role:'role/',

  // User Api
  user:'user/',

  // Fournisseur Api
  fournisseur:'company/',


 // Buyer Api
  buyer:'buyer/',


  // request Api
  request:'request/',

  // request type Api
  request_type:'request-type/',


}
