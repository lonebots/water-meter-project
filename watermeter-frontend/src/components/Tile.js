import React from 'react';

const Tile=(props)=>(
<tbody>
     <tr class="border-b-0">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r-4">{props.id}</td>
                    <td class="text-base text-gray-900 font-medium px-6 py-4 whitespace-nowrap border-r-4">
                      {props.consumerId }
                    </td>
                    <td class="text-base text-gray-900 font-medium px-6 py-4 whitespace-nowrap border-r-4">

                      {props.currentConsumption+ "L"}
                    </td>
                    <td class="text-base text-gray-900 font-medium px-6 py-4 whitespace-nowrap border-r-4">
                      {props.reading}
                    </td>
                    <td class="text-base text-gray-900 font-medium px-6 py-4 whitespace-nowrap border-r-4">
                    {"₹ " + props.currentPrice}
                      </td>
                      <td class="text-base text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                        {props.updatedAt}
                      </td>
                  </tr>
                  </tbody>
)
;

export default Tile;