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
          <p>what is up</p>
          <Dialog.Close>X</Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default FilterDialog;
