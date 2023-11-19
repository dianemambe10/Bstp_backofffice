export function errorValidation(e: any){
  Object.keys(e).forEach((key) =>{
    const control = e[key];
    control.setErrors(null)
  })
}
