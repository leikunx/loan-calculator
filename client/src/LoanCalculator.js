import React, { useState, useEffect } from 'react';
import './LoanCalculator.css';

function LoanCalculator() {
  const [amount, setAmount] = useState('');
  const [years, setYears] = useState('');
  const [rate, setRate] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [touched, setTouched] = useState({
    amount: false,
    years: false,
    rate: false
  });

  const validate = (value) => !isNaN(value) && value > 0;

  const allValid = validate(amount) && validate(years) && validate(rate);

  useEffect(() => {
    if (allValid) {
      const monthlyRate = rate / 100 / 12;
      const months = years * 12;
      const payment = (amount * 10000) * monthlyRate * Math.pow(1 + monthlyRate, months) /
        (Math.pow(1 + monthlyRate, months) - 1);
      setMonthlyPayment(payment.toFixed(2));
    } else {
      setMonthlyPayment(null);
    }
  }, [amount, years, rate, allValid]);

  return (
    <div className="calculator">
      <h2>贷款月供计算器</h2>
      <div className="input-group">
        <label>贷款总额(万元):</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          onBlur={() => setTouched({...touched, amount: true})}
          className={touched.amount && !validate(amount) ? 'invalid' : ''}
        />
        {touched.amount && !validate(amount) && (
          <div className="error">请输入有效的贷款金额</div>
        )}
      </div>
      <div className="input-group">
        <label>贷款期限(年):</label>
        <input
          type="number"
          value={years}
          onChange={(e) => setYears(e.target.value)}
          onBlur={() => setTouched({...touched, years: true})}
          className={touched.years && !validate(years) ? 'invalid' : ''}
        />
        {touched.years && !validate(years) && (
          <div className="error">请输入有效的贷款期限</div>
        )}
      </div>
      <div className="input-group">
        <label>年利率(%):</label>
        <input
          type="number"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          onBlur={() => setTouched({...touched, rate: true})}
          className={touched.rate && !validate(rate) ? 'invalid' : ''}
        />
        {touched.rate && !validate(rate) && (
          <div className="error">请输入有效的年利率</div>
        )}
      </div>
      {monthlyPayment && (
        <div className="result">
          每月还款: ¥{monthlyPayment}
        </div>
      )}
    </div>
  );
}

export default LoanCalculator;