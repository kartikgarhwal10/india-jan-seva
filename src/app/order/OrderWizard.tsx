'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  User, 
  Phone, 
  Mail, 
  CreditCard, 
  FileText, 
  MapPin, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  Upload,
  AlertCircle,
  Loader2,
  Lock,
  ExternalLink
} from 'lucide-react';
import CardMockup from '@/components/CardMockup';
import { Product } from '@/lib/db';
import { submitOrderAction } from './actions';

export default function OrderWizard({ 
  products, 
  initialCardId 
}: { 
  products: Product[]; 
  initialCardId?: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Wizard state: 1: Details, 2: Upload, 3: Address, 4: Summary, 5: Confirmed
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  
  // Form fields
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [productId, setProductId] = useState(initialCardId || products[0]?.id || '');
  
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  
  const [address, setAddress] = useState('');
  const [village, setVillage] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('Uttar Pradesh');
  const [pinCode, setPinCode] = useState('');
  const [consent, setConsent] = useState(false);

  // Simulated Razorpay payment states
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [generatedOrderId, setGeneratedOrderId] = useState('');

  const selectedProduct = products.find(p => p.id === productId);

  const nextStep = () => {
    setError('');
    
    if (step === 1) {
      if (!customerName.trim()) return setError('Please enter your full name.');
      if (!phone.trim() || phone.length < 10) return setError('Please enter a valid 10-digit mobile number.');
      if (!productId) return setError('Please select a PVC Card type.');
    }
    
    if (step === 2) {
      if (!documentFile) return setError('Please upload your document file.');
    }
    
    if (step === 3) {
      if (!address.trim()) return setError('Please enter your delivery street address.');
      if (!village.trim()) return setError('Please enter your village or town name.');
      if (!district.trim()) return setError('Please enter your district.');
      if (!pinCode.trim() || pinCode.length < 6) return setError('Please enter a valid 6-digit PIN code.');
    }

    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setError('');
    setStep(prev => prev - 1);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    const file = e.target.files?.[0];
    if (file) {
      // Validate type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        return setError('Invalid format! Only PDF, JPG, JPEG, and PNG files are allowed.');
      }
      // Validate size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        return setError('File is too large! Maximum limit is 5MB.');
      }
      setDocumentFile(file);
    }
  };

  const triggerPaymentSimulation = () => {
    if (!consent) {
      return setError('Please confirm that your documents are correct by ticking the consent box.');
    }
    setError('');
    setShowPaymentModal(true);
  };

  const runPaymentFlow = () => {
    setPaymentStatus('processing');
    
    // Simulate Razorpay processing callback (2 seconds delay)
    setTimeout(() => {
      setPaymentStatus('success');
      
      // Post the data to the Server Action
      const formData = new FormData();
      formData.append('customerName', customerName);
      formData.append('phone', phone);
      formData.append('email', email);
      formData.append('productId', productId);
      formData.append('address', address);
      formData.append('village', village);
      formData.append('district', district);
      formData.append('state', state);
      formData.append('pinCode', pinCode);
      if (documentFile) {
        formData.append('document', documentFile);
      }

      startTransition(async () => {
        const res = await submitOrderAction(formData);
        if (res.success && res.orderId) {
          setTimeout(() => {
            setGeneratedOrderId(res.orderId || '');
            setShowPaymentModal(false);
            setStep(5); // Show final confirmation step
          }, 800);
        } else {
          setError(res.message || 'Payment verified, but failed to save order.');
          setPaymentStatus('idle');
          setShowPaymentModal(false);
        }
      });
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-100 shadow-card overflow-hidden text-left flex flex-col md:flex-row min-h-[500px]">
      
      {/* Sidebar Wizard indicators (Left) */}
      <div className="bg-slate-900 text-white p-8 md:w-80 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-extrabold text-white">Ordering Wizard</h2>
            <p className="text-slate-400 text-xs mt-1">Get your wallet PVC smart card in easy steps.</p>
          </div>
          
          <div className="space-y-4">
            {[
              { num: 1, label: 'Customer Details', desc: 'Name, Phone & Card Type' },
              { num: 2, label: 'Upload Document', desc: 'PDF or Identity Photo' },
              { num: 3, label: 'Shipping Address', desc: 'Pin Code & Delivery Point' },
              { num: 4, label: 'Summary & Payment', desc: 'Simulated Razorpay' }
            ].map((s) => (
              <div key={s.num} className="flex items-center space-x-3 text-left">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 border transition-all duration-300 ${
                  step === s.num 
                    ? 'bg-saffron border-saffron text-white shadow-md' 
                    : step > s.num
                      ? 'bg-green border-green text-white'
                      : 'border-slate-800 text-slate-500'
                }`}>
                  {step > s.num ? '✓' : s.num}
                </div>
                <div>
                  <p className={`text-xs font-bold leading-tight ${step === s.num ? 'text-white' : 'text-slate-500'}`}>
                    {s.label}
                  </p>
                  <p className="text-[10px] text-slate-500">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-[10px] text-slate-500 border-t border-slate-800 pt-4 flex items-center space-x-1">
          <Lock className="w-3.5 h-3.5 text-slate-400" />
          <span>SSL Secure 256-bit Document Encryptions</span>
        </div>
      </div>

      {/* Main wizard body (Right) */}
      <div className="p-8 flex-grow flex flex-col justify-between relative">
        
        {/* Error box */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-800 rounded-xl text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="flex-grow">
          {/* STEP 1: Details */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">Step 1: Customer Details</h3>
                <p className="text-slate-400 text-xs">Fill your basic contact details and pick the PVC card type.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. Rahul Kumar"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-saffron"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase">Mobile Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="tel"
                        maxLength={10}
                        placeholder="10-digit number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-saffron"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase">Email (Optional)</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-saffron"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase">Select PVC Card Type</label>
                  <select
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-saffron bg-white"
                  >
                    <option value="" disabled>Choose a card from listing...</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} — ₹{p.price}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Document Upload */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">Step 2: Upload Identity Document</h3>
                <p className="text-slate-400 text-xs">Please upload a clean copy of your <strong>{selectedProduct?.requiredDocument}</strong>.</p>
              </div>

              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 hover:border-saffron hover:bg-slate-50/50 transition-colors flex flex-col items-center justify-center text-center cursor-pointer relative group">
                <input
                  type="file"
                  accept=".pdf, .jpg, .jpeg, .png"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                
                <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-inner">
                  <Upload className="w-6 h-6 text-slate-400 group-hover:text-saffron" />
                </div>
                
                {documentFile ? (
                  <div className="space-y-1 z-10 pointer-events-none">
                    <p className="text-sm font-bold text-slate-800">{documentFile.name}</p>
                    <p className="text-xs text-slate-400">{(documentFile.size / 1024 / 1024).toFixed(2)} MB • Click to replace</p>
                  </div>
                ) : (
                  <div className="space-y-1 z-10 pointer-events-none">
                    <p className="text-sm font-bold text-slate-800">Drag and drop file or click to browse</p>
                    <p className="text-xs text-slate-400">Supported formats: PDF, JPG, JPEG, PNG (Max 5MB)</p>
                  </div>
                )}
              </div>

              {selectedProduct && (
                <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl text-xs text-slate-500 space-y-1.5">
                  <p className="font-bold text-slate-800 uppercase text-[10px] tracking-wide">Printing Guidelines</p>
                  <p>✓ Ensure no corners are cropped in the scanned document image.</p>
                  <p>✓ Text, barcode, chip and QR details must be sharp and legible.</p>
                  <p>✓ The document will be formatted to exact wallet size (ISO CR-80).</p>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: Shipping Address */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">Step 3: Delivery Address</h3>
                <p className="text-slate-400 text-xs">Enter address details to receive the physical card courier.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase">Street Address / Landmark</label>
                  <input
                    type="text"
                    placeholder="House No, Ward, Area, Mohalla"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-saffron"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase">Village / Town</label>
                    <input
                      type="text"
                      placeholder="e.g. Jarwal"
                      value={village}
                      onChange={(e) => setVillage(e.target.value)}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-saffron"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase">District</label>
                    <input
                      type="text"
                      placeholder="e.g. Bahraich"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-saffron"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase">State</label>
                    <select
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-saffron bg-white"
                    >
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Bihar">Bihar</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Uttarakhand">Uttarakhand</option>
                      <option value="Haryana">Haryana</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-400 uppercase">PIN Code</label>
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="6-digit PIN"
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value.replace(/\D/g, ''))}
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-saffron"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Summary & Checkout */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">Step 4: Order Summary</h3>
                <p className="text-slate-400 text-xs">Verify details before proceeding to simulated payment.</p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/50 space-y-4 text-xs">
                {/* Details layout */}
                <div className="grid grid-cols-2 gap-y-3 border-b border-slate-200 pb-4">
                  <div>
                    <span className="text-slate-400 font-bold block uppercase text-[10px]">Customer Name</span>
                    <span className="text-sm font-extrabold text-slate-850">{customerName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block uppercase text-[10px]">Mobile Contact</span>
                    <span className="text-sm font-semibold text-slate-850">{phone}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block uppercase text-[10px]">PVC Card Type</span>
                    <span className="text-sm font-extrabold text-saffron-dark">{selectedProduct?.name}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block uppercase text-[10px]">Uploaded Document</span>
                    <span className="text-sm font-semibold text-slate-800">{documentFile?.name}</span>
                  </div>
                </div>

                {/* Address block */}
                <div className="border-b border-slate-200 pb-4">
                  <span className="text-slate-400 font-bold block uppercase text-[10px] mb-0.5">Shipping Destination</span>
                  <p className="text-xs text-slate-700 font-medium">
                    {address}, {village}, District {district}, {state} - <strong>{pinCode}</strong>
                  </p>
                </div>

                {/* Total amount */}
                <div className="flex justify-between items-center text-sm">
                  <span className="font-extrabold text-slate-800">Total Amount Payable</span>
                  <span className="text-xl font-black text-slate-950">₹{selectedProduct?.price}</span>
                </div>
              </div>

              {/* Consent checkbox */}
              <div className="flex items-start space-x-3 bg-amber-50/50 border border-amber-100 p-4 rounded-xl">
                <input
                  type="checkbox"
                  id="consent"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="w-4 h-4 rounded text-saffron border-amber-300 focus:ring-saffron mt-0.5"
                />
                <label htmlFor="consent" className="text-[11px] text-amber-900 leading-normal font-medium cursor-pointer">
                  I confirm that the information/documents submitted by me are correct and I authorize India Jan Seva to process my order for the selected service.
                </label>
              </div>
            </div>
          )}

          {/* STEP 5: Success Screen */}
          {step === 5 && (
            <div className="space-y-6 text-center py-10">
              <div className="w-16 h-16 rounded-full bg-green-light text-green flex items-center justify-center mx-auto shadow-md">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900">Order Confirmed!</h3>
                <p className="text-slate-500 text-sm max-w-md mx-auto">
                  Your order and payment have been successfully received and recorded in our system.
                </p>
              </div>

              {/* Order ID display */}
              <div className="bg-slate-900 text-white py-4 px-6 rounded-2xl max-w-sm mx-auto shadow-lg space-y-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Your Unique Order ID</span>
                <p className="text-2xl font-black text-saffron tracking-wider font-mono">{generatedOrderId}</p>
              </div>

              <p className="text-xs text-slate-400">
                Please copy this ID. You can use it to track your printing and delivery timeline.
              </p>

              {/* Action routes */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link
                  href={`/track?orderId=${generatedOrderId}`}
                  className="bg-slate-900 hover:bg-slate-850 text-white font-bold px-6 py-3 rounded-lg text-xs shadow-md transition-all flex items-center justify-center space-x-1"
                >
                  <span>Track Order Timeline</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>

                <a
                  href={`https://wa.me/919876543210?text=Hello%2520India%2520Jan%2520Seva%2C%2520mera%2520PVC%2520Card%2520Order%2520ID%2520${generatedOrderId}%2520hai.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-50 border border-green-200 hover:bg-green-100 text-green-700 font-bold px-6 py-3 rounded-lg text-xs transition-colors"
                >
                  Confirm on WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Wizard Footer controls */}
        {step < 5 && (
          <div className="flex justify-between border-t border-slate-100 pt-6 mt-8">
            {step > 1 ? (
              <button
                onClick={prevStep}
                className="flex items-center space-x-1 px-4 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                onClick={nextStep}
                className="flex items-center space-x-1 bg-slate-900 hover:bg-slate-850 text-white px-6 py-2.5 rounded-lg text-xs font-bold transition-all shadow-md"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={triggerPaymentSimulation}
                className="flex items-center space-x-1.5 bg-saffron hover:bg-saffron-dark text-white px-8 py-3 rounded-lg text-xs font-bold transition-all shadow-lg transform hover:-translate-y-0.5"
              >
                <CreditCard className="w-4 h-4" />
                <span>Pay ₹{selectedProduct?.price} Securely</span>
              </button>
            )}
          </div>
        )}

      </div>

      {/* SIMULATED RAZORPAY GATEWAY CHECKOUT OVERLAY MODAL */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl border border-slate-100 animate-scale-up">
            
            {/* Razorpay branding header */}
            <div className="bg-indigo-900 text-white p-6 flex justify-between items-center">
              <div>
                <p className="text-[10px] text-indigo-300 font-bold uppercase tracking-widest leading-none">Razorpay Gateway</p>
                <h4 className="text-base font-extrabold text-white mt-1 leading-none">India Jan Seva</h4>
              </div>
              <span className="text-xs bg-indigo-500/30 border border-indigo-400/30 px-2 py-0.5 rounded font-bold uppercase text-indigo-200">Test Mode</span>
            </div>

            {/* Payment Info */}
            <div className="p-6 text-center space-y-6">
              {paymentStatus === 'idle' && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Amount to pay</span>
                    <h5 className="text-3xl font-black text-slate-950">₹{selectedProduct?.price}</h5>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/50 p-4 rounded-xl text-left space-y-3">
                    <p className="text-xs text-slate-500 font-medium">Select test payment channel:</p>
                    
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center space-x-2 bg-white p-2.5 rounded-lg border border-slate-200 hover:border-indigo-600 cursor-pointer">
                        <input type="radio" defaultChecked id="pay-upi" name="channel" className="text-indigo-600 focus:ring-indigo-500" />
                        <label htmlFor="pay-upi" className="font-bold text-slate-800 flex-grow cursor-pointer flex justify-between">
                          <span>UPI (GooglePay/PhonePe/BHIM)</span>
                          <span className="text-[9px] text-green font-bold">Popular</span>
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 bg-white p-2.5 rounded-lg border border-slate-200 hover:border-indigo-600 cursor-pointer">
                        <input type="radio" id="pay-card" name="channel" className="text-indigo-600 focus:ring-indigo-500" />
                        <label htmlFor="pay-card" className="font-bold text-slate-800 cursor-pointer">Debit/Credit Card</label>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={runPaymentFlow}
                    className="w-full bg-indigo-900 hover:bg-indigo-950 text-white font-bold py-3.5 rounded-xl shadow-lg text-xs tracking-wider transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>PAY ₹{selectedProduct?.price} NOW</span>
                  </button>

                  <button
                    onClick={() => { setShowPaymentModal(false); setPaymentStatus('idle'); }}
                    className="text-[11px] font-bold text-slate-400 hover:text-slate-600"
                  >
                    Cancel Transaction
                  </button>
                </div>
              )}

              {paymentStatus === 'processing' && (
                <div className="py-12 space-y-4">
                  <Loader2 className="w-12 h-12 text-indigo-900 animate-spin mx-auto" />
                  <div>
                    <h5 className="font-extrabold text-slate-900 text-sm">Authenticating with UPI App...</h5>
                    <p className="text-slate-400 text-[11px] mt-1">Please do not refresh or click the back button.</p>
                  </div>
                </div>
              )}

              {paymentStatus === 'success' && (
                <div className="py-12 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-green-light text-green flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-slate-900 text-sm">Payment Captured!</h5>
                    <p className="text-slate-400 text-[11px] mt-1">Recording your order details...</p>
                  </div>
                </div>
              )}
            </div>

            {/* Secure Footer */}
            <div className="bg-slate-50 py-3 border-t border-slate-100 text-center text-[10px] text-slate-400 flex items-center justify-center space-x-1.5">
              <span>🔒 PCI-DSS Certified Secure</span>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
