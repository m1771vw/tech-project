
 const formatDate = (oldDate)=>
{
    if(oldDate == undefined) return "";
    let newDate = ''
    var date = oldDate.split('T');  
    newDate = date[0].split('-')
    return newDate[1]+'-'+newDate[2]+'-'+newDate[0]
  }


  
export {formatDate}