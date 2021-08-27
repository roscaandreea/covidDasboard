export const sortData = (data) =>{
    const sortedData = [...data];
    return sortedData.sort((a,b) =>((a.active > b.active) ? -1 : 1 ))

}