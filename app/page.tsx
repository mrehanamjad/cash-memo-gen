// 'use client';

// import Image from 'next/image';
// import  { useEffect, useState } from 'react';
// import { sendReceiptEmail } from './actions/actions';
// import { HardDriveDownload, Loader2, Mail } from 'lucide-react';

// // Define the shape of our invoice item
// type Item = {
//   id: number;
//   description: string;
//   qty: number;
//   price: number;
// };

// function CashMemo() {
//   const [customerName, setCustomerName] = useState('');
//   const [customerEmail, setCustomerEmail] = useState('');
//   const [customerPhone, setCustomerPhone] = useState('');
// const [receiptId, setReceiptId] = useState('');

// useEffect(() => {
//   setReceiptId(Date.now().toString().slice(-5));
// }, []);  


//   // State for Advance Payment
//   const [advance, setAdvance] = useState<number>(0);

//   const [items, setItems] = useState<Item[]>([
//     { id: 1, description: 'Medical Scrub Set (Maroon)', qty: 1, price: 4500 }
//   ]);
//   const [isSending, setIsSending] = useState(false);

//   // --- Logic Helpers ---
//   const addItem = () => {
//     const newItem: Item = {
//       id: Date.now(),
//       description: '',
//       qty: 1,
//       price: 0,
//     };
//     setItems([...items, newItem]);
//   };

//   const removeItem = (id: number) => {
//     setItems(items.filter((item) => item.id !== id));
//   };

//   const updateItem = (id: number, field: keyof Item, value: string | number) => {
//     const newItems = items.map((item) => {
//       if (item.id === id) {
//         return { ...item, [field]: value };
//       }
//       return item;
//     });
//     setItems(newItems);
//   };

//   // Calculations
//   const calculateTotal = () => {
//     return items.reduce((acc, item) => acc + item.qty * item.price, 0);
//   };

//   const totalAmount = calculateTotal();
//   const balanceDue = totalAmount - advance;

//   // --- Actions ---
//   const handlePrint = () => {
//     window.print();
//   };

//   const handleEmail = async () => {
//     if (!customerEmail) return alert('Please enter customer email');
    
//     setIsSending(true);
//     const emailData = {
//       customerName,
//       customerEmail,
//       items,
//       receiptId,
//       grandTotal: totalAmount,
//       advance: advance,
//       balance: balanceDue
//     };
//     console.log(emailData);
//     try {
      
//       // const res = await fetch('/api/send-receipt', { method: 'POST', body: JSON.stringify(emailData) });
//       const res = await sendReceiptEmail(emailData);
//       if (res.success) {
//         alert(res.message);
//       } else {
//         alert(res.message);
//       }
//       // } else {
//       //   alert('Failed to send email.');
//       // }
//     } catch (error: unknown) {
//       console.error(error);
//       alert((error as Error)?.message || 'Error sending email');
//     } finally {
//       setIsSending(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-8 print:bg-white print:p-0">
//       <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden print:shadow-none print:w-full print:rounded-none flex flex-col min-h-[90vh] print:min-h-screen">
        
//         {/* BRAND HEADER WITH LOGO */}
//         <div className="bg-red-900 text-white p-8 flex justify-between items-center print:bg-red-900 print:text-white print-color-adjust-exact">
//           <div className="flex items-center gap-5">
//             {/* Logo Container */}
//             <div className="bg-white h-20 w-20 rounded-full flex items-center justify-center shadow-lg overflow-hidden border-4 border-red-800">
//                <Image
//                  src="/logo.jpg" 
//                  alt="ScrubX Logo" 
//                  className="h-14 w-auto object-contain" 
//                  height={250}
//                  width={250}
//                  priority
//                />
//             </div>

//             <div>
//               <h1 className="text-4xl font-extrabold tracking-wide uppercase">ScrubX</h1>
//               <p className="text-red-100 font-medium tracking-wider text-sm mt-1">Premium Medical APPAREL</p>
//             </div>
//           </div>

//           <div className="text-right">
//             <h2 className="text-2xl font-semibold opacity-90">CASH MEMO</h2>
//             <p className="text-red-200 text-sm mt-1">#{receiptId}</p>
//           </div>
//         </div>

//         <div className="p-8 grow">
//           {/* Company & Customer Info */}
//           <div className="flex justify-between items-start mb-10 text-gray-600 text-sm">
//             <div className="w-1/2">
//               <h3 className="font-bold text-gray-800 text-lg mb-2">Billed To:</h3>
//               <div className="print:hidden mb-2">
//                 <input
//                   type="text"
//                   placeholder="Customer Name"
//                   value={customerName}
//                   onChange={(e) => setCustomerName(e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded focus:border-red-800 focus:outline-none"
//                 />
//               </div>
//               <div className="print:hidden mb-2">
//                 <input
//                   type="email"
//                   placeholder="Customer Email (Optional)"
//                   value={customerEmail}
//                   onChange={(e) => setCustomerEmail(e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded focus:border-red-800 focus:outline-none"
//                 />
//               </div>
//               <div className="print:hidden">
//               <input
//                   type="tel"
//                   placeholder="Phone Number (Optional)"
//                   value={customerPhone}
//                   onChange={(e) => setCustomerPhone(e.target.value)}
//                   className="w-full p-2 border border-gray-300 rounded focus:border-red-800 focus:outline-none"
//                 />
//               </div>
//               <div className="hidden print:block">
//                 <p className="text-lg font-semibold text-gray-900">{customerName}</p>
//                 <p>{customerEmail}</p>
//                 <p>{customerPhone}</p>
//               </div>
//             </div>

//             <div className="text-right w-1/2">
//               <h3 className="font-bold text-gray-800 text-lg mb-2">From:</h3>
//               <p className="font-semibold text-gray-900">ScrubX Headquarters</p>
//               <p>Karachi, Pakistan</p>
//               <p className="mt-2">scrubx.pk@gmail.com</p>
//               <p>+92 301 0221483</p>
//             </div>
//           </div>

//           {/* Items Table */}
//           <table className="w-full mb-8 border-collapse">
//             <thead>
//               <tr className="border-b-2 border-red-900 text-red-900">
//                 <th className="py-3 text-left font-bold w-1/2">ITEM DESCRIPTION</th>
//                 <th className="py-3 text-center font-bold w-20">QTY</th>
//                 <th className="py-3 text-right font-bold w-32">PRICE</th>
//                 <th className="py-3 text-right font-bold w-32">TOTAL</th>
//                 <th className="py-3 print:hidden w-10"></th>
//               </tr>
//             </thead>
//             <tbody>
//               {items.map((item) => (
//                 <tr key={item.id} className="border-b border-gray-200 hover:bg-red-50 transition-colors print:hover:bg-transparent">
//                   <td className="py-3">
//                     <input
//                       type="text"
//                       value={item.description}
//                       onChange={(e) => updateItem(item.id, 'description', e.target.value)}
//                       className="w-full outline-none bg-transparent text-gray-800 placeholder-gray-500"
//                       placeholder="Enter product name..."
//                     />
//                   </td>
//                   <td className="py-3">
//                     <input
//                       type="number"
//                       value={item.qty}
//                       min="0"
//                       onChange={(e) => updateItem(item.id, 'qty', Number(e.target.value))}
//                       className="w-full text-center outline-none bg-transparent text-gray-800"
//                     />
//                   </td>
//                   <td className="py-3">
//                     <input
//                       type="number"
//                       value={item.price}
//                       min="0"
//                       onChange={(e) => updateItem(item.id, 'price', Number(e.target.value))}
//                       className="w-full text-right outline-none bg-transparent text-gray-800"
//                     />
//                   </td>
//                   <td className="py-3 text-right font-medium text-gray-700">
//                     Rs. {(item.qty * item.price).toLocaleString()}
//                   </td>
//                   <td className="py-3 text-center print:hidden">
//                     <button
//                       onClick={() => removeItem(item.id)}
//                       className="text-gray-400 hover:text-red-600 font-bold text-xl"
//                     >
//                       &times;
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* Add Item Button */}
//           <div className="mb-8 print:hidden">
//             <button
//               onClick={addItem}
//               className="text-red-900 border border-red-900 px-4 py-2 rounded hover:bg-red-900 hover:text-white transition-all font-medium text-sm"
//             >
//               + Add New Line
//             </button>
//           </div>

//           {/* Totals Section */}
//           <div className="flex justify-end mb-12">
//             <div className="w-80 bg-gray-50 p-6 rounded border border-gray-100 print:border-none print:bg-transparent print:p-0">
//               <div className="flex justify-between py-2 border-b border-gray-200">
//                 <span className="text-gray-600 font-medium">Total Amount:</span>
//                 <span className="font-bold text-gray-800">Rs. {totalAmount.toLocaleString()}</span>
//               </div>
//               <div className="flex justify-between items-center py-2 border-b border-gray-200">
//                 <span className="text-gray-600 font-medium">Advance Paid:</span>
//                 <div className="flex items-center justify-end w-32">
//                   <span className="mr-1 text-gray-500 print:hidden">Rs.</span>
//                   <input
//                     type="number"
//                     value={advance}
//                     onChange={(e) => setAdvance(Number(e.target.value))}
//                     className="w-20 text-right text-gray-800 bg-white border rounded px-1 text-sm focus:border-red-900 outline-none print:hidden"
//                   />
//                   <span className="hidden print:block font-bold">Rs. {advance.toLocaleString()}</span>
//                 </div>
//               </div>
//               <div className="flex justify-between pt-4 mt-2">
//                 <span className="text-red-900 font-bold text-lg">Balance Due:</span>
//                 <span className="text-red-900 font-bold text-2xl">
//                   Rs. {balanceDue.toLocaleString()}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* --- PRINTABLE FOOTER MESSAGE --- */}
//         <div className="p-8 border-t border-gray-200 mt-auto">
//           <div className="flex justify-between items-end">
//              {/* Left: Thank You & Terms */}
//              <div className="text-sm text-gray-500 max-w-md">
//                 <h4 className="font-bold text-red-900 mb-1 text-lg">Thank You for Shopping</h4>
//                 <p>We appreciate your trust in ScrubX.</p>
//                 <p className="mt-2 text-xs italic">
//                   * Items can be exchanged within 7 days with original receipt.<br/>
//                   * No cash refunds allowed.<br/>
//                   * Customized orders are not eligible for refund or exchange.
//                 </p>
//              </div>

//              {/* Right: Signature Line */}
//              <div className="text-center">
//              <p className="text-[10px] w-42 text-gray-400 italic text-wrap">
//               This is a computer generated receipt and does not require a signature.
//             </p>
//                <div className="h-3 w-40 border-b-2 border-gray-400 mb-2"></div>
//                <p className="text-xs font-bold text-gray-600 uppercase tracking-wider">Authorized Signatory</p>
//              </div>

          
//           </div>
//              {/* <div className="mt-8 text-center pt-2">
//             <p className="text-[10px] text-gray-400 italic">
//               This is a computer generated receipt and does not require a signature.
//             </p>
//           </div> */}
//         </div>

//         {/* Action Buttons (Hidden in Print) */}
//         <div className="print:hidden bg-gray-100 p-6 flex justify-between items-center">
//             <p className="text-gray-400 text-sm">Create clean, professional invoices instantly.</p>
//             <div className="flex gap-4">
//               <button
//                 onClick={handlePrint}
//                 className="bg-gray-800 text-white px-8 py-3 rounded-lg flex justify-center items-center hover:bg-gray-900 shadow-lg font-medium"
//               >
//                 <HardDriveDownload className="w-4 h-4 mr-2" /> Print / Save
//               </button>
              
//               <button
//                 onClick={handleEmail}
//                 disabled={isSending}
//                 className={`px-8 py-3 rounded-lg text-white shadow-lg font-medium ${
//                   isSending ? 'bg-red-400' : 'bg-red-900 hover:bg-red-800'
//                 }`}
//               >
//                 {isSending ? (
//                   <>
//                     <Loader2 className="w-4 h-4 mr-2 inline-block animate-spin" /> Sending...
//                   </>
//                 ) : (
//                   <>
//                     <Mail className="w-4 h-4 mr-2 inline-block" /> Send Email
//                   </>
//                 )}
//               </button>
//             </div>
//         </div>

//       </div>
//     </div>
//   );
// }


// export default  CashMemo;
















































// 'use client';

// import Image from 'next/image';
// import { useEffect, useState, useRef, Fragment } from 'react';
// import { sendReceiptEmail } from './actions/actions';
// import { HardDriveDownload, Loader2, Mail, ChevronRight, ChevronLeft, Plus, Percent, Hash } from 'lucide-react';

// // --- DATA CONFIGURATION ---
// const PRODUCTS = [
//   { name: 'Male Scrub Set', hasVariants: true },
//   { name: 'Female Scrub Set', hasVariants: true },
//   { name: 'Lab Coat', hasVariants: true },
//   { name: 'Stethoscope', hasVariants: false },
//   { name: 'Electric Thermometer', hasVariants: false },
//   { name: 'Blood Pressure Machine', hasVariants: false },
//   { name: 'Sugar Check Machine', hasVariants: false },
// ];

// const SIZES = ['SX', 'S', 'M', 'L', 'XL', 'XXL'];
// const COLORS = ['Maroon', 'Black', 'Blue','White'];

// // --- TYPES ---
// type LineItem = {
//   id: number;
//   description: string;
//   qty: number;
//   price: number;
// };

// type ItemGroup = {
//   id: number;
//   mainItem: LineItem;
//   engravings: LineItem[];
// };

// type SelectionState = {
//   step: 'product' | 'size' | 'color';
//   product: string;
//   size: string;
//   color: string;
// };

// function CashMemo() {
//   // --- STATE ---
//   const [customerName, setCustomerName] = useState('');
//   const [customerEmail, setCustomerEmail] = useState('');
//   const [customerPhone, setCustomerPhone] = useState('');
//   const [receiptId, setReceiptId] = useState('');
  
//   // --- FINANCIAL STATE ---
//   const [advance, setAdvance] = useState<number>(0);
//   const [discount, setDiscount] = useState<number>(0);
//   const [discountType, setDiscountType] = useState<'percent' | 'fixed'>('fixed'); // 'percent' or 'fixed'
//   const [delivery, setDelivery] = useState<number>(0);
//   const [tax, setTax] = useState<number>(0);

//   const [itemGroups, setItemGroups] = useState<ItemGroup[]>([
//     {
//       id: Date.now(),
//       mainItem: { id: Date.now() + 1, description: 'Male Scrub Set / M / Black', qty: 1, price: 4500 },
//       engravings: [
//         { id: Date.now() + 2, description: 'Name Engraving', qty: 1, price: 200 },
//         { id: Date.now() + 3, description: 'Logo Engraving', qty: 1, price: 200 }
//       ]
//     }
//   ]);
//   const [isSending, setIsSending] = useState(false);

//   // --- DROPDOWN STATE ---
//   const [activeGroupId, setActiveGroupId] = useState<number | null>(null);
//   const [selection, setSelection] = useState<SelectionState>({
//     step: 'product',
//     product: '',
//     size: '',
//     color: ''
//   });
  
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     setReceiptId(Date.now().toString().slice(-5));

//     function handleClickOutside(event: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setActiveGroupId(null);
//         resetSelection();
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // --- LOGIC HELPERS ---
//   const resetSelection = () => {
//     setSelection({ step: 'product', product: '', size: '', color: '' });
//   };

//   const addItemGroup = () => {
//     const newGroup: ItemGroup = {
//       id: Date.now(),
//       mainItem: { id: Date.now() + 1, description: '', qty: 1, price: 0 },
//       engravings: [],
//     };
//     setItemGroups([...itemGroups, newGroup]);
//   };

//   const addEngravingToGroup = (groupId: number, type: 'Name' | 'Logo') => {
//     const newEngraving: LineItem = {
//       id: Date.now(),
//       description: `${type} Engraving`,
//       qty: 1,
//       price: 200,
//     };
//     setItemGroups(itemGroups.map(g => g.id === groupId ? { ...g, engravings: [...g.engravings, newEngraving] } : g));
//   };

//   const removeItemGroup = (groupId: number) => {
//     setItemGroups(itemGroups.filter((group) => group.id !== groupId));
//   };

//   const removeEngravingFromGroup = (groupId: number, engravingId: number) => {
//     setItemGroups(itemGroups.map(group => {
//       if (group.id === groupId) {
//         return { ...group, engravings: group.engravings.filter(e => e.id !== engravingId) };
//       }
//       return group;
//     }));
//   };

//   const updateMainItem = (groupId: number, field: keyof LineItem, value: string | number) => {
//     setItemGroups(itemGroups.map((group) => {
//       if (group.id === groupId) {
//         return { ...group, mainItem: { ...group.mainItem, [field]: value } };
//       }
//       return group;
//     }));
//   };

//   const updateEngravingItem = (groupId: number, engravingId: number, field: keyof LineItem, value: string | number) => {
//     setItemGroups(itemGroups.map((group) => {
//       if (group.id === groupId) {
//         return {
//           ...group,
//           engravings: group.engravings.map(e => e.id === engravingId ? { ...e, [field]: value } : e)
//         };
//       }
//       return group;
//     }));
//   };

//   // --- DROPDOWN HANDLERS ---
//   const handleInputFocus = (groupId: number) => {
//     setActiveGroupId(groupId);
//     resetSelection();
//   };

//   const handleProductSelect = (productName: string, hasVariants: boolean, groupId: number) => {
//     if (!hasVariants) {
//       updateMainItem(groupId, 'description', productName);
//       setActiveGroupId(null);
//       resetSelection();
//     } else {
//       setSelection(prev => ({ ...prev, product: productName, step: 'size' }));
//     }
//   };

//   const handleSizeSelect = (size: string) => {
//     setSelection(prev => ({ ...prev, size: size, step: 'color' }));
//   };

//   const handleColorSelect = (color: string, groupId: number) => {
//     const finalString = `${selection.product} / ${selection.size} / ${color}`;
//     updateMainItem(groupId, 'description', finalString);
//     setActiveGroupId(null);
//     resetSelection();
//   };

//   const goBack = () => {
//     if (selection.step === 'color') setSelection(prev => ({ ...prev, step: 'size' }));
//     if (selection.step === 'size') setSelection(prev => ({ ...prev, step: 'product' }));
//   };

//   // --- CALCULATIONS ---
//   const subTotal = itemGroups.reduce((acc, group) => {
//     const main = group.mainItem.qty * group.mainItem.price;
//     const eng = group.engravings.reduce((eAcc, e) => eAcc + (e.qty * e.price), 0);
//     return acc + main + eng;
//   }, 0);

//   const discountAmount = discountType === 'percent' ? Math.round((subTotal * discount) / 100) : discount;
//   const totalAfterDiscount = subTotal - discountAmount;
//   const grandTotal = totalAfterDiscount + tax  + delivery;
//   const balanceDue = grandTotal - advance;

//   // --- ACTIONS ---
//   const handlePrint = () => {
//     setActiveGroupId(null);
//     window.print();
//   };

//   const handleEmail = async () => {
//     if (!customerEmail) return alert('Please enter customer email');
//     setIsSending(true);
//     const emailData = {
//       customerName,
//       customerEmail,
//       itemGroups,
//       receiptId,
//       subTotal,
//       discount: discountAmount,
//       delivery,
//       tax,
//       grandTotal,
//       advance,
//       balance: balanceDue
//     };
    
//     try {
//       const res = await sendReceiptEmail(emailData);
//       alert(res.message);
//     } catch (error: unknown) {
//       console.error(error);
//       alert((error as Error)?.message || 'Error sending email');
//     } finally {
//       setIsSending(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6 print:bg-white print:p-0">
//       <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-visible print:shadow-none print:w-full print:rounded-none flex flex-col min-h-[90vh] print:min-h-screen">
        
//         {/* HEADER (Unchanged) */}
//         <div className="bg-red-900 text-white px-8 py-6 flex justify-between items-center print:bg-red-900 print:text-white print-color-adjust-exact">
//           <div className="flex items-center gap-4">
//             <div className="bg-white h-16 w-16 rounded-full flex items-center justify-center shadow-lg overflow-hidden border-2 border-red-800">
//                <Image src="/logo.jpg" alt="Logo" className="h-10 w-auto object-contain" height={200} width={200} priority />
//             </div>
//             <div>
//               <h1 className="text-3xl font-extrabold tracking-wide uppercase">ScrubX</h1>
//               <p className="text-red-100 font-medium tracking-wider text-xs mt-0.5">Premium Medical APPAREL</p>
//             </div>
//           </div>
//           <div className="text-right">
//             <h2 className="text-xl font-semibold opacity-90">CASH MEMO</h2>
//             <p className="text-red-200 text-xs mt-0.5">#{receiptId}</p>
//           </div>
//         </div>

//         <div className="px-8 py-6 grow">
//           {/* Info Section (Unchanged) */}
//           <div className="flex justify-between items-start mb-6 text-gray-600 text-xs">
//             <div className="w-1/2">
//               <h3 className="font-bold text-gray-800 text-sm mb-1">Billed To:</h3>
//               <div className="print:hidden space-y-1">
//                 <input type="text" placeholder="Customer Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full p-1.5 text-sm border border-gray-300 rounded focus:border-red-800 focus:outline-none" />
//                 <input type="email" placeholder="Email (Optional)" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} className="w-full p-1.5 text-sm border border-gray-300 rounded focus:border-red-800 focus:outline-none" />
//                 <input type="tel" placeholder="Phone (Optional)" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} className="w-full p-1.5 text-sm border border-gray-300 rounded focus:border-red-800 focus:outline-none" />
//               </div>
//               <div className="hidden print:block text-sm">
//                 <p className="font-semibold text-gray-900">{customerName}</p>
//                 <p>{customerEmail}</p>
//                 <p>{customerPhone}</p>
//               </div>
//             </div>
//             <div className="text-right w-1/2 text-sm">
//               <h3 className="font-bold text-gray-800 mb-1">From:</h3>
//               <p className="font-semibold text-gray-900">ScrubX Headquarters</p>
//               <p>Karachi, Pakistan</p>
//               <p>scrubx.pk@gmail.com</p>
//               <p>+92 301 0221483</p>
//             </div>
//           </div>

//           {/* TABLE (Unchanged) */}
//           <table className="w-full mb-4 border-collapse relative">
//             <thead>
//               <tr className="border-b-2 border-red-900 text-red-900 text-sm">
//                 <th className="py-2 text-left font-bold w-1/2 pl-2">ITEM DESCRIPTION</th>
//                 <th className="py-2 text-center font-bold w-16">QTY</th>
//                 <th className="py-2 text-right font-bold w-24">PRICE</th>
//                 <th className="py-2 text-right font-bold w-28">TOTAL</th>
//                 <th className="py-2 print:hidden w-8"></th>
//               </tr>
//             </thead>
//             <tbody className="text-sm">
//               {itemGroups.map((group) => {
//                 const groupTotal = (group.mainItem.qty * group.mainItem.price) + group.engravings.reduce((a, b) => a + (b.qty * b.price), 0);
//                 return (
//                   <Fragment key={group.id}>
//                     <tr className="border-t border-gray-200 print:border-gray-300 hover:bg-gray-50 transition-colors print:hover:bg-transparent relative group/row">
//                       <td className="py-1.5 relative pl-2 align-top group/desc">
//                         <input
//                           type="text"
//                           value={group.mainItem.description}
//                           onFocus={() => handleInputFocus(group.id)}
//                           onChange={(e) => updateMainItem(group.id, 'description', e.target.value)}
//                           className="w-full outline-none bg-transparent text-gray-900 placeholder-gray-400 font-medium cursor-pointer"
//                           placeholder="Select product..."
//                           autoComplete="off"
//                         />
//                         {/* Dropdown (Hidden for brevity, logic same as before) */}
//                         {activeGroupId === group.id && (
//                            <div ref={dropdownRef} className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 shadow-xl rounded-md z-50 p-2 print:hidden text-left">
//                               <div className="flex items-center justify-between border-b pb-1 mb-1 px-1">
//                                 {selection.step !== 'product' && (
//                                   <button onClick={goBack} className="text-xs text-gray-500 hover:text-red-900 flex items-center">
//                                     <ChevronLeft className="w-3 h-3 mr-1" /> Back
//                                   </button>
//                                 )}
//                                 <span className="text-[10px] font-bold text-red-900 uppercase tracking-wider">Select {selection.step}</span>
//                               </div>
//                               {selection.step === 'product' && (
//                                 <div className="flex flex-col gap-0.5 max-h-48 overflow-y-auto">
//                                   {PRODUCTS.map((prod) => (
//                                     <button key={prod.name} onClick={() => handleProductSelect(prod.name, prod.hasVariants, group.id)} className="text-left px-2 py-1.5 text-xs text-gray-700 hover:bg-red-50 hover:text-red-900 rounded flex justify-between items-center group/btn">
//                                       {prod.name}
//                                       {prod.hasVariants && <ChevronRight className="w-3 h-3 text-gray-300 group-hover/btn:text-red-400" />}
//                                     </button>
//                                   ))}
//                                 </div>
//                               )}
//                               {selection.step === 'size' && (
//                                  <div className="grid grid-cols-3 gap-1">
//                                    {SIZES.map((size) => (
//                                      <button key={size} onClick={() => handleSizeSelect(size)} className="text-center py-1.5 text-xs border border-gray-200 rounded hover:border-red-900 hover:bg-red-50 text-gray-700 font-medium">
//                                        {size}
//                                      </button>
//                                    ))}
//                                  </div>
//                               )}
//                               {selection.step === 'color' && (
//                                 <div className="flex flex-col gap-0.5">
//                                   {COLORS.map((color) => (
//                                     <button key={color} onClick={() => handleColorSelect(color, group.id)} className="text-left px-2 py-1.5 text-xs text-gray-700 hover:bg-red-50 hover:text-red-900 rounded flex items-center gap-2">
//                                       <span className="w-2.5 h-2.5 rounded-full border border-gray-300" style={{ backgroundColor: color.toLowerCase() }}></span>
//                                       {color}
//                                     </button>
//                                   ))}
//                                 </div>
//                               )}
//                            </div>
//                         )}
//                         <div className="absolute left-2 -bottom-4 hidden group-hover/desc:flex print:hidden z-10 bg-white shadow border border-gray-200 rounded overflow-hidden opacity-0 group-hover/desc:opacity-100 transition-all">
//                           <button onClick={() => addEngravingToGroup(group.id, 'Name')} className="px-2 py-0.5 text-[10px] uppercase font-bold text-gray-500 hover:bg-red-50 hover:text-red-900 border-r border-gray-200 flex items-center"><Plus className="w-2.5 h-2.5 mr-1"/> Name</button>
//                           <button onClick={() => addEngravingToGroup(group.id, 'Logo')} className="px-2 py-0.5 text-[10px] uppercase font-bold text-gray-500 hover:bg-red-50 hover:text-red-900 flex items-center"><Plus className="w-2.5 h-2.5 mr-1"/> Logo</button>
//                         </div>
//                       </td>
//                       <td className="py-1.5 align-top">
//                         <input type="number" value={group.mainItem.qty} min="0" onChange={(e) => updateMainItem(group.id, 'qty', Number(e.target.value))} className="w-full text-center outline-none bg-transparent text-gray-900 font-medium" />
//                       </td>
//                       <td className="py-1.5 align-top">
//                         <input type="number" value={group.mainItem.price} min="0" onChange={(e) => updateMainItem(group.id, 'price', Number(e.target.value))} className="w-full text-right outline-none bg-transparent text-gray-900 font-medium" />
//                       </td>
//                       <td className="py-1.5 text-right font-bold text-gray-900 align-top">
//                         {groupTotal.toLocaleString()}
//                       </td>
//                       <td className="py-1.5 text-center print:hidden align-top">
//                         <button onClick={() => removeItemGroup(group.id)} className="text-gray-300 hover:text-red-600 font-bold text-lg leading-none">&times;</button>
//                       </td>
//                     </tr>
//                     {group.engravings.map((engraving) => (
//                       <tr key={engraving.id} className="hover:bg-gray-50 transition-colors group/engraving">
//                         <td className="py-0.5 pl-8 relative align-top">
//                           <input type="text" value={engraving.description} onChange={(e) => updateEngravingItem(group.id, engraving.id, 'description', e.target.value)} className="w-full outline-none bg-transparent text-gray-500 text-xs" />
//                         </td>
//                         <td className="py-0.5 align-top">
//                            <input type="number" value={engraving.qty} min="0" onChange={(e) => updateEngravingItem(group.id, engraving.id, 'qty', Number(e.target.value))} className="w-full text-center outline-none bg-transparent text-gray-500 text-xs" />
//                         </td>
//                         <td className="py-0.5 align-top">
//                            <input type="number" value={engraving.price} min="0" onChange={(e) => updateEngravingItem(group.id, engraving.id, 'price', Number(e.target.value))} className="w-full text-right outline-none bg-transparent text-gray-500 text-xs" />
//                         </td>
//                         <td className="py-0.5 align-top"></td>
//                         <td className="py-0.5 text-center print:hidden align-top opacity-0 group-hover/engraving:opacity-100">
//                           <button onClick={() => removeEngravingFromGroup(group.id, engraving.id)} className="text-gray-300 hover:text-red-600 text-sm leading-none">&times;</button>
//                         </td>
//                       </tr>
//                     ))}
//                   </Fragment>
//                 );
//               })}
//             </tbody>
//           </table>

//           <div className="mb-4 print:hidden">
//             <button onClick={addItemGroup} className="text-red-900 border border-red-900 px-3 py-1.5 rounded hover:bg-red-900 hover:text-white transition-all font-medium text-xs flex items-center">
//               <Plus className="w-3 h-3 mr-1.5"/> Add New Line
//             </button>
//           </div>

//           {/* --- EXPANDED TOTALS SECTION --- */}
//           <div className="flex justify-end mb-8">
//             <div className="w-72 bg-gray-50 p-4 rounded border border-gray-100 print:border-none print:bg-transparent print:p-0">
              
//               {/* Subtotal */}
//               <div className="flex justify-between py-1 border-b border-gray-200 text-sm">
//                 <span className="text-gray-600 font-medium">Sub Total:</span>
//                 <span className="font-bold text-gray-800">{subTotal.toLocaleString()}</span>
//               </div>

//               {/* Discount with Type Toggle */}
//               <div className={`flex justify-between items-center py-1 border-b border-gray-200 text-sm ${discountAmount > 0 ? 'print:block' : 'print:hidden'}`}>
//                 <span className="text-gray-600 font-medium">Discount:</span>
//                 <div className="flex items-center justify-end">
//                    <div className="print:hidden flex mr-2 border border-gray-300 rounded overflow-hidden">
//                       <button 
//                         onClick={() => setDiscountType('fixed')}
//                         className={`px-1.5 py-0.5 text-[10px] ${discountType === 'fixed' ? 'bg-red-900 text-white' : 'bg-white text-gray-500 hover:bg-gray-100'}`}
//                         title="Fixed Amount"
//                       >
//                         <Hash className="w-3 h-3"/>
//                       </button>
//                       <button 
//                         onClick={() => setDiscountType('percent')}
//                         className={`px-1.5 py-0.5 text-[10px] ${discountType === 'percent' ? 'bg-red-900 text-white' : 'bg-white text-gray-500 hover:bg-gray-100'}`}
//                         title="Percentage"
//                       >
//                         <Percent className="w-3 h-3"/>
//                       </button>
//                    </div>
                   
//                    <div className="flex items-center w-24 justify-end">
//                     <span className="text-gray-400 mr-1 text-xs print:hidden">{discountType === 'fixed' ? 'Rs.' : '%'}</span>
//                     <input 
//                         type="number" 
//                         value={discount} 
//                         onChange={(e) => setDiscount(Number(e.target.value))} 
//                         className="w-16 text-right text-gray-800 bg-white border rounded px-1 text-xs focus:border-red-900 outline-none print:hidden" 
//                     />
//                     <span className={`hidden print:block  text-gray-800`}>
//                       {discount > 0 ? `- ${discountAmount.toLocaleString()}` : '0'}
//                     </span>
//                    </div>
//                 </div>
//               </div>


//               {/* Tax */}
//               <div className={`flex justify-between items-center py-1 border-b border-gray-200 text-sm ${tax > 0 ? 'print:block' : 'print:hidden'}`}>
//                 <span className="text-gray-600 font-medium">Tax:</span>
//                 <div className="flex items-center justify-end w-24">
//                   <span className="mr-1 text-gray-400 text-xs print:hidden">Rs.</span>
//                   <input type="number" value={tax} onChange={(e) => setTax(Number(e.target.value))} className="w-16 text-right text-gray-800 bg-white border rounded px-1 text-xs focus:border-red-900 outline-none print:hidden" />
//                   <span className={`hidden print:block  text-gray-800`}>{tax > 0 ? `+ ${tax.toLocaleString()}` : '0'}</span>
//                 </div>
//               </div>

//                {/* Delivery */}
//                <div className={`flex justify-between items-center py-1 border-b border-gray-200 text-sm ${delivery > 0 ? 'print:block' : 'print:hidden'}`}>
//                 <span className="text-gray-600 font-medium">Delivery:</span>
//                 <div className="flex items-center justify-end w-24">
//                   <span className="mr-1 text-gray-400 text-xs print:hidden">Rs.</span>
//                   <input type="number" value={delivery} onChange={(e) => setDelivery(Number(e.target.value))} className="w-16 text-right text-gray-800 bg-white border rounded px-1 text-xs focus:border-red-900 outline-none print:hidden" />
//                   <span className={`hidden print:block  text-gray-800`}>{delivery > 0 ? `+ ${delivery.toLocaleString()}` : '0'}</span>
//                 </div>
//               </div>

//               {/* Grand Total */}
//               <div className="flex justify-between py-2 mt-2">
//                 <span className="text-gray-800 font-bold text-base">Grand Total:</span>
//                 <span className="text-gray-800 font-bold text-base">{grandTotal.toLocaleString()}</span>
//               </div>

//               {/* Advance */}
//               <div className="flex justify-between items-center py-1 border-t border-gray-200 text-sm">
//                 <span className="text-gray-600 font-medium">Advance:</span>
//                 <div className="flex items-center justify-end w-24">
//                   <input type="number" value={advance} onChange={(e) => setAdvance(Number(e.target.value))} className="w-16 text-right text-gray-800 bg-white border rounded px-1 text-xs focus:border-red-900 outline-none print:hidden" />
//                   <span className="hidden print:block font-bold">{advance.toLocaleString()}</span>
//                 </div>
//               </div>

//               {/* Balance Due */}
//               <div className="flex justify-between pt-2 border-t border-gray-300 mt-1">
//                 <span className="text-red-900 font-bold text-lg">Balance:</span>
//                 <span className="text-red-900 font-bold text-xl">{balanceDue.toLocaleString()}</span>
//               </div>

//             </div>
//           </div>
//         </div>

//         {/* FOOTER (Unchanged) */}
//         <div className="px-8 pb-2 border-t border-gray-200 pt-4 mt-auto">
//           <div className="flex justify-between items-end">
//              <div className="text-xs text-gray-500 max-w-sm">
//                 <h4 className="font-bold text-red-900 mb-0.5 text-base">Thank You for Shopping</h4>
//                 <p className="leading-tight">We appreciate your trust in ScrubX.</p>
//                 <p className="mt-1 text-[10px] italic leading-tight">* Items can be exchanged within 7 days with original receipt.<br/>* No cash refunds allowed.<br/>* Customized orders are not eligible for refund or exchange.</p>
//              </div>
//              <div className="text-center flex flex-col justify-center items-center">
//              <p className="text-[9px] w-40 text-wrap text-gray-400 italic mb-2">This is a computer generated receipt and does not require a signature.</p>
//                <div className="h-px w-32 bg-gray-400 mb-1"></div>
//                <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">Authorized Signatory</p>
//              </div>
//           </div>
//         </div>

//         {/* ACTIONS (Unchanged) */}
//         <div className="print:hidden bg-gray-100 p-4 flex justify-between items-center text-sm">
//             <p className="text-gray-400 text-xs">Professional Invoicing</p>
//             <div className="flex gap-3">
//               <button onClick={handlePrint} className="bg-gray-800 text-white px-6 py-2 rounded shadow hover:bg-gray-900 font-medium flex items-center">
//                 <HardDriveDownload className="w-3.5 h-3.5 mr-2" /> Print
//               </button>
//               <button onClick={handleEmail} disabled={isSending} className={`px-6 py-2 rounded text-white shadow font-medium flex items-center ${isSending ? 'bg-red-400' : 'bg-red-900 hover:bg-red-800'}`}>
//                 {isSending ? <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" /> : <Mail className="w-3.5 h-3.5 mr-2" />} Email
//               </button>
//             </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CashMemo;






































'use client';

import Image from 'next/image';
import { useEffect, useState, useRef, Fragment } from 'react';
import { sendReceiptEmail } from './actions/actions';
import { HardDriveDownload, Loader2, Mail, ChevronRight, ChevronLeft, Plus, Percent, Hash } from 'lucide-react';

// --- DATA CONFIGURATION ---
const PRODUCTS = [
  { name: 'Male Scrub Set', hasVariants: true },
  { name: 'Female Scrub Set', hasVariants: true },
  { name: 'Lab Coat', hasVariants: true },
  { name: 'Stethoscope', hasVariants: false },
  { name: 'Electric Thermometer', hasVariants: false },
  { name: 'Blood Pressure Machine', hasVariants: false },
  { name: 'Sugar Check Machine', hasVariants: false },
];

const SIZES = ['SX', 'S', 'M', 'L', 'XL', 'XXL', 'Custom'];
const COLORS = ['Maroon', 'Black', 'Blue', 'White'];
const FABRICS = ['Wrinkle Free', 'Cotton'];

// --- TYPES ---
type LineItem = {
  id: number;
  description: string;
  qty: number;
  price: number;
};

type ItemGroup = {
  id: number;
  mainItem: LineItem;
  engravings: LineItem[];
};

type SelectionState = {
  step: 'product' | 'size' | 'color' | 'fabric'; 
  product: string;
  size: string;
  color: string;
  fabric: string;
};

function CashMemo() {
  // --- STATE ---
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [receiptId, setReceiptId] = useState('');
  
  // --- FINANCIAL STATE ---
  const [advance, setAdvance] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [discountType, setDiscountType] = useState<'percent' | 'fixed'>('fixed');
  const [delivery, setDelivery] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);

  const [itemGroups, setItemGroups] = useState<ItemGroup[]>([
    {
      id: Date.now(),
      mainItem: { id: Date.now() + 1, description: 'Male Scrub Set / M / Black', qty: 1, price: 4500 },
      engravings: [
        { id: Date.now() + 2, description: 'Name Engraving', qty: 1, price: 200 },
        { id: Date.now() + 3, description: 'Logo Engraving', qty: 1, price: 200 }
      ]
    }
  ]);
  const [isSending, setIsSending] = useState(false);

  // --- DROPDOWN STATE ---
  const [activeGroupId, setActiveGroupId] = useState<number | null>(null);
  const [selection, setSelection] = useState<SelectionState>({
    step: 'product',
    product: '',
    size: '',
    color: '',
    fabric: ''
  });
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setReceiptId(Date.now().toString().slice(-5));

    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveGroupId(null);
        resetSelection();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- LOGIC HELPERS ---
  const resetSelection = () => {
    setSelection({ step: 'product', product: '', size: '', color: '', fabric: '' });
  };

  const addItemGroup = () => {
    const newGroup: ItemGroup = {
      id: Date.now(),
      mainItem: { id: Date.now() + 1, description: '', qty: 1, price: 0 },
      engravings: [],
    };
    setItemGroups([...itemGroups, newGroup]);
  };

  const addEngravingToGroup = (groupId: number, type: 'Name' | 'Logo') => {
    const newEngraving: LineItem = {
      id: Date.now(),
      description: `${type} Engraving`,
      qty: 1,
      price: 200,
    };
    setItemGroups(itemGroups.map(g => g.id === groupId ? { ...g, engravings: [...g.engravings, newEngraving] } : g));
  };

  const removeItemGroup = (groupId: number) => {
    setItemGroups(itemGroups.filter((group) => group.id !== groupId));
  };

  const removeEngravingFromGroup = (groupId: number, engravingId: number) => {
    setItemGroups(itemGroups.map(group => {
      if (group.id === groupId) {
        return { ...group, engravings: group.engravings.filter(e => e.id !== engravingId) };
      }
      return group;
    }));
  };

  const updateMainItem = (groupId: number, field: keyof LineItem, value: string | number) => {
    setItemGroups(itemGroups.map((group) => {
      if (group.id === groupId) {
        return { ...group, mainItem: { ...group.mainItem, [field]: value } };
      }
      return group;
    }));
  };

  const updateEngravingItem = (groupId: number, engravingId: number, field: keyof LineItem, value: string | number) => {
    setItemGroups(itemGroups.map((group) => {
      if (group.id === groupId) {
        return {
          ...group,
          engravings: group.engravings.map(e => e.id === engravingId ? { ...e, [field]: value } : e)
        };
      }
      return group;
    }));
  };

  // --- DROPDOWN HANDLERS ---
  const handleInputFocus = (groupId: number) => {
    setActiveGroupId(groupId);
    resetSelection();
  };

  const handleProductSelect = (productName: string, hasVariants: boolean, groupId: number) => {
    if (!hasVariants) {
      updateMainItem(groupId, 'description', productName);
      setActiveGroupId(null);
      resetSelection();
    } else {
      setSelection(prev => ({ ...prev, product: productName, step: 'size' }));
    }
  };

  const handleSizeSelect = (size: string) => {
    if (size === 'Custom' && activeGroupId) {
       const customChargeItem: LineItem = {
          id: Date.now(),
          description: 'Custom Size',
          qty: 1,
          price: 100 
       };
       setItemGroups(prev => prev.map(g => 
         g.id === activeGroupId 
           ? { ...g, engravings: [...g.engravings, customChargeItem] } 
           : g
       ));
    }

    if (selection.product === 'Lab Coat') {
       setSelection(prev => ({ ...prev, size: size, step: 'fabric' }));
    } else {
       setSelection(prev => ({ ...prev, size: size, step: 'color' }));
    }
  };

  const handleColorSelect = (color: string, groupId: number) => {
    const finalString = `${selection.product} / ${selection.size} / ${color}`;
    updateMainItem(groupId, 'description', finalString);
    setActiveGroupId(null);
    resetSelection();
  };

  const handleFabricSelect = (fabric: string, groupId: number) => {
    const finalString = `${selection.product} / ${selection.size} / ${fabric}`;
    updateMainItem(groupId, 'description', finalString);
    setActiveGroupId(null);
    resetSelection();
  };

  const goBack = () => {
    if (selection.step === 'fabric') setSelection(prev => ({ ...prev, step: 'size' }));
    if (selection.step === 'color') setSelection(prev => ({ ...prev, step: 'size' }));
    if (selection.step === 'size') setSelection(prev => ({ ...prev, step: 'product' }));
  };

  // --- CALCULATIONS ---
  const subTotal = itemGroups.reduce((acc, group) => {
    const main = group.mainItem.qty * group.mainItem.price;
    const eng = group.engravings.reduce((eAcc, e) => eAcc + (e.qty * e.price), 0);
    return acc + main + eng;
  }, 0);

  const discountAmount = discountType === 'percent' ? Math.round((subTotal * discount) / 100) : discount;
  const totalAfterDiscount = subTotal - discountAmount;
  const grandTotal = totalAfterDiscount + tax  + delivery;
  const balanceDue = grandTotal - advance;

  // --- ACTIONS ---
  const handlePrint = () => {
    setActiveGroupId(null);
    window.print();
  };

  const handleEmail = async () => {
    if (!customerEmail) return alert('Please enter customer email');
    setIsSending(true);
    const emailData = {
      customerName,
      customerEmail,
      itemGroups,
      receiptId,
      subTotal,
      discount: discountAmount,
      delivery,
      tax,
      grandTotal,
      advance,
      balance: balanceDue
    };
    
    try {
      const res = await sendReceiptEmail(emailData);
      alert(res.message);
    } catch (error: unknown) {
      console.error(error);
      alert((error as Error)?.message || 'Error sending email');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 print:bg-white print:p-0">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-visible print:shadow-none print:w-full print:rounded-none flex flex-col min-h-[90vh] print:min-h-screen">
        
        {/* HEADER */}
        <div className="bg-red-900 text-white px-8 py-6 flex justify-between items-center print:bg-red-900 print:text-white print-color-adjust-exact">
          <div className="flex items-center gap-4">
            <div className="bg-white h-16 w-16 rounded-full flex items-center justify-center shadow-lg overflow-hidden border-2 border-red-800">
               <Image src="/logo.jpg" alt="Logo" className="h-10 w-auto object-contain" height={200} width={200} priority />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-wide uppercase">ScrubX</h1>
              <p className="text-red-100 font-medium tracking-wider text-xs mt-0.5">Premium Medical APPAREL</p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-xl font-semibold opacity-90">CASH MEMO</h2>
            <p className="text-red-200 text-xs mt-0.5">#{receiptId}</p>
          </div>
        </div>

        <div className="px-8 py-6 grow">
          {/* Info Section */}
          <div className="flex justify-between items-start mb-6 text-gray-600 text-xs">
            <div className="w-1/2">
              <h3 className="font-bold text-gray-800 text-sm mb-1">Billed To:</h3>
              <div className="print:hidden space-y-1">
                <input type="text" placeholder="Customer Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full p-1.5 text-sm border border-gray-300 rounded focus:border-red-800 focus:outline-none" />
                <input type="email" placeholder="Email (Optional)" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} className="w-full p-1.5 text-sm border border-gray-300 rounded focus:border-red-800 focus:outline-none" />
                <input type="tel" placeholder="Phone (Optional)" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} className="w-full p-1.5 text-sm border border-gray-300 rounded focus:border-red-800 focus:outline-none" />
              </div>
              <div className="hidden print:block text-sm">
                <p className="font-semibold text-gray-900">{customerName}</p>
                <p>{customerEmail}</p>
                <p>{customerPhone}</p>
              </div>
            </div>
            <div className="text-right w-1/2 text-sm">
              <h3 className="font-bold text-gray-800 mb-1">From:</h3>
              <p className="font-semibold text-gray-900">ScrubX Headquarters</p>
              <p>Karachi, Pakistan</p>
              <p>scrubx.pk@gmail.com</p>
              <p>+92 301 0221483</p>
            </div>
          </div>

          {/* TABLE */}
          <table className="w-full mb-4 border-collapse relative">
            <thead>
              <tr className="border-b-2 border-red-900 text-red-900 text-sm">
                <th className="py-2 text-left font-bold w-1/2 pl-2">ITEM DESCRIPTION</th>
                <th className="py-2 text-center font-bold w-16">QTY</th>
                <th className="py-2 text-right font-bold w-24">PRICE</th>
                <th className="py-2 text-right font-bold w-28">TOTAL</th>
                <th className="py-2 print:hidden w-8"></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {itemGroups.map((group) => {
                const groupTotal = (group.mainItem.qty * group.mainItem.price) + group.engravings.reduce((a, b) => a + (b.qty * b.price), 0);
                return (
                  <Fragment key={group.id}>
                    <tr className="border-t border-gray-200 print:border-gray-300 hover:bg-gray-50 transition-colors print:hover:bg-transparent relative group/row">
                      <td className="py-1.5 relative pl-2 align-top group/desc">
                        <input
                          type="text"
                          value={group.mainItem.description}
                          onFocus={() => handleInputFocus(group.id)}
                          onChange={(e) => updateMainItem(group.id, 'description', e.target.value)}
                          className="w-full outline-none bg-transparent text-gray-900 placeholder-gray-400 font-medium cursor-pointer"
                          placeholder="Select product..."
                          autoComplete="off"
                        />
                        {/* Dropdown */}
                        {activeGroupId === group.id && (
                           <div ref={dropdownRef} className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 shadow-xl rounded-md z-50 p-2 print:hidden text-left">
                              <div className="flex items-center justify-between border-b pb-1 mb-1 px-1">
                                {selection.step !== 'product' && (
                                  <button onClick={goBack} className="text-xs text-gray-500 hover:text-red-900 flex items-center">
                                    <ChevronLeft className="w-3 h-3 mr-1" /> Back
                                  </button>
                                )}
                                <span className="text-[10px] font-bold text-red-900 uppercase tracking-wider">Select {selection.step}</span>
                              </div>
                              
                              {selection.step === 'product' && (
                                <div className="flex flex-col gap-0.5 max-h-48 overflow-y-auto">
                                  {PRODUCTS.map((prod) => (
                                    <button key={prod.name} onClick={() => handleProductSelect(prod.name, prod.hasVariants, group.id)} className="text-left px-2 py-1.5 text-xs text-gray-700 hover:bg-red-50 hover:text-red-900 rounded flex justify-between items-center group/btn">
                                      {prod.name}
                                      {prod.hasVariants && <ChevronRight className="w-3 h-3 text-gray-300 group-hover/btn:text-red-400" />}
                                    </button>
                                  ))}
                                </div>
                              )}
                              
                              {selection.step === 'size' && (
                                 <div className="grid grid-cols-3 gap-1">
                                   {SIZES.map((size) => (
                                     <button key={size} onClick={() => handleSizeSelect(size)} className={`text-center py-1.5 text-xs border border-gray-200 rounded hover:border-red-900 hover:bg-red-50 text-gray-700 font-medium ${size === 'Custom' ? 'text-red-800' : ''}`}>
                                       {size}
                                     </button>
                                   ))}
                                 </div>
                              )}

                              {selection.step === 'fabric' && (
                                <div className="flex flex-col gap-1">
                                   {FABRICS.map((fabric) => (
                                     <button key={fabric} onClick={() => handleFabricSelect(fabric, group.id)} className="text-left px-2 py-1.5 text-xs text-gray-700 hover:bg-red-50 hover:text-red-900 rounded font-medium">
                                       {fabric}
                                     </button>
                                   ))}
                                </div>
                              )}

                              {selection.step === 'color' && (
                                <div className="flex flex-col gap-0.5">
                                  {COLORS.map((color) => (
                                    <button key={color} onClick={() => handleColorSelect(color, group.id)} className="text-left px-2 py-1.5 text-xs text-gray-700 hover:bg-red-50 hover:text-red-900 rounded flex items-center gap-2">
                                      <span className="w-2.5 h-2.5 rounded-full border border-gray-300" style={{ backgroundColor: color.toLowerCase() }}></span>
                                      {color}
                                    </button>
                                  ))}
                                </div>
                              )}
                           </div>
                        )}
                        <div className="absolute left-2 -bottom-4 hidden group-hover/desc:flex print:hidden z-10 bg-white shadow border border-gray-200 rounded overflow-hidden opacity-0 group-hover/desc:opacity-100 transition-all">
                          <button onClick={() => addEngravingToGroup(group.id, 'Name')} className="px-2 py-0.5 text-[10px] uppercase font-bold text-gray-500 hover:bg-red-50 hover:text-red-900 border-r border-gray-200 flex items-center"><Plus className="w-2.5 h-2.5 mr-1"/> Name</button>
                          <button onClick={() => addEngravingToGroup(group.id, 'Logo')} className="px-2 py-0.5 text-[10px] uppercase font-bold text-gray-500 hover:bg-red-50 hover:text-red-900 flex items-center"><Plus className="w-2.5 h-2.5 mr-1"/> Logo</button>
                        </div>
                      </td>
                      <td className="py-1.5 align-top">
                        <input type="number" value={group.mainItem.qty} min="0" onChange={(e) => updateMainItem(group.id, 'qty', Number(e.target.value))} className="w-full text-center outline-none bg-transparent text-gray-900 font-medium" />
                      </td>
                      <td className="py-1.5 align-top">
                        <input type="number" value={group.mainItem.price} min="0" onChange={(e) => updateMainItem(group.id, 'price', Number(e.target.value))} className="w-full text-right outline-none bg-transparent text-gray-900 font-medium" />
                      </td>
                      <td className="py-1.5 text-right font-bold text-gray-900 align-top">
                        {groupTotal.toLocaleString()}
                      </td>
                      <td className="py-1.5 text-center print:hidden align-top">
                        <button onClick={() => removeItemGroup(group.id)} className="text-gray-300 hover:text-red-600 font-bold text-lg leading-none">&times;</button>
                      </td>
                    </tr>
                    {group.engravings.map((engraving) => (
                      <tr key={engraving.id} className="hover:bg-gray-50 transition-colors group/engraving">
                        <td className="py-0.5 pl-8 relative align-top">
                          <input type="text" value={engraving.description} onChange={(e) => updateEngravingItem(group.id, engraving.id, 'description', e.target.value)} className="w-full outline-none bg-transparent text-gray-500 text-xs" />
                        </td>
                        <td className="py-0.5 align-top">
                           <input type="number" value={engraving.qty} min="0" onChange={(e) => updateEngravingItem(group.id, engraving.id, 'qty', Number(e.target.value))} className="w-full text-center outline-none bg-transparent text-gray-500 text-xs" />
                        </td>
                        <td className="py-0.5 align-top">
                           <input type="number" value={engraving.price} min="0" onChange={(e) => updateEngravingItem(group.id, engraving.id, 'price', Number(e.target.value))} className="w-full text-right outline-none bg-transparent text-gray-500 text-xs" />
                        </td>
                        <td className="py-0.5 align-top"></td>
                        <td className="py-0.5 text-center print:hidden align-top opacity-0 group-hover/engraving:opacity-100">
                          <button onClick={() => removeEngravingFromGroup(group.id, engraving.id)} className="text-gray-300 hover:text-red-600 text-sm leading-none">&times;</button>
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                );
              })}
            </tbody>
          </table>

          <div className="mb-4 print:hidden">
            <button onClick={addItemGroup} className="text-red-900 border border-red-900 px-3 py-1.5 rounded hover:bg-red-900 hover:text-white transition-all font-medium text-xs flex items-center">
              <Plus className="w-3 h-3 mr-1.5"/> Add New Line
            </button>
          </div>

          {/* TOTALS SECTION */}
          <div className="flex justify-end mb-">

            <div className="w-72 bg-gray-50 p-4 rounded border border-gray-100 print:border-none print:bg-transparent print:p-0">
              <div className="flex justify-between py-1 border-b border-gray-200 text-sm">
                <span className="text-gray-600 font-medium">Sub Total:</span>
                <span className="font-bold text-gray-800">{subTotal.toLocaleString()}</span>
              </div>
              
              {/* Discount Section Fixed */}
              <div className={`flex justify-between items-center py-1 border-b border-gray-200 text-sm ${discountAmount > 0 ? 'print:flex' : 'print:hidden'}`}>
                <span className="text-gray-600 font-medium">Discount:</span>
                <div className="flex items-center justify-end">
                   <div className="print:hidden flex mr-2 border border-gray-300 rounded overflow-hidden">
                      <button onClick={() => setDiscountType('fixed')} className={`px-1.5 py-0.5 text-[10px] ${discountType === 'fixed' ? 'bg-red-900 text-white' : 'bg-white text-gray-500 hover:bg-gray-100'}`}><Hash className="w-3 h-3"/></button>
                      <button onClick={() => setDiscountType('percent')} className={`px-1.5 py-0.5 text-[10px] ${discountType === 'percent' ? 'bg-red-900 text-white' : 'bg-white text-gray-500 hover:bg-gray-100'}`}><Percent className="w-3 h-3"/></button>
                   </div>
                   {/* Added print:w-auto to remove constraint in print mode */}
                   <div className="flex items-center w-24 justify-end print:w-auto">
                    <input type="number" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} className="w-16 text-right text-gray-800 bg-white border rounded px-1 text-xs focus:border-red-900 outline-none print:hidden" />
                    <span className={`hidden print:block text-gray-800`}>{discount > 0 ? `- ${discountAmount.toLocaleString()}` : '0'}</span>
                   </div>
                </div>
              </div>

               {/* Delivery Section Fixed */}
               <div className={`flex justify-between items-center py-1 border-b border-gray-200 text-sm ${delivery > 0 ? 'print:flex' : 'print:hidden'}`}>
                <span className="text-gray-600 font-medium">Delivery:</span>
                {/* Added print:w-auto */}
                <div className="flex items-center justify-end w-24 print:w-auto">
                  <input type="number" value={delivery} onChange={(e) => setDelivery(Number(e.target.value))} className="w-16 text-right text-gray-800 bg-white border rounded px-1 text-xs focus:border-red-900 outline-none print:hidden" />
                  <span className={`hidden print:block text-gray-800`}>{delivery > 0 ? `+ ${delivery.toLocaleString()}` : '0'}</span>
                </div>
              </div>

                {/* Tax Section Fixed */}
               <div className={`flex justify-between items-center py-1 border-b border-gray-200 text-sm ${tax > 0 ? 'print:flex' : 'print:hidden'}`}>
                 <span className="text-gray-600 font-medium">Tax:</span>
                 {/* Added print:w-auto */}
                 <div className="flex items-center justify-end w-24 print:w-auto">
                   <span className="mr-1 text-gray-400 text-xs print:hidden">Rs.</span>
                   <input type="number" value={tax} onChange={(e) => setTax(Number(e.target.value))} className="w-16 text-right text-gray-800 bg-white border rounded px-1 text-xs focus:border-red-900 outline-none print:hidden" />
                   <span className={`hidden print:block  text-gray-800`}>{tax > 0 ? `+ ${tax.toLocaleString()}` : '0'}</span>
                 </div>
               </div>

              <div className="flex justify-between py-2 mt-2">
                <span className="text-gray-800 font-bold text-base">Grand Total:</span>
                <span className="text-gray-800 font-bold text-base">{grandTotal.toLocaleString()}</span>
              </div>

              {/* Advance Section Fixed */}
              <div className="flex justify-between items-center py-1 border-t border-gray-200 text-sm">
                <span className="text-gray-600 font-medium">Advance:</span>
                {/* Added print:w-auto */}
                <div className="flex items-center justify-end w-24 print:w-auto">
                  <input type="number" value={advance} onChange={(e) => setAdvance(Number(e.target.value))} className="w-16 text-right text-gray-800 bg-white border rounded px-1 text-xs focus:border-red-900 outline-none print:hidden" />
                  <span className="hidden print:block font-bold">{advance.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex justify-between pt-2 border-t border-gray-300 mt-1">
                <span className="text-red-900 font-bold text-lg">Balance:</span>
                <span className="text-red-900 font-bold text-xl">{balanceDue.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>


        {/* FOOTER */}
        <div className="px-8 pb-1 bord border-gray-200 pt- mt-">
          <div className="flex justify-between items-end">
             
             <div className="flex gap-8 items-end">
                <div className="text-xs text-gray-500 max-w-xs pb-2">
                    <h4 className="font-bold text-red-900 mb-1 text-base">Thank You for Shopping</h4>
                    <p className="leading-tight mb-2">We appreciate your trust in ScrubX.</p>
                    <p className="text-[10px] italic leading-tight text-gray-500">* Items can be exchanged within 7 days with original receipt.<br/>* No cash refunds allowed.<br/>* Customized orders are not eligible for refund or exchange.</p>
                </div>
             </div>

          <div className="flex justify-center items-center mb-6 p-4 bg-gray-50 rounded border border-gray-100 print:border-none print:bg-transparent print:p-0 print:m-0">
            <div className="text-center">
              <p className="text-sm text-gray-700 font-medium mb-2">
                For payment, scan
              </p>
              <div className="inline-block bg-white p-3 rounded shadow-sm border border-gray-200">
                <Image 
                  src="/qrn.png" 
                  alt="Payment QR Code" 
                  width={120} 
                  height={120}
                  className="mx-auto"
                />
              </div>
              <div className="text-sm text-gray-700 font-medium mb-2">
              or{' '}
                <a 
                  href="https://linktr.ee/scrubx" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-red-900 underline hover:text-red-700 font-semibold"
                >
                  click here
                </a>
                </div>
            </div>
          </div>

             <div className="text-center flex flex-col justify-center items-center pb-2">
             <p className="text-[9px] w-40 text-wrap text-gray-400 italic mb-2">Computer generated receipt.</p>
               <div className="h-px w-32 bg-gray-400 mb-1"></div>
               <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wider">Authorized Signatory</p>
             </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="print:hidden bg-gray-100 p-4 flex justify-between items-center text-sm">
            <p className="text-gray-400 text-xs">Professional Invoicing</p>
            <div className="flex gap-3">
              <button onClick={handlePrint} className="bg-gray-800 text-white px-6 py-2 rounded shadow hover:bg-gray-900 font-medium flex items-center">
                <HardDriveDownload className="w-3.5 h-3.5 mr-2" /> Print
              </button>
              <button onClick={handleEmail} disabled={isSending} className={`px-6 py-2 rounded text-white shadow font-medium flex items-center ${isSending ? 'bg-red-400' : 'bg-red-900 hover:bg-red-800'}`}>
                {isSending ? <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" /> : <Mail className="w-3.5 h-3.5 mr-2" />} Email
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default CashMemo;