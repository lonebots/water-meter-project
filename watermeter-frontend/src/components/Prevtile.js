import React from 'react';

const PrevTile=(props)=>(
    <tbody>
        <tr class="bg-gray-200 border-b">
               <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{props.id}</td>
               <td class="text-base text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                 {props.monthYear}
               </td>
               <td class="text-base text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                 {props.totalCost}
               </td>
               <td class="text-base text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                 {props.status}
               </td>
             </tr>
    </tbody>
    
);

export default PrevTile