
import React from 'react';
import { X, Check } from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
}

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  sections: {
    title: string;
    options: FilterOption[];
    selected: string[];
    onToggle: (id: string) => void;
    multiSelect?: boolean;
  }[];
  onApply: () => void;
  onClear: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  title,
  sections,
  onApply,
  onClear
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-[200] animate-[fadeIn_0.2s_ease-out]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed bottom-0 left-0 right-0 z-[201] animate-[slideUp_0.3s_ease-out]">
        <div className="bg-white rounded-t-[24px] max-h-[80vh] flex flex-col">

          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100">
            <h2 className="text-[20px] font-bold text-black">{title}</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer active:bg-gray-200 transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-5 py-4 scrollbar-hide">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx} className="mb-6 last:mb-0">
                <h3 className="text-[13px] font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  {section.title}
                </h3>
                <div className="space-y-2">
                  {section.options.map((option) => {
                    const isSelected = section.selected.includes(option.id);
                    return (
                      <button
                        key={option.id}
                        onClick={() => section.onToggle(option.id)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-[12px] transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-ios-blue text-white'
                            : 'bg-ios-bg text-black active:bg-gray-200'
                        }`}
                      >
                        <span className="font-medium text-[15px]">{option.label}</span>
                        {isSelected && <Check size={20} strokeWidth={3} />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-5 py-4 pb-8 border-t border-gray-100 flex gap-3">
            <button
              onClick={onClear}
              className="flex-1 bg-ios-bg text-black font-semibold py-3.5 rounded-[12px] cursor-pointer active:bg-gray-200 transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={() => {
                onApply();
                onClose();
              }}
              className="flex-1 bg-ios-blue text-white font-semibold py-3.5 rounded-[12px] cursor-pointer active:scale-95 transition-transform shadow-lg"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

export default FilterModal;
