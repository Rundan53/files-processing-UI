

export function formateDate(date){
    const date2 = new Date(date);
    const year = date2.getFullYear();
    const month = ("0" + (date2.getMonth() + 1)).slice(-2);
    const day = ("0" + date2.getDate()).slice(-2);

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate
}