'use client';

import { useState, useEffect } from 'react';
import { X, Save, SquarePen } from 'lucide-react';
import { useSession } from '@/lib/auth-client';
import { toast } from 'react-toastify';

const ProfileModaFormButtons = () => {
  const { data: session, refetch } = useSession();
  const user = session?.user;

  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setImage(user.image || '');
    }
  }, [user, open]);

  const handleSubmit = async e => {
    e.preventDefault();
    const userEmail = user?.email;

    if (!userEmail) {
      toast.error('User Email Not Available');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/users`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          name: name,
          url: image,
        }),
      });

      const data = await response.json();

      if (data.modifiedCount > 0 || data.acknowledged) {
        toast.success('Successfully Updated! 🎉');

        await refetch();

        setOpen(false);
      } else {
        toast.error('Updata Error');
        setOpen(false);
      }
    } catch (error) {
      toast.warning('Somathin Warong');
    }
  };

  return (
    <>
      {/* Open Button */}
      <button
        onClick={() => setOpen(true)}
        className="px-3 flex items-center gap-2 py-1.5 text-xs rounded-lg cursor-pointer bg-orange-500 text-white hover:bg-orange-600 transition"
      >
        <SquarePen size={20} />
        <span className="font-bold text-lg">Edit Profile</span>
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#1a0f0c] border border-orange-900/30 rounded-2xl p-6 relative">
            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white cursor-pointer"
            >
              <X size={18} />
            </button>

            <h2 className="text-xl font-bold text-white mb-4">
              Update Profile
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="text-xs text-orange-300/60">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-[#110a07] border border-orange-900/30 text-white outline-none focus:border-orange-500"
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="text-xs text-orange-300/60">Image URL</label>
                <input
                  type="text"
                  value={image}
                  onChange={e => setImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full mt-1 px-3 py-2 rounded-lg bg-[#110a07] border border-orange-900/30 text-white outline-none focus:border-orange-500"
                />
              </div>

              {/* Actions */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-linear-to-r from-orange-500 to-amber-600 text-white font-semibold hover:from-orange-400 hover:to-amber-500 cursor-pointer"
              >
                <Save size={16} />
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileModaFormButtons;
