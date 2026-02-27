import { useCallback, useEffect } from "react";
import {
  UKSizes,
  USSizes,
  footLengthsCM,
  footLengthsIN,
  labelSizes,
} from "../../data/sizes";
import "./SizeChart.css";
import type { Product } from "../../types/product";

interface SizeChartProps {
  product: Product;
  sizeType: string;
  unitType: string;
}
function SizeChart({ product, sizeType, unitType }: SizeChartProps) {
  const updateTable = useCallback(() => {
    const tableBody = document.getElementById("table-body");
    const tableData = [];
    if (!tableBody) return;
    for (let i = 0; i < labelSizes.length; i++) {
      const row = [];
      //only add the data if the the us size is currently available for the current product
      if (product.sizes.includes(USSizes[i])) {
        row.push(labelSizes[i]);
        if (sizeType === "US") row.push(USSizes[i]);
        else row.push(UKSizes[i]);
        if (unitType === "IN") row.push(footLengthsIN[i]);
        else row.push(footLengthsCM[i]);
        tableData.push(row);
      }

      tableBody.innerHTML = "";

      // Build the new table
      tableData.forEach(function (row) {
        const newRow = document.createElement("tr");
        tableBody.appendChild(newRow);
        row.forEach(function (cell) {
          const newCell = document.createElement("td");
          if (newCell) newCell.textContent = cell as string;
          console.log({ cell });
          newRow.appendChild(newCell);
        });
      });
    }
  }, [sizeType, unitType, product.sizes]);
  useEffect(() => {
    updateTable();
  }, [updateTable]);

  return (
    <table>
      <thead>
        <tr>
          <th>Label Size(CN)</th>
          <th>{"Size(" + sizeType + ")"}</th>
          <th>{"Foot Length(" + unitType + ")"}</th>
        </tr>
      </thead>

      <tbody id="table-body"></tbody>
    </table>
  );
}

export default SizeChart;
