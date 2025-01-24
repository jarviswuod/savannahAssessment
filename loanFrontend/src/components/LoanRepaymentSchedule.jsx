import { useEffect, useState } from "react";
import loanData from "./loanData.json";

function LoanRepaymentSchedule() {
  // const [data, setData] = useState(null);

  // const [loanAmount, setLoanAmount] = useState(100000);
  // const [loanTerm, setLoanTerm] = useState(10);
  // const [interestRate, setInterestRate] = useState(6);
  // const [compound, setCompound] = useState("Monthly");
  // const [payBack, setPayBack] = useState("Every Month");

  // useEffect(() => {
  //   fetch("https://api.example.com/loanRepaymentSchedule")
  //     .then((response) => response.json())
  //     .then((data) => setData(data))
  //     .catch((error) => console.error("Error fetching data:", error));
  // }, []);

  // if (!data) {
  //   return <div>Loading...</div>;
  // }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const requestData = {
  //     loanAmount,
  //     loanTerm,
  //     interestRate,
  //     compound,
  //     payBack,
  //   };
  //   fetch("https://api.example.com/loanRepaymentSchedule", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(requestData),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => setData(data))
  //     .catch((error) => console.error("Error posting data:", error));
  // };

  const [data, setData] = useState(null);
  const [loanAmount, setLoanAmount] = useState(100000);
  const [loanTerm, setLoanTerm] = useState(10);
  const [interestRate, setInterestRate] = useState(6);
  const [compound, setCompound] = useState("Monthly");
  const [payBack, setPayBack] = useState("Every Month");

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestData = {
      loanAmount,
      loanTerm,
      interestRate,
      compound,
      payBack,
    };
    fetch("http://localhost:8080/calculate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error posting data:", error));
  };

  return (
    <section>
      <div>
        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-[1fr_1fr]">
          <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-center">
              Loan Calculator
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium">Loan Amount ($)</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-lg"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                />
              </div>

              <div>
                <label className="block font-medium">Loan Term (years)</label>
                <input
                  type="number"
                  step="0.1"
                  className="w-full p-2 border rounded-lg"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                />
              </div>

              <div>
                <label className="block font-medium">Interest Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  className="w-full p-2 border rounded-lg"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                />
              </div>

              <div>
                <label className="block font-medium">Compound</label>
                <select
                  className="w-full p-2 border rounded-lg"
                  value={compound}
                  onChange={(e) => setCompound(e.target.value)}
                >
                  <option value="yearly">Annually (APY)</option>
                  <option value="semi-Annually">Semi-annually</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="monthly">Monthly (APR)</option>
                  <option value="semi-monthly">Semi-Monthly</option>
                  <option value="biweekly">Biweekly</option>
                  <option value="weekly">Weekly</option>
                  <option value="daily">Daily</option>
                  <option value="continuously">Continuously</option>
                </select>
              </div>

              <div>
                <label className="block font-medium">Pay Back</label>
                <select
                  className="w-full p-2 border rounded-lg"
                  value={payBack}
                  onChange={(e) => setPayBack(e.target.value)}
                >
                  <option value="every day">Every Day</option>
                  <option value="every week">Every Week</option>
                  <option value="every month">Every Month</option>
                  <option value="fortnightly">Fortnightly</option>
                  <option value="every half month">Every Half Month</option>
                  <option value="every month">Every Month</option>
                  <option value="every quarter">Every Quarter</option>
                  <option value="every 6 months">Every 6 Months</option>
                  <option value="every year">Every Year</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
              >
                Calculate
              </button>
            </form>
          </div>
          <div></div>
        </div>

        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Loan Repayment Schedule</h2>
          <div className="font-[sans-serif] overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-800 whitespace-nowrap">
                <tr>
                  <th className="p-4 text-left text-sm font-medium text-white">
                    Intial Balance
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-white">
                    Interest
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-white">
                    Principal
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-white">
                    End Balance
                  </th>
                </tr>
              </thead>

              <tbody className="whitespace-nowrap">
                {loanData.loanRepaymentSchedule.map((item, index) => (
                  <tr key={index} className="even:bg-blue-50">
                    <td className="p-4 text-sm text-black">
                      {item.startingBalance.toFixed(2)}
                    </td>
                    <td className="p-4 text-sm text-black">
                      {item.interest.toFixed(2)}
                    </td>
                    <td className="p-4 text-sm text-black">
                      {item.principal.toFixed(2)}
                    </td>
                    <td className="p-4 text-sm text-black">
                      {item.endingBalance.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-bold">Loan Summary</h3>
            <p>
              Payment Every Month:{" "}
              {loanData.loanSummary.paymentEveryMonth.toFixed(2)}
            </p>
            <p>
              Total Payback Payments:{" "}
              {loanData.loanSummary.totalPaybackPayments.toFixed(2)}
            </p>
            <p>
              Total Interest: {loanData.loanSummary.totalInterest.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoanRepaymentSchedule;
