import Image from 'next/image';

import { FiEye, FiEdit3, FiTrash2 } from 'react-icons/fi';
import ViewButton from './actionbutton/ViewButton';
import UpdateButton from './actionbutton/UpdateButton';

const MyRecipeData = ({ newrecipe }) => {
  const { _id, recipeName, image, category, difficulty, prepTime } = newrecipe;

  return (
    <tr className="hover:bg-[#1a110d]/30 transition-colors duration-200 group">
      {/* Recipe Name & Image */}
      <td className="py-4 px-6">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-12 flex-shrink-0 overflow-hidden rounded-lg border border-orange-900/20">
            <Image
              src={
                image ||
                'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=150'
              }
              alt={recipeName}
              fill
              className="object-cover group-hover:scale-105 duration-300"
            />
          </div>
          <div>
            <h2 className="text-white font-medium text-base md:text-lg group-hover:text-orange-200 transition-colors">
              {recipeName}
            </h2>
          </div>
        </div>
      </td>

      {/* Extra Info (Category / Difficulty) */}
      <td className="py-4 px-6">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {category && (
            <span className="px-2.5 py-1 rounded-md bg-orange-500/10 text-orange-400 border border-orange-500/10">
              {category}
            </span>
          )}
          {difficulty && (
            <span className="px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300">
              {difficulty}
            </span>
          )}
          {prepTime && <span className="text-zinc-500">{prepTime} Mins</span>}
        </div>
      </td>

      {/* Action Buttons with Icons */}
      <td className="py-4 px-6 text-right">
        <div className="flex items-center justify-end gap-2">
          {/* View Button */}
          <div>
            <ViewButton id={_id} />
          </div>

          {/* Update Button */}
          <div>
            <UpdateButton recipe={newrecipe} />
          </div>

          {/* Delete Button */}
          <button
            title="Delete Recipe"
            className="p-2 flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg cursor-pointer hover:bg-red-500/20 hover:text-red-300 transition duration-200"
          >
            <FiTrash2 size={18} />
            delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default MyRecipeData;
