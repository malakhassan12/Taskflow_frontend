import { Input } from "antd";

const { Search } = Input;

const SearchBar = ({ onSearch, placeholder = "Search...", style = {} }) => {
  return (
    <Search
      placeholder={placeholder}
      allowClear
      onChange={(e) => onSearch(e.target.value)}
      style={{ width: 250, ...style }}
    />
  );
};

export default SearchBar;