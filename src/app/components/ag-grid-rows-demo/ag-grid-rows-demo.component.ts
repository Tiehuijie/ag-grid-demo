import { Component, OnInit } from '@angular/core';
import {ColumnApi, GridApi, Module} from 'ag-grid-community';
import {GridDataServiceService} from '../service/grid-data-service.service';


@Component({
  selector: 'app-ag-grid-rows-demo',
  templateUrl: './ag-grid-rows-demo.component.html',
  styleUrls: ['./ag-grid-rows-demo.component.scss']
})
export class AgGridRowsDemoComponent implements OnInit {
  gridApi: GridApi;
  gridColumnApi: ColumnApi;
  columnDefs: any;
  defaultColDef: any;
  rowData: any;
  getRowStyle: any;
  pinnedTopRowData: any;
  pinnedBottomRowData: any;
  frameworkComponents: any;

  constructor(private gridDataService: GridDataServiceService ) {
    this.columnDefs = [
      {
        field: 'make',
        pinnedRowCellRenderer: 'customPinnedRowRenderer',
        pinnedRowCellRendererParams: { style: { color: 'blue' } },
        rowSpan: this.rowSpan,
        sort: 'asc',
      },
      {
        field: 'model',
        width: 90,
      },
      {
        field: 'price',
        comparator: (valueA, valueB, nodeA, nodeB, inInverted) => {
         return valueA - valueB;
        },
      }
    ];
    this.defaultColDef = {
      width: 170,
      sortable: true,
    };
    this.getRowStyle =  (params) => {
      if (params.node.rowPinned) {
        return { 'font-weight': 'bold' };
      }
    };
    this.pinnedTopRowData = this.createData(1, 'Top');
    this.pinnedBottomRowData = this.createData(1, 'Bottom');
    // this.frameworkComponents = {
    //   customPinnedRowRenderer: CustomPinnedRowRenderer,
    // };
  }

  ngOnInit(): void {
  }

  onGridReady(params: any): void{
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridDataService.getSmallRowDatas().subscribe((data) =>{
      data.forEach((dataItem) => {
        dataItem.rowHeight = 200 * Math.random();
      });
      this.rowData = data;
    });
  }

  rowSpan(params): number {
    return params.data.make === 'Ford' ? 2 : 1;
  }

  createData(index, prefix): any{
    return [{
      make: `${prefix}Porsche`,
      model: `${prefix}Boxter`,
      price: 72000
    }];
  }
  getRowHeight(params): number{
    return params.data.rowHeight;
  }
}