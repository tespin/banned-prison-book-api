"use client";

import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import FlexContainer from "../FlexContainer";
import FilterButton from "../FilterButton";
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import OptionButton from "../OptionButton";

function FilterDialog() {
  const [open, setOpen] = useState(false);
  const [scrollPos, setScrollPos] = useState({ x: 0, y: 0 });
  const buttons = ["2002", "2017", "2025"];

  function handleScroll() {
    const { scrollX, scrollY } = window;
    setScrollPos({ x: scrollX, y: scrollY });
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <FilterButton />
      </Dialog.Trigger>
      <Dialog.Portal className="w-full h-full">
        <Dialog.Overlay className="bg-black/65 fixed inset-0" />
        <FlexContainer
          className={` w-full h-full fixed left-0 top-0 justify-center items-center`}
        >
          <Dialog.Content className="relative rounded-md xs:w-11/12 xs:h-1/3 max-w-lg max-h-screen p-4 bg-white overflow-y-auto">
            <Dialog.Close className="absolute">X</Dialog.Close>
            <p className="basis-auto grow-0 shrink text-center font-bold">
              Filters
            </p>
            <h2 className="text-xl font-medium">Sort</h2>
            <button className="border border-black">Ascending</button>
            <button className="border border-black">Descending</button>
            {/* slide button Ascending / Descending */}
            <h2 className="text-xl font-medium">Years</h2>
            {/* insert prop here for years*/}
            <ButtonGroup buttons={buttons} />;
          </Dialog.Content>
        </FlexContainer>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default FilterDialog;
