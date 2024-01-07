export const sortAscendingOrder = (data)=>{
    
        if (Array.isArray(data.items) && data.items.length > 0) {
          data.items.sort((a, b) => new Date(a.date) - new Date(b.date));
          data.items.forEach((item) => sortAscendingOrder(item));
        }
      
}

export const sortDescendingOrder = (data)=>{
    if (Array.isArray(data.items) && data.items.length > 0) {
        data.items.sort((a, b) => new Date(b.date) - new Date(a.date));
        data.items.forEach((item) => sortDescendingOrder(item));
      }
}