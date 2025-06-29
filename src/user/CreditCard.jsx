import React from 'react';

const CreditCard = ({
  cardNumber,
  cardholderName,
  expiryDate,
  cvv,
  status,
  cardType = 'VISA'
}) => {
 

  return (
    <div className="relative w-full md:w-2/3 lg:w-1/2 h-[16rem] rounded-2xl shadow-lg overflow-hidden">
      {/* Background with gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, #f97316 0%, #ea580c 100%)`
        }}
      />
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 w-32 h-32 rounded-full border border-white/20" />
        <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full border border-white/10" />
      </div>
      
      {/* Card content */}
      <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
        {/* Top section - Card type */}
        <div className="flex justify-between  items-start">
          <div className="text-2xl font-bold tracking-wider opacity-90">
            {cardType}
          </div>
          <div className={`${status === 'true' ?'text-green-100':'text-yellow-300'} capitalize`}>{status === 'true' ?'Active':'Inactive'}</div>
        </div>
        
        {/* Middle section - Card number */}
        <div className="flex-1 flex items-center">
          <div className="text-xl font-mono tracking-widest font-medium">
            {cardNumber}
          </div>
        </div>
        
        {/* Bottom section - Name, Expiry, CVV */}
        <div className="flex justify-between items-end">
          <div className="flex flex-col space-y-1">
            <div className="text-white/80 text-base tracking-wide font-medium">
            <div className="text-white/70 text-xs  tracking-normal">
              Card Holder
            </div>
              <p className='uppercase'>{cardholderName || 'CARDHOLDER NAME'}</p>
            </div>
            <div className="text-white/80 text-xs">
              EXP: {expiryDate || 'MM/YY'}
            </div>
          </div>
          <div className="text-right">
            <div className="text-white/70 text-xs uppercase tracking-wide">
              CVV
            </div>
            <div className="text-white/80 text-sm font-medium">
              {cvv || '•••'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// // Example usage
// export default function App() {
//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <CreditCard
//         cardNumber="4253 5432 3521 3090"
//         cardholderName="Soroush Nasrpour"
//         expiryDate="09/24"
//         cvv="341"
//         cardType="VISA"
//       />
//     </div>
//   );
// }

export default CreditCard

