import { useContext, useState } from "react";
import { ProductContext } from "../../contexts/ProductContext";

const SearchInput = () =>
{
  const [search, setSearch] = useState("");
  const { searchProducts, setSearchString } = useContext(ProductContext)
  return (
    <div>
        <form className="d-flex" role="search">
          <input 
            className="form-control me-2" 
            type="search" 
            placeholder="Search product" 
            aria-label="Search"
            onChange={(e) => {setSearchString(e.target.value)}}/>
      	</form>
    </div>
  )
}

export default SearchInput