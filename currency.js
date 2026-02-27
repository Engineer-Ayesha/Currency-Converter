let ButtonClicked=document.querySelector("#ConvertButton button");
let FromBoard=document.querySelector("#Swapper #from_board select");
let ToBoard=document.querySelector("#Swapper #To_board select");
let EnterAmount=document.querySelector("#AmountBox input");
let result_enterAmount=document.querySelector("#Dashboard #EnterAmount pre");
let result_convertAmount=document.querySelector("#Dashboard #ConvertedAmount p"); 
ButtonClicked.addEventListener("click",()=>{
    let EnterAmountValue= Number(EnterAmount.value);
    let FromBoardValue=FromBoard.value;
    let ToBoardValue=ToBoard.value;
    async function amountConversion(){
        try{
            const response=await fetch("https://cdn.moneyconvert.net/api/latest.json");
            if(!response.ok){
                throw new Error("failed to fetch");
            }
            const result=await response.json();
            let processAmount=(result.rates[ToBoardValue] / result.rates[FromBoardValue])*EnterAmountValue;
            result_enterAmount.innerHTML= `<b> ${EnterAmountValue} ${FromBoardValue} = </b>`;
            result_convertAmount.innerHTML=`<b> ${processAmount.toFixed(2)} ${ToBoardValue}</b>`;
            let successBox = document.createElement("div");
            successBox.innerText = "Conversion" + " " + "Successful";
            successBox.style.whiteSpace = "nowrap";
            successBox.style.backgroundColor = "#022c5c";
            successBox.style.height="20px";
            successBox.style.width="190px";
            successBox.style.color="white";
            successBox.style.padding = "15px";
            successBox.style.marginTop = "25px";
            successBox.style.marginLeft = "65px";
            successBox.style.borderRadius = "8px";
            successBox.style.marginRight="30px";
            successBox.style.fontSize="18px";
            document.getElementById("container").append(successBox);
            setTimeout(() => {
                successBox.remove();
                }, 2000);
        }
        catch(err){
            result_enterAmount.innerText=err.message;
            result_convertAmount.innerText=err.message;
    
        }    
    }
    amountConversion();
});


