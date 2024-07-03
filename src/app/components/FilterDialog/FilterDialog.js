"use client";

import React, { useEffect, useState, useContext } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import FlexContainer from "../FlexContainer";
import FilterButton from "../FilterButton";
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import { SearchResultsContext } from "../SearchResultsProvider";

function FilterDialog({ handleActiveFilters, activeFilters }) {
  const { data, setFilteredData } = useContext(SearchResultsContext);
  const [open, setOpen] = useState(false);
  const [currentData, setCurrentData] = useState([]);
  const [yearButtons, setYearButtons] = useState([]);
  const [filterActive, setFilterActive] = useState(false);
  const totalCount = currentData ? currentData.length : data.length;

  useEffect(() => {
    const years = data.map((data) => {
      return data.date.split("-")[0];
    });
    years.sort((a, b) => a - b);

    setYearButtons([...new Set(years)]);
  }, [currentData, data]);

  useEffect(() => {
    if (activeFilters.length > 0) {
      setFilterActive(true);
    } else {
      setFilterActive(false);
    }
  }, [activeFilters]);

  function handleSubmit(e) {
    e.preventDefault();
    setFilteredData(currentData);
    setOpen(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <FilterButton isActive={filterActive} />
      </Dialog.Trigger>
      <Dialog.Portal className="">
        <Dialog.Overlay className="bg-black/65 fixed inset-0" />
        <Dialog.Content className="flex fixed w-full max-w-3xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 justify-center items-center">
          <FlexContainer
            className={`flex-col relative rounded-md w-full xs:h-2/3 max-h-screen px-6 py-4 bg-white overflow-y-auto gap-y-4`}
          >
            <Dialog.Close className="absolute">X</Dialog.Close>
            <Dialog.Title className="basis-auto grow-0 shrink text-center font-bold">
              Filters
            </Dialog.Title>
            <FlexContainer className="flex-col">
              <h2 className="text-xl font-medium">Sort</h2>
              <FlexContainer className="flex-row">
                <button className="border border-black rounded-tl-md rounded-bl-md mr-[-1px] px-8 py-3">
                  Ascending
                </button>
                <button className="border border-black rounded-tr-md rounded-br-md px-8 py-3">
                  Descending
                </button>
              </FlexContainer>
            </FlexContainer>
            <FlexContainer className="flex-col">
              <h2 className="text-xl font-medium">Years</h2>
              <div className="grid grid-cols-4 gap-4">
                <ButtonGroup
                  buttons={yearButtons}
                  data={data}
                  handleFilter={setCurrentData}
                  handleActiveFilters={handleActiveFilters}
                  activeFilters={activeFilters}
                />
              </div>
            </FlexContainer>

            <button
              className=" bg-black text-white rounded-md mt-4 px-4 py-2"
              type="submit"
              onClick={handleSubmit}
            >
              show {totalCount} banned texts
            </button>
          </FlexContainer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default FilterDialog;
