import React from "react";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";


export default function ChipsList(props) {
  const { chips, clickable, onChipClick, selectedChips } = props;
  return (
    <Box
      sx={{
        flex: "1",
        justifyContent: "center",
        display: "flex",
        gap: 1,
        flexWrap: "wrap",
      }}
    >
      {chips.map((chip, index) => (
        <Chip
          key={index}
          label={chip}
          clickable={clickable}
          color={
            selectedChips && selectedChips.includes(chip)
              ? "primary"
              : "default"
          }
          onClick={() => clickable && onChipClick && onChipClick(chip)}
        />
      ))}
    </Box>
  );
}
