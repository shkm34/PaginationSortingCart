import { useEffect, useMemo, useState } from "react";

export function useQueryOrCategory(q: string | undefined, category: string | undefined) {
    const [lastUpdated, setLastUpdated] = useState<'query' | 'category' | null>(null);

     useEffect(() =>{
      setLastUpdated((prev) =>{
         if (prev === 'query' && category) return 'category';
         if (prev === 'category' && q) return 'query';
         if (q) return 'query';
         if (category) return 'category';
         return null;
      }) 
     }, [q, category])
    
     const params = useMemo(() => {
    
      if (lastUpdated === 'query') return {q}
      if(lastUpdated === 'category') return {category}
      return {};
     }, [lastUpdated, q, category]);

     return params;
}