import React from 'react';
// سنحتاج مكتبة أيقونات، سنفترض استخدام react-icons كأكثرها شيوعاً، أو استبدليها بأيقوناتك.
// npm install react-icons
import { FiClipboard, FiCheckSquare, FiTarget, FiClock, FiAlertCircle } from 'react-icons/fi';

// سنقوم بعمل خريطة (Map) بسيطة للأيقونات بناءً على اسم الأيقونة الممرر
const iconMap = {
  tasks: FiClipboard,
  completed: FiCheckSquare,
  inprogress: FiTarget,
  todo: FiClock,
  overdue: FiAlertCircle,
};

// سنقوم بعمل خريطة للألوان (Colors Map) بناءً على اللون الممرر (Primary, Green, etc.)
// يمكنك تعديل الألوان هنا لتناسب Tailwind Config الخاص بك
const colorMap = {
  primary: {
    text: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
  },
  green: {
    text: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-100',
  },
  orange: {
    text: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-100',
  },
  purple: {
    text: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-100',
  },
  red: {
    text: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-100',
  },
};

const StatCard = ({
  title = "Stat Title", // العنوان الافتراضي
  value = "0", // القيمة الافتراضية
  subtitle = "Subtitle", // النص الفرعي الافتراضي
  iconName = "tasks", // اسم الأيقونة الافتراضي
  colorTheme = "primary", // السمة اللونية الافتراضية
}) => {
  // اختيار الأيقونة واللون بناءً على الـ Props
  const IconComponent = iconMap[iconName] || FiClipboard;
  const theme = colorMap[colorTheme] || colorMap.primary;

  return (
    // الحاوية الأساسية للكارت مع Tailwind classes للشكل والموضع
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between h-full hover:shadow-md transition-shadow">
      
      {/* الجزء العلوي: العنوان والأيقونة */}
      <div className="flex items-start justify-between">
        <h3 className="text-base font-semibold text-gray-800 tracking-tight">
          {title}
        </h3>
        
        {/* حاوية الأيقونة الدائرية */}
        <div className={`p-2.5 rounded-full ${theme.bg} ${theme.border} border`}>
          <IconComponent className={`w-5 h-5 ${theme.text}`} />
        </div>
      </div>

      
      <div className="mt-6">
        <p className={`text-4xl font-extrabold tracking-tight ${theme.text}`}>
          {value}
        </p>
        <p className={`text-sm text-gray-500 mt-1 font-medium ${theme.text}`}>
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default StatCard;