import React, { useEffect, useState } from "react";
import getData from "../services/searchData";

const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [noItem, setNoItem] = useState(true);

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await getData(searchTerm);
      setResults(
        response.data.saltSuggestions.map((result) => ({
          ...result,
          showAllForms: false,
          selectedForm: "",
          selectedStrength: "",
          selectedPacking: "",
        }))
      );
      setNoItem(false);
    } catch (error) {
      console.error("Error fetching data:", error?.message);
    }
  };

  const handleFormSelection = (index, form) => {
    setResults((prevResults) =>
      prevResults.map((result, i) =>
        i === index ? { ...result, selectedForm: form } : result
      )
    );
  };

  const toggleFromButtons = (index) => {
    setResults((prevResults) =>
      prevResults.map((result, i) =>
        i === index
          ? {
              ...result,
              showAllForms: !result.showAllForms,
            }
          : result
      )
    );
  };

  const handleStrengthSelection = (formIndex, strength) => {
    setResults((prevResults) =>
      prevResults.map((result, index) =>
        index === formIndex
          ? { ...result, selectedStrength: strength, selectedPacking: "" }
          : result
      )
    );
  };

  const handlePackingSelection = (formIndex, packing) => {
    setResults((prevResults) =>
      prevResults.map((result, index) =>
        index === formIndex ? { ...result, selectedPacking: packing } : result
      )
    );
  };

  return (
    <div className="h-screen w-full">
      <h1 className="text-center my-3 font-bold text-2xl text-gray-500 dark:text-gray-400">
        Cappsule Web Development
      </h1>
      <form
        className="max-w-[80%] mx-auto my-6 drop-shadow-md"
        onSubmit={handleSearch}
      >
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm bg-white text-gray-900 border-slate-100 border-[0px] rounded-lg  dark:bg-gray-700 dark:border-slate-100 dark:placeholder-gray-400 dark:text-white  dark:focus:border-slate-100"
            placeholder="Search Any Medicine name here..."
            required
          />
          <button
            type="submit"
            className="absolute end-2.5 border-[0px] bottom-2.5 text-gray-800 hover:text-gray-900 focus:ring-4 focus:outline-none focus:border-[0px] bg-transparent font-medium rounded-lg text-sm px-4 py-2 focus:bg-transparent dark:outline-none dark:focus:outline-none"
          >
            Search
          </button>
        </div>
      </form>
      <div className="">
        {results?.map((result, index) => (
          <div key={result.id}>
            <div className="flex flex-col sm:flex-col md:flex-row justify-between bg-gradient-to-br drop-shadow-md rounded from-white to-slate-100 from-[80%] to-[20%] my-5 px-4 py-4 mx-auto sm:w-full md:w-[80%]">
              <div className="flex flex-col w-[50%]">
                <div className="flex gap-4 w-full">
                  <h1 className="font-bold text-gray-900">Forms : </h1>
                  <p className="w-1/2">
                    {(result.showAllForms
                      ? result.available_forms
                      : result.available_forms.slice(0, 4)
                    ).map((form, formIndex) => (
                      <button
                        key={formIndex}
                        className={
                          form === result.selectedForm
                            ? "selected border-[2px] border-[#5a548c] text-sm border-solid bg-transparent mx-1 my-1 font-bold px-2 py-2 text-[#5a548c] text-center rounded"
                            : "border-[2px] border-[#adacb0] text-sm border-solid bg-transparent px-2 py-2 text-[#adacb0] font-bold mx-1 my-1 text-center rounded"
                        }
                        onClick={() => handleFormSelection(index, form)}
                      >
                        {form}
                      </button>
                    ))}
                    {result.available_forms.length > 4 && (
                      <button
                        onClick={() => toggleFromButtons(index)}
                        className="text-[#5a548c] font-bold"
                      >
                        {result.showAllForms ? "hide.." : "more.."}
                      </button>
                    )}
                  </p>
                </div>
                {result.selectedForm && (
                  <div className="flex gap-4 w-full">
                    <h4 className="font-bold text-gray-900">Strength :</h4>
                    <p className="w-1/2">
                      {result.salt_forms_json[result.selectedForm] &&
                        Object.keys(
                          result.salt_forms_json[result.selectedForm]
                        ).map((strength) => (
                          <button
                            key={strength}
                            className={
                              strength === result.selectedStrength
                                ? "selected border-[2px] text-sm border-[#5a548c] border-dashed bg-transparent mx-1 my-1 font-bold px-2 py-2 text-[#5a548c] text-center rounded"
                                : "border-[2px] border-[#adacb0] text-sm border-solid bg-transparent px-2 py-2 text-[#adacb0] font-bold mx-1 my-1 text-center rounded"
                            }
                            onClick={() =>
                              handleStrengthSelection(index, strength)
                            }
                          >
                            {strength}
                          </button>
                        ))}
                    </p>
                  </div>
                )}
                {result.selectedStrength && (
                  <div className="flex gap-4 w-full">
                    <h4 className="font-bold text-gray-900">Packing : </h4>
                    <p className="w-1/2">
                      {result.salt_forms_json[result.selectedForm] &&
                        result.salt_forms_json[result.selectedForm][
                          result.selectedStrength
                        ] &&
                        Object.keys(
                          result.salt_forms_json[result.selectedForm][
                            result.selectedStrength
                          ]
                        ).map((packing) => (
                          <button
                            key={packing}
                            className={
                              packing === result.selectedPacking
                                ? "selected border-[2px] border-[#5a548c] border-dashed bg-transparent mx-1 my-1 font-bold px-2 py-2 text-[#5a548c] text-sm text-center rounded"
                                : "border-[2px] border-[#adacb0] border-dashed bg-transparent px-2 py-2 text-[#adacb0] font-bold mx-1 my-1 text-sm text-center rounded"
                            }
                            onClick={() =>
                              handlePackingSelection(index, packing)
                            }
                          >
                            {packing}
                          </button>
                        ))}
                    </p>
                  </div>
                )}
              </div>
              <div className="self-center text-center w-[45%]">
                <p className="text-center text-gray-900 font-bold">
                  Salt {index + 1}
                </p>
                <p className="text-gray-500 font-bold text-sm">
                  {result.selectedForm
                    ? result.selectedForm
                    : result.available_forms[0]}{" "}
                  | {result.selectedStrength ? result.selectedStrength : "0mg"}{" "}
                  | {result.selectedPacking ? result.selectedPacking : "0mg"}
                </p>
              </div>
              {result.selectedPacking &&
              Array.isArray(
                result.salt_forms_json[result.selectedForm]?.[
                  result.selectedStrength
                ]?.[result.selectedPacking]
              ) ? (
                <div className="flex gap-4 w-full">
                  <h4 className="font-bold text-blue-900">Price</h4>
                  {result?.salt_forms_json[result.selectedForm]?.[
                    result.selectedStrength
                  ]?.[result.selectedPacking]?.map((product) => (
                    <div key={product.pharmacy_id}>
                      {product.selling_price
                        ? `From ₹${product.selling_price}`
                        : "No stores selling this product near you"}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white px-2 py-2  w-[20%] h-[20%] sm:w-[60%] sm:h-[30%] md:w-[20%] md:h-[20%] self-center border-solid border-[2px] rounded border-indigo-200 text-indigo-400 font-bold">
                  No stores selling this product near you
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {noItem && (
        <div className="flex flex-col justify-center h-full items-center">
          <p className="bg-white px-4 py-4  text-gray-500 dark:text-gray-400 self-center border-solid border-[2px] rounded font-bold">
            Find Medicine amazing discount
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchScreen;
