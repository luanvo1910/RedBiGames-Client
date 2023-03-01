import { useContext, useState } from "react";
import { ProductContext } from "../../contexts/ProductContext";

const SearchInput = () =>
{
  const [search, setSearch] = useState("");
  const { searchProducts } = useContext(ProductContext)
  return (
    <div>
        <form className="d-flex" role="search">
    		<input 
				className="form-control me-2" 
				type="search" 
				placeholder="Search product" 
				aria-label="Search"
				onChange={(e) => {setSearch(e.target.value)}}
			/>
    		<button 
                className="btn btn-outline-success" 
                type="submit" 
                onClick={searchProducts(search)}
            >Search</button>
      	</form>
    </div>
  )
}

export default SearchInput