'use client';

import Image from 'next/image';
import  { useEffect, useState } from 'react';
import { sendReceiptEmail } from './actions/actions';
import { HardDriveDownload, Loader2, Mail } from 'lucide-react';

// Define the shape of our invoice item
type Item = {
  id: number;
  description: string;
  qty: number;
  price: number;
};

function CashMemo() {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
const [receiptId, setReceiptId] = useState('');

useEffect(() => {
  setReceiptId(Date.now().toString().slice(-6));
}, []);  


  // State for Advance Payment
  const [advance, setAdvance] = useState<number>(0);

  const [items, setItems] = useState<Item[]>([
    { id: 1, description: 'Medical Scrub Set (Maroon)', qty: 1, price: 4500 }
  ]);
  const [isSending, setIsSending] = useState(false);

  // --- Logic Helpers ---
  const addItem = () => {
    const newItem: Item = {
      id: Date.now(),
      description: '',
      qty: 1,
      price: 0,
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updateItem = (id: number, field: keyof Item, value: string | number) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setItems(newItems);
  };

  // Calculations
  const calculateTotal = () => {
    return items.reduce((acc, item) => acc + item.qty * item.price, 0);
  };

  const totalAmount = calculateTotal();
  const balanceDue = totalAmount - advance;

  // --- Actions ---
  const handlePrint = () => {
    window.print();
  };

  const handleEmail = async () => {
    if (!customerEmail) return alert('Please enter customer email');
    
    setIsSending(true);
    const emailData = {
      customerName,
      customerEmail,
      items,
      receiptId,
      grandTotal: totalAmount,
      advance: advance,
      balance: balanceDue
    };
    console.log(emailData);
    try {
      
      // const res = await fetch('/api/send-receipt', { method: 'POST', body: JSON.stringify(emailData) });
      const res = await sendReceiptEmail(emailData);
      if (res.success) {
        alert(res.message);
      } else {
        alert(res.message);
      }
      // } else {
      //   alert('Failed to send email.');
      // }
    } catch (error: unknown) {
      console.error(error);
      alert((error as Error)?.message || 'Error sending email');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 print:bg-white print:p-0">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden print:shadow-none print:w-full print:rounded-none flex flex-col min-h-[90vh] print:min-h-screen">
        
        {/* BRAND HEADER WITH LOGO */}
        <div className="bg-red-900 text-white p-8 flex justify-between items-center print:bg-red-900 print:text-white print-color-adjust-exact">
          <div className="flex items-center gap-5">
            {/* Logo Container */}
            <div className="bg-white h-20 w-20 rounded-full flex items-center justify-center shadow-lg overflow-hidden border-4 border-red-800">
               <Image
                 src="/logo.jpg" 
                 alt="ScrubX Logo" 
                 className="h-14 w-auto object-contain" 
                 height={250}
                 width={250}
                 priority
               />
            </div>

            <div>
              <h1 className="text-4xl font-extrabold tracking-wide uppercase">ScrubX</h1>
              <p className="text-red-100 font-medium tracking-wider text-sm mt-1">Premium Medical APPAREL</p>
            </div>
          </div>

          <div className="text-right">
            <h2 className="text-2xl font-semibold opacity-90">CASH MEMO</h2>
            <p className="text-red-200 text-sm mt-1">#{receiptId}</p>
          </div>
        </div>

        <div className="p-8 grow">
          {/* Company & Customer Info */}
          <div className="flex justify-between items-start mb-10 text-gray-600 text-sm">
            <div className="w-1/2">
              <h3 className="font-bold text-gray-800 text-lg mb-2">Billed To:</h3>
              <div className="print:hidden mb-2">
                <input
                  type="text"
                  placeholder="Customer Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:border-red-800 focus:outline-none"
                />
              </div>
              <div className="print:hidden mb-2">
                <input
                  type="email"
                  placeholder="Customer Email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:border-red-800 focus:outline-none"
                />
              </div>
              <div className="print:hidden">
              <input
                  type="tel"
                  placeholder="Phone Number (Optional)"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:border-red-800 focus:outline-none"
                />
              </div>
              <div className="hidden print:block">
                <p className="text-lg font-semibold text-gray-900">{customerName}</p>
                <p>{customerEmail}</p>
                <p>{customerPhone}</p>
              </div>
            </div>

            <div className="text-right w-1/2">
              <h3 className="font-bold text-gray-800 text-lg mb-2">From:</h3>
              <p className="font-semibold text-gray-900">ScrubX Headquarters</p>
              <p>Karachi, Pakistan</p>
              <p className="mt-2">scrubx.pk@gmail.com</p>
              <p>+92 301 0221483</p>
            </div>
          </div>

          {/* Items Table */}
          <table className="w-full mb-8 border-collapse">
            <thead>
              <tr className="border-b-2 border-red-900 text-red-900">
                <th className="py-3 text-left font-bold w-1/2">ITEM DESCRIPTION</th>
                <th className="py-3 text-center font-bold w-20">QTY</th>
                <th className="py-3 text-right font-bold w-32">PRICE</th>
                <th className="py-3 text-right font-bold w-32">TOTAL</th>
                <th className="py-3 print:hidden w-10"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-gray-200 hover:bg-red-50 transition-colors print:hover:bg-transparent">
                  <td className="py-3">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      className="w-full outline-none bg-transparent text-gray-800 placeholder-gray-500"
                      placeholder="Enter product name..."
                    />
                  </td>
                  <td className="py-3">
                    <input
                      type="number"
                      value={item.qty}
                      min="0"
                      onChange={(e) => updateItem(item.id, 'qty', Number(e.target.value))}
                      className="w-full text-center outline-none bg-transparent text-gray-800"
                    />
                  </td>
                  <td className="py-3">
                    <input
                      type="number"
                      value={item.price}
                      min="0"
                      onChange={(e) => updateItem(item.id, 'price', Number(e.target.value))}
                      className="w-full text-right outline-none bg-transparent text-gray-800"
                    />
                  </td>
                  <td className="py-3 text-right font-medium text-gray-700">
                    Rs. {(item.qty * item.price).toLocaleString()}
                  </td>
                  <td className="py-3 text-center print:hidden">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-600 font-bold text-xl"
                    >
                      &times;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Add Item Button */}
          <div className="mb-8 print:hidden">
            <button
              onClick={addItem}
              className="text-red-900 border border-red-900 px-4 py-2 rounded hover:bg-red-900 hover:text-white transition-all font-medium text-sm"
            >
              + Add New Line
            </button>
          </div>

          {/* Totals Section */}
          <div className="flex justify-end mb-12">
            <div className="w-80 bg-gray-50 p-6 rounded border border-gray-100 print:border-none print:bg-transparent print:p-0">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600 font-medium">Total Amount:</span>
                <span className="font-bold text-gray-800">Rs. {totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-gray-600 font-medium">Advance Paid:</span>
                <div className="flex items-center justify-end w-32">
                  <span className="mr-1 text-gray-500 print:hidden">Rs.</span>
                  <input
                    type="number"
                    value={advance}
                    onChange={(e) => setAdvance(Number(e.target.value))}
                    className="w-20 text-right text-gray-800 bg-white border rounded px-1 text-sm focus:border-red-900 outline-none print:hidden"
                  />
                  <span className="hidden print:block font-bold">Rs. {advance.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex justify-between pt-4 mt-2">
                <span className="text-red-900 font-bold text-lg">Balance Due:</span>
                <span className="text-red-900 font-bold text-2xl">
                  Rs. {balanceDue.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* --- PRINTABLE FOOTER MESSAGE --- */}
        <div className="p-8 border-t border-gray-200 mt-auto">
          <div className="flex justify-between items-end">
             {/* Left: Thank You & Terms */}
             <div className="text-sm text-gray-500 max-w-md">
                <h4 className="font-bold text-red-900 mb-1 text-lg">Thank You for Your Business!</h4>
                <p>We appreciate your trust in ScrubX.</p>
                <p className="mt-2 text-xs italic">
                  * Items can be exchanged within 7 days with original receipt.<br/>
                  * No cash refunds allowed.
                </p>
             </div>

             {/* Right: Signature Line */}
             <div className="text-center">
               <div className="h-12 w-40 border-b-2 border-gray-400 mb-2"></div>
               <p className="text-xs font-bold text-gray-600 uppercase tracking-wider">Authorized Signatory</p>
             </div>
          </div>
        </div>

        {/* Action Buttons (Hidden in Print) */}
        <div className="print:hidden bg-gray-100 p-6 flex justify-between items-center">
            <p className="text-gray-400 text-sm">Create clean, professional invoices instantly.</p>
            <div className="flex gap-4">
              <button
                onClick={handlePrint}
                className="bg-gray-800 text-white px-8 py-3 rounded-lg flex justify-center items-center hover:bg-gray-900 shadow-lg font-medium"
              >
                <HardDriveDownload className="w-4 h-4 mr-2" /> Print / Save
              </button>
              
              <button
                onClick={handleEmail}
                disabled={isSending}
                className={`px-8 py-3 rounded-lg text-white shadow-lg font-medium ${
                  isSending ? 'bg-red-400' : 'bg-red-900 hover:bg-red-800'
                }`}
              >
                {isSending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 inline-block animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2 inline-block" /> Send Email
                  </>
                )}
              </button>
            </div>
        </div>

      </div>
    </div>
  );
}


export default  CashMemo;