import React from 'react'

const CartAmountToggle = ({counter , Decerement , Increment }) => {
  return (
    <div class="mx-auto flex h-8 items-stretch text-gray-600">
      <button
        class="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
        type="button"
        name="button"
        onClick={() => Decerement()}
      >
        {" "}
        -{" "}
      </button>

      <div class="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                      {counter}
                    </div>
      <button
        class="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
        type="button"
        name="button"
        onClick={() => Increment()}
      >
        {" "}
        +{" "}
      </button>
    </div>
  );
}

export default CartAmountToggle
