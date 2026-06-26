'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

import { toast } from 'react-toastify';
import { reportRecipeApi } from '@/lib/action/newrecipe';

const ReportButton = ({ recipe, userEmail }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reasons = [
    'Inappropriate content or language',
    'Wrong/Harmful ingredients or instructions',
    'Copyright infringement (Stolen recipe)',
    'Spam or Misleading details',
    'Other',
  ];

  const handleSubmit = async e => {
    e.preventDefault();
    if (!reason) {
      toast.error('Please select a reason');
      return;
    }

    setIsSubmitting(true);

    const reportData = {
      recipeId: recipe?._id,
      recipeName: recipe?.recipeName,
      userEmail: userEmail || 'Anonymous',
      reason,
      details,
    };

    const result = await reportRecipeApi(reportData);

    if (result && result.success) {
      toast.success('Thank you. The recipe has been reported.');
      setIsOpen(false);
      setReason('');
      setDetails('');
    } else {
      toast.error(result?.message || 'Something went wrong.');
    }

    setIsSubmitting(false);
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center cursor-pointer gap-2 bg-red-500/10 border border-red-500/20 text-red-400 px-5 py-3 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300"
      >
        <AlertTriangle size={18} />
        Report
      </motion.button>

      {/* reporte modal*/}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-[#131111] border border-zinc-800 w-full max-w-md p-6 rounded-2xl shadow-2xl overflow-hidden text-white"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-500/10 p-2 rounded-xl text-red-400">
                  <AlertTriangle size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-serif text-zinc-100">
                    Report Recipe
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Recipe: {recipe?.recipeName}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Reason for Report <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={reason}
                    onChange={e => setReason(e.target.value)}
                    className="w-full bg-[#1c1919] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:border-red-500/50 transition-colors cursor-pointer"
                    required
                  >
                    <option value="" disabled>
                      Select a reason...
                    </option>
                    {reasons.map((r, index) => (
                      <option key={index} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Additional Details (Optional)
                  </label>
                  <textarea
                    value={details}
                    onChange={e => setDetails(e.target.value)}
                    placeholder="Provide details that will help us understand the issue..."
                    rows={4}
                    className="w-full bg-[#1c1919] border border-zinc-800 rounded-xl p-4 text-sm text-zinc-200 focus:outline-none focus:border-red-500/50 transition-colors resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 py-3 rounded-xl font-medium transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-red-600 hover:bg-red-500 text-white py-3 rounded-xl font-medium transition-colors disabled:opacity-50 cursor-pointer flex justify-center items-center gap-2"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Report'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ReportButton;
