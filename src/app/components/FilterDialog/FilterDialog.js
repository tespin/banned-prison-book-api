"use client";

import React, { useEffect, useState, useContext } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import FlexContainer from "../FlexContainer";
import FilterButton from "../FilterButton";
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import OptionButton from "../OptionButton";
import { SearchResultsContext } from "../SearchResultsProvider";

function FilterDialog() {
  const { data, setFilteredData } = useContext(SearchResultsContext);
  // const [filteredData, setFilteredData] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentData, setCurrentData] = useState([]);
  const [activeButtons, setActiveButtons] = useState([]);
  const [yearButtons, setYearButtons] = useState([]);
  const [filterActive, setFilterActive] = useState(false);
  const [scrollPos, setScrollPos] = useState({ x: 0, y: 0 });
  const totalCount = currentData ? currentData.length : data.length;

  useEffect(() => {
    const years = data.map((data) => {
      return data.date.split("-")[0];
    });
    years.sort((a, b) => a - b);

    setYearButtons([...new Set(years)]);
  }, [currentData, data]);

  // function handleScroll() {
  //   const { scrollX, scrollY } = window;
  //   setScrollPos({ x: scrollX, y: scrollY });
  // }

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // });

  function handleSubmit(e) {
    e.preventDefault();
    /* if filters are active, setFilterActive(true) */
    setFilteredData(currentData);
    setOpen(false);
  }

  function handleFilterActive() {}

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <FilterButton />
      </Dialog.Trigger>
      <Dialog.Portal className="w-full h-full">
        <Dialog.Overlay className="bg-black/65 fixed inset-0" />
        <Dialog.Content className="flex w-full h-full fixed left-0 top-0 justify-center items-center">
          <FlexContainer
            className={`flex-col relative rounded-md xs:w-11/12 xs:h-2/3 max-w-lg max-h-screen p-4 bg-white overflow-y-auto`}
          >
            <Dialog.Close className="absolute">X</Dialog.Close>
            <p className="basis-auto grow-0 shrink text-center font-bold">
              Filters
            </p>
            <h2 className="text-xl font-medium">Sort</h2>
            <button className="border border-black">Ascending</button>
            <button className="border border-black">Descending</button>
            <h2 className="text-xl font-medium">Years</h2>
            <ButtonGroup
              buttons={yearButtons}
              data={data}
              handleFilter={setCurrentData}
            />
            <button className="pr-2" type="submit" onClick={handleSubmit}>
              show {totalCount} banned texts
            </button>
          </FlexContainer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default FilterDialog;
