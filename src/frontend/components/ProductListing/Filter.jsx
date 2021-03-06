import {useState, useEffect} from "react"
import {useMediaQuery} from "react-responsive"
import { useProductContext } from "../../context/context-index"

const Filter = ({setCardDisplay}) => {

    const [filterDisplay, setFilterDisplay] = useState("display-none")
    const isDivideLarge = useMediaQuery({query:"(min-width: 1220px)"})
    const { state, dispatch } = useProductContext()
    useEffect(()=>{
        if(isDivideLarge){
            setFilterDisplay('display-block')
            setCardDisplay("product-container")
        }
        else {
            setFilterDisplay('display-none')
        }
    },[isDivideLarge])
    
    const showFilterSection = ()=>{
            

            if(filterDisplay === "display-none"){
                setFilterDisplay('display-block')
                setCardDisplay("display-none")
            }
            else {
                setFilterDisplay('display-none')
                setCardDisplay("product-container")
            }
        
    }
    return (
        <>
        <div className="filterButton">
             <div className="sort-button">
                <button  className="btn btn-text filter-button" onClick = {() => dispatch({type:"RESET_FILTER"})}><i className="fab fa-skyatlas filter-icon"></i>Clear Filters</button>
             </div>
            <div className="sort-button">
                <button  onClick = {showFilterSection} className="btn btn-text filter-button"><i className="far fa-filter filter-icon"></i>Apply Filters</button>
            </div>
            

        </div>
        <div>
            <aside className={`product-filter-section ${filterDisplay}`}>
                <div className="product-filter-heading">
                    <p className="fw-7">Filters</p>
                    { isDivideLarge ? <button onClick = {() => dispatch({type:"RESET_FILTER"})} className = "filter-resetBtn">Clear</button> : <button onClick = {showFilterSection} className = "filter-resetBtn">Close</button>}
                    
                </div>
                <div className="price-range-container">
                        <p className="fw-7">Price</p>
                    
                <div>
                    <div className="price-range-values">
                        <p>100</p>
                        <p>2000</p>
                        <p>5000</p>
                    </div>
                    <input type="range" min={100} max={5000} className="price-slider" onChange = {(e) => dispatch({type:"PRICE_FILTER",payload:e.target.value})}/>
                    
                </div>
                </div>
                <div className="input-filter-container">
                    <p className="fw-7">Category</p>
                    <ul className="check-lists">
                        <li><label htmlFor="men-category"><input type="checkbox" id="men-category" value = "Men"  onChange = {(e) => dispatch({type:"CAT_MEN", payload:"Men"})} checked = {state.filter.category.men}/>Mens Clothing</label></li>
                        <li><label htmlFor="women-category"><input type="checkbox"  id="women-category" value = "Women"  onChange = {(e) => dispatch({type:"CAT_WOMEN", payload:"Women"})} checked = {state.filter.category.women}/>Women Clothing</label></li>
                        <li><label htmlFor="kids-category"><input type="checkbox"  id="kids-category" value = "Kids"  onChange = {(e) => dispatch({type:"CAT_KIDS", payload:"Kids"})} checked = {state.filter.category.kids}/>Kids Clothing</label></li>
                    </ul>
                </div>
                <div className="input-filter-container">
                    <p className="fw-7">Rating</p>
                    <ul className="check-lists" onChange = {(e) => dispatch({type:"RATING_FILTER",payload:e.target.value})}>
                         <li><label htmlFor="four-stars"><input type="radio" name="star-rating" id="four-stars" value = {4}/>4 Stars &amp; above</label></li>
                         <li><label htmlFor="three-stars"><input type="radio" name="star-rating" id="three-stars" value = {3}/>3 Stars &amp; above</label></li>
                         <li><label htmlFor="two-stars"><input type="radio" name="star-rating" id="two-stars" value = {2}/>2 Stars &amp; above</label></li>
                         <li><label htmlFor="one-stars"><input type="radio" name="star-rating" id="one-stars" value = {1}/>1 Stars &amp; above</label></li>
                    </ul>
                </div>
                <div className="input-filter-container">
                    <p className="fw-7">Sort by</p>
                    <ul className="check-lists" onClick = {(e) => dispatch({type:"SORT_BY_PRICE",payload:e.target.value})}>
                          <li><label htmlFor="low-to-high"><input type="radio" name="sort-by" id="low-to-high" value = {"lowToHigh"}/>Price - Low to High</label></li>
                          <li><label htmlFor="high-to-low"><input type="radio" name="sort-by" id="high-to-low" value = {"highToLow"}/>Price - High to Low</label></li>                        
                    </ul>
                    </div>
            </aside>
        </div>
        </>
    )
};

export default Filter;