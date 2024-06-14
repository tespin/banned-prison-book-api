"use client";

import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import FilterButton from "../FilterButton";

function FilterDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <FilterButton />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <h2>Sort</h2>
          {/* slide button Ascending / Descending */}
          <h2>Years</h2>
          {/* buttons */}
          <h2>Ban Reason</h2>
          {/* checkboxes */}
          <Dialog.Close>X</Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default FilterDialog;
