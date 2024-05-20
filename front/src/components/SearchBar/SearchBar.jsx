import { useState } from "react";
import styles from './SearchBar.module.scss';

export default function SearchBar(props) {

   const [id, setId] = useState('');

   const handleChange = (event) => {
      setId(event.target.value);
   }

   const handleSearch = (id) => {
      props.onSearch(id);
      setId('');
   }

   const handleKey = (event) => {
      if(event.key === 'Enter'){
         handleSearch(id);
      }
   }

   return (
      <div className={styles.searchContainer}>
         <input
         className={styles.searchInput}
         placeholder="Enter an ID" 
         type='search' 
         value={id} 
         onChange={handleChange}
         onKeyDown={handleKey}/>
         
         <button 
         className={styles.searchButton}
         onClick={() => {handleSearch(id)}}>🔍</button>
      </div>
   );
}
