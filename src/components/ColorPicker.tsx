"use client";

import "../styles/ColorPicker.scss";
import { Note } from "../types/note";

interface ColorPickerProps {
  onSelectColor: (color: Note["color"]) => void
}

const ColorPicker = ({ onSelectColor }: ColorPickerProps) => {
  const colors: { value: Note["color"]; label: string; hex: string }[] = [
    { value: "blue", label: "Azul", hex: "#bae2ff" },
    { value: "green", label: "Verde", hex: "#b9ffdd" },
    { value: "yellow", label: "Amarelo", hex: "#ffe8ac" },
    { value: "pink", label: "Rosa", hex: "#ffcce3" },
    { value: "red", label: "Vermelho", hex: "#ffabab" },
    { value: "lightblue", label: "Azul Claro", hex: "#a1c6ff" },
    { value: "purple", label: "Roxo", hex: "#d9b8ff" },
    { value: "lime", label: "Lima", hex: "#d8ff8b" },
    { value: "orange", label: "Laranja", hex: "#ffd0a1" },
    { value: "gray", label: "Cinza", hex: "#d9d9d9" },
    { value: "darkgray", label: "Cinza Escuro", hex: "#a6a6a6" },
    { value: "brown", label: "Marrom", hex: "#c4a68a" },
    { value: "white", label: "Branco", hex: "#ffffff" },
    { value: "black", label: "Preto", hex: "#000000" },
  ];

  return (
    <div className="color-picker">
      <div className="color-grid">
        {colors.map((color) => (
          <button
            key={color.value}
            className="color-option"
            style={{ backgroundColor: color.hex }}
            onClick={() => onSelectColor(color.value)}
            title={color.label}
            type="button"
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
