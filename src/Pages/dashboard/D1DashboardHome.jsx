import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  
  ResponsiveContainer,
  Legend
} from 'recharts';
import { FaArrowUp, FaArrowDown, FaPlus,   FaClock , FaRupeeSign } from 'react-icons/fa';
import { Phone, ShoppingCart, CreditCard,  TrendingUp, IndianRupee, Wallet } from 'lucide-react';
import { GoGraph } from "react-icons/go";


const TRANSACTION_TYPE_MAP = {
  Purchase: {
    bg: "bg-[#FEE2E2]",
    icon: <ShoppingCart color="#DC2626" />,
    cardBg: "bg-red-50",
    text: "text-red-600",
    percentText: "text-red-500"
  },
  Expense: {
    bg: "bg-[#FFEDD5]",
    icon: <CreditCard color="#EA580C" />,
    cardBg: "bg-orange-50",
    text: "text-orange-500",
    percentText: "text-red-500"
  },
  Collection: {
    bg: "bg-[#DCFCE7]",
    icon: <Phone color="#16A34A" />,
    cardBg: "bg-green-50",
    text: "text-green-600",
    percentText: "text-green-600"
  }
};


const STAT_CARD_TYPE_MAP = {
  sale: {
    icon: <GoGraph color = "#16A34A" size={20} />,
    bg: "bg-[#DCFCE7]",
  },
  paid: {
    icon: <Wallet color = "#2563EB" size={20} />,
    bg: "bg-[#DBEAFE]",
  },
  pending: {
    icon: <FaClock  color="#EA580C"  size={20} />,
    bg: "bg-[#FFEDD5]",
  }
};

// ----------------- REUSABLE STAT CARD -----------------
const StatCard = ({ title, value, change, isPositive, type }) => {
  const config = STAT_CARD_TYPE_MAP[type] || {};
  return (
    <div className="bg-white shadow rounded-lg p-4 flex justify-between items-center w-full mt-5">
      <div className="flex flex-col gap-1">
        <div className="text-sm text-[#4B5563] font-robotoM">{title}</div>
        <div className="text-2xl text-black font-robotoB font-bold">{value}</div>
        <div className={`text-sm flex items-center font-robotB font-bold gap-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? <FaArrowUp className="inline" /> : <FaArrowDown className="inline" />} {change}
          <span className='text-[#4B5563] font-robotB font-medium'> vs last month</span>
        </div>
      </div>
      <div className={`p-2 rounded-full shadow ${config.bg}`}>{config.icon}</div>
    </div>
  );
};

// ----------------- TRANSACTION ROW -----------------
const TransactionItem = ({ date, type, description, amount, status }) => (
  <tr className="border-t text-sm md:my-4 md:shadow-md md:rounded-lg md:border font-robotoM md:border-gray-200 md:overflow-hidden bg-white">
    <td className="p-5 text-gray-700">{date}</td>
    <td className="p-5">
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        type === 'Purchase' ? 'bg-[#DCFCE7] text-[#166534]' :
        type === 'Expense' ? 'bg-[#FEE2E2] text-[#991B1B]' :
        'bg-[#FFEDD5] text-[#9A3412]'
      }`}>
        {type}
      </span>
    </td>
    <td className="p-5 text-gray-700">{description}</td>
    <td className="p-5 font-medium text-gray-800">
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        parseFloat(amount.toString().replace(/,/g, '')) >= 0
          ? 'text-[#16A34A]'
          : 'text-[#DC2626]'
      }`}>
        ₹{amount}
      </span>
    </td>
    <td className="p-5">
      <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
        status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
      }`}>
        {status}
      </span>
    </td>
  </tr>
);

// ----------------- MAIN COMPONENT -----------------
const D1DashboardHome = () => {
  const [selectedType, setSelectedType] = useState('All');

  const allTransactions = [
    { date: "Dec 28, 2024", type: "Sale", description: "Product Sale - INV001", amount: "145,000", status: "Paid" },
    { date: "Dec 27, 2024", type: "Purchase", description: "Raw Material Purchase", amount: "25,000", status: "Paid" },
    { date: "Dec 26, 2024", type: "Expense", description: "Office Rent", amount: "15,000", status: "Paid" },
    { date: "Dec 25, 2024", type: "Purchase", description: "Packaging Supplies", amount: "8,000", status: "Paid" },
    { date: "Dec 24, 2024", type: "Expense", description: "Travel Expense", amount: "5,000", status: "Paid" }
  ];

  const filteredTransactions = selectedType === 'All'
    ? allTransactions
    : allTransactions.filter(txn => txn.type === selectedType);

  const renderTransactionCard = (type, title, amount, percent) => {
    const config = TRANSACTION_TYPE_MAP[type];
    return (
      <div
        className={`flex items-center justify-between p-5 rounded-lg ${config.cardBg} cursor-pointer`}
        onClick={() => setSelectedType(type)}
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full shadow ${config.bg}`}>{config.icon}</div>
          <div>
            <div className="text-sm font-medium text-gray-800">{title}</div>
            <div className="text-xs text-gray-500">Monthly Total</div>
          </div>
        </div>
        <div className="text-right">
          <div className={`font-semibold ${config.text}`}>{amount}</div>
          <div className={`text-xs ${config.percentText}`}>{percent}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-2 md:p-6 space-y-6 overflow-hidden">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 ;
">
        <StatCard title="Monthly Sale" value="₹15.6L" change="12.9%" isPositive type="sale" />
        <StatCard title="Monthly Paid" value="₹12.8L" change="2.3%" isPositive type="paid" />
        <StatCard title="Monthly Pending" value="₹2.8L" change="4.3%" isPositive={false} type="pending" />
      </div>
      

      {/* Chart & Cashbook */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 relative shadow rounded-lg flex flex-col gap-10 justify-around">
          <div className="flex justify-between md:px-5 lg:pl-10 items-center mb-3">
            <h2 className="text-lg font-semibold text-gray-800">Sales & Collection Overview</h2>
            <span className="text-sm text-black font-robotoR font-medium border border-[#D1D5DB] rounded-lg px-2 py-1">Last 6 Months</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={graphData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#0f9afe" name="Sales" radius={[10, 10, 0, 0]} />
              <Bar dataKey="collection" fill="#00e0a3" name="Collection" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className='flex rotate-[-90deg] absolute top-1/2 -left-10 hidden md:block'>Amount (in Lakhs ₹) </div>
        </div>

        {/* Cashbook Transactions */}
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Cashbook Transactions</h2>
          <div className="space-y-3">
            {renderTransactionCard("Purchase", "Purchase", "₹8.5L", "+5.2%")}
            {renderTransactionCard("Expense", "Expense", "₹3.2L", "-2.1%")}
            {renderTransactionCard("Collection", "Collection Calls", "156", "+18.3%")}
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white p-4 shadow rounded-lg gap-5 flex flex-col" id='Recenttransaction'>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Recent Transactions</h2>
          <button onClick={() => setSelectedType('All')} className="text-sm text-blue-600 hover:underline">View All</button>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="min-w-[640px] text-left w-full">
            <thead>
              <tr className="text-gray-500 text-sm border-b">
                <th className="p-5">Date</th>
                <th className="p-5">Type</th>
                <th className="p-5">Description</th>
                <th className="p-5">Amount</th>
                <th className="p-5">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((txn, idx) => (
                  <TransactionItem key={idx} {...txn} />
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-5 text-gray-500">No transactions found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Button */}
      <div className='w-full justify-center items-center align-middle flex py-5 md:py-10 lg:py-20'>
        <div className='bg-[#EB2525] px-6 py-4 rounded-full w-fit justify-center items-center align-middle text-white flex flex-row gap-5 shadow-[0_4px_4px_0px_#00000040]'>
          <FaPlus color='white' /> Add Button
        </div>
      </div>
    </div>
  );
};

export default D1DashboardHome;

const graphData = [
  { month: 'Jul 2024', sales: 18, collection: 16 },
  { month: 'Aug 2024', sales: 19, collection: 17 },
  { month: 'Sep 2024', sales: 18, collection: 18 },
  { month: 'Oct 2024', sales: 19, collection: 19 },
  { month: 'Nov 2024', sales: 18, collection: 18 },
  { month: 'Dec 2024', sales: 18, collection: 17 }
];
