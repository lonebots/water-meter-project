import React from "react";

const PrevTile = props => (
  <tbody>
    <tr class="border-b bg-gray-200">
      <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
        {props.id}
      </td>
      <td class="whitespace-nowrap px-6 py-4 text-base font-medium text-gray-900">
        {props.monthYear}
      </td>
      <td class="whitespace-nowrap px-6 py-4 text-base font-medium text-gray-900">
        {props.totalCost}
      </td>
      <td class="whitespace-nowrap px-6 py-4 text-base font-medium text-gray-900">
        {props.status}
      </td>
    </tr>
  </tbody>
);

export default PrevTile;
