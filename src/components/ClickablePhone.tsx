import React from 'react';

interface ClickablePhoneProps {
  phone: string;
  className?: string;
  children?: React.ReactNode;
}

const ClickablePhone: React.FC<ClickablePhoneProps> = ({ phone, className = "", children }) => {
  // Extract phone numbers from string and make them clickable
  const formatPhoneNumber = (phoneStr: string) => {
    // Find all phone numbers in the string
    const phoneRegex = /(\+91\s?)?(\d{5}[\s-]?\d{5})/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = phoneRegex.exec(phoneStr)) !== null) {
      // Add text before the phone number
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: phoneStr.substring(lastIndex, match.index)
        });
      }

      // Format the phone number for tel: link
      const cleanedPhone = match[2].replace(/[\s-]/g, '');
      const telLink = `+91${cleanedPhone}`;
      
      parts.push({
        type: 'phone',
        content: match[0],
        tel: telLink
      });

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < phoneStr.length) {
      parts.push({
        type: 'text',
        content: phoneStr.substring(lastIndex)
      });
    }

    return parts;
  };

  const phoneParts = formatPhoneNumber(phone);

  return (
    <span className={className}>
      {phoneParts.map((part, index) => {
        if (part.type === 'phone') {
          return (
            <a
              key={index}
              href={`tel:${part.tel}`}
              className="text-[#FDBA74] hover:text-[#F97316] transition-colors underline decoration-2 underline-offset-2"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {part.content}
            </a>
          );
        }
        return <span key={index}>{part.content}</span>;
      })}
    </span>
  );
};

export default ClickablePhone;
