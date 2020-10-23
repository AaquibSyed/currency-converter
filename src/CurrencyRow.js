import React from 'react'

const CurrencyRow = ({amount,currencyOptions,selectedCurrency,onChangeCurrency,onChangeInput}) => {    
   
    return (
        <div>
          <input type='Number' 
            className='input'
            value={amount} 
            onChange={onChangeInput}></input>
          <select value={selectedCurrency} onChange={onChangeCurrency}> 
            {currencyOptions.map(option=>
         <option value={option} key={option}>{option}</option>    
            )}           
          </select> 
        </div>
    )
}

export default CurrencyRow
