import { Injectable } from '@angular/core';
import { ListItem } from './list.model';
import { v4 as uuidv4 } from 'uuid';
import { AlphabeticalOrder, NumberOrder } from '../../common/utils/utils';

@Injectable({
  providedIn: 'root'
})

export class ListService {
  initialState: ListItem[] = [
    {id: '', title: 'Hepsiburada', points: 4, link: 'https://www.hepsiburada.com/'},
    {id: '', title: 'Hepsiexpress', points: 7, link: 'https://www.hepsiexpress.com/'},
    {id: '', title: 'Google', points: 9, link: 'http://www.google.com'},
    {id: '', title: 'Yandex', points: 3, link: 'https://yandex.com.tr/'},
    {id: '', title: 'TV+', points: 18, link: 'https://web.tvplus.com.tr/'},
    {id: '', title: 'Galatasaray', points: 2, link: 'https://www.galatasaray.org/'}
  ];

  constructor() {
    this.initialState.forEach(item => {
      item.id = uuidv4();
    })
  }

  getList = () => {
    if (localStorage.getItem('List_Data') === 'null') return [];
    let list: ListItem[] = JSON.parse(localStorage.getItem('List_Data') || '{}');
    if (Object.keys(list).length === 0) {
      this.setList(this.initialState);
      list = this.initialState;
    }
    return list;
  }

  setList = (listData: ListItem[]) => {
    if (listData.length === 0) {
      localStorage.setItem('List_Data', JSON.stringify(null));
      return;
    }
    localStorage.setItem('List_Data', JSON.stringify(listData));
  }

  updateList = (listItem: ListItem) => {
    const list: ListItem[] = this.getList();
    list.forEach((item: ListItem) => {
      if (item.id === listItem.id) {
        item.points = listItem.points;
      }
    });

    this.setList(list);
  }

  deleteListItem = (id: any) => {
    let list: ListItem[] = this.getList();
    if (list.length > 0) {
      list = list.filter((listItem: ListItem) => listItem.id !== id);
    }

    this.setList(list);
  }

  addListItem = (listItem: ListItem) => {
    const list: ListItem[] = this.getList();
    list.unshift(listItem);
    this.setList(list);
  }

  alphabeticalOrderList = (type: string) => {
    let list: ListItem[] = this.getList();
    list = AlphabeticalOrder(list, 'title', type);
    this.setList(list);
  }

  numberOrderList = (type: string) => {
    let list: ListItem[] = this.getList();
    list = NumberOrder(list, 'points', type);
    this.setList(list);
  }
}
