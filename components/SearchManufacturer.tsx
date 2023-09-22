"use client";

import { Combobox, Transition } from "@headlessui/react";
import { SearchManufacturerProps } from "@/types";
import { useState, Fragment } from "react";
import { manufacturers } from "@/constants";
import Image from "next/image";

const SearchManufacturer = ({ manufacturer, setManufacturer }: SearchManufacturerProps) => {

  const [query, setQuery] = useState("");

  // remove white space from user input to match the query
  const filteredManufacturers = query === ""
    ? manufacturers
    : manufacturers.filter((item) => (
      item.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, ""))
    ))

  return (
    <div className="search-manufacturer">
      <Combobox value={manufacturer} onChange={setManufacturer}>
        <div className="relative w-full">
          <Combobox.Button className="absolute top-[14px]">
            <Image
              src="/car-logo.svg"
              width={20}
              height={20}
              className="ml-4"
              alt="car logo"
            />
          </Combobox.Button>

          {/* Input field for searching */}
          <Combobox.Input
            className="search-manufacturer__input"
            placeholder="Volkswagen"
            displayValue={(manufacturer: string) => manufacturer}
            onChange={(e) => setQuery(e.target.value)}
          />

          {/* Transition for displaying options */}
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options>
              {filteredManufacturers.length === 0 && query !== ""
                ? (
                  <Combobox.Option value={query} className="search-manufacturer__option">
                    Nothing found.
                  </Combobox.Option>
                )
                : (
                  filteredManufacturers.map((item) => (
                    <Combobox.Option
                      key={item}
                      className={({ active }) => `
                  relative search-manufacturer__option
                  ${active ? 'bg-primary-blue text-white' : 'text-gray-900'}
                  `}
                      value={item}
                    >
                      {({ selected, active }) => (
                        <>
                          <span className={`block truncate cursor-pointer ${selected ? "font-medium" : "font-normal"}`}>
                            {item}
                          </span>

                          {/* Show an active blue background color if the option is selected */}
                          {selected ? (
                            <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-pribg-primary-purple"}`}
                            ></span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
            </Combobox.Options>
          </Transition>

        </div>
      </Combobox>
    </div>
  )
}

export default SearchManufacturer