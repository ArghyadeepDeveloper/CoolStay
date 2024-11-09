import React, { useState } from "react";
import { InputGroup, Input, Button } from "rsuite";
import { IconSearch } from "@tabler/icons-react";

export default function SearchBar({ onSearch }) {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(searchValue);
    }
  };

  return (
    <InputGroup
      className="w-full rounded-[50%]"
      style={{
        backgroundColor: "#f0f0f0",
        border: "none",
        borderRadius: "50px",
      }}
    >
      <Input
        placeholder="Search..."
        value={searchValue}
        onChange={(value) => setSearchValue(value)}
        style={{
          border: "none",
          backgroundColor: "#f0f0f0",
          borderRadius: "50px",
        }}
      />
      <InputGroup.Button
        onClick={handleSearchClick}
        style={{
          backgroundColor: "#f0f0f0",
          borderRadius: "0px 50px 50px 0px",
        }}
      >
        <IconSearch style={{ color: "#a0a0a0" }} />
      </InputGroup.Button>
    </InputGroup>
  );
}
