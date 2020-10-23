import React,{useEffect,useState} from 'react';
import "./App.css";
import CurrencyRow from "./CurrencyRow";

const App = () => {
    const [currencyOptions,setCurrencyOptions] = useState([])
    const [fromCurrency,setFromCurrency] =useState()
    const [toCurrency, setToCurrency] = useState()
    const [amount, setAmount] = useState(1)
    const [exchangeRate, setExchangeRate] = useState()
    const [isAMountInFromCurrency, setIsAMountInFromCurrency] = useState(true)

    let fromAmount,toAmount
     if(isAMountInFromCurrency){
         fromAmount = amount;
         toAmount=fromAmount*exchangeRate;
     }else{
       toAmount=amount;
       fromAmount=toAmount/exchangeRate;
     }


    useEffect( ()=>{
     fetch('https://api.exchangeratesapi.io/latest')
     .then(res=>res.json())
     .then(data=> {       
       const firstCurrency = Object.keys(data.rates)[0]
       setCurrencyOptions([data.base,...Object.keys(data.rates)])
        setFromCurrency(data.base)
        setToCurrency(firstCurrency)
        setExchangeRate(data.rates[firstCurrency])
       
      })
} ,[])

useEffect(() => {
  if(fromCurrency!=null && toCurrency!=null){
    fetch(`https://api.exchangeratesapi.io/latest?base=${fromCurrency}&symbols=${toCurrency}`)
     .then(res=>res.json())
     .then(data=> setExchangeRate(data.rates[toCurrency]))
  }
} 
, [fromCurrency,toCurrency])

const onChangeFromInput = (e)=>{
  setAmount(e.target.value)
  setIsAMountInFromCurrency(true)  
}
const onChangeToInput = (e)=>{
  setAmount(e.target.value)
  setIsAMountInFromCurrency(false)  
}
  return (
  <>
    <h1>Convert</h1>
    <CurrencyRow onChangeInput={onChangeFromInput} 
     amount = {fromAmount} 
     currencyOptions={currencyOptions} 
     selectedCurrency = {fromCurrency}
     onChangeCurrency={e=>setFromCurrency(e.target.value)}/>
    <div className="equals">=</div>
   <CurrencyRow  onChangeInput={onChangeToInput} amount={toAmount} currencyOptions={currencyOptions} selectedCurrency={toCurrency}
   onChangeCurrency={e=>setToCurrency(e.target.value)}/>
  </>
  )
};

export default App;
