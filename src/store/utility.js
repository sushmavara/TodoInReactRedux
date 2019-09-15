const updateObj = (oldObj,updatedValues) =>{
  return{
    ...oldObj,
    ...updatedValues
  }
}

export default updateObj;