
type props = {
    categories: string[];
    category: string | undefined;
    setCategory: (category: string | undefined) => void;
}
function CategoryList({ categories, category, setCategory }: props) {
  
  return (
     <div className="space-y-2">
      {categories.map((cat) => (
        <label
          key={cat}
          className="flex items-center gap-2 rounded-xl border border-gray-300 px-3 py-2 cursor-pointer hover:bg-gray-100 transition"
        >
          <input
            type="radio"
            name="categorySelection"
            value={cat}
            checked={category === cat}
            onChange={(e)=> setCategory(e.target.value)}
            className="h-4 w-4 rounded-full border-gray-400 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm font-medium text-gray-700">{cat}</span>
        </label>
      ))}
    </div>
  )
}

export default CategoryList
