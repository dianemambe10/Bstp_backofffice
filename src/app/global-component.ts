export const GlobalComponent = {
    // Api Calling
   // API_URL : 'https://api-node.themesbrand.website/',

    //API_URL : 'https://api.bstpgn.com/',
     API_URL : '',
    headerToken : {'Authorization': `Bearer ${localStorage.getItem('token')}`},

    // Auth Api
    AUTH_API:"/api/",
    // AUTH_API:"http://127.0.0.1:3000/auth/",


    // Products Api
    product:'apps/product',
    productDelete:'apps/product/',

    // Orders Api
    order:'apps/order',
    orderId:'apps/order/',

    // type societe Api
    type_societe:'v1/company_type/',

  // Domaine activite Api
    domaine_activite:'v1/categories/',

  // region Api
    region:'v1/region/',


  //prerecture Api
    prefecture:'v1/prefectures/',

  // commune Api
    commune:'v1/communes/',

  // Role Api
    role:'v1/role/',

  // User Api
  user:'v1/user/',

  // Fournisseur Api
  fournisseur:'v1/company/',


 // Buyer Api
  buyer:'v1/buyer/',


  // request Api
  request:'v1/request/',

  // request type Api
  request_type:'v1/request_type/',

  // actionnaire Api
  actionnaire:'v1/member/',

 // reference commercial Api
  commeriale:'v1/commerciales/',

// reference commercial Api
  documents:'v1/documents/',


  contrat:'v1/contract/',

  payment_mode:'v1/payment_mode/',


  abonnement:'v1/payment/',

  thematique: 'v1/thematique/',


  formation: 'v1/formation/',

  institution_type: 'v1/institution_type/',

  institution: 'v1/institution/',



}
