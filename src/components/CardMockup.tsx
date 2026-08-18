import React from 'react';
import { Shield, CreditCard, Award, User, Flame } from 'lucide-react';

interface CardMockupProps {
  cardId: string;
  name?: string;
  number?: string;
  interactive?: boolean;
}

export default function CardMockup({ 
  cardId, 
  name = "RAHUL KUMAR", 
  number = "", 
  interactive = true 
}: CardMockupProps) {
  
  // Set default numbers if empty
  const displayNum = number || {
    'pan-pvc': 'ABCDE1234F',
    'voter-pvc': 'EPIC/IJS9876543',
    'ayushman-pvc': 'PMJAY-9876-5432',
    'dl-pvc': 'DL-UP1520260012345',
    'rc-pvc': 'RC-UP15AT1234',
    'eshram-pvc': 'UAN-9876-5432-1011',
    'abha-pvc': 'ABHA-12-3456-7890',
    'ration-pvc': 'RAT-UP-10293847'
  }[cardId] || 'CARD-12345678';

  const baseCardStyles = `w-full h-48 rounded-xl shadow-lg border p-4 flex flex-col justify-between text-white relative overflow-hidden transition-all duration-300 ${
    interactive ? 'hover:scale-[1.02] hover:shadow-xl' : ''
  }`;

  switch (cardId) {
    case 'pan-pvc':
      return (
        <div className={`${baseCardStyles} bg-gradient-to-tr from-sky-850 via-sky-600 to-indigo-950 border-sky-400/20`}>
          {/* Emblem Watermark */}
          <div className="absolute right-2 bottom-2 w-28 h-28 bg-white/[0.04] rounded-full flex items-center justify-center font-bold text-7xl select-none pointer-events-none">PAN</div>
          
          <div className="flex justify-between items-start z-10">
            <div>
              <p className="text-[10px] font-bold tracking-wider text-sky-200 uppercase leading-none">INCOME TAX DEPARTMENT</p>
              <p className="text-[8px] text-sky-300 font-semibold mt-0.5">GOVT. OF INDIA</p>
            </div>
            <span className="text-[9px] bg-white/10 px-2 py-0.5 rounded border border-white/10 font-bold uppercase tracking-widest text-sky-100">PAN</span>
          </div>

          <div className="flex gap-4 my-2 items-center z-10">
            {/* User Photo Placeholder */}
            <div className="w-11 h-13 bg-slate-350/30 border border-white/20 rounded flex items-center justify-center shadow-inner">
              <User className="w-5 h-5 text-sky-200" />
            </div>
            <div className="space-y-1 text-left">
              <p className="text-[8px] text-sky-300 font-semibold uppercase leading-none">Holder Name</p>
              <p className="text-sm font-bold tracking-wide uppercase leading-tight">{name}</p>
              
              <p className="text-[8px] text-sky-300 font-semibold uppercase leading-none pt-1">Permanent Account Number</p>
              <p className="text-sm font-mono font-bold tracking-wider text-amber-300 leading-none">{displayNum}</p>
            </div>
          </div>

          <div className="flex justify-between items-center text-[7px] text-sky-200 border-t border-sky-500/20 pt-1.5 z-10">
            <span className="font-semibold tracking-wider">PVC SMART CARD</span>
            <span className="font-mono bg-sky-500/20 px-1.5 py-0.5 rounded">VERIFIED ASSISTANCE</span>
          </div>
        </div>
      );

    case 'voter-pvc':
      return (
        <div className={`${baseCardStyles} bg-gradient-to-tr from-slate-900 via-sky-950 to-slate-900 border-slate-700/50`}>
          {/* Flag Tricolor Ribbon Accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-white to-green-600"></div>
          
          <div className="flex justify-between items-start z-10">
            <div>
              <p className="text-[9px] font-bold tracking-wider text-slate-200 leading-none">ELECTION COMMISSION OF INDIA</p>
              <p className="text-[7px] text-slate-400 font-semibold mt-0.5">IDENTITY CARD</p>
            </div>
            <span className="text-[9px] bg-saffron/20 text-saffron px-1.5 py-0.5 rounded border border-saffron/30 font-bold">EPIC</span>
          </div>

          <div className="flex gap-4 my-2 items-center z-10">
            <div className="w-11 h-13 bg-slate-800 border border-slate-700 rounded flex items-center justify-center">
              <User className="w-5 h-5 text-slate-400" />
            </div>
            <div className="space-y-1 text-left">
              <p className="text-[8px] text-slate-400 uppercase leading-none font-semibold">Name</p>
              <p className="text-xs font-bold uppercase tracking-wide">{name}</p>
              
              <p className="text-[8px] text-slate-400 uppercase leading-none pt-1 font-semibold">Card Number</p>
              <p className="text-xs font-mono font-bold text-saffron tracking-wide">{displayNum}</p>
            </div>
          </div>

          <div className="flex justify-between items-center text-[8px] text-slate-500 border-t border-slate-800 pt-1.5 z-10">
            <span className="tracking-widest">E-VOTER SMART PRINT</span>
            <span className="text-[6px] font-mono border border-slate-700 px-1 py-0.5 rounded bg-slate-800">SECURE</span>
          </div>
        </div>
      );

    case 'ayushman-pvc':
      return (
        <div className={`${baseCardStyles} bg-gradient-to-tr from-emerald-950 via-emerald-800 to-slate-900 border-emerald-500/20`}>
          <div className="absolute right-0 bottom-0 w-24 h-24 bg-emerald-500/[0.03] rounded-full pointer-events-none"></div>
          
          <div className="flex justify-between items-start z-10">
            <div>
              <p className="text-[9px] font-bold tracking-wider text-emerald-200 leading-none">AYUSHMAN BHARAT (PM-JAY)</p>
              <p className="text-[7px] text-emerald-400 font-semibold mt-0.5">NATIONAL HEALTH AUTHORITY</p>
            </div>
            <span className="text-[8px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30 font-bold uppercase">5 Lakh Cover</span>
          </div>

          <div className="flex gap-4 my-2 items-center z-10">
            <div className="w-11 h-13 bg-slate-900/50 border border-emerald-500/20 rounded flex items-center justify-center">
              <User className="w-5 h-5 text-emerald-300" />
            </div>
            <div className="space-y-1 text-left">
              <p className="text-[8px] text-emerald-400 uppercase leading-none font-semibold">Beneficiary Name</p>
              <p className="text-xs font-bold uppercase">{name}</p>
              
              <p className="text-[8px] text-emerald-400 uppercase leading-none pt-1 font-semibold">ABHA Address / PMJAY ID</p>
              <p className="text-xs font-mono font-bold text-emerald-300">{displayNum}</p>
            </div>
          </div>

          <div className="flex justify-between items-center text-[7px] text-emerald-400 border-t border-emerald-800 pt-1.5 z-10">
            <span>HEALTH ASSURANCE CARD</span>
            <span className="text-[6px] bg-emerald-500/20 px-1 rounded font-mono">GOVT OF INDIA</span>
          </div>
        </div>
      );

    case 'dl-pvc':
      return (
        <div className={`${baseCardStyles} bg-gradient-to-tr from-slate-950 via-slate-900 to-amber-950 border-amber-900/20`}>
          {/* Saffron side border strip */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500"></div>
          
          <div className="flex justify-between items-start z-10">
            <div>
              <p className="text-[9px] font-bold tracking-wider text-amber-200 leading-none">UNION OF INDIA DRIVING LICENCE</p>
              <p className="text-[7px] text-slate-400 font-semibold mt-0.5">MOTOR VEHICLE DEPT.</p>
            </div>
            <span className="text-[9px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/30 font-bold">DL</span>
          </div>

          <div className="flex gap-4 my-2 items-center z-10">
            <div className="w-11 h-13 bg-slate-900 border border-slate-800 rounded flex items-center justify-center relative">
              <User className="w-5 h-5 text-slate-500" />
              {/* Chip representation */}
              <div className="absolute top-1 right-1 w-3 h-2.5 bg-amber-500/80 rounded-[1px] border border-amber-300/30 flex flex-wrap p-[1px] gap-[1px]">
                <div className="bg-slate-900 w-[4px] h-[1px]"></div>
                <div className="bg-slate-900 w-[4px] h-[1px]"></div>
              </div>
            </div>
            <div className="space-y-1 text-left">
              <p className="text-[8px] text-slate-400 uppercase leading-none font-semibold">Licence Name</p>
              <p className="text-xs font-bold uppercase">{name}</p>
              
              <p className="text-[8px] text-slate-400 uppercase leading-none pt-1 font-semibold">Licence No.</p>
              <p className="text-xs font-mono font-bold text-amber-400">{displayNum}</p>
            </div>
          </div>

          <div className="flex justify-between items-center text-[7px] text-slate-500 border-t border-slate-900 pt-1.5 z-10">
            <span>SMART CARD LICENCE</span>
            <span className="text-[6px] font-mono border border-slate-800 px-1 rounded">UP CENTRAL</span>
          </div>
        </div>
      );

    case 'rc-pvc':
      return (
        <div className={`${baseCardStyles} bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 border-indigo-900/20`}>
          <div className="flex justify-between items-start z-10">
            <div>
              <p className="text-[9px] font-bold tracking-wider text-indigo-200 leading-none">CERTIFICATE OF REGISTRATION</p>
              <p className="text-[7px] text-slate-400 font-semibold mt-0.5">MINISTRY OF ROAD TRANSPORT & HIGHWAYS</p>
            </div>
            <span className="text-[9px] bg-indigo-500/20 text-indigo-400 px-1.5 py-0.5 rounded border border-indigo-500/30 font-bold">RC</span>
          </div>

          <div className="flex gap-4 my-2 items-center z-10">
            <div className="w-11 h-13 bg-slate-900 border border-slate-800 rounded flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-indigo-300" />
            </div>
            <div className="space-y-1 text-left">
              <p className="text-[8px] text-slate-400 uppercase leading-none font-semibold">Owner Name</p>
              <p className="text-xs font-bold uppercase">{name}</p>
              
              <p className="text-[8px] text-slate-400 uppercase leading-none pt-1 font-semibold">Registration Number</p>
              <p className="text-xs font-mono font-bold text-indigo-300">{displayNum}</p>
            </div>
          </div>

          <div className="flex justify-between items-center text-[7px] text-slate-500 border-t border-slate-800 pt-1.5 z-10">
            <span>VEHICLE REGISTER SMART CARD</span>
            <span className="text-[6px] font-mono border border-slate-800 px-1 rounded bg-slate-900">VERIFIED</span>
          </div>
        </div>
      );

    case 'eshram-pvc':
      return (
        <div className={`${baseCardStyles} bg-gradient-to-tr from-slate-950 via-slate-900 to-orange-950 border-orange-500/10`}>
          {/* Flag gradient ribbon at the bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-white to-green-600"></div>
          
          <div className="flex justify-between items-start z-10">
            <div>
              <p className="text-[9px] font-bold tracking-wider text-orange-200 leading-none">GOVERNMENT OF INDIA</p>
              <p className="text-[7px] text-slate-400 font-semibold mt-0.5">MINISTRY OF LABOUR & EMPLOYMENT</p>
            </div>
            <span className="text-[9px] bg-orange-500/20 text-orange-400 px-1.5 py-0.5 rounded border border-orange-500/30 font-bold">E-SHRAM</span>
          </div>

          <div className="flex gap-4 my-1 items-center z-10">
            <div className="w-11 h-13 bg-slate-900 border border-slate-800 rounded flex items-center justify-center">
              <User className="w-5 h-5 text-orange-300" />
            </div>
            <div className="space-y-1 text-left">
              <p className="text-[8px] text-slate-400 uppercase leading-none font-semibold">UAN Name</p>
              <p className="text-xs font-bold uppercase">{name}</p>
              
              <p className="text-[8px] text-slate-400 uppercase leading-none pt-1 font-semibold">Universal Account No. (UAN)</p>
              <p className="text-xs font-mono font-bold text-orange-400 tracking-wider leading-none">{displayNum}</p>
            </div>
          </div>

          <div className="flex justify-between items-center text-[7px] text-slate-500 border-t border-slate-800/80 pt-1 z-10 mb-1.5">
            <span>UNORGANIZED WORKER CARD</span>
            <span className="text-[5px] font-mono border border-slate-800 px-1 rounded">NATIONAL REGISTER</span>
          </div>
        </div>
      );

    case 'abha-pvc':
      return (
        <div className={`${baseCardStyles} bg-gradient-to-tr from-slate-900 via-teal-950 to-slate-900 border-teal-900/20`}>
          <div className="flex justify-between items-start z-10">
            <div>
              <p className="text-[9px] font-bold tracking-wider text-teal-200 leading-none">AYUSHMAN BHARAT HEALTH ACCOUNT</p>
              <p className="text-[7px] text-slate-400 font-semibold mt-0.5">NATIONAL HEALTH AUTHORITY</p>
            </div>
            <span className="text-[9px] bg-teal-500/20 text-teal-400 px-1.5 py-0.5 rounded border border-teal-500/30 font-bold">ABHA</span>
          </div>

          <div className="flex gap-4 my-2 items-center z-10">
            <div className="w-11 h-13 bg-slate-900 border border-slate-800 rounded flex items-center justify-center">
              <User className="w-5 h-5 text-teal-300" />
            </div>
            <div className="space-y-1 text-left">
              <p className="text-[8px] text-slate-400 uppercase leading-none font-semibold">ABHA Holder</p>
              <p className="text-xs font-bold uppercase">{name}</p>
              
              <p className="text-[8px] text-slate-400 uppercase leading-none pt-1 font-semibold">ABHA Number</p>
              <p className="text-xs font-mono font-bold text-teal-400">{displayNum}</p>
            </div>
          </div>

          <div className="flex justify-between items-center text-[7px] text-slate-500 border-t border-slate-800 pt-1.5 z-10">
            <span>DIGITAL HEALTH RECORD IDENTITY</span>
            <span className="text-[6px] font-mono border border-slate-800 px-1 rounded">NHA VERIFIED</span>
          </div>
        </div>
      );

    default: // Ration card, Farmer ID, etc. generic default card
      return (
        <div className={`${baseCardStyles} bg-gradient-to-tr from-slate-900 via-slate-850 to-slate-900 border-slate-700/50`}>
          <div className="flex justify-between items-start z-10">
            <div>
              <p className="text-[9px] font-bold tracking-wider text-slate-200 leading-none">DIGITAL IDENTITY DOCUMENT</p>
              <p className="text-[7px] text-slate-500 mt-0.5">CSC PRINT SERVICE</p>
            </div>
            <span className="text-[9px] bg-saffron/20 text-saffron px-1.5 py-0.5 rounded font-bold">CARD</span>
          </div>

          <div className="flex gap-4 my-2 items-center z-10">
            <div className="w-11 h-13 bg-slate-800 border border-slate-700 rounded flex items-center justify-center">
              <User className="w-5 h-5 text-slate-500" />
            </div>
            <div className="space-y-1 text-left">
              <p className="text-[8px] text-slate-500 uppercase leading-none font-semibold">Holder Name</p>
              <p className="text-xs font-bold uppercase">{name}</p>
              
              <p className="text-[8px] text-slate-500 uppercase leading-none pt-1 font-semibold">Card Number</p>
              <p className="text-xs font-mono font-bold text-slate-300">{displayNum}</p>
            </div>
          </div>

          <div className="flex justify-between items-center text-[8px] text-slate-500 border-t border-slate-800 pt-1.5 z-10">
            <span className="tracking-wide">PVC PRINT ASSISTANCE</span>
            <span className="text-[6px] font-mono border border-slate-700 px-1 rounded">SECURE</span>
          </div>
        </div>
      );
  }
}
