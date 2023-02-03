export const formatPrice = (item) => {
    return item
        ? new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
          }).format(item)
        : new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
          }).format(0);
};

var unitlist = ["","K","M","G"];
export const formatnumber = (number) => {
   let sign = Math.sign(number);
   let unit = 0;
   
   while(Math.abs(number) > 1000)
   {
     unit = unit + 1; 
     number = Math.floor(Math.abs(number) / 100)/10;
   }
   return sign*Math.abs(number) + unitlist[unit];
}
