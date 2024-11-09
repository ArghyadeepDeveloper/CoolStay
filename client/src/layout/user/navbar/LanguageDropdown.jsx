import React, { useState } from "react";
import { Dropdown } from "rsuite";
import Flag from "react-world-flags";

export default function LanguageDropdown() {
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const languages = [
    { code: "US", label: "English" },
    { code: "ES", label: "Spanish" },
    { code: "FR", label: "French" },
    { code: "DE", label: "German" },
  ];

  const handleSelect = (label) => {
    setSelectedLanguage(label);
  };

  return (
    <Dropdown title={`Language: ${selectedLanguage}`} className="w-48">
      {languages.map((lang) => (
        <Dropdown.Item
          key={lang.code}
          onSelect={() => handleSelect(lang.label)}
          style={{ display: "flex", alignItems: "center", gap: "8px" }} // Ensure flex styling is applied
        >
          <Flag code={lang.code} className="h-4" />
          <span>{lang.label}</span>
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
}
