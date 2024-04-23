import { Component, OnInit } from '@angular/core';
import { ListService } from './list.service';

import Swal from 'sweetalert2';
import * as Noty from 'noty';

import { ListItem, SelectValue } from './list.model';
import { UpVote, DownVote, SuccessNoty } from '../../common/utils/utils';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [ListService]
})

export class ListComponent implements OnInit {
  list: ListItem[] = [];
  p: number = 1;

  selectedSortingId: any = null;
  sortingList: SelectValue[] = [
    { id: 0, name: 'Most Voted (Z => A)' },
    { id: 1, name: 'Less Voted (A => Z)' },
    { id: 2, name: 'Most Points (+)' },
    { id: 3, name: 'Less Points (-)' }
  ];

  constructor(private ListService: ListService) {}

  ngOnInit(): void {
    this.getList();
  }

  getList = () => {
    this.list = this.ListService.getList();
  }

  onListItemDelete = (id: any, title: string) => {
    Swal.fire({
      text: title,
      title: 'Do you want to remove:',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'CANCEL'
    }).then((result) => {
      if (result.value) {
        // okey
        this.ListService.deleteListItem(id);
        SuccessNoty(title, 'removed.');
        this.getList();
      }
    })
  };

  handleUpVote = (listItem: ListItem) => {
    this.ListService.updateList(UpVote(listItem));
    this.isSelectedPoints(this.selectedSortingId);
  }

  handleDownVote = (listItem: ListItem) => {
    this.ListService.updateList(DownVote(listItem));
    this.isSelectedPoints(this.selectedSortingId);
  }

  isSelectedPoints = (selectedSortingId: number | any) => {
    if ([2, 3].includes(selectedSortingId)) {
      this.handleSortChanged({ id: selectedSortingId, name: '' });
    }
  }

  handleSortChanged = (event: SelectValue) => {
    const id = event && event.id;
    switch(id){
      case 0:
        this.ListService.alphabeticalOrderList('reverse');
        break;
      case 1:
        this.ListService.alphabeticalOrderList('normal');
        break;
      case 2:
        this.ListService.numberOrderList('decreasing');
        break;
      case 3:
        this.ListService.numberOrderList('increase');
        break;
      default:
        break;
    }

    this.getList();
  }
}
