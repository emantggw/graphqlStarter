import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { LOAD_CATEGORIES } from "../GraphQL/Query";

const Categories = ()=>{

    const {error, loading, data} = useQuery(LOAD_CATEGORIES);
    const [categories, setCategories] = useState([]);

    useEffect(()=>{
      setCategories(data.categories);
    }, [data])
    return (
        <div>
           <ol>
               {categories.map((cat)=><li></li>)}
           </ol>
        </div>
    )
}

export default Categories;