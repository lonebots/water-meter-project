import React from "react";

const Tile = props => (
  <tbody>
    <tr class="border-b-0">
      <td class="whitespace-nowrap border-r-4 px-6 py-4 text-sm font-medium text-gray-900">
        {props.id}
      </td>
      <td class="whitespace-nowrap border-r-4 px-6 py-4 text-base font-medium text-gray-900">
        {props.consumerId}
      </td>
      <td class="whitespace-nowrap border-r-4 px-6 py-4 text-base font-medium text-gray-900">
        {props.currentConsumption + "L"}
      </td>
      <td class="whitespace-nowrap border-r-4 px-6 py-4 text-base font-medium text-gray-900">
        {props.reading}
      </td>
      <td class="whitespace-nowrap border-r-4 px-6 py-4 text-base font-medium text-gray-900">
        {"₹ " + props.currentPrice}
      </td>
      <td class="whitespace-nowrap px-6 py-4 text-base font-medium text-gray-900">
        {props.updatedAt}
      </td>
    </tr>
  </tbody>
);
export default Tile;
