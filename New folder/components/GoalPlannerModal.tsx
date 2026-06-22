import React, { useState } from 'react';

interface GoalPlannerModalProps {
  open: boolean;
  onClose: () => void;
  onPlanConfirmed: (goal: string, plan: string[], suggestions: string[]) => void;
}

const defaultSuggestions = [
  'دعم الوضع الليلي (Dark Mode)',
  'إضافة مصادقة (Authentication)',
  'دعم PWA',
  'استخدام Tailwind CSS',
  'إضافة صفحة إعدادات',
];

const GoalPlannerModal: React.FC<GoalPlannerModalProps> = ({ open, onClose, onPlanConfirmed }) => {
  const [goal, setGoal] = useState('');
  const [plan, setPlan] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>(defaultSuggestions);
  const [selected, setSelected] = useState<string[]>([]);

  const handleGeneratePlan = () => {
    // خطة ذكية افتراضية (يمكن ربطها بـ Gemini لاحقًا)
    const basePlan = [
      'إنشاء مشروع React مع Vite',
      'إعداد هيكلية src/components',
      'إضافة صفحة رئيسية',
      'إعداد ملف package.json وتثبيت الحزم الأساسية',
    ];
    setPlan(basePlan);
  };

  const handleToggleSuggestion = (s: string) => {
    setSelected(sel => sel.includes(s) ? sel.filter(x => x !== s) : [...sel, s]);
  };

  const handleContinue = () => {
    onPlanConfirmed(goal, plan, selected);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-[#18181b] rounded-lg shadow-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-white">حدد هدف مشروعك</h2>
        <textarea
          className="w-full p-2 rounded bg-[#23232a] text-gray-200 mb-4"
          rows={2}
          placeholder="مثال: أريد تطبيق ToDo مع مصادقة وواجهة جميلة"
          value={goal}
          onChange={e => setGoal(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded mb-4 hover:bg-blue-500"
          onClick={handleGeneratePlan}
          disabled={!goal.trim()}
        >
          توليد خطة ذكية
        </button>
        {plan.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-white mb-2">الخطة المقترحة:</h3>
            <ul className="list-disc pl-6 text-gray-300">
              {plan.map((step, i) => <li key={i}>{step}</li>)}
            </ul>
          </div>
        )}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white mb-2">اقتراحات إضافية:</h3>
          <div className="flex flex-wrap gap-2">
            {suggestions.map(s => (
              <button
                key={s}
                className={`px-3 py-1 rounded-full border ${selected.includes(s) ? 'bg-blue-700 text-white' : 'bg-[#23232a] text-gray-300 border-gray-600'}`}
                onClick={() => handleToggleSuggestion(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 rounded bg-gray-700 text-gray-200" onClick={onClose}>إلغاء</button>
          <button className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-500" onClick={handleContinue} disabled={!goal.trim() || plan.length === 0}>Continue</button>
        </div>
      </div>
    </div>
  );
};

export default GoalPlannerModal; 